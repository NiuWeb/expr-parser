import type { FnMap } from "@bygdle/expr-parser"
import type { ParserContext } from "../context"
export const fnGeneral = (context: ParserContext): FnMap => ({
    print: {
        arguments: 1,
        evaluate: ([value], loc) => {
            context.log(loc, `${value}`)
            return value
        }
    },
    random: {
        arguments: 0,
        evaluate: () => {
            return Math.random()
        }
    },
    randint: {
        arguments: 2,
        evaluate: ([min, max]) => {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
    },
    randrange: {
        arguments: 2,
        evaluate: ([min, max]) => {
            return Math.random() * (max - min) + min
        }
    }
})