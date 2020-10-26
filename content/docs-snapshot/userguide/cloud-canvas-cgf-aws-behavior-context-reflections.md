# AWS Behavior Context Reflections<a name="cloud-canvas-cgf-aws-behavior-context-reflections"></a>

The CloudGemAWSScriptBehaviors gem uses the behavior context to expose AWS services such as [Amazon Cognito](https://aws.amazon.com/cognito/), [AWS Lambda](https://aws.amazon.com/lambda/), [Amazon S3](https://aws.amazon.com/s3/), and HTTP utilities to script\. The`\dev\CloudGemSamples\Scripts` directory has sample Lua code for each reflection\. To try the samples, run the AWSBehaviorExamples level in the CloudGemSamples project\.

## API Service<a name="cloud-canvas-cgf-aws-behavior-context-reflections-api-service"></a>

API service behavior context reflections include a class and EBus that interact with Amazon API Gateway\.

### AWSBehaviorAPI Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviorapi-class"></a>

Calls methods that are exposed through the Amazon API Gateway service\. The class properly signs requests with appropriate credentials in an HTTP request\. The class translates the logical resource names in Cloud Canvas to physical names\. This makes the class easy to use with other cloud gems\.


**Properties**  

| Property | Description | 
| --- | --- | 
| string HTTPMethod | Specifies the HTTP method that calls the API\. This string is API specific\. Valid strings are: GET, POST, DELETE, PUT, and PATCH\. | 
| string Query | A standard URL query string that passes parameters to the API\. This string is only the query and function portion of the URL and has the format player/messages?time=now&lang=eng\. | 
| string ResourceName | Specifies the logical resource name of the API to call\. Accepts only API Gateway resource names\. Returns an error if other resource types are specified\. | 


**Methods**  

| Method | Description | 
| --- | --- | 
| void Execute\(\) | Performs the HTTP request with the specified properties\. | 

#### AWSBehaviorAPINotificationsBus<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviorapinotificationsbus"></a>

The `AWSBehaviorAPINotificationsBus` has the following methods\.


**Methods**  

| Method | Description | 
| --- | --- | 
| void GetResponse\(int responseCode, string responseData\) | Called when the request returns a response\. The responseCode parameter contains the HTTP response code; the responseData parameter contains the response data, which is often a JSON string\. | 
| void OnError\(string requestBody\) | Called when the API call fails\. The requestBody parameter contains the request body\. | 
| void OnSuccess\(string resultBody\) | Called when the API call succeeds\. The resultBody parameter contains the request response body\. | 

## Lambda Service<a name="cloud-canvas-cgf-aws-behavior-context-reflections-lambda-service"></a>

Lambda service behavior context reflections include a class and EBus that interact with AWS Lambda\.

### AWSLambda Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awslambda-class"></a>

Invokes an AWS Lambda function\.


**Properties**  

| Property | Description | 
| --- | --- | 
| string functionName | The logical function name in Cloud Canvas that you want to invoke\. | 
| string requestBody | Optional\. Specifies request parameters to pass to the Lambda invocation\. | 


**Methods**  

| Method | Description | 
| --- | --- | 
| void InvokeAWSLambda\(\) | Invokes the specified Lambda function\. | 

#### AWSLambdaHandler<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awslambdahandler"></a>

The `AWSLambdaHandler` EBus has the following methods\.


**Methods**  

| Method | Description | 
| --- | --- | 
| void OnError\(string errorBody\) | Called when the Lambda invocation fails\. The errorBody parameter contains the information that was returned in the Lambda error response\. | 
| void OnSuccess\(string resultBody\) | Called when the Lambda invocation succeeds\. The resultBody parameter contains the information that was returned by the Lambda function, if any\. | 

## S3 Service<a name="cloud-canvas-cgf-aws-behavior-context-reflections-s3-service"></a>

S3 behavior context reflections include classes and EBuses that interact with Amazon S3\.

### AWSBehaviorS3Upload Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviors3upload-class"></a>

Uploads a local file to an Amazon S3 bucket\.


**Properties**  

| Property | Description | 
| --- | --- | 
| string bucketName | Specifies the logical name in Cloud Canvas for the destination Amazon S3 bucket\. | 
| string contentType | Specifies the MIME file type of the file to be uploaded\. | 
| string keyName | Specifies the destination key for the file\. The destination key is the file name that appears in Amazon S3 and must be unique to the bucket\. | 
| string localFileName | Specifies the fully qualified path name of the local file to be uploaded\. | 


**Methods**  

| Method | Description | 
| --- | --- | 
| void Upload\(\) | Uploads the file with the specified properties\. | 

#### AWSBehaviorS3UploadNotificationsBus<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviors3uploadnotificationsbus"></a>

The `AWSBehaviorS3UploadNotificationsBus` has the following methods\.


**Methods**  

| Method | Description | 
| --- | --- | 
| void OnError\(string errorBody\) | Called when the file upload fails\. The errorBody parameter contains the error information returned by Amazon S3, if any\. | 
| void OnSuccess\(string resultBody\) | Called when the file upload succeeds\. The resultBody parameter contains the information that is returned by Amazon S3, if any\. | 

### AWSBehaviorS3Download Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviors3download-class"></a>

Downloads a file from an Amazon S3 bucket to the local file system\.


**Properties**  

| Property | Description | 
| --- | --- | 
| string bucketName | Specifies the logical name in Cloud Canvas for the Amazon S3 source bucket\. | 
| string keyName | Specifies the key name \(the file name\) of the Amazon S3 source file\. | 
| string localFileName | Specifies the fully qualified path of the location to which the downloaded file is written\. | 


**Methods**  

| Method | Description | 
| --- | --- | 
| void Download\(\) | Downloads the file with the specified properties\. | 

#### AWSBehaviorS3DownloadNotificationsBus<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviors3downloadnotificationsbus"></a>

The `AWSBehaviorS3DownloadNotificationsBus` has the following methods\.


**Methods**  

| Method |  | 
| --- | --- | 
| void OnError\(string errorBody\) | Called when the file download fails\. The errorBody parameter contains error information returned by Amazon S3\. | 
| void OnSuccess\(string resultBody\) | Called when the file download succeeds\. The resultBody parameter contains information returned by Amazon S3\. | 

### AWSBehaviorS3Presign Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviors3presign-class"></a>

Provides a presigned URL for a specified Amazon S3 file\. This is a URL that can be shared that allows authenticated access to the specified file\.


**Properties**  

| Property | Description | 
| --- | --- | 
| string bucketName | Specifies the logical name in Cloud Canvas for the target S3 bucket\. | 
| string keyName | Specifies the key name \(the file name\) of the target Amazon S3 file\. | 
| string requestMethod | The HTTP method to generate for the URL\. Valid strings are PUT, POST, DELETE, and GET\. | 


**Methods**  

| Method | Description | 
| --- | --- | 
| void Presign\(\) | Gets a presigned URL for the specified Amazon S3 file\. | 

#### AWSBehaviorS3PresignNotificationsBus<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviors3presignnotificationsbus"></a>

The `AWSBehaviorS3PresignNotificationsBus` has the following methods\.


**Methods**  

| Method | Description | 
| --- | --- | 
| void OnError\(string errorBody\) | Called when the operation fails\. The errorBody parameter contains error information returned by Amazon S3\. | 
| void OnSuccess\(string resultBody\) | Called when the operation succeeds\. The resultBody parameter contains the presigned URL returned by Amazon S3\. | 

## Utilities<a name="cloud-canvas-cgf-aws-behavior-context-reflections-utilities"></a>

Utility classes and EBuses provide functionality for HTTP, JSON, URL, and string operations\.

### AWSBehaviorHTTP Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviorhttp-class"></a>

The `AWSBehaviorHTTP` class implements a simple general\-purpose HTTP `GET` request\. You can use the class to get any webpage or presigned URL\.


**Properties**  

| Property | Description | 
| --- | --- | 
| string URL | The URL to get\. | 


**Methods**  

| Method | Description | 
| --- | --- | 
| void Get\(\) | Gets the URL specified by the URL property\. | 

#### AWSBehaviorHTTPNotificationsBus<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviorhttpnotificationsbus"></a>

The `AWSBehaviorHTTPNotificationsBus` has the following methods\.


**Methods**  

| Method | Description | 
| --- | --- | 
| void OnSuccess\(string resultBody\) | Called when the GET operation succeeds\. The resultBody parameter contains the request response body\. | 
| void OnError\(string errorBody\) | Called when the GET operation fails\. The errorBody parameter contains the error body\. | 
| void GetResponse\(int responseCode, StringMap headerMap, string contentType, string responseBody\) |  Called when the request returns a response\. The parameters contain the following information: `responseCode` – The HTTP response code\. `headerMap` – Contains all the header information\. It can be passed to a [StringMap](#cloud-canvas-cgf-aws-behavior-context-reflections-stringmap-class) `map` property\. `contentType` – Contains the MIME content type for the response data\. `responseBody` – Contains the response data in string format\.  | 

### JSON Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-json-class"></a>

Traverses and parses JSON data\. This class reads but does not write JSON data\. To write JSON data, use the string utilities provided in the language that you are using\.

Some languages do not provide iterator support for JSON\. To accommodate these languages, the `JSON` class maintains a current value state that gets updated as it traverses the tree of JSON data\. Because JSON data consists of objects and arrays, the current value is either the value of the current object key or the value at the current position in the array\. For examples, see the sample code in the `\dev\CloudGemSamples\Scripts\AWSBehaviorJSONTest.lua` file\.

The `JSON` class has no properties\. The following table lists its methods\.


**Methods**  

| Method | Description | 
| --- | --- | 
| int EnterArray\(\) | If the current value is an array, sets the current value to the first element of the array and returns the number of array elements\. | 
| void EnterObject\(string key\) | If the current value is an object, sets the current value to the value of the specified key\. | 
| void ExitArray\(\) | If the current value was set by using EnterArray, sets the current value to the array that was entered before the call to EnterArray\. | 
| void ExitCurrentObject\(\) | If the current value was set by using EnterObject, sets the current value to the object that was entered before the call to EnterObject\. | 
| void FromString\(string JSONString\) | Loads the JSON object from a JSON string\. Parsing errors are logged to the console\. | 
| boolean GetBoolean\(\) | If the current value is a Boolean, returns the value of the Boolean\. If the current value is not a Boolean, returns false\. | 
| double GetDouble\(\) | If the current value is a double, returns the value of the double\. If the current value is not a double, returns 0\. | 
| integer GetInteger\(\) | If the current value is an integer, returns the value of the integer\. If the current value is not an integer, returns 0\. | 
| string GetString\(\) | If the current value is a string, returns the value of the string\. If the current value is not a string, returns an empty string\. | 
| boolean IsArray\(\) | Returns true only if the current value is an array\. | 
| boolean IsBoolean\(\) | Returns true only if the current value is a Boolean\. | 
| boolean IsDouble\(\) | Returns true only if the current value is a double\. | 
| boolean IsInteger\(\) | Returns true only if the current value is an integer\. | 
| boolean IsObject\(\) | Returns true only if the current value is an object\. | 
| boolean IsString\(\) | Returns true only if the current value is a string\. | 
| void LogToDebugger\(\) | Displays the entire JSON object in the console in human readable format\. | 
| boolean NextArrayItem\(\) | Sets the current value to the next element of the array\. If the current element is the last element in the array, returns false\. | 
| string ToString\(\) | Returns the entire JSON object as a string\. | 

The JSON class has no corresponding EBus\.

### AWSBehaviorURL Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviorurl-class"></a>

The `AWSBehaviorURL` class provides "URL decode" functionality\. It removes any escape characters from the specified URL and returns the resulting string\.


**Properties**  

| Property | Description | 
| --- | --- | 
| string URL | The URL to decode\. | 


**Methods**  

| Method | Description | 
| --- | --- | 
| void Decode\(\) | Decodes the specified URL\. | 

#### AWSBehaviorURLNotificationsBus<a name="cloud-canvas-cgf-aws-behavior-context-reflections-awsbehaviorurlnotificationsbus"></a>

The `AWSBehaviorURLNotificationsBus` has the following methods\.


**Methods**  

| Method | Description | 
| --- | --- | 
| void OnError\(string error\) | Called if the URL was not successfully decoded\. The error parameter contains the reasons for the failure\. | 
| void OnSuccess\(string result\) | Called if the URL was successfully decoded\. The result parameter contains the decoded string\. | 

### StringMap Class<a name="cloud-canvas-cgf-aws-behavior-context-reflections-stringmap-class"></a>

A simple mapping of string key–value pairs\. The `StringMap` class is most often used with the HTTP `Get` class but is useful for general string map operations\.


**Properties**  

| Property | Description | 
| --- | --- | 
| map | Contains a string map that was received from another method for parsing\. | 


**Methods**  

| Method | Description | 
| --- | --- | 
| void Clear\(\) | Removes all key–value pairs from the map\. | 
| int GetSize\(\) | Returns the number of key–value pairs currently stored in the map\. | 
| string GetValue\(string key\) | Returns the value at the specified key\. If the key that was specified doesn't exist, returns an empty string without adding the key to the map\. | 
| boolean HasKey\(string key\) | Returns true if the map contains the specified key\. | 
| void LogToDebugger\(\) | Displays all key–value pairs in the console\. | 
| void RemoveKey\(string key\) | Removes the key–value pair from the map that corresponds to the specified key\. If the specified key does not exist, fails without returning an error\. | 
| void SetValue\(string key, string value\) | Sets the value of the specified key to the specified value\. If the key doesn't exist, the key–value pair is added to the map\. If the key does exist, its existing value is overwritten with the specified value\. | 

The `StringMap` class has no corresponding EBus handlers\.