import { ContextOptions } from "@src/parser/Context"

export const ctxLogic: ContextOptions = {
    variables: {
        true: 1,
        false: 0
    },
    functions: {
        if: {
            name: "if",
            description: "Conditional statement. Returns 'valueIfTrue' if 'condition' is true, otherwise returns 'valueIfFalse'.",
            arguments: [
                {
                    name: "condition",
                    description: "The condition to evaluate"
                },
                {
                    name: "valueIfTrue",
                    description: "The value to return if 'condition' is true"
                },
                {
                    name: "valueIfFalse",
                    description: "The value to return if 'condition' is false"
                }
            ],
            evaluate({ values: [condition, valueIfTrue, valueIfFalse] }) {
                return condition > 0 ? valueIfTrue : valueIfFalse
            }
        },
        and: {
            name: "and",
            description: "Logical AND operation between multiple values",
            arguments: ["..."],
            evaluate({ values }) {
                return values.every(value => value > 0) ? 1 : 0
            }
        },
        or: {
            name: "or",
            description: "Logical OR operation between multiple values",
            arguments: ["..."],
            evaluate({ values }) {
                return values.some(value => value > 0) ? 1 : 0
            }
        },
        xor: {
            name: "xor",
            description: "Logical XOR operation between multiple values",
            arguments: ["..."],
            evaluate({ values }) {
                return values.filter(value => value > 0).length % 2 ? 1 : 0
            }
        },
        not: {
            name: "not",
            description: "Logical NOT operation. Returns 1 if 'value' is false, otherwise returns 0.",
            arguments: [
                {
                    name: "value",
                    description: "The value to negate"
                }
            ],
            evaluate({ values: [value] }) {
                return value > 0 ? 0 : 1
            }
        }
    }
}