import { ContextOptions } from "@src/parser/Context"
import { ctxMath } from "./math"
import { ctxDate } from "./date"
import { ctxLogic } from "./logic"

const contexts = wrapContext({
    math: ctxMath,
    date: ctxDate,
    logic: ctxLogic
})
/**
 * Default contexts.
 */
export type Contexts = keyof typeof contexts

/**
 * Joins multiple default contexts into a single context.
 */
export function Contexts(...names: (Contexts | ContextOptions)[]): ContextOptions {
    return mixContexts(names.map(name => (
        typeof name === "string"
            ? contexts[name]
            : name
    )))
}

function wrapContext<Keys extends string>(obj: { [k in Keys]: ContextOptions }) {
    return obj
}

function mixContexts(contexts: ContextOptions[]) {
    const base: ContextOptions = {
        functions: {},
        variables: {}
    }
    return contexts.reduce((prev, curr) => {
        return {
            functions: {
                ...prev.functions,
                ...curr.functions
            },
            variables: {
                ...prev.variables,
                ...curr.variables
            }
        }
    }, base)
}


