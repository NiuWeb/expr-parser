import type { ParserContext } from "../context"
import { FnMapDoc } from "./type"
export const fnVectors = (context: ParserContext): FnMapDoc => ({
    vector: {
        argNames: ["...values"],
        evaluate: (values) => {
            return context.newVector(values)
        },
    },
    "vector.scalar": {
        arguments: 2,
        argNames: ["scalar", "vector"],
        evaluate: ([scalar, vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            vector.forEach((value, i) => vector[i] = value * scalar)

            return vectorId
        }
    },
    "vector.add": {
        arguments: 2,
        argNames: ["vector1", "vector2"],
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
    "vector.magnitude": {
        arguments: 1,
        argNames: ["vector"],
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            return Math.sqrt(vector.reduce((acc, value) => acc + value * value, 0))
        }
    },
    "vector.dot": {
        arguments: 2,
        argNames: ["vector1", "vector2"],
        evaluate: ([vectorId1, vectorId2], loc) => {
            const vector1 = context.getVector(vectorId1, loc)
            const vector2 = context.getVector(vectorId2, loc)
            if (vector1.length !== vector2.length) {
                throw new Error(`Cannot dot vectors of different length at ${loc[0]}:${loc[1]}`)
            }
            return vector1.reduce((acc, value, i) => acc + value * vector2[i], 0)
        }
    },
    "vector.print": {
        arguments: 1,
        argNames: ["vector"],
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            context.log(loc, `[${vector.join(", ")}]`)
            return vectorId
        }
    },
    "vector.clear": {
        arguments: 1,
        argNames: ["vector"],
        evaluate: ([vectorId]) => {
            context.deleteVector(vectorId)
            return vectorId
        }
    },
    "vector.join": {
        arguments: [1, Infinity],
        argNames: ["vector0", "...", "vectorN"],
        evaluate: (indexes, loc) => {
            const newVec: number[] = []
            for (const index of indexes) {
                const vector = context.getVector(index, loc)
                newVec.push(...vector)
            }
            return context.newVector(newVec)
        }
    },
    "vector.sum": {
        arguments: 1,
        argNames: ["vector"],
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            return vector.reduce((acc, value) => acc + value, 0)
        }
    },
    "vector.product": {
        arguments: 1,
        argNames: ["vector"],
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            return vector.reduce((acc, value) => acc * value, 1)
        }
    },
    "vector.min": {
        arguments: 1,
        argNames: ["vector"],
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            return Math.min(...vector)
        }
    },
    "vector.max": {
        arguments: 1,
        argNames: ["vector"],
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            return Math.max(...vector)
        }
    },
    "vector.len": {
        arguments: 1,
        argNames: ["vector"],
        evaluate: ([vectorId], loc) => {
            const vector = context.getVector(vectorId, loc)
            return vector.length
        }
    },
    "vector.set": {
        arguments: 2,
        argNames: ["newId", "vector"],
        evaluate: ([vectorId1, vectorId2], loc) => {
            const vector = context.getVector(vectorId2, loc)
            context.setVector(vectorId1, vector)
            return vectorId1
        }
    },
    "vector.create": {
        arguments: 2,
        argNames: ["value", "size"],
        evaluate: ([value, size]) => {
            const vector = new Array<number>(size).fill(value)
            return context.newVector(vector)
        }
    }
})