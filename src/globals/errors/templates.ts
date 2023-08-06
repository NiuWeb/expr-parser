import { Location } from "../location"

/**
 * An error refering to a location in the input string
 */
export function LocationError(msg: string, loc: Location) {
    return new Error(`${msg} at position ${loc[0]}:${loc[1]}`)
}