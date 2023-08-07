import { FnMapDoc } from "./type"
export const fnMath = (): FnMapDoc => ({
    sqrt: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.sqrt(value)
        }
    },
    pow: {
        arguments: 2,
        argNames: ["base", "exponent"],
        evaluate: ([base, exponent]) => {
            return Math.pow(base, exponent)
        }
    },
    ln: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.log(value)
        }
    },
    log: {
        arguments: 2,
        argNames: ["base", "value"],
        evaluate: ([base, value]) => {
            return Math.log(value) / Math.log(base)
        }
    },
    log10: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.log10(value)
        }
    },
    log2: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.log2(value)
        }
    },
    exp: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.exp(value)
        }
    },
    abs: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.abs(value)
        }
    },
    floor: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.floor(value)
        }
    },
    ceil: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.ceil(value)
        }
    },
    round: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.round(value)
        }
    },
    sin: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.sin(value)
        }
    },
    cos: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.cos(value)
        }
    },
    tan: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.tan(value)
        }
    },
    asin: {
        argNames: ["value"],
        arguments: 1,
        evaluate: ([value]) => {
            return Math.asin(value)
        }
    },
    acos: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.acos(value)
        }
    },
    atan: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value]) => {
            return Math.atan(value)
        }
    },
    atan2: {
        arguments: 2,
        argNames: ["y", "x"],
        evaluate: ([y, x]) => {
            return Math.atan2(y, x)
        }
    },
    min: {
        arguments: [1, Infinity],
        argNames: ["x0", "...", "xN"],
        evaluate: (values) => {
            return Math.min(...values)
        }
    },
    max: {
        arguments: [1, Infinity],
        argNames: ["x0", "...", "xN"],
        evaluate: (values) => {
            return Math.max(...values)
        }
    },
    sum: {
        arguments: [1, Infinity],
        argNames: ["x0", "...", "xN"],
        evaluate: (values) => {
            return values.reduce((acc, value) => acc + value, 0)
        }
    },
    product: {
        arguments: [1, Infinity],
        argNames: ["x0", "...", "xN"],
        evaluate: (values) => {
            return values.reduce((acc, value) => acc * value, 1)
        }
    }
})