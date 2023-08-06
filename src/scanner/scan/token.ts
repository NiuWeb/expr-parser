import { Token, TokenExpr } from "../token"
import { StringLines } from "@src/globals/StringLines"
/**
 * Scans all the instances of a token in an input string
 * @param token The token to scan
 * @param input The input string to scan in
 * @returns array with two items:
 *  - The found tokens in an array
 *  - the input string with the found tokens removed
 */
export function scanToken([type, expr]: TokenExpr, input: string): [Token[], string] {
    const matches = StringLines.matchAll(input, expr)
    const tokens = matches.map(({ match, location }) => {
        const token: Token = {
            type,
            location,
            value: match[0]
        }

        // remove the found token from the input string
        if (typeof match.index === "number") {
            input =
                input.slice(0, match.index) +
                " ".repeat(match[0].length) +
                input.slice(match.index + match[0].length)
        }

        return token
    })
    return [tokens, input]
}