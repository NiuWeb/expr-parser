import type { FnMap } from "@bygdle/expr-parser"
export const fnTime = (): FnMap => ({
    time: {
        arguments: 0,
        evaluate: () => {
            return Date.now()
        }
    },
    year: {
        arguments: [0 ,1],
        evaluate: ([time]) => {
            if(time === undefined) {
                return new Date().getFullYear()
            }
            return new Date(time).getFullYear()
        }
    },
    month: {
        arguments: [0, 1],
        evaluate: ([time]) => {
            if(time === undefined) {
                return new Date().getMonth()
            }
            return new Date(time).getMonth()
        }
    },
    day: {
        arguments: [0, 1],
        evaluate: ([time]) => {
            if (time === undefined) {
                return new Date().getDate()
            }
            return new Date(time).getDate()
        }
    }
})