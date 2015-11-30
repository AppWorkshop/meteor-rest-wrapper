## REST API Meteor.js Wrapper

This package should enable you to wrap any general REST API, if they provide a REST-like interface.
It was written with ClickSend's API in mind.

### Installing SMS API Wrapper package

Use following command to install the meteor package.

	$ meteor add appworkshop:rest-api-wrapper

### Configuring

All settings are specified in your settings.json file, under
appworkshop.restendpoints e.g.

```
... ,
appworkshop: {
  restendpoints: [
    {
      actionName: "sendSMS",
      httpMethod: "post",
      endpoint: "https://api.clicksend.com/rest/v2/send.json",
      auth: {
        username: "myClickSendUsername",
        password: "myClickSendAPIKey"
      },
      additionalHeaders:
      {
        "Authorization-Token": "123456789",
        "Other-Header-Key": "Other-Header-Value"
      },
      additionalFormData: {
        method: "rest",
        customstring: "ClickSend will pass this back in the response"}
      }
    }
  ],
  defaultTimeout: 2000
},
public: {...},

```

You could then initialise the API:

    var smsFunctionLibrary = new RestEndpoints();

If you don't want to provide settings in the Meteor settings.json, you can do so at runtime:

    var smsFunctionLibrary = new RestEndpoints(restEndpointsArray);

In the example above, you would now have an API to call:

    smsFunctionLibrary.sendSMS({
      to:"+61411111111",
      message:"This is the message",
      senderid:"MyCompany"
    }