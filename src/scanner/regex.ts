import { OperatorsRegex } from "./operator/regex"
import { TokenExpr, TokenType } from "./token"

/** List of regular expressions to scan a token */
export const TokenRegex: readonly TokenExpr[] = [

    // Exponential numbers are in the form `AeB` where A and B
    // are decimal numbers. The `e` can be upper or lower case.
    // For example, `1.23e+4`, `0.3e5`, `1.23e-4` are all valid
    // exponential numbers.
    // Numbers in exponential format must be scanned before
    // words, so the "e" in the exponent is not mistaken for
    // the start of a word.
    // Example: `1.23e+4` is a number, but `e+4` is not.
    [TokenType.NUMBER_EXP, /[0-9]+(?:\.[0-9]+)?e(?:\+|-)?[0-9]+(?:\.[0-9]+)?/ig],

    // Words can contain letters, numbers and underscores,
    // start only with a letter or an underscore,
    // and can be separated by dots. For example, `a.b_` is
    // a valid word, but `a.1` or `.a_` are not.
    // Words must be scanned before decimal numbers, so the
    // numeric part of a word is not mistaken for a number.
    // Example: `a1` is only one word token, not a word `a`
    // followed by a number `1`.
    [TokenType.WORD, /[a-z_](?:[a-z0-9_]*(?:\.[a-z0-9_]+)?)*/ig],

    // Standard decimal numbers
    [TokenType.NUMBER, /[0-9]+(?:\.[0-9]+)?/ig],

    // Scan parentheses
    [TokenType.PARANTHESIS_OPEN, /\(/ig],
    [TokenType.PARANTHESIS_CLOSE, /\)/ig],

    // Scan commas
    [TokenType.COMMA, /,/ig],

    // Scan operators.
    // All registered operators must be included in this
    // regular expression.
    [TokenType.OPERATOR, OperatorsRegex],
]