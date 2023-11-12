import { Location, LocationRange } from "./location"

/**
 * Holds an input string separated by lines,
 * and allows to find the line and column of a given index,
 * or vice versa. Line and column count starts at 1.
 */
export class StringLines {
    private input: string
    private ranges: Location[] = []

    constructor(input: string) {
        this.input = input
        this.parse()
    }

    /**
     * Gets the location (line and column) of a given index in the input string.
     * @param index The index to find the line and column of
     */
    public getLocation(index: number): Location {
        let line = 1
        while (line < this.ranges.length && index > this.ranges[line - 1][1]) {
            line++
        }
        const column = index - this.ranges[line - 1][0] + 1
        return [line, column]
    }

    /**
     * Gets the index of a given location (line and column) in the input string.
     */
    public getIndex([line, col]: Location): number {
        if (line < 1) {
            throw new RangeError(`Line number must be greater than 0, got ${line}`)
        }
        if (col < 1) {
            throw new RangeError(`Column number must be greater than 0, got ${col}`)
        }
        if (line > this.ranges.length) {
            throw new RangeError(`Line number must be equal or less than ${this.ranges.length}, got ${line}`)
        }

        line-- // Line count starts at 1, but array index starts at 0
        col--  // Column count starts at 1, but array index starts at 0
        const index = this.ranges[line][0] + col
        if (index > this.ranges[line][1]) {
            throw new RangeError(`Column number must be less than ${this.ranges[line][1]}, got ${col}`)
        }
        return index
    }

    /**
     * Gets the index range (start, end) of a given line in the input string.
     */
    public getLineRange(line: number): Location {
        if (line < 1) {
            throw new RangeError(`Line number must be greater than 0, got ${line}`)
        }
        if (line > this.ranges.length) {
            throw new RangeError(`Line number must be less than ${this.ranges.length}, got ${line}`)
        }
        return this.ranges[line - 1]
    }

    /**
     * Gets the number of lines in the input string.
     */
    public get lines() {
        return this.ranges.length
    }

    /**
     * Changes the input string and parses it.
     */
    public update(input: string) {
        this.input = input
        this.parse()
    }
    /**
     * Parses the line ranges of the input string.
     */
    private parse() {
        this.ranges = []
        const lines = this.input.split(/(\r?\n)/)
        let start = 0

        for (let i = 0; i < lines.length; i++) {
            if (i % 2 === 1 || start >= this.input.length) {
                continue
            }

            let end = start + lines[i].length - 1
            if (i < lines.length - 1) {
                end += lines[i + 1].length
            }
            this.ranges.push([start, end])
            start = end + 1
        }
    }


    /**
     * Finds all the matches of a regular expression in a string,
     * and returns an array of the matches with their location
     * as index and line/column.
     */
    public static matchAll(input: string, regex: RegExp) {
        const matches: { match: RegExpMatchArray, location: LocationRange }[] = []
        const lines = new StringLines(input)
        for (const match of input.matchAll(regex)) {
            const startIndex = match.index
            if (typeof startIndex !== "number") {
                continue
            }
            const endIndex = startIndex + match[0].length - 1

            const start = lines.getLocation(startIndex)
            const end = lines.getLocation(endIndex)

            matches.push({ match, location: { start, end } })
        }
        return matches
    }

    /**
     * Sorts a list of values by their location in the input string.
     */
    public static sortByLocation<T>(values: T[], getLocation: (value: T) => Location) {
        return values.sort((a, b) => {
            const aStart = getLocation(a)
            const bStart = getLocation(b)
            if (aStart[0] < bStart[0]) {
                return -1
            }
            if (aStart[0] > bStart[0]) {
                return 1
            }
            if (aStart[1] < bStart[1]) {
                return -1
            }
            if (aStart[1] > bStart[1]) {
                return 1
            }
            return 0
        })
    }
}