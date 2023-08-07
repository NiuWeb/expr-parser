import { useApp } from "../../app/context"

export function Vectors() {
  const { parser } = useApp()

  return <div className="vectors">
    {parser.getVectors().map(([index, vector], i) => (
      <div key={i} className="result">
        <div className="index">
          {index}
        </div>
        <div className="vector">
          [{vector.map((value, i) => (
            <>
              <span key={i} className="item">{value}</span>
              {i < vector.length - 1 && (
                <span className="separator">,</span>
              )}
            </>
          ))}]
        </div>
      </div>
    ))}
  </div>
}