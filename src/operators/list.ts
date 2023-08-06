import { Operator } from "./operator"

/**
 * List of all operators with their symbols and precedence
 */
export const Operators: readonly Operator[][] = [
    [
        { symbol: "!" },
    ],
    [
        { symbol: "^" },
    ],
    [
        { symbol: "*" },
        { symbol: "/" },
        { symbol: "%" }
    ],
    [
        { symbol: "+" },
        { symbol: "-" },
    ],
    [
        { symbol: "<" },
        { symbol: ">" },
        { symbol: "<=" },
        { symbol: ">=" },
        { symbol: "=" },
    ],
    [
        { symbol: "&&" },
        { symbol: "||" },
    ]

]