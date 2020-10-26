# Slot Types<a name="cloud-canvas-cloud-gem-speech-recognition-api-slots"></a>

You can use the following operations to manage slot types\.

## GET /admin/listbuiltinslottypes/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-slots-get-adminlistbuiltinslottypesnext-token"></a>

Returns a list of built\-in slot types\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| next\_token | string | Specifies a pagination token to pass to a call to retrieve the next page of built\-in slot types\. To retrieve the first page of built\-in slot types, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| slotTypes | array | Contains information about built\-in slot types\. | 
| nextToken | string | Contains a pagination token to pass to retrieve the next page of built\-in slot types\. If no additional pages exist, the string is empty\. | 

## GET /admin/listcustomslottypes/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-get-adminlistcustomslottypesnext-token"></a>

Returns a list of custom slot types\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| next\_token | string | Specifies a pagination token to pass to retrieve the next page of custom slot types\. To retrieve the first page of custom slot types, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| slotTypes | array | Contains custom slot type information\. | 
| nextToken | string | Contains a pagination token to pass to retrieve the next page of custom slot types\. If no additional pages exist, the string is empty\. | 

## PUT /admin/slottype<a name="cloud-canvas-cloud-gem-speech-recognition-api-put-adminslottype"></a>

Creates a custom slot type or replaces an existing custom slot type\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| slotType | object | Describes the slot type to create or update\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the custom slot type is created or updated, or another state as defined by the Amazon Lex [PutSlotType](https://docs.aws.amazon.com/lex/latest/dg/API_PutSlotType.html) API\. | 

## DELETE /admin/slottype/*\{name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-delete-adminslottypename"></a>

Deletes all versions of the slot type\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the slot type to delete\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains DELETED or an error message\. | 

## GET /admin/slottype/versions/*\{name\}*/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-get-adminslottypeversionsnamenext-token"></a>

Returns information about all the versions of a slot type\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the slot type\. | 
| next\_token | string | Specifies a pagination token to pass to retrieve the next page of slot type versions\. To retrieve the first page of slot type versions, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| intents | array | Contains slot type version information\. | 
| nextToken | string | Contains a pagination token to pass to retrieve the next page of slot type versions\. If no additional pages exist, the string is empty\. | 

## GET /admin/slottype/*\{name\}*/*\{version\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-get-adminslottypenameversion"></a>

Returns information about a specific version of a slot type\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the slot type to return\. | 
| version | string | The version of the slot type to return\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| slotType | object | Contains information about the specified version of the slot type\. | 

## PUT /admin/slottype/version/*\{name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-put-adminslottypeversionname"></a>

Creates a new version of the slot type based on the latest version\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the slot type\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the custom slot type version is created, or another state as defined by the Amazon Lex [CreateSlotTypeVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateSlotTypeVersion.html) API\. | 