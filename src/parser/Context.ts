import { Location } from "@src/globals/location"

/**
 * A function that can be called in the expression.
 */
export interface Fn {
    /**
     * Argument count definition. If a number is provided,
     * then the function will only accept that number of
     * arguments. If an array is provided, then the function
     * will accept a minimum and maximum number of arguments.
     */
    arguments?: number | [min: number, max: number]
    evaluate(values: number[], location: Location): number
}

/**
 * A map of functions for the expression.
 */
export type FnMap = { [name: string]: Fn }

/**
 * A map of variables
 */
export type VarMap = { [name: string]: number }

export interface ContextOptions {
    functions?: FnMap
    variables?: VarMap
}
/**
 * A context stores the functions and variables of the
 * expression parser.
 */
export class Context {
    public functions: FnMap
    public variables: VarMap
    constructor(props: ContextOptions) {
        this.functions = props.functions || {}
        this.variables = props.variables || {}
    }
}