import { useApp } from "../../app/context"

export function Results() {
  const { parser } = useApp()

  return <div className="results">
    {parser.results.map(([[line, col], value], i) => (
      <div key={i} className="result">
        <div className="location">
          {line}:{col}
        </div>
        <div className="value">
          {value}
        </div>
      </div>
    ))}
  </div>
}