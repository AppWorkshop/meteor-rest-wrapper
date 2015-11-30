var endpointSettings = [
  {
    actionName: "doDummyPost",
    httpMethod: "post",
    endpoint: "http://jsonplaceholder.typicode.com/posts",
    auth: {
      username: "myClickSendUsername",
      password: "myClickSendAPIKey"
    },
    additionalHeaders: {
      "Authorization-Token": "123456789",
      "Other-Header-Key": "Other-Header-Value"
    },
    additionalFormData: {
      method: "rest",
      customstring: "CustomString"
    }
  },
  {
    actionName: "sendSMS",
    httpMethod: "post",
    endpoint: "https://api.clicksend.com/rest/v2/send.json",
    auth: {
      username: "myClickSendUsername",
      password: "myClickSendAPIKey"
    },
    additionalHeaders: {
      "Authorization-Token": "123456789",
      "Other-Header-Key": "Other-Header-Value"
    },
    additionalFormData: {
      method: "rest",
      customstring: "ClickSend will pass this back in the response"
    }
  }
];

Tinytest.add('testEndpoint', function (test) {

  var functionLibrary = new RestEndpoints(endpointSettings);

  var params = {
    title: 'foo',
    body: 'bar',
    userId: 1
  };
  var postResult = functionLibrary.doDummyPost(params);

  //console.log("functionLibrary callback");
  //console.log("postResult");
  //console.log(postResult);

  test.equal(postResult.data.title, 'foo');
  test.equal(postResult.data.customstring, 'CustomString');
});

Tinytest.addAsync('testSMS', function (test, next){
  var functionLibrary = new RestEndpoints(endpointSettings);

  var smsResult = functionLibrary.sendSMS({
    to: "+61411111111",
    message: "This is the message",
    senderid: "MyCompany"
  }, function (error, result) {
    // "invalid credentials".
    test.equal(result.statusCode, 401);
    next();
  });
});
