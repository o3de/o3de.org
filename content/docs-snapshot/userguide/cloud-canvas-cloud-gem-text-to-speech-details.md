# Text\-to\-Speech Gem Implementation Details<a name="cloud-canvas-cloud-gem-text-to-speech-details"></a>

This topic provides information about the Text\-to\-Speech Gem's runtime speech generation, resources, `TextToSpeech` component, and troubleshooting\.

**Topics**
+ [Runtime Speech Generation](#cloud-canvas-cloud-gem-text-to-speech-details-runtime-speech-generation)
+ [Resource Group](#cloud-canvas-cloud-gem-text-to-speech-details-resource-group)
+ [TextToSpeech Component \(TextToSpeech\.h\)](#cloud-canvas-cloud-gem-text-to-speech-details-texttospeech-component)
+ [Text\-to\-Speech Troubleshooting Features](#cloud-canvas-cloud-gem-text-to-speech-details-troubleshooting)

## Runtime Speech Generation<a name="cloud-canvas-cloud-gem-text-to-speech-details-runtime-speech-generation"></a>

In runtime speech generation, the game client invokes the synthesized speech API to generate speech\. For improved performance, the game client checks two levels of cache to see if the speech is available locally before it invokes the Amazon Polly service\. The following diagram illustrates this process\.

![\[Speech generation workflow\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-details-1.png)

If the speech files are not available locally, Amazon Polly generates the speech files, stores them in an Amazon S3 bucket, and provides the client with a presigned URL to the bucket location\. The client downloads the files and uses [https://en.wikipedia.org/wiki/Audiokinetic_Wwise](https://en.wikipedia.org/wiki/Audiokinetic_Wwise) to play the speech audio\. The `SpeechComponent` uses the speech mark files to perform lip synchronization by calling the `SimpleAnimationComponent`, which plays the associated animations\.

## Resource Group<a name="cloud-canvas-cloud-gem-text-to-speech-details-resource-group"></a>

A Text\-to\-Speech Gem resource group contains the following resources\.

**SpeechLibTable \(DDB table\)** – A DynamoDB table that stores the speech lines and metadata for the characters in the `characterdefs` resource\.

**characterdefs \(Amazon S3 bucket\)** – An Amazon S3 bucket that contains `.json` character definition files\. A character is a logical grouping of settings \(including language and voice\) that is referenced when using Amazon Polly on data submitted to `SpeechLibTable`\.

**Service API** \- An Amazon API Gateway that the game client interacts with\. Only two API operations are accessible by game clients: one for generating speech audio, and one for generating speech marks for lip synchronization\. The remaining API operations are accessible only from the Cloud Gem Portal and generate speech on Amazon Polly\. To avoid generating text\-to\-speech content at run time, you can add the speech files to your game's asset directory\. For a listing of service API operations, see [Text\-to\-Speech Cloud Gem Service API Reference](cloud-canvas-cloud-gem-text-to-speech-service-api.md)\.

**ttscache** – An Amazon S3 bucket that holds all previously generated speech from Amazon Polly\. All speech generation requests check for a matching file in this cache before they call the Amazon Polly service\.

**PackageVoiceLines** – This Lambda function puts a list of speech lines from `SpeechLibTable` into a `.zip` file so that it can be downloaded\. The `.zip` file also contains mappings of characters to Amazon Polly voices\. The file is put into an Amazon S3 bucket named `packagedvoicelines`\.

## TextToSpeech Component \(TextToSpeech\.h\)<a name="cloud-canvas-cloud-gem-text-to-speech-details-texttospeech-component"></a>

The `TextToSpeech` component takes input text, converts it to an audio file, optionally creates a speech marks file, and calls `TextToSpeechPlaybackBus` to start playback and lip synchronization\.

The component has two functions that generate text to speech: `ConvertTextToSpeechWithoutMarks` and `ConvertTextToSpeechWithMarks`\.

After Amazon Polly returns the requested speech, the `TextToSpeech` component calls the `TextToSpeechPlaybackBus` to notify other components or scripts that the requested files are available\.

The `SpeechComponent` \(`SpeechComponent.h`\) implements the `TextToSpeechPlaybackBus::Handler`, which handles audio playback and lip synchronization\.

The `CloudGemTextToSpeechClientComponent` \(`CloudGemTextToSpeechClientComponent.h`\) enables the client to communicate with the AWS infrastructure and services\.

**Note**  
Starting in version 1\.12, Lumberyard uses [Animation Editor](char-intro.md) to implement lip synchronization\. For details, see [Lip Synchronization with EMotion FX](cloud-canvas-cloud-gem-text-to-speech-emotionfx.md)\.

## Text\-to\-Speech Troubleshooting Features<a name="cloud-canvas-cloud-gem-text-to-speech-details-troubleshooting"></a>

The Cloud Gem Portal **REST Explorer** and **Log** tabs offer troubleshooting capabilities\.

![\[REST explorer and logging features\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-details-2.png)

For information about the paths that you can use in REST explorer, see [Text\-to\-Speech Cloud Gem Service API Reference](cloud-canvas-cloud-gem-text-to-speech-service-api.md)\.