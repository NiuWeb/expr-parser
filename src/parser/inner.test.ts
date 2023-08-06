import { scan } from "@src/scanner"
import { clearList } from "./inner"
import { wrapTokens } from "./wrap"


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