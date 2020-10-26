# Legacy Sample Project \(GameSDK\)<a name="sample-project-legacy"></a>

Lumberyard provides a package named Legacy Game Sample that demonstrates how to use Lumberyard features such as CryAction and CryAISystem\. The fully functional game implements the necessary pieces that allow a game to communicate with some of Lumberyard's low\-level systems\. If you are familiar with CryEngine, the legacy game sample is a repurposed version of the GameSDK project\.

You can use the legacy game sample to evaluate changes you make to the engine core and ensure your changes do not have unintended side effects\. The legacy game sample is intended to be used as a reference for how to communicate with various systems of the Lumberyard engine\. We do not recommend using the legacy game sample as the starting point of a new game\.

**Note**  
The legacy game sample is Windows only and is not supported on console or mobile devices\. This sample is compatible with Lumberyard 1\.9 and earlier\.

**To download and access GameSDK**

1. Download the `GameSDK.zip` package at [Lumberyard Previous Versions](https://aws.amazon.com/lumberyard/downloads/previous-versions/) and extract it in your Lumberyard directory\. For example, `\lumberyard\1.x.0.0`\.

1. Open [Lumberyard Setup Assistant](lumberyard-launcher-using.md) and on the **Summary** page, click **Project Configurator**\.
**Note**  
To ensure that the GameSDK project launches, you must use Lumberyard Setup Assistant to open the Project Configurator\. Lumberyard Setup Assistant copies required SDKs from the `3rdParty` directory into the `dev\GameSDK` directory\.

1. In the Project Configurator, select **GameSDK**\.

1. Click **Set as default** and then close the Project Configurator\.

1. [Rebuild](gems-system-gems.md) the GameSDK project\.

1. Open Lumberyard Setup Assistant\. On the **Summary** page, click **Launch editor**\.

**Note**  
Audiokinetic Wave Works Interactive Sound Engine \(Wwise\) version 2014\.1\.14 or later is required to access audio for this project\.