
const debugLog = require('../Debug/debugLog')
const parseArguments = require('./ParseArea')

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

exports.AddData = function (argument, data, areaName) {


    var args = parseArguments.parseAreaArguments(argument, areaName)
    
    if (data) {
        var datas = parseArguments.parseAreaArguments(data, areaName)
        debugLog.debugLog(areaName, "Replacing variable")
        debugLog.debugLog(areaName, "got :")

        Object.keys(datas).forEach(key => {
            Object.values(args).forEach(arg => {
                if (arg.includes("${" + key + "}")) {
                    debugLog.debugLog(areaName, "\t${" + key + "} -> " + datas[key])
                    args[getKeyByValue(args, arg)] = arg.replace("${" + key + "}", unescape(datas[key]))
                }
            });
        });    
    }
    return args
}