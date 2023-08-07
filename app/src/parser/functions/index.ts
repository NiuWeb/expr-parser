import type { ParserContext } from "../context"
import { fnGeneral } from "./general"
import { fnMath } from "./math"
import { fnTime } from "./time"
import { FnMapDoc } from "./type"
import { fnVectors } from "./vectors"

export const functions = (context: ParserContext): FnMapDoc => ({
    ...fnTime(),
    ...fnMath(),
    ...fnGeneral(context),
    ...fnVectors(context)
})