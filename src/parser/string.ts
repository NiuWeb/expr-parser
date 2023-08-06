import { Node, NodeType } from "./node"

/**
 * Creates a string representation of a tree of nodes.
 */
export function stringFromNodes(nodes: Node[]): string {
    let result = ""
    nodes.forEach((node, i) => (
        result += nodeString(node, 0, i) + "\n"
    ))
    return result
}


function nodeString(node: Node, level: number, index: number): string {
    const location = node.token.location

    const prefix = `[${index}]`
    const blank = " ".repeat(prefix.length)

    let result = `${prefix} Node ${NodeType[node.type]} `
    result += `(${locationString(location.start)} - ${locationString(location.end)}):\n`
    result += `${blank} Token: ${node.token.value}\n`
    if (node.evaluate) {
        result += `${blank} Evaluated value: ${node.evaluate()}\n`
    } else {
        result += `${blank} No evaluated value\n`
    }
    result += `${blank} Children: ${node.children.length}\n`
    node.children.forEach((child, i) => (
        result += nodeString(child, level + 1, i) + "\n"
    ))

    let lines = result.split("\n")
    lines = lines.map(line => "  ".repeat(level) + line)
    result = lines.join("\n")

    return result
}

function locationString(location: [number, number]): string {
    return `${location[0]}:${location[1]}`
}