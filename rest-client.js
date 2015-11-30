/**
 * Configure a new rest endpoint from config.
 * @param restEndpoint
 * @returns {object} an object which can be used to invoke the HTTP REST call, via the specified actionName.
 */
var restEndpointFunction = function(restEndpoint) {
  /**
   * Make the REST call. If the request was not successful, an error is thrown.
   * @param {object} params The HTTP FORM parameters i.e. name: value pairs.
   * @param {function} asyncCallback an optional asynchronous callback; if passed, the method runs asynchronously. receives two arguments, error and result. The error argument will contain an Error if the request fails in any way, including a network error, time-out, or an HTTP status code in the 400 or 500 range. In case of a 4xx/5xx HTTP status code, the response property on error matches the contents of the result object. When run in synchronous mode, either result is returned from the function, or error is thrown. Contents of the result object:
   *    <li>statusCode Number Numeric HTTP result status code, or null on error.</li>
   * <li>content String The body of the HTTP response as a string.</li>
   * <li>data Object or null If the response headers indicate JSON content, this contains the body of the document parsed as a JSON object.</li>
   * <li>headers Object:    A dictionary of HTTP headers from the response.</li>
   * @returns {any}
   */
  var performRestCall = function (params, asyncCallback) {
    var extraHeaders = restEndpoint.additionalHeaders;
    var npmRequestOptions = restEndpoint.npmRequestOptions;

    Meteor.settings.appworkshop = Meteor.settings.appworkshop || {};

    // timeout defaults to 2000 but is configurable.
    var timeout = restEndpoint.timeout || Meteor.settings.appworkshop.defaultTimeout || 2000;

    // followRedirects defaults to true but is configurable.
    var followRedirects = true;
    if (typeof restEndpoint.followRedirects !== "undefined") {
      followRedirects = restEndpoint.followRedirects;
    } else if (typeof Meteor.settings.appworkshop.followRedirects !== "undefined") {
      followRedirects = Meteor.settings.appworkshop.followRedirects;
    }

    // union / clobber the configured form data with the provided params.
    var additionalFormData = restEndpoint.additionalFormData || {};
    var extendedParams = _.extend(additionalFormData, params);

    var callOptions = {
      params: extendedParams,
      auth: restEndpoint.auth.username + ":" + restEndpoint.auth.password,
      timeout: timeout,
      followRedirects: followRedirects
    };

    if (extraHeaders) {
      callOptions.headers = extraHeaders;
    }

    if (npmRequestOptions) {
      callOptions.npmRequestOptions = npmRequestOptions;
    }

    if (asyncCallback) {
      HTTP.call(restEndpoint.httpMethod, restEndpoint.endpoint, callOptions, asyncCallback);
    } else {
      // no async function, just return the result
      var result = HTTP.call(restEndpoint.httpMethod, restEndpoint.endpoint, callOptions);
      //console.log(result);
      return result;
    }
  };
  return performRestCall;
};

/**
 * loop through our configured endpoints
 *
 * @param restEndpointsArray {array} an array of rest endpoint objects
 * @returns {object} an object that can be used to invoke REST API calls.
 */
RestEndpoints = function  (restEndpointsArray) {
  Meteor.settings.appworkshop = Meteor.settings.appworkshop || {};
  var restendpoints = restEndpointsArray || Meteor.settings.appworkshop.restendpoints;

  if (restendpoints) {
    // loop through them and add them to our "library"
    var functionLibrary = {};
    for (var endpointIndex in restendpoints) {
      if (restendpoints.hasOwnProperty(endpointIndex)) {
        var thisEndpoint = restendpoints[endpointIndex];
        var restCallFunction = restEndpointFunction(thisEndpoint);
        // this function goes into our library under whatever action name was specified.
        functionLibrary[thisEndpoint.actionName] = restCallFunction;
      }
    }
    return functionLibrary;
  }
};

