# Using Dynamic Content Manager<a name="cloud-canvas-cloud-gem-dc-manager"></a>

You can use the Dynamic Content Cloud Gem and its Dynamic Content Manager to manage dynamic content updates for your game through AWS\. You can use Dynamic Content Manager to create manifests and packages, add files to the packages, and upload the manifest and packages to the AWS Cloud\. This ensures that your clients have the latest content for your game\.

**Topics**
+ [Managing Dynamic Content Packages](cloud-canvas-cloud-gem-dc-managing-packages.md)
+ [Using lmbr\_aws for Dynamic Content](cloud-canvas-cloud-gem-dc-lmbr-aws.md)
+ [Testing the Dynamic Content System](cloud-canvas-cloud-gem-dc-testing.md)
+ [Dynamic Content Engineering Details](cloud-canvas-cloud-gem-dc-engineering.md)

**Prerequisites**  
This tutorial assumes the following:
+ You are using a Lumberyard project that has the Dynamic Cloud Gem enabled \(in the [Project Configurator](configurator-intro.md), choose **Cloud Gem Dynamic Content**\)\.
+ You have created a project stack and deployment stack in [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md) with the `CloudGemDynamicContent` resource group\.

**Note**  
If you do not have a deployment with the `CloudGemDynamicContent` resource group, the **Dynamic Content Manager** interface is disabled\.

**To use the Dynamic Content Manager to upload dynamic content**

1. In Lumberyard Editor, choose **AWS**, **Cloud Canvas**, **Dynamic Content Manager**\.  
![\[Dynamic Content Manager\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-1.png)

1. In **Dynamic Content Manager**, click **Create a new manifest**\.  
![\[Create a manifest\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-2-create-manifest.png)

   A manifest is a file that keeps track of the dynamic content files that you deliver to customers\. A manifest records the following information:
   + The content files that have changed locally
   + The files that are included in any file packages
   + Differences between the local packages and the packages in the cloud that are staged for delivery to customers
   + The target operating systems and devices for this manifest

   You can create as many manifests as you require\. For example, you can create specialized manifests for different types of assets\.

1. Choose a name for the manifest\. The name should reflect the purpose of the manifest\.

1. Select the target operating systems and devices that you prefer to work on for this manifest\. 

1. When you create a manifest, the manifest is empty and has no files or packages\.  
![\[Add files\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-3-post-manifest-create.png)

   Click **Add Files** or **Add Folder** and choose one of the target operating systems\.  
![\[Select OS\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-3-platform-menu.png)

1. In the file browser, choose the files that you want to add to the manifest\.  
![\[Choose files for the manifest\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-4.png)

   Because the original assets might not be in a form that your game can consume, the file browser opens to the location of your game projects asset cache\. For example, your game OS might require textures to be in `.dds` format, but the original asset for a texture might be a `.png` file\. The Asset Processor converts the files to the appropriate format and stores them in the asset cache, so the asset cache is your safest choice\. However, if you have processed assets elsewhere in your file system, you are free to include them\.

**File Warnings**  
If the files that you selected are not supported by the current manifest or not supported by the OS that you selected, you are warned accordingly\.  
![\[Operating system not supported\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-4-platform-warning.png)

   If the files that you selected are not in your game projects asset cache \(and have therefore not been processed by the Asset Processor\), you are notified of the error\.  
![\[Selected files not in asset cache\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-4-asset-cache-warning.png)

1. The left pane of **Dynamic Content Manager** shows the files that you added to the manifest\. You can add files for different target operating systems and sort the files by their name, OS, or status\. After you have some files in the file manager, you can select one or more files and remove them\. You can remove the files by right\-clicking them or by clicking **Remove Files**\.  
![\[Create a new package\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-5-file-selected.png)

   Now you are ready to add a package to the manifest\.

   Click **New Package**\.

1. Enter a name for the package and choose the operating system or device type for it\.  
![\[New package name\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-create-package.png)

1. The new package appears in the right pane of **Dynamic Content Manager**\. You can sort the packages by column\.  
![\[New package created\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-7-package-created.png)

   Each package is stored in a `.pak` file, which is the archived file format that Lumberyard uses for its released game assets\. You can have one or more packages per manifest, and you can assign the same file to multiple packages\. This is useful when you have common files and operating system or device\-specific files that you need to deliver in one package\. It is also useful if you want to create bundles of items that might share assets\.

1. To add files to the package that you created, drag the files from the manifest on the left to the package on the right\. You can drag multiple files into the same `.pak` file\.  
![\[Add files from the manifest to the package\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-8-files-added-to-package.png)

   You can drag operating system or device\-specific files to a package with that OS type only\. If you drag multiple files to a package and the OS type of these files does not match that of the package, Lumberyard warns you about the incompatible files\.  
![\[Incompatible file alert\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-8-incompatible-platform-files-dialog.png)

   The icons that appear in the **Packages** pane are described as follows\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-cloud-gem-dc-manager.html)

   **Notes**
   + You can remove individual files from a package, but to help prevent inadvertent removal, this action is limited to one file at a time\.
   + You can also use **Dynamic Content Manager** to delete packages, but deleting a package does not delete the staged packages in the cloud\. To delete staged packages in the cloud, you must use the web\-based Cloud Gem Portal that manages the service side of a cloud gem\.

1. You can change the target operating systems or devices for the current manifest at any time\.

   1. Click the settings button and choose **Change Target Platforms**\.  
![\[Change target OSes\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-platform-setting.png)

   1. Choose the operating systems or devices that you want\. If none are selected, all supported operating systems and devices are added\.  
![\[Choose target operating systems and devices\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-change-target-platforms.png)

      After you update the target operating systems and devices, **Dynamic Content Manager** lists only the files and packages for the ones that you selected\. You can add files and folders only for the selected target OS or device\.  
![\[OS-specific files\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-platform-specific-files.png)

1. When you are ready, click **Upload Packages**\.

1. \(Optional\) To sign your packages, select **Sign packages with security key**\.  
![\[Sign packages with security key\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-sign-packages.png)

1.  If you haven't yet generated key pairs, click **Next** to generate a new key pair, and then click **Continue**\.  
![\[Generate new keys\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-generate-new-keys.png)

   You can also use the file menu to generate a new key pair at any time\.  
![\[Generate a key pair from the file menu\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-file-menu-generate-new-keys.png)

1. After the new key pair is generated, click **Upload**\. This action both creates the package files locally and uploads them to your private staging bucket in the AWS Cloud\.  
![\[Upload\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-upload-key-exists.png)

   The status bar of the main window shows upload process messages\.  
![\[Upload process messages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-upload-process.png)

   An animation in the **S3 Status** column indicates the package that is being uploaded\.  
![\[Upload process indicator\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-manager-upload-process-animation.png)

   The packages appear in the **Dynamic Content** section of the Cloud Gem Portal\. By default, Lumberyard marks them as **Private**\. When you are ready, you can move the packages to the **Public** stage to make them available for download by game clients\. For more information on this step, see [Managing Dynamic Content Packages](cloud-canvas-cloud-gem-dc-managing-packages.md)\.