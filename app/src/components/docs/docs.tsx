import { useMemo } from "react"
import { useApp } from "../../app/context"

export function Docs() {
  const { parser } = useApp()
  const functions = useMemo(() => parser.getFunctions(), [parser])

  return <div className="docs divide-y divide-gray-200">
    <div className="p-1 bg-gray-300">
      Functions
    </div>
    <div className="max-h-[50vh] overflow-auto">
      {functions.map(([name, t], i) => (
        <div key={i} className="function p-1 odd:bg-black/5">
          <div className="name inline-block text-yellow-700 mr-1">
            {name}
          </div>
          <div className="args inline-block text-red-800">
            ({t.arguments?.join(", ")})
          </div>
        </div>
      ))}
    </div>
  </div>
}