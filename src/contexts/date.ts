import { ContextOptions } from "@src/parser/Context"

export const ctxDate: ContextOptions = {
    functions: {
        now: {
            name: "now",
            description: "Get the current timestamp.",
            arguments: [],
            evaluate() {
                return Date.now()
            }
        },
        year: {
            name: "year",
            description: "Get the year from a given timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                }
            ],
            evaluate({ values: [timestamp] }) {
                const date = new Date(timestamp)
                return date.getFullYear()
            }
        },
        month: {
            name: "month",
            description: "Get the month (0-11) from a given timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                }
            ],
            evaluate({ values: [timestamp] }) {
                const date = new Date(timestamp)
                return date.getMonth()
            }
        },
        day: {
            name: "day",
            description: "Get the day of the week (0-6) from a given timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                }
            ],
            evaluate({ values: [timestamp] }) {
                const date = new Date(timestamp)
                return date.getDay()
            }
        },

        years: {
            name: "years",
            description: "Add a specified number of years to a timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                },
                {
                    name: "numYears",
                    description: "The number of years to add"
                }
            ],
            evaluate({ values: [timestamp, numYears] }) {
                const date = new Date(timestamp)
                date.setFullYear(date.getFullYear() + numYears)
                return date.getTime()
            }
        },

        months: {
            name: "months",
            description: "Add a specified number of months to a timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                },
                {
                    name: "numMonths",
                    description: "The number of months to add"
                }
            ],
            evaluate({ values: [timestamp, numMonths] }) {
                const date = new Date(timestamp)
                date.setMonth(date.getMonth() + numMonths)
                return date.getTime()
            }
        },
        days: {
            name: "days",
            description: "Add a specified number of days to a timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                },
                {
                    name: "numDays",
                    description: "The number of days to add"
                }
            ],
            evaluate({ values: [timestamp, numDays] }) {
                const date = new Date(timestamp)
                date.setDate(date.getDate() + numDays)
                return date.getTime()
            }
        },
        hours: {
            name: "hours",
            description: "Add hours to a timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                },
                {
                    name: "numHours",
                    description: "The number of hours to add"
                }
            ],
            evaluate({ values: [timestamp, numHours] }) {
                const date = new Date(timestamp)
                date.setTime(date.getTime() + numHours * 60 * 60 * 1000)
                return date.getTime()
            }
        },
        minutes: {
            name: "minutes",
            description: "Add minutes to a timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                },
                {
                    name: "numMinutes",
                    description: "The number of minutes to add"
                }
            ],
            evaluate({ values: [timestamp, numMinutes] }) {
                const date = new Date(timestamp)
                date.setTime(date.getTime() + numMinutes * 60 * 1000)
                return date.getTime()
            }
        },
        seconds: {
            name: "seconds",
            description: "Add seconds to a timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                },
                {
                    name: "numSeconds",
                    description: "The number of seconds to add"
                }
            ],
            evaluate({ values: [timestamp, numSeconds] }) {
                const date = new Date(timestamp)
                date.setTime(date.getTime() + numSeconds * 1000)
                return date.getTime()
            }
        },
        milliseconds: {
            name: "milliseconds",
            description: "Add milliseconds to a timestamp.",
            arguments: [
                {
                    name: "timestamp",
                    description: "The timestamp"
                },
                {
                    name: "numMilliseconds",
                    description: "The number of milliseconds to add"
                }
            ],
            evaluate({ values: [timestamp, numMilliseconds] }) {
                const date = new Date(timestamp)
                date.setTime(date.getTime() + numMilliseconds)
                return date.getTime()
            }
        },
        date: {
            name: "date",
            description: "Create a timestamp from date values",
            arguments: [
                {
                    name: "year",
                    description: "The year"
                },
                {
                    name: "month",
                    description: "The month (0-11)"
                },
                {
                    name: "day",
                    description: "The day of the month"
                }
            ],
            evaluate({ values: [year, month, day] }) {
                return new Date(year, month, day).getTime()
            }
        },
        datetime: {
            name: "datetime",
            description: "Create a timestamp from date and time values",
            arguments: [
                {
                    name: "year",
                    description: "The year"
                },
                {
                    name: "month",
                    description: "The month (0-11)"
                },
                {
                    name: "day",
                    description: "The day of the month"
                },
                {
                    name: "hour",
                    description: "The hour"
                },
                {
                    name: "minute",
                    description: "The minute"
                },
                {
                    name: "second",
                    description: "The second"
                }
            ],
            evaluate({ values: [year, month, day, hour, minute, second] }) {
                return new Date(year, month, day, hour, minute, second).getTime()
            }
        }
    }
}