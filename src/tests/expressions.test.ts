import { Parser } from "@src/parser"

test("arithmetic operation", () => {
    const parser = new Parser()
    parser.setVar("x", 5)
    const expr = parser.parse("(1 + 5^0.5)/2")

    expect(expr.evaluate(0)).toBe(1.618033988749895)
})