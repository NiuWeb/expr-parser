import { Fn } from "@src/functions/functions"

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