import type { FnMap } from "@bygdle/expr-parser"
export const fnMath = (): FnMap => ({
    sqrt: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.sqrt(value)
        }
    },
    ln: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.log(value)
        }
    },
    log: {
        arguments: 2,
        evaluate: ([base, value]) => {
            return Math.log(value) / Math.log(base)
        }
    },
    log10: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.log10(value)
        }
    },
    log2: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.log2(value)
        }
    },
    exp: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.exp(value)
        }
    },
    abs: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.abs(value)
        }
    },
    floor: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.floor(value)
        }
    },
    ceil: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.ceil(value)
        }
    },
    round: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.round(value)
        }
    },
    sin: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.sin(value)
        }
    },
    cos: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.cos(value)
        }
    },
    tan: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.tan(value)
        }
    },
    asin: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.asin(value)
        }
    },
    acos: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.acos(value)
        }
    },
    atan: {
        arguments: 1,
        evaluate: ([value]) => {
            return Math.atan(value)
        }
    },
    atan2: {
        arguments: 2,
        evaluate: ([y, x]) => {
            return Math.atan2(y, x)
        }
    },
})