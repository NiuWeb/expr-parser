import { useApp } from "../../app/context"

export function Logs() {
  const { parser } = useApp()

  return <div className="prints divide-y divide-gray-200">
    <div className="p-1 bg-gray-300">
      Prints
    </div>
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