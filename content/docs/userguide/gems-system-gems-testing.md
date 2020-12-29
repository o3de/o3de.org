# Testing Your Gem<a name="gems-system-gems-testing"></a>

After you move your assets into the gem's directory structure, you can enable your new gem in your game project and test it in Lumberyard\.

**To enable and test your new gem**

1. Open the Project Configurator by doing one of the following:
   + Open Lumberyard Setup Assistant and on the **Summary** page, click **Configure project**\.
   + Open the Lumberyard Project Configurator directly from `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\.

1. [Enable](gems-system-using-project-configurator.md) your new gem\.

1. Close the **Project Configurator**\.

1. Launch Lumberyard and open a level\.

1. Use the **Asset Browser** to place the gem's assets into your scene\. Verify that your assets look as intended\. If they don't, verify that you have set up the directories correctly\.