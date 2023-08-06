import { StringLines } from "./StringLines"

const create = () => new StringLines(
    "the first line\n" +
    "the second line\n"
)

describe("test class StringLines", () => {
    test("get location from index", () => {
        const lines = create()

        let [line, col] = lines.getLocation(0)
        expect(line).toBe(1)
        expect(col).toBe(1);

        [line, col] = lines.getLocation(13)
        expect(line).toBe(1)
        expect(col).toBe(14);

        [line, col] = lines.getLocation(14)
        expect(line).toBe(1)
        expect(col).toBe(15);

        [line, col] = lines.getLocation(15)
        expect(line).toBe(2)
        expect(col).toBe(1);

        [line, col] = lines.getLocation(16)
        expect(line).toBe(2)
        expect(col).toBe(2)
    })

    test("get index from location", () => {
        const lines = create()

        let index = lines.getIndex([1, 1])
        expect(index).toBe(0)

        index = lines.getIndex([1, 14])
        expect(index).toBe(13)

        index = lines.getIndex([1, 15])
        expect(index).toBe(14)

        index = lines.getIndex([2, 1])
        expect(index).toBe(15)

        index = lines.getIndex([2, 2])
        expect(index).toBe(16)
    })

    test("get line range", () => {
        const lines = create()

        let [start, end] = lines.getLineRange(1)
        expect(start).toBe(0)
        expect(end).toBe(14);

        [start, end] = lines.getLineRange(2)
        expect(start).toBe(15)
        expect(end).toBe(30)
    })

    test("get regex matches with line and column range", () => {
        const result = StringLines.matchAll(
            "the first line\n" +           // line 1, col 11
            "the second line\n" +          // line 2, col 12
            "line\n" +                     // line 3, col 1
            "the line is the last line\n", // line 4, col 5; line 4, col 22
            /line/g
        )
        console.log(result.map(({ location }) => location))
        expect(result.length).toBe(5)

        const startGot = result.map(({ location }) => location.start)
        const endGot = result.map(({ location }) => location.end)

        const startWant = [
            [1, 11], [2, 12], [3, 1], [4, 5], [4, 22]
        ]
        const endWant = startWant.map(([line, col]) => [line, col + 3])

        expect(startGot).toEqual(startWant)
        expect(endGot).toEqual(endWant)
    })
})