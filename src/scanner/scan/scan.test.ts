import { scanTokens } from "./scan"

test("all tokens scanned", () => {

    const tokens = scanTokens(`
        (1 + sqrt(5))/2 = 1.618033988749895 &&
        power(2, 3) > 5 || 1 < 2
    `)
    console.log(tokens)

    const symbols = tokens.map(({ value }) => value)
    expect(symbols).toEqual([
        "(", "1", "+", "sqrt", "(", "5", ")", ")", "/", "2", "=", "1.618033988749895", "&&",
        "power", "(", "2", ",", "3", ")", ">", "5", "||", "1", "<", "2"
    ])
})