---
linkTitle: HTTP Requestor
title: HTTPRequestor Gem
description: The HTTPRequestor Gem provides functionality to make asynchronous HTTP/HTTPS requests and return data through a user-provided call back function.
toc: true
---

The HTTPRequestor Gem provides functionality to make asynchronous HTTP/HTTPS requests and return data through a user-provided call back function.

{{< note >}}
While this feature is currently supported only on Windows, it could be expanded to other platforms.
{{< /note >}}

## Getting started

To use the HttpRequestor Gem, it must be enabled in the project. For more information refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/).

The `HttpRequestor` Gem uses the AWS C++ SDK. To pick up these dependencies, add the following to the project's CMake file:

```cmake
BUILD_DEPENDENCIES
        PRIVATE
            ...
            Gem::HttpRequestor
            3rdParty::AWSNativeSDK::Core
```

### Create a dependency on the Gem

If you need to ensure the HttpRequestor Gem is enabled before its use in a component, add a requirement in your component's `GetRequiredServices` method. For example:

```cpp
void AutomatedTestingSystemComponent::GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required)
{
   ...
   required.push_back(AZ_CRC_CE("HttpRequestorService"));
}
```

### Turn off Amazon EC2 Instance Metadata Service calls

The HttpRequestor Gem uses the [AWS C++ SDK](https://github.com/aws/aws-sdk-cpp) to provide the Http(s) client. You don't need to provide AWS credentials or account information to use this Gem.

Unless your project is running on Amazon EC2 compute, it's recommended that you turn off Amazon EC2 Instance Metadata Service (IMDS) queries by setting the [AWS_EC2_METADATA_DISABLED](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) environment variable to `true`.
Setting this environment variable will prevent SDK resources from needlessly attempting to contact the Amazon EC2 IMDS for configuration, region, and credential information, which can result in delays and wasted network resources.

```cmd
set AWS_EC2_METADATA_DISABLED=true
```


## C++ API

{{< note >}}
This content is in the process of being moved to the [API Reference](https://o3de.org/docs/api/gems/httprequestor/class_http_requestor_1_1_http_requestor_requests.html).
{{< /note >}}

The HttpRequestor Gem has two sets of APIs: one set for making requests that return JSON responses and one set for return string (text) responses.

### AddRequest, AddRequestWithHeaders, AddRequestWithHeadersAndBody

Use the `AddRequest`, `AddRequestWithHeaders`, and `AddRequestWithHeadersAndBody` APIs to send generic HTTP requests to any website and receive the returned data in JSON format. The methods return the data received in the `callback` parameter.

#### Syntax

```cpp
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddRequest, URI, method, callback)
```

```cpp
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddRequestWithHeaders, URI, method, headers, callback)
```

```cpp
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddRequestWithHeadersAndBody, URI, method, headers, body, callback)
```

Each add request method requires the URI, a method and a callback.

#### Parameters

| Parameter | Type | Description | 
| --- | --- | --- | 
| URI | `AZStd::String` | The fully qualified web address, in the following format: `scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]`.  | 
| method | `Aws::Http::HttpMethod` | The method type. The following values are supported: `HTTP_GET`, `HTTP_POST`, `HTTP_DELETE`, `HTTP_PUT`, `HTTP_HEAD`, and `HTTP_PATCH`. | 
| callback | [see below](#json-request-callback) | This function is called when the HTTP request is completed. The response body and code are present in the callback. | 
| headers | `HttpRequestor::Headers` | The list of header fields for the HTTP request. | 
| body | `AZStd::String` | Optional body to send with the request. | 

Return: No return value.

### JSON Request Callback

This callback is returned for the `AddRequest`, `AddRequestWithHeaders`, and `AddRequestWithHeadersAndBody` methods.

```cpp
void Callback(const Aws::Utils::Json::JsonValue& json, Aws::Http::HttpResponseCode responseCode);
```

#### Parameters

| Parameter | Type | Description | 
| --- | --- | --- | 
| json | `Aws::Utils::Json::JsonValue` | The JSON object. The life span of this object is valid only during the scope of the callback. | 
| responseCode | `Aws::Http::HttpResponseCode` | The HTTP response code. | 

#### Returns
`void`

### AddTextRequest, AddTextRequestWithHeaders, AddTextRequestWithHeadersAndBody

Use the `AddTextRequest`, `AddTextRequestWithHeaders`, and `AddTextRequestWithHeadersAndBody` APIs to send a generic HTTP request to any website and receive the returned data in a text string. The methods return the data received in the `callback` parameter.

#### Syntax

```cpp
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddTextRequest, URI, method, callback)
```

```cpp
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddTextRequestWithHeaders, URI, method, headers, callback)
```

```cpp
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddTextRequestWithHeadersAndBody, URI, method, headers, body, callback)
```

Each add text request method requires the URI, a method and a callback.

#### Parameters

| Parameter | Type | Description | 
| --- | --- | --- | 
| URI | `AZStd::String` | The fully qualified web address, in the following format: `scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]` | 
| method | `Aws::Http::HttpMethod` | The method type. The following values are supported: `HTTP_GET`, `HTTP_POST`, `HTTP_DELETE`, `HTTP_PUT`, `HTTP_HEAD`, and `HTTP_PATCH`. | 
| callback | [see below](#text-request-callback) | This function is called when the HTTP request is completed. The response body and code are present in the callback. | 
| headers | `HttpRequestor::Headers` | The list of header fields for the HTTP request. | 
| body | `AZStd::String` | Optional body to send with the request. | 

#### Returns
`void`

### Text Request Callback

This callback is returned for the `AddTextRequest`, `AddTextRequestWithHeaders` and `AddTextRequestWithHeadersAndBody` methods.

```cpp
void Callback(const AZStd::string& response, Aws::Http::HttpResponseCode responseCode);
```

#### Parameters

| Parameter | Type | Description | 
| --- | --- | --- | 
| response | AZStd::string& | The text returned from the server. The life span of this object is valid only during the scope of the callback. | 
| responseCode | Aws::Http::HttpResponseCode | The HTTP response code. | 

#### Returns
`void`

## Example

The following example shows calling a HttpBin to get the origin IP address:

```cpp
#include <aws/core/http/HttpResponse.h>
#include <HttpRequestor/HttpRequestorBus.h>
#include <HttpRequestor/HttpTypes.h>

...

HttpRequestor::HttpRequestorRequestBus::Broadcast(
    &HttpRequestor::HttpRequestorRequests::AddRequest, "https://httpbin.org/ip", Aws::Http::HttpMethod::HTTP_GET,
    [](const Aws::Utils::Json::JsonView& data, Aws::Http::HttpResponseCode responseCode)
    {
        if (responseCode == Aws::Http::HttpResponseCode::OK)
        {
            AZ_Printf("HttpRequestExample",  "Call succeed with %s %d", data.WriteCompact().c_str(), responseCode);
        }
        else
        {
            AZ_Printf("HttpRequestExample", "Request Failed!");
        }
    });
```
