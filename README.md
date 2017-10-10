## REST API Meteor.js Wrapper

This package should enable you to wrap any general REST API so that it can be easily called from the Meteor server, if
the provider has a REST-like interface.

It was written with an SMS API in mind, but should work well with any HTTP API that you wish to call from the
server.

### Installing REST API Wrapper package

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

And use it:

    var result = smsFunctionLibrary.sendSMS({
      to:"+61411111111",
      message:"This is the message",
      senderid:"MyCompany"
    });

Or asynchronously, with a callback:

    var functionLibrary = new RestEndpoints();

    var smsResult = functionLibrary.sendSMS(
      {
        to: "+61411111111",
        message: "This is the message",
        senderid: "MyCompany"
      },
      function (error, result) {
        // "invalid credentials"; result.statusCode = 401

      }
    );

If you don't want to provide settings in the Meteor settings.json, you can do so at runtime:

    var smsFunctionLibrary = new RestEndpoints(restEndpointsArray);



This is literally a convenience wrapper around Meteor's [```HTTP.call```](http://docs.meteor.com/#/full/http_call) .
The idea is that you document the API's details in JSON. So
although it was written with SMS in mind, it should work nicely for twitter, google translate ... you name it.

## Full REST Example

Here's how you can wrap a complete API.

```js
  var apiSettings = [
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
      actionName: "getBasecampProjects",
      httpMethod: "get",
      endpoint: "https://3.basecampapi.com",
      additionalHeaders: {
        "User-Agent": "Company Name (http://your.company.url)",
        "Authorization": "Bearer your-user-access-token-here"
      }
    },
    {
      actionName: "getAllTodosForProject",
      httpMethod: "get",
      endpoint: "https://3.basecampapi.com",
      additionalHeaders: {
        "User-Agent": "Company Name (http://your.company.url)",
        "Authorization": "Bearer your-user-access-token-here"
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
      }
    },
    {
       actionName: "sendDataInsteadOfParams",
       httpMethod: "post",
       endpoint: "http://jsonplaceholder.typicode.com/posts",
       auth: {
         username: "myUsername",
         password: "myPassword"
       },
       additionalHeaders: {
         "Authorization-Token": "123456789",
         "Other-Header-Key": "Other-Header-Value"
       }
    }
  ];

  // now initialize our API wrapper
  var functionLibrary = new RestEndpoints(apiSettings);

  // now each of the actionName properties is accessible as a function.

  // get all posts
  var allPosts = functionLibrary.getAllPosts();

  // get one post object by ID
  // Note the use of the special _ID_ parameter; this gets appended to the endpoint URL.
  var onePost = functionLibrary.getSinglePostByID({_ID_: 1});

  // get a nested property of a user by ID
  var allTodosForUser = functionLibrary.getToDosForUser({_ID_: '1/todos'});

  // insert a new post
  var postResult = functionLibrary.insertPost({
    title: 'foo',
    body: 'bar',
    userId: 1
  });

  // update a post
  var newPost = functionLibrary.updateSinglePostByID({_ID_: 1, 'title': 'cheese'});

  // replace a post completely
  var newPost = functionLibrary.replaceSinglePostByID({
      _ID_: 1,
      id: 1,
      title: 'foo',
      body: 'chocolate',
      userId: 1
    });

  // delete a post
  var result = functionLibrary.deleteSinglePostByID({_ID_: 1});
  
  // append to the url
  // the following will build the endpoint to 
  // https://3.basecampapi.com/999999999/projects.json
  var allProjects = functionLibrary.getBasecampProjects({
  _ID_: 999999999,
  _APPEND_TO_URL_: "projects.json"
  });
  
  // completely replace the endpoint url
  var getBasecampTodos = functionLibrary.getAllTodosForProject({
  _OVERRIDE_URL_: "https://3.basecampapi.com/999999999/buckets/1/todolists/3/todos.json"
  });
  
  // send given params as data: {} instead
    var params = {
      "title": "foo",
      "body": "bar",
      "userId": 1
    };
      
    var sendDataInsteadOfParams = functionLibrary.sendDataInsteadOfParams({_PARAMS_TO_DATA_: params});
```

TODO:

1. oauth
2. create a catalogue of APIs specified this way.