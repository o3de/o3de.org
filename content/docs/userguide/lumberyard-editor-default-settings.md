# Restoring the Default Layout for Lumberyard Editor<a name="lumberyard-editor-default-settings"></a>

If you customized your workspace, you can reset Lumberyard Editor to use the default layout\. This restores your editors, tools, and windows to the default view that you see when you open Lumberyard Editor for the first time\. You can restore the default layout at any time\. 

**Contents**
+ [Restoring the Component Entity Layout](#lumberyard-editor-restore-default-layout)
+ [Restoring the Legacy Layout](#lumberyard-editor-restore-legacy-layout)

## Restoring the Component Entity Layout<a name="lumberyard-editor-restore-default-layout"></a>

The component entity layout is the default view for Lumberyard Editor\. If you customize your settings and tools, you can restore the default layout for Lumberyard Editor\.

**To use the component entity layout \(default\)**
+ In Lumberyard Editor, do one of the following:
  + Click **View**, **Layouts**, **Component Entity Layout**\.
  + Click **View**, **Layouts**, **Restore Default Layout**\.

  The following example shows the component entity layout in Lumberyard Editor:  
![\[Component entity layout in Lumberyard Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/lumberyard-editor-component-entity-layout.png)

**Note**  
Resetting Lumberyard Editor to the default layout does not reset the layout for individual tools, such as the **Script Canvas** editor or the **Particle Editor**\.
You can enable the CryEntity Removal gem to disable all [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy) features from Lumberyard Editor\. Legacy features will eventually be removed\. If you enable this gem, the legacy layout view is removed from Lumberyard Editor\. For more information, see [CryEntity Removal Gem](gems-system-cryentity-removal-gem.md)\.

## Restoring the Legacy Layout<a name="lumberyard-editor-restore-legacy-layout"></a>

If you don't enable the CryEntity Removal gem, you can switch back to the legacy layout\. 

**To use the legacy layout**
+ In Lumberyard Editor, click **View**, **Layouts**, **Legacy Layout**\.

  The following example shows the legacy layout in Lumberyard Editor:  
![\[Legacy layout in Lumberyard Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/lumberyard-editor-legacy-layout.png)

If you require more granular control to restore Lumberyard Editor settings, you can delete the relevant keys in the Windows registry\.

**Important**  
Exercise caution when editing the Windows registry\. Not following the instructions carefully can result in a corrupt Windows installation\.

**To edit the Windows registry**

1. On your Windows desktop, click **Start** and enter **regedit** in the search box\.

1. In the **Registry Editor**, go to `HKEY_CURRENT_USER\Software\Amazon\Lumberyard\Editor`\.

1. Right\-click the `fancyWindowLayouts` and `mainWindowLayouts` folder icons and choose **Delete**\. This deletes custom layout settings that you have for Lumberyard Editor\.

   The default settings are restored the next time you start Lumberyard Editor\.