import { Operators } from "./list"
import { getOperatorsRegex } from "./operator"

/**
 * A regex to scan all operators
 */
export const OperatorsRegex = getOperatorsRegex(Operators.flat())