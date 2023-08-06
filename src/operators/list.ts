import { Operator } from "./operator"
import { Errors } from "@src/globals/errors"

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
            evaluate: ([a, b], loc) => {
                const value = Math.pow(a, b)
                if (!Number.isFinite(value)) {
                    throw Errors.LocationError(Errors.ERR_MATH, loc)
                }
                return value
            },
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
            evaluate: ([a, b], loc) => {
                if (b === 0) {
                    throw Errors.LocationError(Errors.ERR_DIVISION_BY_ZERO, loc)
                }
                return a / b
            },
        },
        {
            symbol: "%",
            left: true,
            right: true,
            evaluate: ([a, b], loc) => {
                if (b === 0) {
                    throw Errors.LocationError(Errors.ERR_DIVISION_BY_ZERO, loc)
                }
                return a % b
            },
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