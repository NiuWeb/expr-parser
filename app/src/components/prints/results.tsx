import { useApp } from "../../app/context"

export function Logs() {
  const { parser } = useApp()

  return <div className="logs">
    {parser.logs.map(([[line, col], value], i) => (
      <div key={i} className="log">
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