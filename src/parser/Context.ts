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
    /**
     * Whether to ignore case when parsing functions and variables.
     * Defaults to `false`.
     */
    ignoreCase?: boolean
    functions?: FnMap
    variables?: VarMap
}
/**
 * A context stores the functions and variables of the
 * expression parser.
 */
export class Context {
    private readonly ignoreCase: boolean
    public functions: FnMap
    public variables: VarMap
    constructor(props: ContextOptions) {
        this.functions = props.functions || {}
        this.variables = props.variables || {}
        this.ignoreCase = props.ignoreCase || false

        if (this.ignoreCase) {
            const functions: FnMap = {}
            for (const name in this.functions) {
                functions[name.toLowerCase()] = this.functions[name]
            }
            this.functions = functions

            const variables: VarMap = {}
            for (const name in this.variables) {
                variables[name.toLowerCase()] = this.variables[name]
            }
            this.variables = variables
        }
    }

    /**
     * Gets a function from the context by name.
     */
    public getFn(name: string): Fn | undefined {
        if (this.ignoreCase) {
            name = name.toLowerCase()
        }
        return this.functions[name]
    }

    /**
     * Gets a variable from the context by name.
     */
    public getVar(name: string): number | undefined {
        if (this.ignoreCase) {
            name = name.toLowerCase()
        }
        return this.variables[name]
    }

    /**
     * Sets a variable in the context.
     */
    public setVar(name: string, value: number) {
        if (this.ignoreCase) {
            name = name.toLowerCase()
        }
        this.variables[name] = value
    }
}