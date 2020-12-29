# Configuring Runtime Capabilities and Caching<a name="cloud-canvas-cloud-gem-text-to-speech-runtime"></a>

You can use the **Settings** tab of the Cloud Gem Portal to enable or disable runtime capabilities and runtime caching\.

![\[Text to speech settings\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-runtime-1.png)

**Runtime Capabilities** – Runtime capabilities are required for game clients to generate speech files\. By disabling this option, you can save costs by having your game clients use only the pregenerated speech content that you include with your game\. This approach ensures that your game clients do not use Amazon Polly resources at run time\.

**Runtime Caching** – To cache files created by game clients for longer than one day, enable the **Runtime Caching** option\. You might want to enable this option to save compute resources if the speech that you generate is not likely to change often\. For more information about runtime speech generation, see [Text\-to\-Speech Gem Implementation Details](cloud-canvas-cloud-gem-text-to-speech-details.md)\.