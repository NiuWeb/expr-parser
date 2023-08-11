import { Parser } from "@src/parser"

test("default contexts", () => {
    const parser = new Parser({
        ...Parser.Contexts("math", "date", "logic"),
        ignoreCase: true
    })

    const expr = parser.parse(`
        IF(
            YEAR(YEARS(NOW(), -1)) < YEAR(NOW()),
            1000,
            2000
        )
    `)

    expect(expr.evaluate(0)).toBe(1000)
})