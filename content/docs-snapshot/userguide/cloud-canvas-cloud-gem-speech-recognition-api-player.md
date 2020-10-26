# Speech Recognition Player API<a name="cloud-canvas-cloud-gem-speech-recognition-api-player"></a>

You can use the Speech Recognition Cloud Gem player API to send audio recordings or text to a bot for intent processing\.

## POST /service/postaudio<a name="cloud-canvas-cloud-gem-speech-recognition-api-player-post-servicepostaudio"></a>

Sends an audio recording to a bot for intent processing\. If the bot matches the recorded speech as an intent, it is returned with any necessary follow\-up information\. If the speech is not recognized, status information is returned\. For information on the field formats and response parameters, see [PostContent](https://docs.aws.amazon.com/lex/latest/dg/API_runtime_PostContent.html) in the *Amazon Lex Developer Guide*\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| user\_id | string | Identifies the player to Amazon Lex for session tracking purposes\. | 
| bot\_name | string | Name of the bot to use for intent matching\. | 
| bot\_alias | string | Alias of the bot version to use for intent matching\. | 
| audio | base64 string | Base64 encoded 16\-bit 16\-kHz single channel audio PCM with a \.wav header of recorded speech\. | 
| session\_attributes | string | Contains information that is passed through to the response to allow metadata to appear in the response\. | 


**Response Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| intent | string | If an intent is matched, contains the name of the intent\. | 
| dialog\_state | string | The Amazon Lex interaction state\. For more information, see [PostContent](https://docs.aws.amazon.com/lex/latest/dg/API_runtime_PostContent.html) in the Amazon Lex Developer Guide\. | 
| input\_transcript | string | Transcript of the words that are recognized by Amazon Lex\. | 
| message | string | Status message to convey, if required\. | 
| session\_attributes | string | Information passed from API parameters\. | 
| slots | string | The slot information that was recognized in the form of JSON name–value pairs\. | 
| slot\_to\_elicit | string | If slot information needs to be elicited, specifies the slot that the response state elicits\. | 

## POST /service/posttext<a name="cloud-canvas-cloud-gem-speech-recognition-api-player-post-serviceposttext"></a>

Sends text to a bot for intent processing\. This is intended as a debugging function to help test the bot setup\. You can also use the function for custom speech recognition\. If the bot matches the recorded speech as an intent, it is returned with follow\-up information if required\. If the speech is not recognized, status information is returned\. For information on field formats and response parameters, see [PostContent](https://docs.aws.amazon.com/lex/latest/dg/API_runtime_PostContent.html) in the *Amazon Lex Developer Guide*\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| user\_id | string | Identifies the player to Lex for session tracking purposes\. | 
| bot\_name | string | Name of the bot to use for intent matching\. | 
| bot\_alias | string | Alias of the bot version to use for intent matching\. | 
| text | string | Text to send for intent matching\. | 
| session\_atrributes | string | Information to be passed through to the response to allow metadata to be in the response\. | 

**Response Parameters**  
The response parameters for `posttext` are the same as those for `postaudio`\.