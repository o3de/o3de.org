# Microphone Gem<a name="gems-system-gem-microphone"></a>

The Microphone Gem is a dependency for the [Cloud Canvas Speech Recognition Gem](gems-system-gem-aws-cloud-gems.md)\. This means that when you enable the Cloud Canvas Speech Recognition Gem in the Project Configurator, the Microphone Gem is also automatically added\.

The Microphone Gem's API is located at `\dev\Code\CryEngine\CryCommon\MicrophoneBus.h`\.

This gem connects to a hardware recording device and enables you to capture an audio signal\. Before running the game or editor, set the default recording device in your Operating System\. Check your levels and adjust the gain accordingly\. Once set up, the Microphone Gem connects to that device at application startup\. Capturing starts when you start a capturing session and stops when you end the capturing session\.

Clients using the mic data are expected to consume the data at a pace that meets or exceeds the data rate of the microphone\. If consumption rate is too slow, the captured data can lag progressively behind real\-time\.

When consuming samples, you can specify a desired output format configuration, and the output is automatically converted\.

Note the following:
+ Only Windows is currently supported\.
+ Mono and stereo configurations only are supported for microphone input and client output\.
+ Only linear PCM samples are supported\. This can be in either IEEE float \(32\-bit\) or 16\-bit signed integer formats\. Typically mics will capture float samples\.
+ Hardware configuration changes, such as changing the default recording device, aren't handled at run time\.
+ Choosing a device to connect to is not yet supported\. The Microphone gem connects only to the default device\.
+ Only a single consumer should be used\. This is because consuming samples from the Microphone gem advances the read position of internal buffers containing the mic data\. If two clients attempt to consume the data, each client obtains only portions of the original data\.