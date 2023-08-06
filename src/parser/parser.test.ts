import { Parser } from "./Parser"

test("expressions are parsed correctly", () => {
    const parser = new Parser({
        variables: {
            x: 1,
            y: 2
        },
        functions: {
            log: {
                evaluate: ([x]) => 2 * x,
            }
        }
    })

    expect(parser.parse("1 + 2").evaluate(0)).toBe(3)
    expect(parser.parse("1 + 2 * 3").evaluate(0)).toBe(7)
    expect(parser.parse("x + y").evaluate(0)).toBe(3)
    expect(parser.parse("x + y * 3").evaluate(0)).toBe(7)
    expect(parser.parse("x + y * log(x)").evaluate(0)).toBe(5)

})