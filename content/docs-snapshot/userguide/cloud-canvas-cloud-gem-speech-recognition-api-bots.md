# Bots<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots"></a>

Use the following API commands to manage bots\.

## PUT /admin/botdesc<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-put-adminbotdesc"></a>

Sends a JSON bot description that creates or updates an existing bot\. Automatically assigns `current` as the bot alias\. For more information, see the [bot format specification on Github\.com](https://github.com/awslabs/aws-lex-web-ui/blob/master/templates/custom-resources/bot-definition.json)\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| desc\_file | object | Contains a JSON file that describes the bot to create\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Either ACCEPTED or a string that contains information about errors found in the desc file\. | 

## GET /admin/botdesc/*\{name\}*/*\{version\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-get-adminbotdescnameversion"></a>

Returns the JSON `desc` file for the specified bot name and version\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the bot for which to retrieve a desc file\. | 
| version | string | The version of the bot for which to retrieve a desc file\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| desc\_file | object | A bot description file for the requested bot\. | 

## GET /admin/listbots/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-get-adminlistbotsnext-token"></a>

Returns a list of up to 10 bots and information about them\. Returns a pagination token if more than 10 bots are to be returned\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| next\_token | string | Specifies a pagination token to pass to retrieve the next page of bots\. To retrieve the first page of bots, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| bots | array | A JSON array of bot information tables that include the bot name, current version, alias, status, time of creation, and time of update\. | 
| nextToken | string | Contains a pagination token to pass to listbots to retrieve the next page of bots\. If no additional pages exist, the string is empty\. | 

## GET /admin/numbots<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-get-adminnumbots"></a>

Returns a count of the total number of bots available\.

**Request Parameters**  
This command has no request parameters\.


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| numbots | integer | The total number of bots\. | 

## GET /admin/botstatus/\{bot\_name\}<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-get-adminbotstatusbot-name"></a>

Checks the creation status of a bot\. Returns `READY` when the bot is available for publishing and testing\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| bot\_name | string | The bot for which to retrieve status information\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the bot is available for testing or publishing, or another state as defined by the Amazon Lex [PutBot](https://docs.aws.amazon.com/lex/latest/dg/API_PutBot.html) API\. | 

## PUT /admin/bot<a name="cloud-canvas-cloud-gem-speech-recognition-api-put-adminbot"></a>

Creates an Amazon Lex conversational bot or replaces an existing bot\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| bot | object | Describes the bot to create or update\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the bot is created or updated, or another state as defined by the Amazon Lex [PutBot](https://docs.aws.amazon.com/lex/latest/dg/API_PutBot.html) API\. | 

## DELETE /admin/bot/*\{name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-delete-adminbotname"></a>

Deletes all versions of a bot from the account\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the bot to delete\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains DELETED or an error message\. | 

## GET /admin/bot/versions/*\{name\}*/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-get-adminbotversionsnamenext-token"></a>

Returns information about all the versions of a bot\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the bot for which versions should be returned\. | 
| next\_token | string | Specifies a pagination token to pass to retrieve the next page of bot versions\. To retrieve the first page of bot versions, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| bots | array | Contains bot information\. | 
| nextToken | string | Contains a token to pass to retrieve the next page of bot versions\. If no additional pages exist, the string is empty\. | 

## GET /admin/bot/*\{name\}*/*\{version\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-get-adminbotnameversion"></a>

Returns an existing Lex bot information\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the bot to get\. | 
| version | string | The version of the bot to get\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| bot | object | The information for the specific bot\. | 

## PUT /admin/bot/version/*\{name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-put-adminbotversionname"></a>

Creates a new version of the bot based on the latest version of the specified bot\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the bot for which you want to create a new version\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the bot version is created or another state as defined by the Amazon Lex [CreateBotVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateBotVersion.html) API\. | 

## GET /admin/listbotaliases/*\{name\}*/*\{next\_token\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-get-adminlistbotaliasesnamenext-token"></a>

Returns a list of aliases for a specified Amazon Lex bot\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the bot whose aliases you want to retrieve\. | 
| next\_token | string | Specifies a pagination token to pass to retrieve the next page of bot aliases\. To retrieve the first page of bot aliases, specify an empty string\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| aliases | array | A list of aliases for a specified Amazon Lex bot\. | 
| nextToken | string | Contains a pagination token to pass to retrieve the next page of bot aliases\. If no additional pages exist, the string is empty\. | 

## DELETE /admin/bot/alias/*\{name\}*/*\{bot\_name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-delete-adminbotaliasnamebot-name"></a>

Deletes an alias for the specified bot\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the alias to delete\. | 
| bot\_name | string | The name of the bot that the alias points to\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains DELETED or an error message\. | 

## GET /admin/bot/alias/*\{name\}*/*\{bot\_name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-get-adminbotaliasnamebot-name"></a>

Returns information about an Amazon Lex bot alias\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of the bot alias to for which to return information\. | 
| bot\_name | string | The name of the bot to which the alias points\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| alias | object | Contains information about an Amazon Lex bot alias\. | 

## PUT /admin/buildbot/*\{name\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-put-adminbuildbotname"></a>

Builds a bot for use by the client\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of bot to build\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the bot is successfully built, or an error message\. | 

## PUT /admin/publishbot/*\{name\}*/*\{version\}*<a name="cloud-canvas-cloud-gem-speech-recognition-api-bots-put-adminpublishbotnameversion"></a>

Publishes the bot for use by the client and assigns a version name\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| name | string | The name of bot to publish\. | 
| version | string | The version to assign this bot\. If a version is not specified, defaults to the latest version\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| status | string | Contains READY if the bot was successfully published, or an error message\. | 