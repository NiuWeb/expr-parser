import { Fn } from "@bygdle/expr-parser"
export type FnMapDoc = {
    [key: string]: Fn & { argNames: string[] }
}