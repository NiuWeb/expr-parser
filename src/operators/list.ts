import { Operator } from "./operator"

/**
 * List of all operators with their symbols and precedence
 */
export const Operators: readonly Operator[][] = [
    [
        {
            symbol: "!",
            left: false,
            right: true,
            evaluate: ([, a]) => !a ? 1 : 0,
        },
    ],
    [
        {
            symbol: "^",
            left: true,
            right: true,
            evaluate: ([a, b]) => Math.pow(a, b),
        },
    ],
    [
        {
            symbol: "*",
            left: true,
            right: true,
            evaluate: ([a, b]) => a * b,
        },
        {
            symbol: "/",
            left: true,
            right: true,
            evaluate: ([a, b]) => a / b,
        },
        {
            symbol: "%",
            left: true,
            right: true,
            evaluate: ([a, b]) => a % b,
        }
    ],
    [
        {
            symbol: "+",
            left: true,
            addLeft: true,
            right: true,
            addRight: true,
            evaluate: ([a, b]) => a + b,
        },
        {
            symbol: "-",
            left: true,
            addLeft: true,
            right: true,
            addRight: true,
            evaluate: ([a, b]) => a - b,
        },
    ],
    [
        {
            symbol: "<",
            left: true,
            right: true,
            evaluate: ([a, b]) => a < b ? 1 : 0,
        },
        {
            symbol: ">",
            left: true,
            right: true,
            evaluate: ([a, b]) => a > b ? 1 : 0,
        },
        {
            symbol: "<=",
            left: true,
            right: true,
            evaluate: ([a, b]) => a <= b ? 1 : 0,
        },
        {
            symbol: ">=",
            left: true,
            right: true,
            evaluate: ([a, b]) => a >= b ? 1 : 0,
        },
        {
            symbol: "=",
            left: true,
            right: true,
            evaluate: ([a, b]) => a === b ? 1 : 0,
        },
    ],
    [
        {
            symbol: "&&",
            left: true,
            right: true,
            evaluate: ([a, b]) => a && b ? 1 : 0,
        },
        {
            symbol: "||",
            left: true,
            right: true,
            evaluate: ([a, b]) => a || b ? 1 : 0,
        },
    ]

]


/**
 * Map containing all operators by their symbol
 */
export const OperatorsMap = (() => {
    const map = new Map<string, Operator>()
    for (const operators of Operators) {
        for (const op of operators) {
            map.set(op.symbol, op)
        }
    }
    return map
})()