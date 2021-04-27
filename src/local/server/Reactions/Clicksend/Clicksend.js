const debugLog = require('../../Debug/debugLog')
const parseArguments = require('../../ParseArea/AddData')


function Send_Sms(area) {
    debugLog.debugLog(area.areaName, "Call Action Service : Clicksend")

    var api = require('./api.js');
    var smsMessage = new api.SmsMessage();
    var args = parseArguments.AddData(area.areaInstruction, area.areaData, area.areaName)

    // console.log(args)

    smsMessage.from = "Area";
    smsMessage.to = "+" + args["to"];
    smsMessage.body = args["msg"];
    
    var smsApi = new api.SMSApi("antonin.alves-cardoso@epitech.eu", "0E794DDC-B3AA-E7DF-00B1-E0996A9F857E");
    
    var smsCollection = new api.SmsMessageCollection();
    
    smsCollection.messages = [smsMessage];
    
    // smsApi.smsSendPost(smsCollection).then(function(response) {
    //     console.log(response.body);
    // }).catch(function(err){
    //     console.error(err.body);
    // });
}



exports.ClicksendAPI = function (area) {
    debugLog.debugLog(area.areaName, "Call Action Service : Clicksend")

    console.log("")

    switch (area.widgetReaction) {
        case "Send_SMS":
            Send_Sms(area)
            return true;

        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Clicksend widget '" + area.widgetReaction + "'")
    }
}