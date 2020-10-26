# Operations<a name="cloud-canvas-cgf-service-api-operations"></a>

A cloud gem's service API can implement multiple distinct operations\. You define operations in the `swagger.json` file by adding [http://swagger.io/specification/#operationObject](http://swagger.io/specification/#operationObject) instances to a [http://swagger.io/specification/#pathItemObject](http://swagger.io/specification/#pathItemObject)\. For each operation, you can define the input data that the operation requires and the output data that it produces\. The input data can include path, query, and body parameters\. For more information on using swagger to define APIs, see [http://swagger\.io/](http://swagger.io/) \.

API Gateway routes API requests to the cloud gem's Lambda function\. When you upload the cloud gem's resources to AWS, the cloud gem's `swagger.json` file is processed\. This processing creates the request and response mappings that API Gateway uses to call the cloud gem's Lambda function\. This configuration is controlled by the [`x-amazon-cloud-canvas-lambda-dispatch`](cloud-canvas-cgf-service-api-cgf-extension-object.md) extension objects in the `swagger.json` file\.

Service API operations are implemented in the `ServiceLambda` AWS Lambda function resource\. The code for the Lambda function comes from the cloud gem's `lambda-function-code` directory\. The Cloud Gem Framework provides a service request dispatch module\. For more information, see [Request Execution](#cloud-canvas-cgf-service-api-operations-request-execution)\.

The following diagram illustrates both request and upload processing\.

![\[Request and upload processing operations\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-service-api-2.png)

**Topics**
+ [Default Request Mapping](#cloud-canvas-cgf-service-api-operations-default-request-mapping)
+ [Default Response Mapping](#cloud-canvas-cgf-service-api-operations-default-response-mapping)
+ [Request Execution](#cloud-canvas-cgf-service-api-operations-request-execution)

## Default Request Mapping<a name="cloud-canvas-cgf-service-api-operations-default-request-mapping"></a>

A JSON object that implements the request operation is sent to the Lambda function\. The JSON object contains the module and function name and the operation's parameters, as the following skeletal syntax shows\.

```
{
  "module": "<module-name>",
  "function": "<function-name>",
  "parameters": {
    "<parameter-name>": <parameter-value>,
    ...
  }
}
```

The default module name is derived from the operation path\. A path like `/player/{id}/highscores` results in a module name like `player_highscores`\. Parameters in the path are skipped\. The paths `/player` and `/player/{id}` both map to the module name `player`\. In this case the handler function in that module can use the existence of an `id` parameter value to determine the corresponding behavior\. The path `/` \(and `/{param}`\) are mapped to the module name `root`\.

The default function name is the operation name like `GET`, `POST`, or `PUT`\.

These defaults can be overridden by specifying the module and/or function properties of an `x-amazon-cloud-canvas-lambda-dispatch` extension object\. For more information, see [Cloud Gem Framework Extension Object](cloud-canvas-cgf-service-api-cgf-extension-object.md)\.

Parameter names are taken from the parameter definitions in the `swagger.json` file\. Path, query, and body parameter types are supported\.

## Default Response Mapping<a name="cloud-canvas-cgf-service-api-operations-default-response-mapping"></a>

The Lambda function returns the value to the client as a JSON object such as the following\.

```
{
  "result":<lambda-return-value>
}
```

If the Lambda function exits with an error \(for example, by raising an unhandled exception\), it returns the JSON object in the following format\.

```
{
  "errorMessage":"<error-message>",
  "errorType":"<error-type>"
}
```

If the error message received from the Lambda function starts with the text `Client Error:`, then an `HTTP 400` response is sent to the client\. The `errorMessage` and `errorType` properties received from the Lambda function are forwarded to the client\.

If the error message received from the Lambda function does not start with `Client Error:`, or no error message is received at all, an `HTTP 500` response is sent to the client\. As a security measure, the `errorMessage` returned to the client is always *An internal server error has occurred*, and `errorType` is `ServiceError`\. This is to avoid sending the exception message to the client\. Doing so could provide information that could allow an attacker to discover exploits in your service implementation\.

In both the `HTTP 400` and `HTTP 500` cases, no other information \(such as a stack trace\) is sent to the client; this also is a security measure\.

## Request Execution<a name="cloud-canvas-cgf-service-api-operations-request-execution"></a>

The Cloud Gem Framework has built\-in support for service API Lambda functions that are implemented in Python\. No built\-in support is provided for Node\.js or Java Lambda functions\. To support these languages, implement the Lambda function handler to look for the `module` and `function` properties on the event object that the Lambda function provides\. You also might need to override the default values generated for the [`x-amazon-cloud-canvas-lambda-dispatch`](cloud-canvas-cgf-service-api-cgf-extension-object.md) `module` and `function` properties during the `swagger.json` file processing\.

A `service.py` module file is provided for you in the service's AWS Lambda function\. This module's `dispatch` function uses the `module` and `function` properties of the `event` object to dispatch the request to the service code that you provide\. These properties are set by the request mapping that configures API Gateway\.

Place your service code in your resource group's `lambda-function-code\api` directory\. The dispatcher uses `importlib.import_module` to load the modules from that directory\. If the specified function has the `@service.api` decorator, the dispatcher invokes the function on that module, as in the following example\.

```
import service

@service.api
def post(request, submission, user_id):
    ...
```

The first argument passed to the function is a `dispatch.Request` object\. The `request` object has the following properties\.
+ **`event`** – The event object that AWS Lambda passes to the dispatch handler\. The contents of the object are determined by the request template\. Additional properties added to the template through the `x-amazon-cloud-canvas-lambda-dispatch` object's `additional-request-template-content` property are also located here\.
+ **`context`** – The Python [context object](https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html) that AWS Lambda passes to the dispatch handler\.

The request object's parameters are passed to the handler function as keyword arguments \(that is, by using Python `**parameters`\)\.

### Error Handling<a name="cloud-canvas-cgf-service-api-operations-error-handling"></a>

A `ClientError` class is provided in the `errors.py` file\. This class extends `RuntimeException` and ensures that the error message is prefixed with `Client Error:`\. This triggers an `HTTP 400` response from API Gateway as described in [Default Response Mapping](#cloud-canvas-cgf-service-api-operations-default-response-mapping)\.

If other exceptions are raised during processing, a generic `Internal Service Error` message is sent to the client\.