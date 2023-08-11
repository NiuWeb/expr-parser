import { Parser } from "@src/parser"

test("set a variable using a symbolic expression", () => {
    const parser = new Parser({
        functions: {
            SET: {
                name: "SET",
                arguments: [
                    {
                        name: "variable",
                        description: "The variable to set",
                        expression: true
                    },
                    {
                        name: "value",
                        description: "The value to set the variable to"
                    }
                ],
                evaluate({ values: [, value], expressions }) {
                    const variable = expressions[0].token.value
                    parser.setVar(variable, value)
                    console.log("set", variable, value)
                    return value
                }
            }
        }
    })
    const expr = parser.parse(`
        SET(myCustomVariable, 33.33),
        myCustomVariable + 10
    `)

    expect(expr.evaluate(0)).toBeCloseTo(33.33)
    expect(expr.evaluate(1)).toBeCloseTo(43.33)
    expect(parser.getVar("myCustomVariable")).toBeCloseTo(33.33)

})


test("use a symbolic expression to map a list", () => {

    const list = [7, 8, 9]
    const parser = new Parser({
        functions: {
            MAP: {
                name: "MAP",
                arguments: [
                    {
                        name: "expression",
                        description: "The variable to set",
                        expression: true
                    }
                ],
                evaluate({ expressions: [expr] }) {
                    list.forEach((value, i) => {
                        parser.setVar("Value", value)
                        parser.setVar("Index", i)
                        list[i] = expr.evaluate!()
                    })
                    return 0
                }
            }
        }
    })
    const expr = parser.parse(`
        MAP((Index + 1)*10 + Value)
    `)

    expect(expr.evaluate(0)).toBe(0)
    expect(list).toEqual([17, 28, 39])

})