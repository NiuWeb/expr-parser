import { scan } from "@src/scanner"
import { clearList, groupOperators } from "./inner"
import { wrapTokens } from "./wrap"
import { stringFromNodes } from "./string"


describe("invalid commas are not allowed", () => {
    test("1, , 2", () => {
        expect(() => {
            const tokens = scan("1, , 2")
            const nodes = wrapTokens(tokens)
            clearList(nodes)
        }).toThrow()
    })
    test("1 2", () => {
        expect(() => {
            const tokens = scan("1 2")
            const nodes = wrapTokens(tokens)
            clearList(nodes)
        }).toThrow()
    })
})

test("valid commas are allowed", () => {
    const tokens = scan("1, 2, 3, 0.5")
    const nodes = wrapTokens(tokens)
    clearList(nodes)

    expect(nodes.length).toBe(4)
})

describe("+ and - can be unary", () => { 
    test("1 + -2", () => {
        const tokens = scan("1 + -2")
        const nodes = wrapTokens(tokens)
        groupOperators(nodes)

        const root = nodes[0]
        expect(root.evaluate!()).toBe(-1)
    })
    test("-1", () => { 
        const tokens = scan("-1")
        const nodes = wrapTokens(tokens)
        groupOperators(nodes)

        const root = nodes[0]
        expect(root.evaluate!()).toBe(-1)
    })
})

test("Group nodes by operators", () => {
    const nodes = wrapTokens(scan("1+2*3-4/5^6 - 1 + 1"))
    groupOperators(nodes)

    const root = nodes[0]
    expect(root.evaluate!()).toBeCloseTo(1 + 2 * 3 - 4 / 5 ** 6 - 1 + 1)

    console.log(stringFromNodes(nodes))
})