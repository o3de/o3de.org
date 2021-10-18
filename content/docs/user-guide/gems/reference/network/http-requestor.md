---
linkTitle: HTTP Requestor
title: HTTPRequestor Gem
description: The HTTPRequestor Gem provides functionality to make asynchronous HTTP/HTTPS requests and return data through a user-provided call back function.
toc: true
---

The HTTPRequestor Gem provides functionality to make asynchronous HTTP/HTTPS requests and return data through a user-provided call back function.

**Note**  
This feature is supported only on Windows but could be expanded to other platforms.

## Getting Started

To use the HttpRequestor gem, you must enable it in your project. For more information refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/).

As HttpRequestor uses pieces of the AWS C++ SDK, you will need to include these pieces in your CMake file:

```
BUILD_DEPENDENCIES
        PRIVATE
            ...
            Gem::HttpRequestor
            3rdParty::AWSNativeSDK::Core
```

## C\+\+ API

The HttpRequestor gem has separate sets of APIs for adding requests and adding text requests.

### AddRequest, AddRequestWithHeaders, AddRequestWithHeadersAndBody

You can use the `AddRequest`, `AddRequestWithHeaders`, and `AddRequestWithHeadersAndBody` APIs to send generic HTTP requests to any website and receive the returned data in JSON format. The methods return the data received in the `callback` parameter.

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


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| URI | AZStd::String | The fully qualified web address, in the following format: scheme:\[//\[user:password@\]host\[:port\]\]\[/\]path\[?query\]\[\#fragment\] | 
| method | Aws::Http::HttpMethod | The method type. The following values are supported: HTTP\_GET, HTTP\_POST, HTTP\_DELETE, HTTP\_PUT, HTTP\_HEAD, and HTTP\_PATCH. | 
| callback |  | This function is called when the HTTP request is completed. The response body and code are present in the callback. | 
| headers | HttpRequestor::Headers | The list of header fields for the HTTP request. | 
| body | AZStd::String | Optional body to send with the request. | 

Return: No return value.

### JSON Request Callback

This callback is returned for the `AddRequest`, `AddRequestWithHeaders`, and `AddRequestWithHeadersAndBody` methods.

```
void Callback(const Aws::Utils::Json::JsonValue& json, Aws::Http::HttpResponseCode responseCode);
```

#### Parameters


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| json | Aws::Utils::Json::JsonValue | The JSON object. The life span of this object is valid only during the scope of the callback. | 
| responseCode | Aws::Http::HttpResponseCode | The HTTP response code. | 

Return: No return value.

### AddTextRequest, AddTextRequestWithHeaders, AddTextRequestWithHeadersAndBody

You can use the `AddTextRequest`, `AddTextRequestWithHeaders`, and `AddTextRequestWithHeadersAndBody` APIs to send a generic HTTP request to any website and receive the returned data in a text string. The methods return the data received in the `callback` parameter.

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


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| URI | AZStd::String | The fully qualified web address, in the following format: scheme:\[//\[user:password@\]host\[:port\]\]\[/\]path\[?query\]\[\#fragment\] | 
| method | Aws::Http::HttpMethod | The method type. The following values are supported: HTTP\_GET, HTTP\_POST, HTTP\_DELETE, HTTP\_PUT, HTTP\_HEAD, and HTTP\_PATCH. | 
| callback |  | This function is called when the HTTP request is completed. The response body and code are present in the callback. | 
| headers | HttpRequestor::Headers | The list of header fields for the HTTP request. | 
| body | AZStd::String | Optional body to send with the request. | 

Return: No return value.

### Text Request Callback

This callback is returned for the `AddTextRequest`, `AddTextRequestWithHeaders`, `AddTextRequestWithHeadersAndBody` methods.

```
void Callback(const AZStd::string& response, Aws::Http::HttpResponseCode responseCode);
```

#### Parameters


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| response | AZStd::string& | The text returned from the server. The life span of this object is valid only during the scope of the callback. | 
| responseCode | Aws::Http::HttpResponseCode | The HTTP response code. | 

Return: No return value.

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
            AZ_Printf("HttpRequest Demo",  "Call succeed with %s %d", data.WriteCompact().c_str(), responseCode);
        }
        else
        {
            AZ_Printf("HttpRequestDemo", "Request Failed!");
        }
    });
```
