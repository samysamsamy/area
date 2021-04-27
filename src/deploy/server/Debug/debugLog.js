exports.debugLog = function (areaName, msg) {
    Reset = "\x1b[0m"
    FgRed = "\x1b[31m"
    FgCyan = "\x1b[36m"
    FgGreen = "\x1b[32m"
    FgMagenta ='\033[35m',
    color1 = Reset
    color2 = Reset

    if (areaName == "DATABASE") {
        color1 = FgCyan
        color2 = FgCyan
    }
    if (areaName == "CLIENT") {
        color1 = FgMagenta
        color2 = FgMagenta
    }
    if (msg.startsWith('Error')) {
        color2 = FgRed
    }
    if (msg.includes("Paused")) {
        msg = msg.replace("Paused", FgRed + "Paused")
    }
    if (msg.includes("Ongoing")) {
        msg = msg.replace("Ongoing", FgGreen + "Ongoing")
    }
    if (msg.startsWith('/Success/')) {
        msg = msg.replace("/Success/", FgGreen)
    }

    if (areaName.length < 7) {
        console.log(color1, areaName + color2, "\t\t\t| " + msg)
    } else if (areaName.length < 15) {
        console.log(color1, areaName + color2, "\t\t| " + msg)
    } else {
        console.log(color1, areaName + color2, "\t| " + msg)
    }
}