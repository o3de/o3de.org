---
linkTitle: HTTP Requestor
title: HTTPRequestor Gem
description: The HTTPRequestor Gem provides functionality to make asynchronous HTTP/HTTPS requests and return data through a user-provided call back function.
toc: true
---

The HTTPRequestor Gem provides functionality to make asynchronous HTTP/HTTPS requests and return data through a user-provided call back function.

{{< note >}}
This feature is currently supported only on Windows, it could be expanded to other platforms.
{{< /note >}}

## Getting Started

To use the HttpRequestor Gem, it must be enabled in the project. For more information refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/).

The `HttpRequestor` Gem uses the AWS C++ SDK. To pick up these dependencies, add the following to the project's CMake file:

```
BUILD_DEPENDENCIES
        PRIVATE
            ...
            Gem::HttpRequestor
            3rdParty::AWSNativeSDK::Core
```

If you need to ensure the HttpRequestor Gem is enabled before its use in a component, add a requirement in the component's `GetRequiredServices` method:

```
void AutomatedTestingSystemComponent::GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required)
{
   ...
   required.push_back(AZ_CRC_CE("HttpRequestorService"));
}
```
## C\+\+ API

{{< note >}}
This content is in the process of being moved to https://o3de.org/docs/api/gems/httprequestor/class_http_requestor_1_1_http_requestor_requests.html
{{< /note >}}

The HttpRequestor Gem has two sets of APIs: one set for making requests that return json responses and one set for return string (text) responses.

### AddRequest, AddRequestWithHeaders, AddRequestWithHeadersAndBody

Use the `AddRequest`, `AddRequestWithHeaders`, and `AddRequestWithHeadersAndBody` APIs to send generic HTTP requests to any website and receive the returned data in JSON format. The methods return the data received in the `callback` parameter.

#### Syntax

```
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddRequest, URI, method, callback)
```

```
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddRequestWithHeaders, URI, method, headers, callback)
```

```
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddRequestWithHeadersAndBody, URI, method, headers, body, callback)
```

Each add request method requires the URI, a method and a callback.

#### Parameters

| Parameter | Type                                | Description                                                                                                                             | 
|-----------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| URI       | `AZStd::String`                     | The fully qualified web address, in the following format: `scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]`            | 
| method    | `Aws::Http::HttpMethod`             | The method type. The following values are supported: `HTTP_GET`, `HTTP_POST`, `HTTP_DELETE`, `HTTP_PUT`, `HTTP_HEAD`, and `HTTP_PATCH`. | 
| callback  | [see below](#json-request-callback) | This function is called when the HTTP request is completed. The response body and code are present in the callback.                     | 
| headers   | `HttpRequestor::Headers`            | The list of header fields for the HTTP request.                                                                                         | 
| body      | `AZStd::String`                     | Optional body to send with the request.                                                                                                 | 

Return: No return value.

### JSON Request Callback

This callback is returned for the `AddRequest`, `AddRequestWithHeaders`, and `AddRequestWithHeadersAndBody` methods.

```
void Callback(const Aws::Utils::Json::JsonValue& json, Aws::Http::HttpResponseCode responseCode);
```

#### Parameters

| Parameter    | Type                          | Description                                                                                   | 
|--------------|-------------------------------|-----------------------------------------------------------------------------------------------|
| json         | `Aws::Utils::Json::JsonValue` | The JSON object. The life span of this object is valid only during the scope of the callback. | 
| responseCode | `Aws::Http::HttpResponseCode` | The HTTP response code.                                                                       | 

#### Returns
`void`

### AddTextRequest, AddTextRequestWithHeaders, AddTextRequestWithHeadersAndBody

Use the `AddTextRequest`, `AddTextRequestWithHeaders`, and `AddTextRequestWithHeadersAndBody` APIs to send a generic HTTP request to any website and receive the returned data in a text string. The methods return the data received in the `callback` parameter.

#### Syntax

```
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddTextRequest, URI, method, callback)
```

```
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddTextRequestWithHeaders, URI, method, headers, callback)
```

```
HttpRequestor::HttpRequestorRequestBus::Broadcast(&HttpRequestor::HttpRequestorRequests::AddTextRequestWithHeadersAndBody, URI, method, headers, body, callback)
```

Each add text request method requires the URI, a method and a callback.

#### Parameters

| Parameter | Type                                | Description                                                                                                                             | 
|-----------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| URI       | `AZStd::String`                     | The fully qualified web address, in the following format: `scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]`            | 
| method    | `Aws::Http::HttpMethod`             | The method type. The following values are supported: `HTTP_GET`, `HTTP_POST`, `HTTP_DELETE`, `HTTP_PUT`, `HTTP_HEAD`, and `HTTP_PATCH`. | 
| callback  | [see below](#text-request-callback) | This function is called when the HTTP request is completed. The response body and code are present in the callback.                     | 
| headers   | `HttpRequestor::Headers`            | The list of header fields for the HTTP request.                                                                                         | 
| body      | `AZStd::String`                     | Optional body to send with the request.                                                                                                 | 

#### Returns
`void`

### Text Request Callback

This callback is returned for the `AddTextRequest`, `AddTextRequestWithHeaders` and `AddTextRequestWithHeadersAndBody` methods.

```
void Callback(const AZStd::string& response, Aws::Http::HttpResponseCode responseCode);
```

#### Parameters

| Parameter    | Type                        | Description                                                                                                     | 
|--------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------|
| response     | AZStd::string&              | The text returned from the server. The life span of this object is valid only during the scope of the callback. | 
| responseCode | Aws::Http::HttpResponseCode | The HTTP response code.                                                                                         | 

#### Returns
`void`

## Example

The following example shows calling a HttpBin to get the origin ip address:

```
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
