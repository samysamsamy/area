
const debugLog = require('../Debug/debugLog')

exports.parseAreaArguments = function (argument, areaName) {

    debugLog.debugLog(areaName, "Parsing arguments")
    debugLog.debugLog(areaName, "got :")
    var area_arguments = {};

    if (argument.includes('#')) {
        var tmp = argument.split("#");
    } else {
        var tmp = [argument]
    }

    tmp.forEach( function(elem) {
        var key = elem.split("=")[0];
        var value = elem.split("=")[1];
        area_arguments[key] = value;
        debugLog.debugLog(areaName, "\t[" + key + "] = " + area_arguments[key])
    })
    debugLog.debugLog(areaName, "")

    return area_arguments;
}