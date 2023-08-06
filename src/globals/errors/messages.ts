export const ERR_TOKEN_NUMBER_PARSE = (value: string) => "invalid number: " + value
export const ERR_OPERATOR_UNEXPECTED_LEFT = (value: string) => "unexpected value at the left of operator: " + value
export const ERR_OPERATOR_UNEXPECTED_RIGHT = (value: string) => "unexpected value at the right of operator: " + value
export const ERR_FUNCTION_UNKNOWN = (value: string) => "unknown function: " + value
export const ERR_FUNCTION_ARGUMENT_COUNT = (fn: string, expected: number | string, actual: number) => `function ${fn} expected ${expected} arguments, got ${actual}`
export const ERR_VARIABLE_UNKNOWN = (value: string) => "unknown variable: " + value
export const ERR_FUNCTION_CONTEXT = "cannot parse a function without context"
export const ERR_VARIABLE_CONTEXT = "cannot parse a variable without context"
export const ERR_LIST_COMMA = "unexpected comma"
export const ERR_FUNCTION_ARGUMENT = "invalid function argument"
export const ERR_PARENTHESES_CLOSE = "unexpected closing parenthesis"
export const ERR_PARENTHESES_OPEN = "unclosed opening parenthesis"
export const ERR_EXPR_NODE_NOT_FOUND = "expression node not found"
export const ERR_EXPR_NODE_NO_VALUE = "expression node did not return a value"