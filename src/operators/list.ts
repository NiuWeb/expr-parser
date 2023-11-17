import { Operator } from "./operator"
import { Errors } from "@src/globals/errors"

/**
 * List of all operators with their symbols and precedence
 */
export const Operators: readonly Operator[][] = [
    [
        {
            name: "!",
            left: false,
            right: true,
            evaluate: ({ values: [a] }) => !a ? 1 : 0,
        },
    ],
    [
        {
            name: "^",
            left: true,
            right: true,
            evaluate: ({ values: [a, b], location }) => {
                const value = Math.pow(a, b)
                if (!Number.isFinite(value)) {
                    throw Errors.LocationError(Errors.ERR_MATH, location)
                }
                return value
            },
        },
    ],
    [
        {
            name: "*",
            left: true,
            right: true,
            evaluate: ({ values: [a, b] }) => a * b,
        },
        {
            name: "/",
            left: true,
            right: true,
            evaluate: ({ values: [a, b], location }) => {
                if (b === 0) {
                    throw Errors.LocationError(Errors.ERR_DIVISION_BY_ZERO, location)
                }
                return a / b
            },
        },
        {
            name: "%",
            left: true,
            right: true,
            evaluate: ({ values: [a, b], location }) => {
                if (b === 0) {
                    throw Errors.LocationError(Errors.ERR_DIVISION_BY_ZERO, location)
                }
                return a % b
            },
        }
    ],
    [
        {
            name: "+",
            left: true,
            addLeft: true,
            right: true,
            addRight: true,
            evaluate: ({ values: [a, b] }) => a + b,
        },
        {
            name: "-",
            left: true,
            addLeft: true,
            right: true,
            addRight: true,
            evaluate: ({ values: [a, b] }) => a - b,
        },
    ],
    [
        {
            name: "<=",
            left: true,
            right: true,
            evaluate: ({ values: [a, b] }) => a <= b ? 1 : 0,
        },
        {
            name: ">=",
            left: true,
            right: true,
            evaluate: ({ values: [a, b] }) => a >= b ? 1 : 0,
        },
        {
            name: "<",
            left: true,
            right: true,
            evaluate: ({ values: [a, b] }) => a < b ? 1 : 0,
        },
        {
            name: ">",
            left: true,
            right: true,
            evaluate: ({ values: [a, b] }) => a > b ? 1 : 0,
        },
        {
            name: "=",
            left: true,
            right: true,
            evaluate: ({ values: [a, b] }) => a === b ? 1 : 0,
        },
    ],
    [
        {
            name: "&&",
            left: true,
            right: true,
            evaluate: ({ values: [a, b] }) => a && b ? 1 : 0,
        },
        {
            name: "||",
            left: true,
            right: true,
            evaluate: ({ values: [a, b] }) => a || b ? 1 : 0,
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
            map.set(op.name, op)
        }
    }
    return map
})()