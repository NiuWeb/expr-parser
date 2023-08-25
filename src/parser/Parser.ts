import { scan } from "@src/scanner"
import { Context, ContextOptions } from "./Context"
import { groupNodes } from "./group"
import { wrapTokens } from "./wrap"
import { clearList, groupOperators, unwrapSingle } from "./inner"
import { hydrateNode } from "./hydrate"
import { Expression } from "./Expression"
import { Contexts } from "@src/contexts/contexts"
/**
 * An expression parser transform mathematical expressions from
 * strings into a tree of nodes that can be evaluated.
 */
export class Parser {
    /**
     * generates default contexts
     */
    public static readonly Contexts = Contexts


    public readonly context: Context
    /**
     * Creates a new expression parser
     * @param options The options for the parser, such as functions and variables
     */
    constructor(options?: ContextOptions) {
        this.context = new Context(options || {})
    }

    /**
     * Sets a variable in the parser's context
     * @param name The name of the variable
     * @param value The value of the variable
     */
    public setVar(name: string, value: number) {
        this.context.setVar(name, value)
    }

    /**
     * Gets a variable from the parser's context
     */
    public getVar(name: string) {
        return this.context.getVar(name)
    }

    /**
     * Parses an expression into a tree of nodes
     */
    public parse(expression: string) {
        const tokens = scan(expression)
        const tree = groupNodes(wrapTokens(tokens))

        unwrapSingle(tree)
        groupOperators(tree)
        clearList(tree)

        for (const node of tree) {
            hydrateNode(node, this.context)
        }

        return new Expression(tree, this.context)
    }
}