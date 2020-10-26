# Text\-to\-Speech Cloud Gem Service API Reference<a name="cloud-canvas-cloud-gem-text-to-speech-service-api"></a>

You can use the following API operations on the text\-to\-speech service\.


****  

| Operation | Verb | Description | 
| --- | --- | --- | 
| /service/status | GET | Returns the service's status\. This operation is useful for testing connectivity to the service\. | 
| /characters | GET | Gets a list of all existing characters\. | 
| /character | POST | Creates a new character\. | 
| /characterlib | GET | Gets complete character information for all characters\. | 
| /character/\{name\} | DELETE | Deletes a character\. | 
| /character/\{name\} | GET | Gets all character data for the specified character\. | 
| /cgp/speechlib/preview | POST | Gets the audio preview of a speech line\. This operation is similar to /tts/voiceline but ignores the /tts/runtimecapabilities settings\. | 
| /speechlib/import | POST | Imports speech library entries\. This operation implements the custom file import feature in the Cloud Gem Portal\. | 
| /speechlib/filter | POST | Uses the specified tags to return a subset of speech library entries\. | 
| /speechlib | POST | Adds an entry to the speech library\. | 
| /speechlib | DELETE | Deletes an entry from the speech library\. | 
| /speechlib | GET | Gets a list of all entries in the speech library\. | 
| /tts/runtimecapabilities | POST | Configures the Amazon Polly backend to accept or reject runtime text to speech generation requests from the client\. | 
| /tts/runtimecapabilities | GET | Returns whether the Amazon Polly backend allows runtime generation of text\-to\-speech files\. | 
| /tts/exporter | POST | Starts the packaging of multiple voice or speech mark files for offline use\. | 
| /tts/voiceline | POST | Uses Amazon Polly to generate the audio for a line\. | 
| /tts/speechmarks | POST | Uses Amazon Polly to generate the speech marks for a line\. | 
| /languages | GET | Returns a list of all languages supported by Amazon Polly\. | 
| /voice/language/\{voiceId\} | GET | Gets the language of a specific Amazon Polly voice\. | 
| /voicelist/language/\{language\} | GET | Gets the IDs of all voices provided by Amazon Polly for a given language\. | 
| /voicelist | GET | Gets the IDs of all voices provided by Amazon Polly\. | 