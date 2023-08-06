import { scan } from "@src/scanner"
import { groupNodes } from "./group"
import { wrapTokens } from "./wrap"
import { stringFromNodes } from "./string"

test("group nodes by parentheses", () => {
    const tokens = scan("1 + sqrt(2 + 3/log(1-5)) + 1 + (3) + log(6)")
    const nodes = groupNodes(wrapTokens(tokens))

    console.log(stringFromNodes(nodes))
})