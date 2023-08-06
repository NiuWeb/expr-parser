export interface Operator {
    symbol: string
    left: boolean
    right: boolean
    evaluate(values: number[]): number
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