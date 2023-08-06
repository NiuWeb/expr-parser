/**
 * Location of an element in the text.
 */
export type Location = [number, number]

/**
 * Location range (start and end) of an element in the text.
 */
export interface LocationRange {
    readonly start: Location
    readonly end: Location
}