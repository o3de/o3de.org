# HttpRequestor Gem<a name="http-requestor-gem"></a>

You can use the HttpRequestor gem to make asynchronous HTTP/HTTPS requests and return data through a user\-provided call back function\. This gem uses the EBus for communication and provides all requests asynchronously\. For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

**Note**  
This feature is supported only on Windows and replaces `CryAction::HttpRequest`\.

**Topics**
+ [Getting Started](#http-requestor-gem-getting-started)
+ [C\+\+ API Using EBUS\_EVENT](#http-requestor-gem-c-api-ebus_event)
+ [Example](#http-requestor-gem-example)

## Getting Started<a name="http-requestor-gem-getting-started"></a>

To use the HttpRequestor gem, you must enable it in your project\.

**To enable the HttpRequestor gem**

1. In the [Project Configurator](configurator-intro.md), select your project, and then click **Enable Gems**\.

1. In the list of gems, select the check box next to **HttpRequestor**\.

1. Click **Save**\.

1. Enter the following command to build your project\.

   ```
   lmbr_waf configure
   ```

## C\+\+ API Using EBUS\_EVENT<a name="http-requestor-gem-c-api-ebus_event"></a>

The HttpRequestor gem has separate sets of APIs for adding requests and adding text requests\.

### AddRequest, AddRequestWithHeaders, AddRequestWithHeadersAndBody<a name="http-requestor-gem-addrequest-methods"></a>

You can use the `AddRequest`, `AddRequestWithHeaders`, and `AddRequestWithHeadersAndBody` APIs to send generic HTTP requests to any website and receive the returned data in JSON format\. The methods return the data received in the `callback` parameter\.

#### Syntax<a name="http-requestor-gem-addrequest-syntax"></a>

```
EBUS_EVENT(HttpRequestor::HttpRequestorRequestBus,AddRequest, URI, method, callback)
```

```
EBUS_EVENT(HttpRequestor::HttpRequestorRequestBus, AddRequestWithHeaders, URI, method, headers, callback)
```

```
EBUS_EVENT(HttpRequestor::HttpRequestorRequestBus, AddRequestWithHeadersAndBody, URI, method, headers, body, callback)
```

Each add request method requires the URI, a method and a callback\.

#### Parameters<a name="http-requestor-gem-addrequest-parameters"></a>


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| URI | AZStd::String | The fully qualified web address, in the following format: scheme:\[//\[user:password@\]host\[:port\]\]\[/\]path\[?query\]\[\#fragment\] | 
| method | Aws::Http::HttpMethod | The method type\. The following values are supported: HTTP\_GET, HTTP\_POST, HTTP\_DELETE, HTTP\_PUT, HTTP\_HEAD, and HTTP\_PATCH\. | 
| callback |  | This function is called when the HTTP request is completed\. The response body and code are present in the callback\. | 
| headers | HttpRequestor::Headers | The list of header fields for the HTTP request\. | 
| body | AZStd::String | Optional body to send with the request\. | 

Return: No return value\.

### JSON Request Callback<a name="http-requestor-gem-json-request-callback"></a>

This callback is returned for the `AddRequest`, `AddRequestWithHeaders`, and `AddRequestWithHeadersAndBody` methods\.

```
void Callback(const Aws::Utils::Json::JsonValue& json, Aws::Http::HttpResponseCode responseCode);
```

#### Parameters<a name="http-requestor-gem-json-request-callback-parameters"></a>


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| json | Aws::Utils::Json::JsonValue | The JSON object\. The life span of this object is valid only during the scope of the callback\. | 
| responseCode | Aws::Http::HttpResponseCode | The HTTP response code\. | 

Return: No return value\.

### AddTextRequest, AddTextRequestWithHeaders, AddTextRequestWithHeadersAndBody<a name="http-requestor-gem-addtextrequest-methods"></a>

You can use the `AddTextRequest`, `AddTextRequestWithHeaders`, and `AddTextRequestWithHeadersAndBody` APIs to send a generic HTTP request to any website and receive the returned data in a text string\. The methods return the data received in the `callback` parameter\.

#### Syntax<a name="http-requestor-gem-addtextrequest-syntax"></a>

```
EBUS_EVENT(HttpRequestor::HttpRequestorRequestBus, AddTextRequest, URI, method, callback)
```

```
EBUS_EVENT(HttpRequestor::HttpRequestorRequestBus, AddTextRequestWithHeaders, URI, method, headers, callback)
```

```
EBUS_EVENT(HttpRequestor::HttpRequestorRequestBus, AddTextRequestWithHeadersAndBody, URI, method, headers, body, callback)
```

Each add text request method requires the URI, a method and a callback\.

#### Parameters<a name="http-requestor-gem-addtextrequest-parameters"></a>


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| URI | AZStd::String | The fully qualified web address, in the following format: scheme:\[//\[user:password@\]host\[:port\]\]\[/\]path\[?query\]\[\#fragment\] | 
| method | Aws::Http::HttpMethod | The method type\. The following values are supported: HTTP\_GET, HTTP\_POST, HTTP\_DELETE, HTTP\_PUT, HTTP\_HEAD, and HTTP\_PATCH\. | 
| callback |  | This function is called when the HTTP request is completed\. The response body and code are present in the callback\. | 
| headers | HttpRequestor::Headers | The list of header fields for the HTTP request\. | 
| body | AZStd::String | Optional body to send with the request\. | 

Return: No return value\.

### Text Request Callback<a name="http-requestor-gem-text-request-callback"></a>

This callback is returned for the `AddTextRequest`, `AddTextRequestWithHeaders`, `AddTextRequestWithHeadersAndBody` methods\.

```
void Callback(const AZStd::string& response, Aws::Http::HttpResponseCode responseCode);
```

#### Parameters<a name="http-requestor-gem-text-request-callback-parameters"></a>


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| response | AZStd::string& | The text returned from the server\. The life span of this object is valid only during the scope of the callback\. | 
| responseCode | Aws::Http::HttpResponseCode | The HTTP response code\. | 

Return: No return value\.

## Example<a name="http-requestor-gem-example"></a>

The following example uses the Metastream C\+\+ API to obtain a gateway IP address\.

```
EBUS_EVENT(HttpRequestor::HttpRequestorRequestBus, AddRequest, "https://httpbin.org/ip", Aws::Http::HttpMethod::HTTP_GET, [this](AXStd::string && data, Aws::Http::HttpResponseCode code)
{
     AZStd::string resultData = std::move(data);
     resultCode = code;

    /* Upon success:
    **  resultCode = Aws::Http::HttpResponceCode::Ok
    **  resultData = "{"origin": "xxx.xxx.xxx.xxx"}"  /* Your IP will be displayed */
    */
 }));
```