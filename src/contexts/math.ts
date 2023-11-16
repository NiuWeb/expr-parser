import { ContextOptions } from "@src/parser/Context"

export const ctxMath: ContextOptions = {
    variables: {
        PI: Math.PI,
        E: Math.E
    },
    functions: {
        abs: {
            name: "abs",
            description: "Calculate the absolute value of a number.",
            arguments: [
                {
                    name: "value",
                    description: "The value to get the absolute value of"
                }
            ],
            evaluate({ values: [value] }) {
                return Math.abs(value)
            }
        },
        sqrt: {
            name: "sqrt",
            description: "Calculate the square root of a number.",
            arguments: [
                {
                    name: "value",
                    description: "The value to calculate the square root of"
                }
            ],
            evaluate({ values: [value] }) {
                return Math.sqrt(value)
            }
        },
        pow: {
            name: "pow",
            description: "Calculate the power of a number raised to an exponent.",
            arguments: [
                {
                    name: "base",
                    description: "The base value"
                },
                {
                    name: "exponent",
                    description: "The exponent value"
                }
            ],
            evaluate({ values: [base, exponent] }) {
                return Math.pow(base, exponent)
            }
        },
        floor: {
            name: "floor",
            description: "Round a number down to the nearest integer.",
            arguments: [
                {
                    name: "value",
                    description: "The value to round down"
                }
            ],
            evaluate({ values: [value] }) {
                return Math.floor(value)
            }
        },
        ceil: {
            name: "ceil",
            description: "Round a number up to the nearest integer.",
            arguments: [
                {
                    name: "value",
                    description: "The value to round up"
                }
            ],
            evaluate({ values: [value] }) {
                return Math.ceil(value)
            }
        },
        sin: {
            name: "sin",
            description: "Calculate the sine of an angle in radians.",
            arguments: [
                {
                    name: "angle",
                    description: "The angle in radians"
                }
            ],
            evaluate({ values: [angle] }) {
                return Math.sin(angle)
            }
        },
        cos: {
            name: "cos",
            description: "Calculate the cosine of an angle in radians.",
            arguments: [
                {
                    name: "angle",
                    description: "The angle in radians"
                }
            ],
            evaluate({ values: [angle] }) {
                return Math.cos(angle)
            }
        },
        tan: {
            name: "tan",
            description: "Calculate the tangent of an angle in radians.",
            arguments: [
                {
                    name: "angle",
                    description: "The angle in radians"
                }
            ],
            evaluate({ values: [angle] }) {
                return Math.tan(angle)
            }
        },
        log: {
            name: "log",
            description: "Calculate the logarithm of a number with a specified base.",
            arguments: [
                {
                    name: "value",
                    description: "The value to take the logarithm of"
                },
                {
                    name: "base",
                    description: "The base of the logarithm (optional, default: e)"
                }
            ],
            evaluate({ values: [value, base = Math.E] }) {
                return Math.log(value) / Math.log(base)
            }
        },
        min: {
            name: "min",
            description: "Find the minimum value from a list of numbers.",
            arguments: [
                "..."
            ],
            evaluate({ values }) {
                return Math.min(...values)
            }
        },
        max: {
            name: "max",
            description: "Find the maximum value from a list of numbers.",
            arguments: [
                "..."
            ],
            evaluate({ values }) {
                return Math.max(...values)
            }
        },
        clamp: {
            name: "clamp",
            description: "Clamp a number within a specified range.",
            arguments: [
                {
                    name: "value",
                    description: "The value to clamp"
                },
                {
                    name: "minValue",
                    description: "The minimum value"
                },
                {
                    name: "maxValue",
                    description: "The maximum value"
                }
            ],
            evaluate({ values: [value, minValue, maxValue] }) {
                return Math.min(Math.max(value, minValue), maxValue)
            }
        },
        exp: {
            name: "exp",
            description: "Calculate the exponential value of a number.",
            arguments: [
                {
                    name: "value",
                    description: "The exponent value"
                }
            ],
            evaluate({ values: [value] }) {
                return Math.exp(value)
            }
        }
    }
}