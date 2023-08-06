import { TokenType } from "@src/scanner"
import { Node, NodeType } from "./node"
import { Errors } from "@src/globals/errors"
import { groupInner } from "./inner"

/**
 * Groups a list of nodes into a tree, based on the
 * parentheses in the expression. For example:
 * `1 + (2 + 3)` will be grouped into:
 * ```
 *  - +
 *    - 1
 *    - +
 *      - 2
 *      - 3 
 * ```
 */
export function groupNodes(nodes: Node[]): Node[] {
    // queue of open parentheses
    const openQueue: number[] = []

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // push the last open parenthesis to the queue
        if (node.token.value === "(") {
            openQueue.push(i)
            // find the first closing parenthesis
        } else if (node.token.value === ")") {
            if (openQueue.length === 0) {
                throw Errors.LocationError(Errors.ERR_PARENTHESES_CLOSE, node.token.location.start)
            }

            // connect the last open parenthesis to the first closing parenthesis
            // to create a group

            const openIndex = openQueue.pop()!
            let removeFrom = openIndex
            const openNode = nodes[openIndex]
            const group = nodes.slice(openIndex + 1, i)

            const newNode: Node = {
                type: NodeType.GROUP,
                token: openNode.token,
                children: group,
            }


            // if the group is preceeded by a word, then the 
            // group is a function, and the word token
            // should be moved to the function node

            if (openIndex > 0
                && nodes[openIndex - 1].type === NodeType.SINGLE
                && nodes[openIndex - 1].token.type === TokenType.WORD) {
                newNode.type = NodeType.FUNCTION
                newNode.token = nodes[openIndex - 1].token
                removeFrom = openIndex - 1
            }

            groupInner(newNode)

            nodes.splice(removeFrom, i - removeFrom + 1, newNode)
            i = removeFrom
        }
    }

    if (openQueue.length > 0) {
        throw Errors.LocationError(Errors.ERR_PARENTHESES_OPEN, nodes[openQueue[0]].token.location.start)
    }

    return nodes
}