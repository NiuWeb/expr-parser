import { scan } from "@src/scanner"
import { wrapTokens } from "./wrap"
import { NodeType } from "./node"

test("tokens are wrapped", () => {
    const tokens = scan("1 + sqrt(0.35)")
    const nodes = wrapTokens(tokens)

    expect(nodes[0].type).toBe(NodeType.NUMBER)
    expect(nodes[0].evaluate?.()).toBe(1)

    expect(nodes[1].type).toBe(NodeType.SINGLE)
    expect(nodes[2].type).toBe(NodeType.SINGLE)
    expect(nodes[3].type).toBe(NodeType.SINGLE)

    expect(nodes[4].type).toBe(NodeType.NUMBER)
    expect(nodes[4].evaluate?.()).toBe(0.35)
})