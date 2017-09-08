var endpointSettings = [
  {
    actionName: "insertPost",
    httpMethod: "post",
    endpoint: "http://jsonplaceholder.typicode.com/posts",
    auth: {
      username: "myUsername",
      password: "myPassword"
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
    actionName: "getAllPosts",
    httpMethod: "get",
    endpoint: "http://jsonplaceholder.typicode.com/posts",
    auth: {
      username: "myDummyUsername",
      password: "myDummyAPIKey"
    }
  },
  {
    actionName: "getSinglePostByID",
    httpMethod: "get",
    endpoint: "http://jsonplaceholder.typicode.com/posts",
    auth: {
      username: "myClickSendUsername",
      password: "myClickSendAPIKey"
    }
  },
  {
    actionName: "getCommentsForPostID",
    httpMethod: "get",
    endpoint: "http://jsonplaceholder.typicode.com/comments",
    auth: {
      username: "myClickSendUsername",
      password: "myClickSendAPIKey"
    }
  },
  {
    actionName: "getToDosForUser",
    httpMethod: "get",
    endpoint: "http://jsonplaceholder.typicode.com/users",
    auth: {
      username: "myClickSendUsername",
      password: "myClickSendAPIKey"
    }
  },
  {
    actionName: "updateSinglePostByID",
    httpMethod: "patch",
    endpoint: "http://jsonplaceholder.typicode.com/posts",
    auth: {
      username: "myUsername",
      password: "myPassword"
    },
  },
  {
    actionName: "replaceSinglePostByID",
    httpMethod: "patch",
    endpoint: "http://jsonplaceholder.typicode.com/posts",
    auth: {
      username: "myUsername",
      password: "myPassword"
    },
  },
  {
    actionName: "deleteSinglePostByID",
    httpMethod: "delete",
    endpoint: "http://jsonplaceholder.typicode.com/posts",
    auth: {
      username: "myUsername",
      password: "myPassword"
    },
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
  },
  {
    actionName: "queryURL",
    httpMethod: "get",
    endpoint: "https://3.basecampapi.com",
    additionalHeaders: {
      "User-Agent": "Company Name (http://your.company.url)",
      "Authorization": "Bearer your-user-access-token-here"
    }
  },
  {
    actionName: "appendToUrl",
    httpMethod: "get",
    endpoint: "http://jsonplaceholder.typicode.com/users",
    auth: {
      username: "myUsername",
      password: "myPassword"
    },
  }
];

Tinytest.add('INSERTPOST', function (test) {

  var functionLibrary = new RestEndpoints(endpointSettings);

  var params = {
    title: 'foo',
    body: 'bar',
    userId: 1
  };
  var postResult = functionLibrary.insertPost(params);

  test.equal(postResult.data.title, 'foo');
  test.equal(postResult.data.customstring, 'CustomString');

});

Tinytest.add('GETALL', function (test) {

  var functionLibrary = new RestEndpoints(endpointSettings);

  var allPosts = functionLibrary.getAllPosts();

  test.length(allPosts.data, 100, "Unexpected number of posts");

});

Tinytest.add('GETONE', function (test) {

  var functionLibrary = new RestEndpoints(endpointSettings);

  var onePost = functionLibrary.getSinglePostByID({_ID_: 1});
  test.equal(onePost.data.userId, 1, "Unexpected user ID for post");
});

Tinytest.add('GETNESTED', function (test) {

  var functionLibrary = new RestEndpoints(endpointSettings);

  var allTodosForUser = functionLibrary.getToDosForUser({_ID_: '1/todos'});
  test.length(allTodosForUser.data, 20, "Unexpected number of todos for user");
});

Tinytest.add('GETONEWITHPARAMS', function (test) {

  var functionLibrary = new RestEndpoints(endpointSettings);

  var allComments = functionLibrary.getCommentsForPostID({postId: 1});

  test.length(allComments.data, 5, "Unexpected number of comments");
});

Tinytest.add('PATCH', function (test) {

  var functionLibrary = new RestEndpoints(endpointSettings);

  var newPost = functionLibrary.updateSinglePostByID({_ID_: 1, 'title': 'cheese'});

  test.equal(newPost.data.title, 'cheese', "Couldn't update title");
});

Tinytest.add('PUT', function (test) {

  var functionLibrary = new RestEndpoints(endpointSettings);

  var newPost = functionLibrary.replaceSinglePostByID({
    _ID_: 1,
    id: 1,
    title: 'foo',
    body: 'chocolate',
    userId: 1
  });

  test.equal(newPost.data.body, 'chocolate', "Couldn't replace post");
  test.equal(newPost.data.title, 'foo', "Couldn't replace post");
});

Tinytest.add('DELETEONEPOST', function(test) {
  var functionLibrary = new RestEndpoints(endpointSettings);

  var onePost = functionLibrary.deleteSinglePostByID({_ID_: 1});
  test.equal(onePost.statusCode, 200, "Unexpected result for delete")
});

Tinytest.addAsync('OVERRIDE URL', function(test, onComplete) {
  var functionLibrary = new RestEndpoints( endpointSettings );

  functionLibrary.queryURL(
      {_OVERRIDE_URL_: "https://3.basecampapi.com/999999999/projects.json"},
      function (error, result) {
        if (error) { console.log(error)}
        if (result) {
          if (result.statusCode === 404) {
            onComplete();
          }
        }
      } );
});

Tinytest.add('APPEND TO URL', function ( test ) {
  var functionLibrary = new RestEndpoints(endpointSettings);

  var appendToUrl = functionLibrary.appendToUrl({_ID_: 1, _APPEND_TO_URL_: "todos"});
  test.length(appendToUrl.data, 20, "Unexpected number of todos for user");
  test.equal(appendToUrl.data[0].title, 'delectus aut autem');
});

//Tinytest.addAsync('SMS', function (test, next){
//  var functionLibrary = new RestEndpoints(endpointSettings);
//
//  var smsResult = functionLibrary.sendSMS({
//    to: "+61411111111",
//    message: "This is the message",
//    senderid: "MyCompany"
//  }, function (error, result) {
//    // "invalid credentials".
//    test.equal(result.statusCode, 401);
//    next();
//  });
//});
