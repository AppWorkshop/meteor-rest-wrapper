var url = "https://smsowl.in/api/v1/sms";

function sendPromotionalSms(senderId,to,message,smsType){

    if(!Meteor.settings.smsOwl){
        throw new Meteor.Error("Account id and api key not configured. Add smsOwl :{ accountId:'',apiKey:''} to meteor settings");
    }

    if(!smsType){
        smsType = "normal";
    }

    if(!(smsType == "normal" || smsType == "flash")){
        throw new Error("Sms type parameter should be 'normal' or 'flash'");
    }


    var postData = {
        accountId: Meteor.settings.smsOwl.accountId,
        apiKey: Meteor.settings.smsOwl.apiKey,
        dndType: "promotional",
        smsType: smsType,
        senderId: senderId,
        to: to,
        message: message
    };

    try {
        var response = HTTP.post(url, {
            data: postData
        });
        return response.data;
    }catch(error){
        throw error;
    }
}


function sendTransactionalSms(senderId,to,templateId,placeholders){
    if(!Meteor.settings.smsOwl){
        throw new Meteor.Error("Account id and api key not configured. Add smsOwl :{ accountId:'',apiKey:''} to meteor settings");
    }

    var postData = {
        accountId: Meteor.settings.smsOwl.accountId,
        apiKey: Meteor.settings.smsOwl.apiKey,
        dndType: "transactional",
        smsType: "normal",
        senderId: senderId,
        to: to,
        templateId: templateId,
        placeholders: placeholders
    };

    try {
        var response = HTTP.post(url, {
            data: postData
        });
        return response.data;
    }catch(error){
        throw error;
    }
}


SmsOwl = {
    sendPromotionalSms: sendPromotionalSms,
    sendTransactionalSms: sendTransactionalSms
};
