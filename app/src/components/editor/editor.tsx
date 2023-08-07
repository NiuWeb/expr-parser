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

  return <div className="editor">
    <textarea
      value={value}
      onChange={ev => setValue(ev.target.value)} />
    <button onClick={run}>Run</button>
  </div>
}