import { LocationRange } from "@src/globals/location"

/** Scanner token types */
export enum TokenType {
    WORD,
    NUMBER,     // number in decimal format (e.g. 123 or 1.23)
    NUMBER_EXP, // number in scientific notation (e.g. 1.23e+4)
    OPERATOR,
    COMMA,
    PARANTHESIS_OPEN,
    PARANTHESIS_CLOSE,
}
/** A token to be scanned with a regular expression */
export type TokenExpr = readonly [token: TokenType, expr: RegExp]

/** An scanned token */
export interface Token {
    type: TokenType
    value: string
    location: LocationRange
}