import { Location, Parser } from "@bygdle/expr-parser"
import { fnVectors } from "./functions/vectors"
import { fnGeneral } from "./functions/general"
import { fnMath } from "./functions/math"

type Log = [Location, string]
type Result = [Location, number]

export class ParserContext {
    public readonly parser: Parser
    private vectors = new Map<number, number[]>()
    private lastId = 0
    public logs: Log[] = []
    public results: Result[] = []
    constructor() {
        this.parser = new Parser({
            variables: {
                pi: Math.PI,
                e: Math.E,
            },
            functions: {
                ...fnMath(),
                ...fnGeneral(this),
                ...fnVectors(this)
            }
        })
    }

    public getVectors() {
        return Array.from(this.vectors.entries())
    }

    public newVector(values: number[]) {
        this.vectors.set(++this.lastId, values)
        return this.lastId
    }
    public getVector(id: number, [line, col]: [number, number]) {
        const value = this.vectors.get(id)
        if (value === undefined) {
            throw new Error(`Vector ${id} not found at ${line}:${col}`)
        }
        return value
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