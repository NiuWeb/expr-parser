import { FnMapDoc } from "./type"
export const fnTime = (): FnMapDoc => ({
    time: {
        arguments: 0,
        argNames: [],
        evaluate: () => {
            return Date.now()
        }
    },
    year: {
        arguments: [0, 1],
        argNames: ["[time]"],
        evaluate: ([time]) => {
            if(time === undefined) {
                return new Date().getFullYear()
            }
            return new Date(time).getFullYear()
        }
    },
    month: {
        arguments: [0, 1],
        argNames: ["[time]"],
        evaluate: ([time]) => {
            if(time === undefined) {
                return new Date().getMonth()
            }
            return new Date(time).getMonth()
        }
    },
    day: {
        arguments: [0, 1],
        argNames: ["[time]"],
        evaluate: ([time]) => {
            if (time === undefined) {
                return new Date().getDate()
            }
            return new Date(time).getDate()
        }
    }
})