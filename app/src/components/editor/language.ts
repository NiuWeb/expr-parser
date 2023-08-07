import * as monaco from "monaco-editor"
import { functions as getFunctions } from "../../parser/functions"
import { ParserContext } from "../../parser/context"

const functions = Object.keys(getFunctions(new ParserContext()))

monaco.languages.register({ id: "expr-parser" })
monaco.languages.setMonarchTokensProvider("expr-parser", {
    functions,
    ignoreCase: true,
    tokenizer: {
        root: [
            [/[0-9]+(\.[0-9]+)?e(\+|-)?[0-9]+(\.[0-9]+)?/, "number"],
            [/\d+(\.\d+)?/, "number"],
            [/[a-z_](?:[a-z0-9_]*(?:\.[a-z0-9_]+)?)*/, {
                cases: {
                    "@functions": "keyword",
                }
            }],
        ]
    }

})