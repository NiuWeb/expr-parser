import { ContextOptions, Location, Parser } from "@bygdle/expr-parser"
import { FnMapDoc } from "./functions/type"
import { functions } from "./functions"

type Log = [Location, string]
type Result = [Location, number]

const defaultCode = `(1 + sqrt(5))/2,

1 + 1 = 2,

1/SQRT(2) - SQRT(2)/2,

VECTOR.DOT(
  VECTOR(1, 2, 3),
  VECTOR.JOIN(
    VECTOR(3),
    VECTOR.SCALAR(0.5, VECTOR(1, 2))
  )
)`

export class ParserContext {
    private readonly context: ContextOptions & { functions: FnMapDoc }
    public readonly parser: Parser
    private vectors = new Map<number, number[]>()
    private lastId = 0
    public logs: Log[] = []
    public results: Result[] = []
    public error?: string
    public value = defaultCode
    constructor() {
        this.context = {
            variables: {
                pi: Math.PI,
                e: Math.E,
            },
            functions: functions(this),
        }
        this.parser = new Parser(this.context)
    }

    public getVectors() {
        return Array.from(this.vectors.entries())
    }

    public newVector(values: number[]) {
        this.vectors.set(++this.lastId, values)
        return this.lastId
    }
    public setVector(id: number, values: number[]) {
        this.vectors.set(id, values)
    }
    public getVector(id: number, [line, col]: [number, number]) {
        const value = this.vectors.get(id)
        if (value === undefined) {
            throw new Error(`Vector ${id} not found at ${line}:${col}`)
        }
        return value
    }

    public getFunctions() {
        return Object.entries(this.context.functions || {})
    }

    public deleteVector(id: number) {
        this.vectors.delete(id)
    }

    public log(loc: Location, message: string) {
        this.logs.push([loc, message])
    }

    public clear() {
        this.logs = []
        this.results = []
        this.vectors.clear()
        this.lastId = 0
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