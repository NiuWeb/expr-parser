import { Fn } from "@src/functions/functions"

export interface Operator extends Fn {
    left: boolean
    /**
     * if true, a "zero" token will be added to the left of the operator
     * if there is no numeric token to the left of the operator.
     */
    addLeft?: boolean
    right: boolean
    /**
     * if true, a "zero" token will be added to the right of the operator
     * if there is no numeric token to the right of the operator.
     */
    addRight?: boolean
}

/**
 * Create a regular expression to scan multiple operators.
 */
export function getOperatorsRegex(operators: readonly Operator[]): RegExp {
    const symbols = operators
        .map(op => op.name.replace(/(.)/g, "\\$1"))
        .join("|")
    return new RegExp(`(?:${symbols})`, "ig")
}