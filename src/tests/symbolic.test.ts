import { Parser } from "@src/parser"
import { Node } from "@src/parser/node"

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
                        description: "The mapping expression",
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


test("use a symbolic expression to create a function", () => {
    const functions = new Map<string, {
        args: string[],
        expr: Node
    }>()
    const parser = new Parser({
        functions: {
            FUNC: {
                name: "FUNC",
                arguments: [
                    {
                        name: "name",
                        description: "The function name",
                        expression: true
                    },
                    {
                        name: "expression",
                        description: "The function expression",
                        expression: true
                    }
                ],
                evaluate({ expressions: [nameExpr, fnExpr] }) {
                    const name = nameExpr.token.value

                    const args = fnExpr.children[0].children.map(arg => arg.token.value)
                    const expr = fnExpr.children[1]

                    functions.set(name, { args, expr })

                    return 0
                }
            },
            CALL: {
                name: "CALL",
                arguments: [
                    {
                        name: "name",
                        description: "The function name",
                        expression: true
                    },
                    "..."
                ],
                evaluate({ values: [, ...args], expressions: [nameExpr] }) {
                    const name = nameExpr.token.value
                    const fn = functions.get(name)
                    if (!fn) {
                        throw new Error(`Function ${name} not found`)
                    }
                    const { args: fnArgs, expr } = fn
                    if (args.length !== fnArgs.length) {
                        throw new Error(`Function ${name} expects ${fnArgs.length} arguments, got ${args.length}`)
                    }
                    args.forEach((arg, i) => {
                        parser.setVar(fnArgs[i], arg)
                    })
                    return expr.evaluate!()
                }
            }
        }
    })
    const expr = parser.parse(`
        FUNC(myCustomFunction, (
            (x, y), x*y + 1
        )),
        CALL(myCustomFunction, 2, 3)
    `)

    expr.evaluate(0)
    expect(expr.evaluate(1)).toBe(2 * 3 + 1)
})