import { TokenType } from "../token"
import { scanToken } from "./token"

test("Scanning for a single token", () => {
    const [tokens] = scanToken([TokenType.WORD, /(e|r)l/ig], "hello-world")
    const symbols = tokens.map(({ value }) => value)
    expect(symbols).toEqual(["el", "rl"])
})