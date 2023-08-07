import "./language"
import { useApp } from "../../app/context"
import { MonacoEditor } from "./monaco"

export function Editor() {
  const { parser, update } = useApp()

  function run() {
    parser.clear()
    try {
      parser.run(parser.value)
    } catch (e) {
      parser.error = String(e).valueOf()
    }

    update()
  }

  return <div className="editor flex flex-col">
    <div className="w-full h-[320px]">
      <MonacoEditor
        theme="vs"
        path="editor/expr-parser"
        language="expr-parser"
        value={parser.value}
        onChange={v => parser.value = v} />
    </div>
    <button
      className=" bg-green-500 hover:bg-green-600 active:bg-green-700"
      onClick={run}>
      Run
    </button>
  </div>
}