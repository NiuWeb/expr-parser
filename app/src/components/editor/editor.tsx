import { useState } from "react"
import { useApp } from "../../app/context"

export function Editor() {
  const [value, setValue] = useState("")
  const { parser, update } = useApp()

  function run() {
    parser.clear()
    parser.run(value)
    update()
  }

  return <div className="editor flex flex-col">
    <textarea
      className="w-full min-h-[320px]"
      value={value}
      onChange={ev => setValue(ev.target.value)} />
    <button
      className=" bg-green-500 hover:bg-green-600 active:bg-green-700"
      onClick={run}>
      Run
    </button>
  </div>
}