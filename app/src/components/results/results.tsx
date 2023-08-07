import { useApp } from "../../app/context"

export function Results() {
  const { parser } = useApp()

  return <div className="results divide-y divide-gray-200">
    <div className="p-1 bg-gray-300">
      Results
    </div>
    {parser.results.map(([[line, col], value], i) => (
      <div key={i} className="result p-1 odd:bg-black/5">
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