# Text to Speech Cloud Gem \(Using Amazon Polly\)<a name="cloud-canvas-cloud-gem-text-to-speech-intro"></a>

You can use the Text\-to\-Speech \(TTS\) Cloud Gem to enhance your gameplay and workflows with synthesized speech\. The Cloud Canvas Text\-to\-Speech \(TTS\) Cloud Gem uses [Amazon Polly](https://aws.amazon.com/polly/), which is a text\-to\-speech service that turns text into lifelike speech\. Amazon Polly offers dozens of lifelike voices in a variety of languages\. The service also creates lip synchronization from the text that you provide\. You can import the generated audio and [speech mark](https://docs.aws.amazon.com/polly/latest/dg/speechmarks.html) files into your dialogue system\. Currently, the Text\-to\-Speech Gem supports playback of PCM \([pulse\-code modulation](https://en.wikipedia.org/wiki/Pulse-code_modulation)\) files\.

You can use the text\-to\-speech service in two ways:
+ You can prepackage speech content and include it with your game so that your clients can access it immediately\.
+ Your clients can invoke the Amazon Polly service to provide text to speech while your game is running\.

In the first approach, you prepare voices and dialogues that players require and store them on the client\. This removes the need for the client to connect to the backend to generate and download lines that are known to be necessary\. The trade\-off is that the client must store the files locally\.

**Topics**
+ [Text\-to\-Speech Cloud Gem Portal](cloud-canvas-cloud-gem-text-to-speech-cgp.md)
+ [Using the Text\-to\-Speech Sample Level](cloud-canvas-cloud-gem-text-to-speech-sample-level-using.md)
+ [Creating a Wwise Project for Runtime Text\-to\-Speech](cloud-canvas-cloud-gem-text-to-speech-wwise.md)
+ [Configuring Runtime Capabilities and Caching](cloud-canvas-cloud-gem-text-to-speech-runtime.md)
+ [Text\-to\-Speech Gem Implementation Details](cloud-canvas-cloud-gem-text-to-speech-details.md)
+ [Lip Synchronization with EMotion FX](cloud-canvas-cloud-gem-text-to-speech-emotionfx.md)
+ [Text\-to\-Speech Cloud Gem Service API Reference](cloud-canvas-cloud-gem-text-to-speech-service-api.md)