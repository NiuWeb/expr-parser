import { Parser } from "@src/parser"

test("arithmetic operation", () => {
    const parser = new Parser()
    parser.setVar("x", 5)
    const expr = parser.parse("(1 + 5^0.5)/2")

    expect(expr.evaluate(0)).toBe((1 + 5 ** 0.5) / 2)
})


test("logical operation", () => {
    const parser = new Parser()
    parser.setVar("x", 5)
    const expr = parser.parse("x > 0 && x < 10 && x >= 5 && x <= 5")

    expect(expr.evaluate(0)).toBe(1)
})