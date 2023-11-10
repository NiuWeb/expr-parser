import { useMemo } from "react"
import { useApp } from "../../app/context"
import { FnArgument } from "@bygdle/expr-parser/lib/functions/functions"

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
            (
          </div>
          {t.arguments?.map((arg, i) => (
            <>
              <Arg key={i} arg={arg} />
              {t.arguments && i < t.arguments.length - 1 && ", "}
            </>
          ))}
          <div className="args inline-block text-red-800">
            )
          </div>
        </div>
      ))}
    </div>
  </div>
}

function Arg({ arg }: { arg: FnArgument | "..." }) {
  if (arg === "...") {
    return <span className="text-gray-600">...</span>
  }

  return <span className="text-blue-600">{arg.name}</span>
}