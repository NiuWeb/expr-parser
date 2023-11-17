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
                    description: "The value to return if 'condition' is true",
                    expression: true
                },
                {
                    name: "valueIfFalse",
                    description: "The value to return if 'condition' is false",
                    expression: true
                }
            ],
            evaluate({ values: [condition], expressions: [, valueIfTrue, valueIfFalse] }) {
                return condition > 0 ? valueIfTrue.evaluate?.() || 0 : valueIfFalse?.evaluate?.() || 0
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
        },
        switch: {
            name: "switch",
            description: "Switch statement. Returns the value of the first 'case' whose 'condition' is true, otherwise returns 'default'. " +
                "The syntax is `switch(value, case1, result1, case2, result2, ..., [default])`. Note that if there are an even number of " +
                "arguments, the last argument is used as the default value. If no default provided, defaults to 0.",
            arguments: [
                {
                    name: "value",
                    description: "The value to compare against the 'case' values"
                },
                "..."
            ],
            evaluate({ values: [value, ...values] }) {
                const defaultValue = values.length % 2 === 1 ? values.pop()! : 0
                for (let i = 0; i < values.length; i += 2) {
                    if (value === values[i]) {
                        return values[i + 1]
                    }
                }
                return defaultValue
            }
        }
    }
}