import { getOperatorsRegex } from "./operator"
import { OperatorsRegex } from "./regex"

describe("Convert operators to regular expression", () => {
    test("Empty operators", () => {
        expect(getOperatorsRegex([])).toEqual(/(?:)/ig)
    })

    test("Single-symbol operators", () => {
        const expr = getOperatorsRegex([
            {
                name: "+",
                left: true,
                right: true,
                evaluate: ({ values: [a, b] }) => a + b,
            },
            {
                name: "-",
                left: true,
                right: true,
                evaluate: ({ values: [a, b] }) => a - b,
            },
            {
                name: "*",
                left: true,
                right: true,
                evaluate: ({ values: [a, b] }) => a * b,
            },
            {
                name: "/",
                left: true,
                right: true,
                evaluate: ({ values: [a, b] }) => a / b,
            },
        ])
        expect("+-*/".match(expr)).toEqual(["+", "-", "*", "/"])
    })

    test("Multi-symbol operators", () => {
        const expr = getOperatorsRegex([
            {
                name: "&&",
                left: true,
                right: true,
                evaluate: ({ values: [a, b] }) => a && b,
            },
            {
                name: "||",
                left: true,
                right: true,
                evaluate: ({ values: [a, b] }) => a || b,
            },
        ])
        expect("&&||&|".match(expr)).toEqual(["&&", "||"])
    })
})

describe("Scan all operators with the same regex", () => {
    const expr = OperatorsRegex
    test("All operators are scanned", () => {
        expect("+||-*/^%<>&&=!&|".match(expr)).toEqual([
            "+", "||", "-", "*", "/", "^", "%", "<", ">", "&&", "=", "!"
        ])
    })
})