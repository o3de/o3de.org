# Making HTTP Requests Using the Cloud Gem Framework<a name="cloud-canvas-cgf-http-requests"></a>

****  
The Cloud Gem Framework and this documentation are in preview release and are subject to change\.

The Cloud Gem Framework Gem provides C\+\+ classes and EBus interfaces to execute HTTP requests using the `AZ::Job` system\. Your game client can use this feature to make HTTP requests for data from a public API such as Twitter or from a custom API\. For example, your game could make HTTP requests to Twitter to see who is tweeting about your game\.

**To enable your game code to make HTTP requests**

1. In the [Project Configurator](configurator-intro.md), enable the **Cloud Canvas Common** and **Cloud Gem Framework** gems for your project\.

1. In Lumberyard Editor, in **Entity Inspector**, click **Add Component**\.

1. From the **Cloud Gem Framework** section, add the **HttpClientComponent** to an entity in your scene\.

1. To make HTTP requests from your game code, perform one of the following steps:
   + From a Lua script component attached to your entity, add code based on the following example\.

     ```
     local url = "https://my.url.com"
     local http_method = "GET"
     local json_body = "{}"
     HttpClientComponentRequestBus.Event.MakeHttpRequest(self.entityId, url, http_method, json_body)
     ```
   + From C\+\+, use Lumberyard's [EBus](ebus-intro.md), as in the following example\.

     ```
     AZStd::string url = "https://my.url.com"
     AZStd::string httpMethod = "GET"
     AZStd::string jsonBody= "{}"
     EBUS_EVENT(HttpClientComponentRequestBus, MakeHttpRequest, url, httpMethod, jsonBody);
     ```
   + From C\+\+, use `HttpRequestJob`, as in the following example\.

     ```
     AZStd::string url = "https://my.url.com"
     AZStd::string httpMethod = "GET"
     AZStd::string jsonBody= "{}"
      
     auto job = aznew HttpRequestJob(true, ServiceJob::GetDefaultConfig(),
                 [this](int responseCode, AZStd::string content)
                 {
                     // handle success
                 },
                 [this](int responseCode)
                 {
                     // handle failure
                 }
             );
     job->SetUrl(url.c_str());
     job->SetHttpMethod(httpMethod );
     job->SetJsonBody(jsonBody.c_str());
     job->Start();
     ```

## Getting HTTP Responses Using Script<a name="cloud-canvas-cgf-http-responses-script"></a>

To get responses from a HTTP request, your script class needs an `HttpClientComponentNotificationBus` as in the following example\.

```
function httpClientUsageExample:OnActivate()
    self.notificationHandler = HttpClientComponentNotificationBus.Connect(self, self.entityId);
end
```

Next, your script class must implement the `HttpClientComponentNotificationBus` functions `OnHttpRequestSuccess` `and OnHttpRequestFailure` as in the following example\.

```
function myscript:OnHttpRequestSuccess(responseCode, responseBody)
    Debug.Log("HTTP RESPONSE -- " .. responseCode);
    Debug.Log("HTTP BODY -- " .. responseBody);
end

function myscript:OnHttpRequestFailure(errorCode)
    Debug.Log("HTTP Error-- " .. errorCode);
end
```

## Getting HTTP Responses Using C\+\+<a name="cloud-canvas-cgf-http-responses-cpp"></a>

To get the notifications in C\+\+, you must create a component that inherits from `HttpClientComponentNotificationBus::Handler`\. This class must implement `OnHttpRequestSuccess` and `OnHttpRequestFailure` and should be placed on the same entity as the `HttpClientComponent` in your level\.