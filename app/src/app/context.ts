import { createContext, useContext, useReducer } from "react"
import { ParserContext } from "../parser/context"

export interface AppContext {
    parser: ParserContext
    update(): void
}
export const AppContext = createContext<AppContext>(null as never)

export function useAppProvider(app: ParserContext): AppContext {
    const [, update] = useReducer((x) => (x + 1) % 6, 0)
    return { parser: app, update }
}
export function useApp() {
    return useContext(AppContext)
}