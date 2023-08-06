import { Errors } from "@src/globals/errors"
import { TokenType } from "@src/scanner"
import { Context, Fn } from "./Context"
import { Node, NodeType } from "./node"
import { OperatorsMap } from "@src/operators/list"

/**
 * Hydrates a node, that is, it adds the `evaluate` function
 * to the function and variables, and removes the group node
 * if it only contains one child.
 * @param node The node to hydrate
 * @param ctx The context to use for functions and variables
 */
export function hydrateNode(node: Node, ctx?: Context): void {

    // hydrate node children
    for (const child of node.children) {
        hydrateNode(child, ctx)
    }

    if (node.type === NodeType.FUNCTION) { // function call
        if (node.evaluate) { // already hydrated
            return
        }

        let fn: Fn

        if (node.token.type === TokenType.OPERATOR) { // operator function
            fn = OperatorsMap.get(node.token.value)!
        } else { // standard function
            if (!ctx) {
                throw Errors.LocationError(Errors.ERR_FUNCTION_CONTEXT, node.token.location.start)
            }
            // get the function body
            const name = node.token.value.toLowerCase()
            fn = ctx.functions[name]
        }

        if (!fn) {
            throw Errors.LocationError(Errors.ERR_FUNCTION_UNKNOWN(node.token.value), node.token.location.start)
        }

        // evaluate the argument nodes
        const getters = node.children.map(child => {
            if (!child.evaluate) {
                throw Errors.LocationError(Errors.ERR_FUNCTION_ARGUMENT, child.token.location.start)
            }
            return child.evaluate
        })

        const argCount = fn.arguments
        if (typeof argCount === "number" && getters.length !== argCount) {
            throw Errors.LocationError(Errors.ERR_FUNCTION_ARGUMENT_COUNT(node.token.value, argCount, getters.length), node.token.location.start)
        }
        if (Array.isArray(argCount)) {
            const min = Math.min(...argCount)
            const max = Math.max(...argCount)
            if (getters.length < min || getters.length > max) {
                throw Errors.LocationError(Errors.ERR_FUNCTION_ARGUMENT_COUNT(node.token.value, min + "-" + max, getters.length), node.token.location.start)
            }
        }

        node.evaluate = () => fn.evaluate(getters.map(getter => getter()), node.token.location.start)
    }

    else if (node.type === NodeType.SINGLE && node.token.type === TokenType.WORD) { // variables
        node.evaluate = () => {
            if (!ctx) {
                throw Errors.LocationError(Errors.ERR_VARIABLE_CONTEXT, node.token.location.start)
            }
            const value = ctx.variables[node.token.value.toLowerCase()]
            if (value === undefined) {
                throw Errors.LocationError(Errors.ERR_VARIABLE_UNKNOWN(node.token.value), node.token.location.start)
            }
            return value
        }
    }
}