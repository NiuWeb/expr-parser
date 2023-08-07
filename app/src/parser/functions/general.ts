import type { ParserContext } from "../context"
import { FnMapDoc } from "./type"
export const fnGeneral = (context: ParserContext): FnMapDoc => ({
    print: {
        arguments: 1,
        argNames: ["value"],
        evaluate: ([value], loc) => {
            context.log(loc, `${value}`)
            return value
        }
    },
    random: {
        arguments: 0,
        argNames: [],
        evaluate: () => {
            return Math.random()
        }
    },
    randint: {
        arguments: 2,
        argNames: ["min", "max"],
        evaluate: ([min, max]) => {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
    },
    randrange: {
        arguments: 2,
        argNames: ["min", "max"],
        evaluate: ([min, max]) => {
            return Math.random() * (max - min) + min
        }
    }
})