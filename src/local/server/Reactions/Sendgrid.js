const Parse = require('../ParseArea/ParseArea')
const sgMail = require('@sendgrid/mail')

function sendMail(to, info, subject)  {
    sgMail.setApiKey("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");
    const msg = {
        to: to,
        from: 'sboulinoir@hotmail.fr',
        subject: subject,
        text: info,
    };

    sgMail.send(msg).then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        });
}

function MailSend(area) {
    console.log("Call  | Widget : Mail_Send")
    var args = Parse.parseAreaArguments(area.areaInstruction, area.areaName);

     sendMail(args["dest"], args["message"], args["subject"])
}

exports.SendGridAPI = function(area) {
    console.log("Call  | Service : SendGrid")

    switch (area.widgetReaction) {
        case "Mail_Send":
            MailSend(area);
            return true;
        default:
            console.log("ERROR : Area can't find SendGrid API widget '", area.widgetReaction, "'");
    }
}