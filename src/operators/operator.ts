import { Location } from "@src/globals/location"

export interface Operator {
    symbol: string
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
    evaluate(values: number[], location: Location): number
}

/**
 * Create a regular expression to scan multiple operators.
 */
export function getOperatorsRegex(operators: readonly Operator[]): RegExp {
    const symbols = operators
        .map(op => op.symbol.replace(/(.)/g, "\\$1"))
        .join("|")
    return new RegExp(`(?:${symbols})`, "ig")
}