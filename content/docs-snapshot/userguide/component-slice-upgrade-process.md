# Converting Slices with the Slice Upgrade Pipeline<a name="component-slice-upgrade-process"></a>

In v1\.23, Amazon Lumberyard introduced a new file format for component slices\. Specifically, the override data found in data patches is now stored in a readable XML format instead of a hexadecimal byte stream\. This is useful when performing diff and merge operations on your slice files, and enables a more robust versioning system for your serialized components\. Use the Slice Upgrade Pipeline to automatically convert slice files to the latest slice file format\.

**Note**  
For more information about this new data patch format, and an example, see [Anatomy of a Slice Data Patch](dynamic-slices-overview-anatomy.md#slice-data-patch-anatomy)\.

## When do I use the Slice Upgrade Pipeline?<a name="slice-upgrade-when"></a>

Use the Slice Upgrade Pipeline in Lumberyard v1\.23 or later when:
+ Adding a slice that was saved using an older version of the slice file format\.
+ Installing a new version, such as v1\.23, or a build of Lumberyard that makes changes to the slice file format\.
+ Asset Processor logs indicate that your project has slices that require an upgrade\. If so, the log displays a warning similar to the following:

  ```
  This slice file is out of date: C:\lumberyard_version\dev\MyGame\slices\myslice.slice 
  To enable automatic upgrades:
  In the settings file SliceBuilderSettings.json, set EnableSliceConversion to true and restart Asset Processor
  ```

**Note**  
Currently, this pipeline does not update your slices when changing your component serialization\. If you want to do that, use the **Resave All Slices** command on the **File** menu in Lumberyard Editor \.

It is important to upgrade your slice assets as soon as possible, because:
+ You can read, edit, and merge data patches more efficiently in upgraded slice assets\.
+ Upgrading your slices lets you use the new TypeChange and NameChange class builders when versioning your components\. For more information about the component versioning system, see [Versioning your Component Serialization](component-entity-system-versioning.md)\.
+ Delaying the upgrade puts you at a heightened risk of losing data in the future when changing serialization of your components\. For more information about this risk, see [Avoiding Data Loss when Serializing Component Data](best-practices-for-component-data-serialization.md)\.

**Note**  
In Lumberyard v1\.23 and later, any slices with data patches still using the old format are updated automatically when changes are pushed to them\. This is regardless of the slice conversion setting\.

## How do I convert my slices using the Slice Upgrade Pipeline?<a name="slice-upgrade-how"></a>

Enable the Slice Upgrade Pipeline and restart Asset Processor to convert your slice files to the new format\.

**Perform the following steps:**

1. Ensure that all source slice files are writable\.
   + If you're using Perforce, recursively check out all the slice files that you want to upgrade by running the following Perforce command: p4 edit \.\.\.\\\*\.slice

     You must change any read\-only slices not tracked by Perforce to read\-write manually\.

1. Enable deep slice resaving in the file `SliceBuilderSettings.json`\. This file is in your root dev directory\. Open the file and change the setting **EnableSliceConversion** to **true**\. By default, this option is disabled\.

1. Restart Asset Processor\.

   1. Close Lumberyard Editor\.

   1. In the Windows taskbar, right\-click Asset Processor, and choose **Quit** or press **Ctrl\+Q**\.

   1. Restart the project or branch that you are working on\. Asset Processor automatically starts\.

1. On the **Tools** tab in Asset Processor, trigger a **Full Scan** of assets\.\.  
![\[Click Start Scan for Asset Processor to find all the slice files to convert to the new format.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/asset-processor-start-scan.png)
**Note**  
For more information about using Asset Processor, see [Using Asset Processor](asset-pipeline-processor.md)\.

1. Open Asset Processor logs\. Confirm that there are no warning messages about slice files that are out of date or failed to convert\.

After you perform these steps, while the Slice Upgrade Pipeline remains enabled, and Asset Processor is running, any slices that you copy or pull into your project are automatically converted by Asset Processor to the new format\. A restart and full scan is not needed in this case\.

## Troubleshooting the Slice Upgrade Pipeline<a name="slice-upgrade-troubleshooting"></a>

Look at Asset Processor logs for slice files that failed conversion or display warnings\. The following sections describe problems you might encounter\.

### Warnings in the Slice Builder Settings File<a name="slice-upgrade-troubleshooting-settings"></a>

The Slice Upgrade Pipeline requires the settings file `SliceBuilderSettings.json` to be present in the `lumberyard_version\dev` folder\. The default content of this file is:

```
{
    "EnableSliceConversion": false
}
```

If there are problems with this file, one of the following warnings may appear in the Asset Processor log:
+ `Error in Slice Builder Settings File. Using Default Slice Builder Settings.`
+ `Failed to Load Slice Builder Settings File. Using Default Slice Builder Settings.`
+ `Slice Builder Settings File Missing. Using Default Slice Builder Settings.`
+ `Loading Slice Builder Settings Failed. Using Default Slice Builder Settings.`

Make sure the settings file exists in the correct location, is not open in another application, and contains the json content shown above\.

### Slice Dependency<a name="slice-upgrade-troubleshooting-dependency"></a>

If a nested slice is missing dependencies, the upgrade process fails because the slice instantiation failed\. Correct the dependency problem to continue the upgrade\.

```
Failed to Upgrade Slice: SlicePath - Slice Instantiation Failed.
```

### Read\-Only Files<a name="slice-upgrade-troubleshooting-readonly"></a>

Slices marked as read\-only fail to process with the following log output:

```
This slice file is out of date: SlicePath
To Enabled Automatic Upgrades:
Make sure the slice isn't marked Read-Only. If using Perforce, check out the slice file.
```

### Renaming the source slice file<a name="slice-upgrade-troubleshooting-other"></a>

During the upgrade process, if the source slice file cannot be renamed for any reason, one of the following errors may appear in the Asset Processor log:
+ `Failed to Upgrade Slice: SlicePath - Could not rename existing file`
+ `Failed to Upgrade Slice: SlicePath - Could not rename new slice temp file`
+ `Failed to Upgrade Slice: SlicePath - Could not open replacement slice file for writing`
+ `Failed to Upgrade Slice: SlicePath - Could not write replacement slice file`

If any of these errors appear, make sure the slice file is not open in another application, and that the file can be written to the directory where the source slice is located\.