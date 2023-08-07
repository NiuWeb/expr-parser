import { Errors } from "@src/globals/errors"
import { Context } from "./Context"
import { Node } from "./node"
import { stringFromNodes } from "./string"
import { Location } from "@src/globals/location"

/**
 * An expression class is just a container for a list
 * of expression nodes
 */
export class Expression {
    constructor(private readonly nodes: Node[], public readonly context: Context) { }

    public get length() {
        return this.nodes.length
    }

    /**
     * Gets the start location of the expression node at the given index
     */
    public location(i: number): Location {
        return this.nodes[i].token.location.start
    }

    /**
     * Evaluates all the expression nodes
     * @returns an array of results of each node
     */
    public evaluateAll(): number[] {
        const result: number[] = []
        for (let i = 0; i < this.length; i++) {
            result.push(this.evaluate(i))
        }
        return result
    }

    /**
     * Evaluates the expression node at the given index
     */
    public evaluate(index: number): number {
        const node = this.nodes[index]
        if (!node) {
            throw new Error(Errors.ERR_EXPR_NODE_NOT_FOUND)
        }
        const result = node.evaluate?.()
        if (result === undefined) {
            throw new Error(Errors.ERR_EXPR_NODE_NO_VALUE)
        }
        return result
    }

    /**
     * Converts the expression to a string. If an index
     * is provided, then only the node at that index
     * will be converted to a string.
     */
    public toString(index?: string) {
        if (typeof (index) === "number") {
            const node = this.nodes[index]
            if (node === undefined) {
                throw new Error(Errors.ERR_EXPR_NODE_NOT_FOUND)
            }
            return stringFromNodes([node])
        }
        return stringFromNodes(this.nodes)
    }
}