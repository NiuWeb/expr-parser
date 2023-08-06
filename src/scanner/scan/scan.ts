import { TokenRegex } from "../regex"
import { scanToken } from "./token"
import { Token } from "../token"
import { StringLines } from "@src/globals/StringLines"

/**
 * Scans all the tokens in the input string
 */
export function scanTokens(input: string): Token[] {
    const result: Token[] = []

    for (const token of TokenRegex) { // scan all token types
        const [tokens, _input] = scanToken(token, input)
        input = _input
        for (const t of tokens) { // insert all found tokens
            result.push(t)
        }
    }

    StringLines.sortByLocation(result, token => token.location.start)

    return result
}