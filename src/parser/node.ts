import { Token } from "@src/scanner"

/**
 * A node in the syntax tree, it can contain other nodes,
 * and can represent a single token. For example:
 * - A node can be a single number, containing the number
 *   token and no children.
 * - A node can be a function call, containing the function
 *   word as a token, and the arguments as children.
 * - A node can be a group, containing the opening parenthesis
 *   as a token, and the contents as children.
 * 
 * Nodes can be evaluated to produce a numerical value, using
 * the `evaluate` function inside them. For example,
 * a node containing a single number will just return that
 * number, and a node containing a function call will evaluate
 * its children and then call the function with the evaluated
 * arguments.
 */
export interface Node { 
    type: NodeType
    token: Token
    children: Node[]
    evaluate?(): number
}

export enum NodeType {
    SINGLE, // single node before being defined as another type
    NUMBER,
    FUNCTION,
    GROUP,
}
