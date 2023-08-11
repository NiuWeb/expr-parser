import { Location } from "@src/globals/location"
import { Node } from "@src/parser/node"

/**
 * An argument for a function.
 */
export interface FnArgument { 
    /** argument name */
    name: string
    /** argument description */
    description: string
    /** 
     * whether to evaluate the expression value
     * and pass it to the function (false),
     * or pass the expression without evaluating it (true).
     * Default is false.
     */
    expression?: boolean
}
/**
 * Object passed to the function
 */
export interface FnInput { 
    values: number[]
    expressions: Node[]
    location: Location
}
/**
 * A function that can be called in the expression.
 */
export interface Fn {
    name: string
    description?: string
    /**
     * Arguments definition for the function.
     */
    arguments?: (FnArgument | "...")[]
    evaluate(input: FnInput): number
}