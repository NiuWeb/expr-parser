import { useApp } from "../../app/context"

export function Logs() {
  const { parser } = useApp()

  return <div className="prints divide-y divide-gray-200">
    <div className="p-1 bg-gray-300">
      Prints
    </div>
    {parser.error ? (
      <div className="error bg-red-400">
        {parser.error}
      </div>
    ) : <Log />}
  </div>
}

function Log() {
  const { parser } = useApp()

  return <div className="logs">
    {parser.logs.map(([[line, col], value], i) => (
      <div key={i} className="log p-1 odd:bg-black/5">
        <div className="location inline-block text-yellow-700 mr-1">
          [{line}:{col}]
        </div>
        <div className="value inline-block">
          {value}
        </div>
      </div>
    ))}
  </div>
}