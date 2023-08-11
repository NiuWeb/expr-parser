import { Operators } from "@src/operators/list"
import { Node, NodeType } from "./node"
import { Operator } from "@src/operators/operator"
import { TokenType } from "@src/scanner"
import { Errors } from "@src/globals/errors"
import { LocationRange } from "@src/globals/location"

/**
 * Groups the children of a node using operator precedence.
 */
export function groupInner(tree: Node): void {
    unwrapSingle(tree.children)
    groupOperators(tree.children)
    clearList(tree.children)
}

/**
 * Unwraps a list of nodes: if a node is a group node
 * that only contains one child, then the group node
 * is removed and the child is used instead.
 */
export function unwrapSingle(nodes: Node[]): void {
    for (const node of nodes) {
        // remove the group node if it only contains one child
        if (node.type === NodeType.GROUP && node.children.length === 1) {
            const child = node.children[0]
            node.type = child.type
            node.token = child.token
            node.children = child.children
        }
    }
}

/**
 * Clears a valid list of nodes: nodes in a list
 * (like an arguments list) can only be separated
 * by commas. Two contiguous commas or non-comma
 * nodes are not allowed.
 * For example:
 * - `1, 2, 3` is valid
 * - `1, , 2` is invalid
 * - `1 2` is invalid
 * This function will also remove the commas
 * from the list, and let only the nodes.
 */
export function clearList(nodes: Node[]): void {
    if (nodes.length === 0) {
        return
    }
    if (isComma(nodes[0])) {
        throw Errors.LocationError(Errors.ERR_LIST_UNEXPECTED_COMMA, nodes[0].token.location.start)
    }

    let lastWasComma = false

    // a first run to validate
    for (let i = 1; i < nodes.length; i++) {
        const thisIsComma = isComma(nodes[i])
        if (lastWasComma === thisIsComma) {
            throw Errors.LocationError(Errors.ERR_LIST_EXPECTED_COMMA, nodes[i].token.location.start)
        }
        lastWasComma = thisIsComma
    }

    // a second run to remove the commas
    for (let i = 0; i < nodes.length; i++) {
        if (isComma(nodes[i])) {
            nodes.splice(i, 1)
            i--
        }
    }
}
function isComma(node: Node): boolean {
    return node.type === NodeType.SINGLE && node.token.type === TokenType.COMMA
}

/**
 * Groups a list of nodes into a tree using operator precedence.
 */
export function groupOperators(nodes: Node[]): void {

    for (const operators of Operators) {
        _groupOperators(operators, nodes)
    }
}

/**
 * Groups a list of nodes into a tree, based on the given
 * operators with the same precedence.
 */
function _groupOperators(operators: Operator[], nodes: Node[]): void {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        // only compare operators to operator nodes
        if (!(node.type === NodeType.SINGLE && node.token.type === TokenType.OPERATOR)) {
            continue
        }

        // if the node is an operator, check if it is in the list of operators
        for (const op of operators) {
            if (op.name !== node.token.value) {
                continue
            }

            // here, we have found an operator with the same symbol as the node

            let removeFrom = i - 1
            let removeTo = i + 1
            let leftNode = nodes[removeFrom]
            let rightNode = nodes[removeTo]

            if (op.left && !nodeIsOperand(leftNode)) { // left operand is missing
                if (op.addLeft) { // add a zero token to the left if allowed
                    leftNode = createZeroNode(node.token.location)
                    removeFrom = i
                } else { // otherwise, throw an error
                    throw Errors.LocationError(Errors.ERR_OPERATOR_UNEXPECTED_LEFT(op.name), node.token.location.start)
                }
            }

            if (op.right && !nodeIsOperand(rightNode)) { // right operand is missing
                if (op.addRight) { // add a zero token to the right if allowed
                    rightNode = createZeroNode(node.token.location)
                    removeTo = i
                } else { // otherwise, throw an error
                    throw Errors.LocationError(Errors.ERR_OPERATOR_UNEXPECTED_RIGHT(op.name), node.token.location.start)
                }
            }

            // create a new function node with the operator and operands
            const newNode: Node = {
                type: NodeType.FUNCTION,
                token: node.token,
                children: [leftNode, rightNode].filter(node => !!node),
            }

            // remove the operator and operands from the list
            nodes.splice(removeFrom, removeTo - removeFrom + 1, newNode)
            i = removeFrom

        }

    }
}
/**
 * Checks if a node is an operand, that is, if it can be evaluated
 * to produce a number. Operand nodes are numbers, variables and function calls.
 * @param node the node to check
 */
function nodeIsOperand(node: Node): boolean {
    return !!node && (
        node.type === NodeType.FUNCTION
        || node.type === NodeType.NUMBER
        || (node.type === NodeType.SINGLE && node.token.type === TokenType.WORD)
    )
}

/**
 * creates a node with a zero token in the given location
 */
function createZeroNode(location: LocationRange): Node {
    return {
        type: NodeType.NUMBER,
        children: [],
        evaluate() {
            return 0
        },
        token: {
            type: TokenType.NUMBER,
            value: "0",
            location
        },
    }
}