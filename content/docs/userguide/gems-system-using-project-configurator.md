# Enabling Gems<a name="gems-system-using-project-configurator"></a>

You can enable gems using the Project Configurator or from a command line\. To enable a gem from a command line, see [Gems Commands](lmbr-exe-gem.md)\.

**To enable gems with the Project Configurator**

1. Open the Lumberyard Project Configurator, located at `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\.

1. In the Project Configurator, select your active game project and choose **Set as default**\.

1. Click **Enable Gems**\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems-system-gems-enable-gems.png)

1. Select the gems that you want to enable\.  
![\[Gems add assets and features to your game project in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems-system-gems-select-gems.png)

1. Click **Save**\.

1. If you enabled gems labeled **CODE & ASSETS**, you must build your game project to make the gems available in Lumberyard Editor\. If you enabled only gems labeled **ASSETS ONLY**, you do not need to build your game project before opening it in Lumberyard Editor\. 

   For more information, see [Building Lumberyard projects](game-build-intro.md)\.  
![\[Gems that include codes and assets require building your game project. Build your game project using the lmbr_waf build command to enable gems.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems-system-gems-assets-only.png)