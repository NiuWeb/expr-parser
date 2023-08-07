import { useApp } from "../../app/context"

export function Vectors() {
  const { parser } = useApp()

  return <div className="vectors divide-y divide-gray-200">
    <div className="p-1 bg-gray-300">
      Vectors
    </div>
    <table className="w-full">
      <thead>
        <tr className="bg-gray-200">
          <th>#</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {parser.getVectors().map(([index, vector], i) => (
          <tr key={i}>
            <td className="px-1 align-top">{index}</td>
            <td>
              <Vector vector={vector} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

function Vector({ vector }: { vector: number[] }) {
  return <div className="vector">
    {vector.map((value, i) => (
      <div key={i} className="value inline-block mr-1 mb-1 p-0.5 bg-yellow-200">
        {value}
      </div>
    ))}
  </div>
}