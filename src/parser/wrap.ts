import { Token, TokenType } from "@src/scanner"
import { Node, NodeType } from "./node"
import { Errors } from "@src/globals/errors"

/**
 * Takes a list of tokens and wraps them in individual nodes.
 * Numeric tokens are wrapped in NUMBER nodes, and the
 * rest are wrapped in SINGLE nodes.
 */
export function wrapTokens(tokens: Token[]): Node[] {
    const result: Node[] = []

    for (const token of tokens) {
        const isNumber = token.type === TokenType.NUMBER || token.type === TokenType.NUMBER_EXP

        const node: Node = {
            type: isNumber ? NodeType.NUMBER : NodeType.SINGLE,
            token,
            children: [],
        }

        if (isNumber) {
            const value = parseFloat(token.value)
            if (!Number.isFinite(value)) {
                throw Errors.LocationError(Errors.ERR_TOKEN_NUMBER_PARSE(token.value), token.location.start)
            }
            node.evaluate = () => value
        }

        result.push(node)
    }

    return result
}