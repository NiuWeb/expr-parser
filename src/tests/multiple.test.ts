import { Parser } from "@src/parser"

test("multiple expressions in the root", () => {
    const parser = new Parser()
    parser.setVar("x", 5)
    const expr = parser.parse("1, 1+1, 1+2")

    expect(expr.evaluate(0)).toBe(1)
    expect(expr.evaluate(1)).toBe(2)
    expect(expr.evaluate(2)).toBe(3)
})

test("multiple expressions inside a parentheses", () => {
    const parser = new Parser()
    parser.setVar("x", 5)
    const expr = parser.parse("(1, 1+1, 1+2)")

    expect(expr.node(0).children[0].evaluate!()).toBe(1)
    expect(expr.node(0).children[1].evaluate!()).toBe(2)
    expect(expr.node(0).children[2].evaluate!()).toBe(3)
})

test("multiple expressions inside a parentheses, without commas", () => {
    const parser = new Parser()
    parser.setVar("x", 5)
    expect(() => parser.parse("(1 1+1 1+2)")).toThrow()
})
