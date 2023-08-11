import { Parser } from "@src/parser"

test("get a symbolic expression as argument without evaluating it", () => {
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
