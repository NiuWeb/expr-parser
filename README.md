# Expr parser
Parses and evaluates mathematical expressions with custom functions and variables.

https://github.com/NiuWeb/expr-parser

## Installation
```bash
npm install @bygdle/expr-parser
```

## Usage example
```ts
import { Parser } from "@bygdle/expr-parser"
const parser = new Parser({
  functions: {
    log: { // a custom function log
      arguments: 1,
      evaluate: ([arg]) => {
        return Math.log(arg)
      }
    }
  },
  variables: {
    pi: Math.PI
  }
})

const expr = parser.parse("log(pi) + 1")
console.log(expr.evaluate())

parset.setVar("pi", 3)
console.log(expr.evaluate())
```