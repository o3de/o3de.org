# Intents<a name="cloud-canvas-cloud-gem-speech-recognition-api-intents"></a>

Use the following API commands to manage intents\.

## GET /admin/listbuiltinintents/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-intents-get-adminlistbuiltinintentsnext-token"></a>

Returns a list of built\-in intents\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| next\_token | string | Specifies a pagination token to pass to retrieve the next page of built\-in intents\. To retrieve the first page of built\-in intents, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| intents | array | Contains information about built\-in intents\. | 
| nextToken | string | Contains a pagination token to pass to retrieve the next page of built\-in intents\. If no additional pages exist, the string is empty\. | 

## GET /admin/listcustomintents/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-intents-get-adminlistcustomintentsnext-token"></a>

Returns a list of custom intents\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| next\_token | string | Specifies a pagination token to pass to retrieve the next page of custom intents\. To retrieve the first page of custom intents, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| intents | array | Contains custom intent information\. | 
| nextToken | string | Contains a pagination token to pass to retrieve the next page of custom intents\. If no additional pages exist, the string is empty\. | 

## GET /admin/builtinintent/*\{name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-get-adminbuiltinintentname"></a>

Returns information about a built\-in intent\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the built\-in intent to return\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| intent | object | Contains information about the built\-in intent\. | 

## PUT /admin/intent<a name="cloud-canvas-cloud-gem-speech-recognition-api-put-adminintent"></a>

Creates an intent or replaces an existing intent\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| intent | object | The intent description, describing the intent to create or update\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the intent is created or updated, or another state as defined by the Amazon Lex [PutIntent](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html) API\. | 

## DELETE /admin/intent/*\{name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-delete-adminintentname"></a>

Deletes all versions of the intent\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the intent to delete\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains DELETED or an error message\. | 

## GET /admin/intent/versions/*\{name\}*/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-get-adminintentversionsnamenext-token"></a>

Returns information about all the versions of an intent\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the intent\. | 
| next\_token | string | Specifies a pagination token to pass to retrieve the next page of intent versions\. To retrieve the first page of intent versions, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| intents | array | Contains intent versions information\. | 
| nextToken | string | Contains a pagination token to pass to retrieve the next page of intent versions\. If no additional pages exist, the string is empty\. | 

## GET /admin/intent/*\{name\}*/*\{version\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-get-adminintentnameversion"></a>

Returns information about a custom intent\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the intent to get\. | 
| version | string | The version of the intent to get\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| intent | object | Information about a custom intent\. | 

## GET /admin/intentdependency<a name="cloud-canvas-cloud-gem-speech-recognition-api-get-adminintentdependency"></a>

Returns the dependency of each intent\.


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| dependency | object | Contains the dependency information of all the intents\. | 

## PUT /admin/intent/version/*\{name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-put-adminintentversionname"></a>

Creates a new version of an intent based on the latest version of the intent\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the intent for which you want to create a new version\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the intent version is created, or another state as defined by the Amazon Lex [CreateIntentVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateIntentVersion.html) API\. | 