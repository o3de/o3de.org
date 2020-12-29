# Cloud Gem Framework Extension Object<a name="cloud-canvas-cgf-service-api-cgf-extension-object"></a>

The swagger specification allows tools like the Cloud Gem Framework and API Gateway to define [extension objects](http://swagger.io/specification/#vendorExtensions)\. These objects allow the `swagger.json` file to provide custom configuration data for the tool\. The extension object that the Cloud Gem Framework uses is `x-amazon-cloud-canvas-lambda-dispatch`\. This extension object simplifies the configuration of API Gateway for use with an AWS Lambda function\.

You can place the `x-amazon-cloud-canvas-lambda-dispatch` object in any of the following swagger objects\.
+ [swagger object](http://swagger.io/specification/#swagger-object-14) – Sets the defaults for all paths and operations\.
+ [path item object](http://swagger.io/specification/#pathItemObject) – Sets the defaults for all the path's operations and overrides the defaults set on the parent swagger object\.
+ [operation object](http://swagger.io/specification/#operationObject) – Sets values for the operation and overrides the defaults set on the parent path and swagger objects\.

The `x-amazon-cloud-canvas-lambda-dispatch` object supports the following properties:
+ **`lambda`** – The ARN of the Lambda function that the operation invokes\.
+ **`module`** – The name of the module that defines the service function that processes the request\.
+ **`function`** – The name of the function that processes the request\. The dispatch module in the Lambda function uses the `function` property and the `module` property to call your code when it receives a request\. The dispatch module is described in the [Upload Processing](#cloud-canvas-cgf-service-api-cgf-extension-object-upload-processing) section that follows\.
+ **`additional-properties`** – An object that provides properties that are added to the generated `x-amazon-apigateway-integration` object described in the next section\.
+ **`additional-request-template-content`** – A string that is inserted into the generated `application/json` [request template](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions.html#api-gateway-swagger-extensions-integration-requestTemplates), which is described in the next section\.
+ **`additional-response-template-content`** – An object that specifies additional content that is inserted into the generated `application/json` [response template](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions.html#api-gateway-swagger-extensions-integration-responseTemplates)\. This template is described in the next section\. Properties named `200`, `400`, and `500` are supported\. These correspond to the successful \(200\) and error \(400 and 550\) responses\.

See the API Gateway documentation for more information about [mapping templates](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html)\.

## Upload Processing<a name="cloud-canvas-cgf-service-api-cgf-extension-object-upload-processing"></a>

Before the `swagger.json` file is uploaded to API Gateway, the `x-amazon-cloud-canvas-lambda-dispatch` extension objects in the file are processed\. This produces the [https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions.html#api-gateway-swagger-extensions-integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions.html#api-gateway-swagger-extensions-integration) extension objects that configure API Gateway to call your cloud gem's AWS Lambda function\.

The `x-amazon-cloud-canvas-lambda-dispatch` object and processing hide a lot of the complexity, and flexibility, of the `x-amazon-apigateway-integration` extension object\. The Cloud Gems Framework provides a straightforward and recommended mapping to the API operations that are implemented in Lambda functions\. API Gateway offers many other features that can be extremely useful when you must match an API that was implemented elsewhere or use API Gateway as a proxy for existing backend implementations\.

You can still use all the power of the `x-amazon-apigateway-integration` object in your cloud gem API operations\. If you include the object in the operation objects of your `swagger.json` file, the processing described here is skipped for the operation\.

**Note**  
You can also use the `lmbr_aws cloud-gem-framework service-api-process-swagger` command to process the `swagger.json` file\.

At minimum, the swagger object can include an `x-amazon-cloud-canvas-lambda-dispatch` object with a Lambda property\. You can allow the module and function for each operation be determined automatically, or you can use `x-amazon-cloud-canvas-lambda-dispatch` objects to specify them\.

The default `swagger.json` file provided by the Cloud Gem Framework contains the following `x-amazon-cloud-canvas-lambda-dispatch` object\. The string `$ServiceLambdaArn$` is replaced with the `ServiceLambdaArn` `SwaggerSettings` property value provided in the `ServiceApi` resource definition\.

```
"x-amazon-cloud-canvas-lambda-dispatch": {
    "lambda": "$ServiceLambdaArn$"
}
```

When the `swagger.json` file is processed, an `x-amazon-apigateway-integration` object is added to every swagger operation object that does not have one\. These objects have the following properties:
+ **`type`** – Specify `AWS` to enable AWS Lambda function integration\.
+ **`uri`** – Construct the URI of the Lambda function with the value of the `x-amazon-cloud-canvas-lambda-dispatch` object's `lambda` property\.
+ **`credentials`** – The `Custom::ServiceApi` resource creates the ARN of a role\. The role has a policy that is described in [Access Control](cloud-canvas-cgf-service-api-security.md#cloud-canvas-cgf-service-api-security-access-control)\.
+ **`requestTemplates`** – A `application/json` template that causes a request as described in [Default Request Mapping](cloud-canvas-cgf-service-api-operations.md#cloud-canvas-cgf-service-api-operations-default-request-mapping)\. You can include additional content by using the `x-amazon-cloud-canvas-lambda-dispatch` object's `additional-request-template-content` property\. This property can be used to pass other values, such as those defined by the `$context` object, to the Lambda function\. The additional request template content should start with a `','` \(and for consistent formatting, should start with `',\n '` and use `',\n '` between properties\)\.
+ **`responses`** Specifies – `application/json` templates for 200 \(success\), 400 \(client error\) and 500 \(service error\) responses as described in [Default Response Mapping](cloud-canvas-cgf-service-api-operations.md#cloud-canvas-cgf-service-api-operations-default-response-mapping)\. The 400 and 500 responses are inserted into the swagger responses object\. However, you should define a 200 response that specifies a scheme that describes the data that the operation returns\.
+ Additional properties as specified by the `x-amazon-apigateway-integration-properties` property\.