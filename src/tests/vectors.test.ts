import { LocationError } from "@src/globals/errors/templates"
import { Parser } from "@src/parser"

test("vector operations with functions", () => {
    const vectors = new Map<number, number[]>()
    let vectId = 0
    const parser = new Parser({
        variables: {
            pi: Math.PI,
        },
        functions: {
            VECTOR: {
                name: "VECTOR",
                evaluate({ values }) {
                    const id = vectId++
                    vectors.set(id, values)
                    return id
                }
            },
            SCALAR: {
                name: "SCALAR",
                arguments: [
                    {
                        name: "scalar",
                        description: "The scalar to multiply the vector with"
                    },
                    {
                        name: "vector",
                        description: "The vector to multiply"
                    }
                ],
                evaluate({ values: [r, V], location }) {
                    const vec = vectors.get(V)!
                    if (!vec) {
                        throw LocationError("Vector not found", location)
                    }
                    vec.forEach((v, i) => vec[i] = v * r)
                    return V
                }
            },
            DOT: {
                name: "DOT",
                arguments: [
                    {
                        name: "vectorA",
                        description: "The first vector"
                    },
                    {
                        name: "vectorB",
                        description: "The second vector"
                    }
                ],
                evaluate({ values: [a, b], location }) {
                    const vecA = vectors.get(a)!
                    const vecB = vectors.get(b)!

                    if (!vecA || !vecB) {
                        throw LocationError("Vector not found", location)
                    }

                    if (vecA.length !== vecB.length) {
                        throw LocationError("Vector length mismatch", location)
                    }

                    let sum = 0
                    for (let i = 0; i < vecA.length; i++) {
                        sum += vecA[i] * vecB[i]
                    }

                    return sum
                }
            },
            LOOKTO: {
                name: "LOOKTO",
                arguments: [
                    {
                        name: "distance",
                        description: "The distance to look to"
                    },
                    {
                        name: "direction",
                        description: "The direction to look to, in radians"
                    }
                ],
                evaluate({ values: [dist, dir] }) {
                    const id = vectId++
                    const x = Math.cos(dir) * dist
                    const y = Math.sin(dir) * dist
                    vectors.set(id, [x, y])
                    return id
                }
            },
            DEGTORAD: {
                name: "DEGTORAD",
                arguments: [
                    {
                        name: "deg",
                        description: "The degrees to convert to radians"
                    }
                ],
                evaluate({ values: [deg] }) {
                    return deg * Math.PI / 180
                }
            }
        }
    })

    const expr = parser.parse(`
        DOT(
            SCALAR(2, VECTOR(1, 2, 3)),
            SCALAR(1.5, VECTOR(2, 4, 6))
        ),
        LOOKTO(5, DEGTORAD(45))
    `)
    const got = expr.evaluate(0)
    const want = 2 * 1 * 1.5 * 2 + 2 * 2 * 1.5 * 4 + 2 * 3 * 1.5 * 6

    expect(got).toBe(want)

    const vecId = expr.evaluate(1)
    const vec = vectors.get(vecId)!
    expect(vec[0]).toBeCloseTo(5 * Math.cos(Math.PI / 4))
    expect(vec[1]).toBeCloseTo(5 * Math.sin(Math.PI / 4))
})