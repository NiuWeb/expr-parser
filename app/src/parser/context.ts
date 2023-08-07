import { ContextOptions, Location, Parser } from "@bygdle/expr-parser"
import { fnVectors } from "./functions/vectors"
import { fnGeneral } from "./functions/general"
import { fnMath } from "./functions/math"
import { fnTime } from "./functions/time"
import { FnMapDoc } from "./functions/type"

type Log = [Location, string]
type Result = [Location, number]

export class ParserContext {
    private readonly context: ContextOptions & { functions: FnMapDoc }
    public readonly parser: Parser
    private vectors = new Map<number, number[]>()
    private lastId = 0
    public logs: Log[] = []
    public results: Result[] = []
    public error?: string
    constructor() {
        this.context = {
            variables: {
                pi: Math.PI,
                e: Math.E,
            },
            functions: {
                ...fnTime(),
                ...fnMath(),
                ...fnGeneral(this),
                ...fnVectors(this)
            }
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