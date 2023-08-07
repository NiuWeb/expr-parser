import type { FnMap } from "@bygdle/expr-parser"
import type { ParserContext } from "../context"
export const fnVectors = (context: ParserContext): FnMap => ({
    vector: {
        evaluate: (values) => {
            return context.newVector(values)
        },
    },
    scalar: {
        arguments: 2,
        evaluate: ([scalar, vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            vector.forEach((value, i) => vector[i] = value * scalar)

            return vectorId
        }
    },
    add: {
        arguments: 2,
        evaluate: ([vectorId1, vectorId2], loc) => {
            const vector1 = context.getVector(vectorId1, loc)
            const vector2 = context.getVector(vectorId2, loc)
            if (vector1.length !== vector2.length) {
                throw new Error(`Cannot add vectors of different length at ${loc[0]}:${loc[1]}`)
            }
            vector2.forEach((value, i) => vector1[i] += value)
            return vectorId1
        }
    },
    magnitude: {
        arguments: 1,
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            return Math.sqrt(vector.reduce((acc, value) => acc + value * value, 0))
        }
    },
    dot: {
        arguments: 2,
        evaluate: ([vectorId1, vectorId2], loc) => {
            const vector1 = context.getVector(vectorId1, loc)
            const vector2 = context.getVector(vectorId2, loc)
            if (vector1.length !== vector2.length) {
                throw new Error(`Cannot dot vectors of different length at ${loc[0]}:${loc[1]}`)
            }
            return vector1.reduce((acc, value, i) => acc + value * vector2[i], 0)
        }
    },
    printvector: {
        arguments: 1,
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            context.log(loc, `[${vector.join(", ")}]`)
            return vectorId
        }
    },
    clearvector: {
        arguments: 1,
        evaluate: ([vectorId]) => {
            context.deleteVector(vectorId)
            return vectorId
        }
    },
})