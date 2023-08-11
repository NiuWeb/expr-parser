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
        ),
        SWITCH(30,
            10,
            100,
            20,
            200,
            30,
            300    
        ),
        SWITCH(35,
            10,
            100,
            20,
            200,
            30,
            300,
            -1   
        ),
        SWITCH(TRUE,
            1 + 1 = 3,
            100,
            2/2 = 1,
            200,
            3/3 > 1,
            300,
            -1
        )
    `)

    expect(expr.evaluate(0)).toBe(1000)
    expect(expr.evaluate(1)).toBe(300)
    expect(expr.evaluate(2)).toBe(-1)
    expect(expr.evaluate(3)).toBe(200)
})