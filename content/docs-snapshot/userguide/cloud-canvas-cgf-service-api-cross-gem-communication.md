# Cross\-Gem Communication<a name="cloud-canvas-cgf-service-api-cross-gem-communication"></a>

Cloud gems can use the cross\-communication feature to expose their API operations to one another and use each other's backend services\. For example, Lumberyard's [Player Account Cloud Gem](cloud-canvas-cloud-gem-player-account.md) provides a banned player service that the [Leaderboard Cloud Gem](cloud-canvas-cloud-gem-leaderboard.md) uses to limit fraudulent scores\. You can also use cloud gem cross\-communication to notify multiple gems when an event occurs\.

To implement cross\-gem communication, you define, implement, and use a [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md) web service interface\.

**Topics**
+ [Defining an Interface](#cloud-canvas-cgf-service-api-cross-gem-communication-defining-an-interface)
+ [Implementing an Interface](#cloud-canvas-cgf-service-api-cross-gem-communication-implementing-an-interface)
+ [Using an Interface](#cloud-canvas-cgf-service-api-cross-gem-communication-using-an-interface)

## Defining an Interface<a name="cloud-canvas-cgf-service-api-cross-gem-communication-defining-an-interface"></a>

To define a Cloud Gem Framework service interface, you use the swagger API definition \(also known as the [OpenAPI Specification](https://en.wikipedia.org/wiki/OpenAPI_Specification)\) format to create a `interface-name_interface-version.json` file\. You then place the file in the `lumberyard_version\dev\Gems\gem-name\AWS\api-definition` directory\. For an example in Lumberyard, see the `lumberyard_version\dev\Gems\CloudGemPlayerAccount\AWS\api-definition\banplayer_1_0_0.json` file\.

The interface's full name has the format `gem-name_interface-name_interface-version`\. The `interface-version` is a three part version number\. The number follows the [Semantic Versioning 2\.0\.0](http://semver.org/) standard but uses an underscore \(`_`\) separator instead of a period \(`.`\)\. When your interface definition changes, increment its version number according to this standard\.

When the directory service maps available interface endpoints to client requests for endpoints, it takes the interface version into account\. This enables clients that were built with an older minor version of an interface to use newer minor versions of the interface\.

To define paths, operations, and data formats for the interface, you follow the swagger specification just as you would with any other swagger definition\.

## Implementing an Interface<a name="cloud-canvas-cgf-service-api-cross-gem-communication-implementing-an-interface"></a>

To implement an interface, a gem's `swagger.json` file uses an `x-cloud-gem-framework-interface-implementation` extension object in a path object\. The interface implementation object has the following properties:
+ `interface` – The full interface name \(`gem-name.interface-name-interface-version`\) of the implemented interface\.
+ `module` – The name of the Python module directory that contains the API implementation\. If not provided, the full interface name is used\. This directory contains the child modules with functions named as specified by the interface definition\.

The referenced interface definition and the gem's swagger definition are merged before they are uploaded to configure Amazon API Gateway\. The path objects in the interface definition are effectively inserted as child paths of the path object that defines the interface implementation extension object\. The data definitions in each interface are given a unique prefix to prevent collisions with definitions from the gem's swagger definition or other interfaces\.

For example, if the gem’s `swagger.json` file contains the following:

```
{
     ...
     "paths": {
           "/foo": {
                "x-cloud-gem-framework-interface-implementation": {
                      "interface": "ExampleGem_ExampleInterface_1_0_0"
                }
           },
           "/bar": {
                "get": ...
           }
     },
     "definitions": {
           "Bar": ...
     }
}
```

And the interface definition contains this:

```
{
    ...
    "paths": {
        "/aaa":{ "get": { ... "$ref": "#/definitions/ExampleData" ... } }
        "/bbb": ...
    },
    "definitions": {
        "ExampleData": ...
    }
}
```

The resulting swagger is something like the following:

```
{
    ...
    "paths": {
        "/foo/aaa": { "get": { ... "$ref": "#/definitions/ExampleGem_ExampleInterface_1_0_0.ExampleData" ... } }
        "/foo/bbb": ...
        "/bar": {
            "get": ...
        }
    },
    "definitions": {
        "Bar": ...,
    	"ExampleGem_ExampleInterface_1_0_0.ExampleData": ...
    }
}
```

Currently, you must manually implement the interface in the service code, although tooling that simplifies the implementation is planned for a future release\.

To implement the interface, use the `@service.api` annotated methods that you use for other [service API operations](cloud-canvas-cgf-service-api-operations.md#cloud-canvas-cgf-service-api-operations-request-execution)\. To implement the API, the functions in your modules must use the names specified by the [`x-amazon-cloud-canvas-lambda-dispatch`](cloud-canvas-cgf-service-api-cgf-extension-object.md) extension object\. To override the defaults, put `x-amazon-cloud-canvas-lambda-dispatch` extension objects that include module and function properties in your interface definition\.

In the preceding example, extension objects were not used to override the defaults, so the code that implements the interface would have the following structure:

```
api\
    __init__.py
    bar.py
        def get …
    foo_aaa.py
        def get …
    foo_bbb.py
    …
```

**Note**  
Currently, specifying the interface's `path` parameter inside the gem swagger file is not supported\. Specify the `path` parameter in the interface swagger definition file instead\.

## Using an Interface<a name="cloud-canvas-cgf-service-api-cross-gem-communication-using-an-interface"></a>

Calling the API operations that your interface defines from AWS Lambda functions is straightforward\.

**To use an Interface in a Lambda function**

1. Specify the interface in the [Custom::LambdaConfiguration](cloud-canvas-custom-resources.md#cloud-canvas-custom-resources-lambda-configuration) resource definition's `Services` property, as in the following example:

   ```
   "ServiceLambdaConfiguration": {
        "Type": "Custom::LambdaConfiguration",
        "Properties": {
              "Services": [
                   {
                       "InterfaceId": "ExampleGem_ExampleInterface_1_0_0",
                       "Optional": "False"
                   },
                   ...
              ],
              ...
        ",
        ...
   },
   ```

   The `Optional` property specifies whether the specified interface must exist\. If `Optional` is `False` and no gem provides the specified interface, the deployment fails\.

1. From your Lambda function code, get a client for the service\. To do this: 

   1. Use the `cgf_lambda_settings.get_service_url` function to get the service URL for the interface\. 

   1. Pass the URL to the `cgf_service_client.for_url` function, as in the following example:

   ```
   import cgf_service_client
   import cgf_lambda_settings
   import boto3
   interface_url = cgf_lambda_settings.get_service_url("ExampleGem_ExampleInterface_1_0_0")
   service_client = cgf_service_client.for_url(interface_url, verbose=True, session=boto3._get_default_session())
   result = service_client.navigate('aaa').GET();
   ```

   Cloud Canvas ensures that the Lambda function has permission to call the service endpoints\.