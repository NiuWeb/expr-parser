import { AppContext, useAppProvider } from "./context"
import { ParserContext } from "../parser/context"
import { Editor } from "../components/editor/editor"
import { Results } from "../components/results/results"
import { Vectors } from "../components/vectors/vectors"
import { Logs } from "../components/prints/results"

const parserContext = new ParserContext()

export function App() {
  const context = useAppProvider(parserContext)

  return <AppContext.Provider value={context}>
    <Editor />
    <Results />
    <Vectors />
    <Logs />
  </AppContext.Provider>
}