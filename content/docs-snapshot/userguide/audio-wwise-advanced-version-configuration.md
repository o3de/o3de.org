# Using a Different Wwise Version<a name="audio-wwise-advanced-version-configuration"></a>

Lumberyard officially supports Wwise LTX version 2018\.1\.2\.6762 and Wwise full version 2018\.1\.4\.6807\.

 You can also use an older or newer version of Wwise\. However, Lumberyard no longer supports versions 2016 and earlier\.

## Configuring an Earlier Version of Wwise for Lumberyard<a name="specify-an-older-version-of-wwise-for-lumberyard"></a>

 Follow this procedure to use the 2017 version of Wwise\.

**To configure Lumberyard for the 2017 version of Wwise**

1. Navigate to the `lumberyard_version\dev\Gems\AudioEngineWwise\Code` directory\.

1. In a text editor, open the `wwise_backwards_compatibility.README.txt` file\.

1. Follow the instructions in the file\. The following is an overview of the instructions\.

   1. Download a 2017 version of Wwise\.

   1. Copy the `Wwise_version\SDK` directory from the Wwise install directory to the `lumberyard_version\3rdParty\Wwise` directory\.

   1. In a text editor, open the `lumberyard_version\dev\SetupAssistantConfig.json` file and modify the version of Wwise in the file\.

      This configures Lumberyard Setup Assistant to look for that specific version instead\.

   1. Add a `.json` file that defines the Wwise 2017 SDK for WAF\.

1. After you complete these steps, run Lumberyard Setup Assistant and the `lmbr_waf configure` command to check for errors\. 

   If no errors occur, build Lumberyard Editor and Engine for Wwise 2017\.

## Configuring a Later Version of Wwise for Lumberyard<a name="specify-a-newer-version-of-wwise-for-lumberyard"></a>

Audiokinetic frequently releases new versions of Wwise\. Later versions might be compatible with the current version supported by Lumberyard without requiring major code changes\. However, minor revisions can contain API updates that require code changes in Lumberyard\. Major revisions can require code changes and deeper migration\.

If you want to switch to later versions of Wwise, use the following procedure\.

**To configure Lumberyard for a later version of Wwise**

1. Download the version of Wwise that you want\.

1. Copy the `Wwise_version\SDK` directory from the Wwise install directory to the `lumberyard_version\3rdParty\Wwise\your_new_wwise_version` directory\.

1. In a text editor, open the `lumberyard_version\dev\SetupAssistantConfig.json` file and replace all occurrences of **2018\.1\.4\.6807** with the version that you downloaded\.

   This configures Lumberyard Setup Assistant to look for the version that you specify\.

   `SetupAssistantConfig.json` contains a section for **Wwise** and a separate section for **Wwise LTX**\. Modify only the **Wwise** section\.

1. Save and close the `SetupAssistantConfig.json` file\.

1. Run Lumberyard Setup Assistant\. Then verify that the new Wwise SDK version is configured correctly on the **Install optional SDKs** page\.

   You'll notice that the setup instructions Lumberyard Setup Assistant still mention Wwise 2018\.1\.4\.6807\. You can ignore this text\.

1. Complete the steps to upgrade [Wwise](audio-wwise-upgrade.md)\.