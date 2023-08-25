import { AppContext, useAppProvider } from "./context"
import { ParserContext } from "../parser/context"
import { Editor } from "../components/editor/editor"
import { Results } from "../components/results/results"
import { Logs } from "../components/prints/results"
import { Docs } from "../components/docs/docs"

const parserContext = new ParserContext()

export function App() {
  const context = useAppProvider(parserContext)

  return <AppContext.Provider value={context}>
    <div id="app" className="grid grid-cols-4 divide-x divide-y divide-gray-300">
      <div className="col-span-2">
        <Editor />
      </div>
      <Results />
      <Logs />
      <div className="col-span-2">
        <Docs />
      </div>
    </div>
  </AppContext.Provider>
}