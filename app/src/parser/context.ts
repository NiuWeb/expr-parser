import { Location, Parser } from "@bygdle/expr-parser"

type Log = [Location, string]
type Result = [Location, number]

const defaultCode = `(1 + sqrt(5))/2,

1 + 1 = 2,

1/SQRT(2) - SQRT(2)/2`

export class ParserContext {
    public readonly parser: Parser
    public logs: Log[] = []
    public results: Result[] = []
    public error?: string
    public value = defaultCode
    constructor() {
        const options = Parser.Contexts("date", "logic", "math")
        options.ignoreCase = true
        options.functions = {
            ...options.functions,
            print: {
                name: "print",
                evaluate: ({ values, location }) => {
                    this.log(location, values.map(v => v.toString()).join(", "))
                    return 0
                }
            }
        }
        this.parser = new Parser(options)
    }

    public getFunctions() {
        return Object.entries(this.parser.context.functions || {})
    }

    public log(loc: Location, message: string) {
        this.logs.push([loc, message])
    }

    public clear() {
        this.logs = []
        this.results = []
        this.error = undefined
    }

    public run(expr: string) {
        const parsed = this.parser.parse(expr)
        for (let i = 0; i < parsed.length; i++) {
            const loc = parsed.location(i)
            const value = parsed.evaluate(i)
            this.results.push([loc, value])
        }
    }
}