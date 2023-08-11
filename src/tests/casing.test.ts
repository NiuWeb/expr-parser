import { Parser } from "@src/parser"

test("case-sensitive", () => {
    const parser = new Parser({
        functions: {
            Fun1: {
                name: "Fun1",
                evaluate() {
                    return 5
                }
            }
        },
        variables: {
            Equis: 10
        }
    })

    expect(() => parser.parse("fun1()")).toThrow()
    expect(() => parser.parse("FUN1()")).toThrow()
    expect(() => parser.parse("Fun1()")).not.toThrow()
    expect(() => parser.parse("equis").evaluate(0)).toThrow()
    expect(() => parser.parse("Equis").evaluate(0)).not.toThrow()
})

test("case-insensitive", () => {
    const parser = new Parser({
        ignoreCase: true,
        functions: {
            Fun1: {
                name: "Fun1",
                evaluate() {
                    return 5
                }
            }
        },
        variables: {
            Equis: 10
        }
    })

    expect(() => parser.parse("fun1()")).not.toThrow()
    expect(() => parser.parse("FUN1()")).not.toThrow()
    expect(() => parser.parse("Fun1()")).not.toThrow()
    expect(() => parser.parse("equis").evaluate(0)).not.toThrow()
    expect(() => parser.parse("Equis").evaluate(0)).not.toThrow()
})
