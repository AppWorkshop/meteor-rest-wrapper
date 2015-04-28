## Sms Owl Meteor.js Wrapper

This package is wrapper of Sms Owl REST API hosted at [https://smsowl.in](https://smsowl.in). Sms Owl provides transactional and promotional SMS Gateway services.

### Installing Sms Owl package

Use following command to install meteor package.

	$ meteor add mahoujas:smsowl

### Configuring credentials

Credentials should be configured before sending SMS. Please enter the credintials in settings.json file.
	
	{
	  "smsOwl":{
	    "accountId": "YOUR-ACCOUNT-ID",
	    "apiKey": "YOUR-API-KEY"
	  }
	}


### Sending promotional SMS


##### sendPromotionalSms(senderId,to,message,smsType)

 - senderId: Sender Id registered and approved in Sms Owl portal.
 - to: Either single number with country code or array of phone numbers.
 - message: Message to be sent.
 - smsType: It can have either of two values `normal` or `flash`



		try {
            var response = SmsOwl.sendPromotionalSms("TESTER", ["+919876543210","+91123456789"], "Hello World","flash");
        }catch(error){
            //handle error
        }


##### sendPromotionalSms(senderId,to,message)

Same as above but smsType defaults to `normal`

### Sending Transactional SMS

##### sendTransactionalSms(senderId,to,templateId,placeholderObject);

 - senderId: Sender Id registered and approved in Sms Owl portal.
 - to: Destination number with country prefix. Only single number can be specified.
 - templateId: Template Id of message. Only template message can be send via transactional route.
 - placeholderObject: Placeholder values.

Lets assume templateId of `39ec9de0efa8a48cb6e60ee5` with following template.

	Hello {customerName}, your invoice amount is Rs. {amount}.

-

    try {
        var response = SmsOwl.sendTransactionalSms("TESTER", "+918105274689", "39ec9de0efa8a48cb6e60ee5",{customerName:"Bob",amount:200});
        console.log(JSON.stringify(response));
    }catch(error){
        console.log(JSON.stringify(error));
    }

### Return object structure

On success for single SMS sent the following object returned

	{
	    "status": "success",
	    "smsId": "79fee3193f5fd8f828737527"
	}



On success for bulk SMS sent the following object returned

	{
	    "status": "success",
	    "smsIds": [
	        "79fee3193f5fd8f828737527",
	        "af93998f580162afe8b7d031",
	        "3190d3b8d782f0ce7acfb1cf",
	        "a2d107d4a6ac8769aeeff2ab"
	    ]
	}
