import { ERR_FUNCTION_ARGUMENT_COUNT, ERR_FUNCTION_INVALID_OPTIONAL } from "@src/globals/errors/messages"
import { Fn } from "./functions"

/**
 * Checks if the number of arguments passed to the function is valid.
 * Throws an error with the appropriate message if not.
 * @param fn The function data to check in
 * @param argcount The number of arguments passed to the function
 */
export function validateArgcount(fn: Fn, argcount: number) {
    if (!fn.arguments) {
        return
    }
    let min = 0
    let max = 0
    for (let i = 0; i < fn.arguments.length; i++) {
        const arg = fn.arguments[i]
        if (arg === "...") {
            if (i !== fn.arguments.length - 1) {
                throw new Error(ERR_FUNCTION_INVALID_OPTIONAL(fn.name)) // optional argument must be the last one
            }
            max = Infinity
        } else {
            min++
            max++
        }
    }
    if (argcount < min || argcount > max) {
        throw new Error(ERR_FUNCTION_ARGUMENT_COUNT(fn.name, `${min}:${max}`, argcount))
    }
}