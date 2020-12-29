# Managing Dynamic Content Packages<a name="cloud-canvas-cloud-gem-dc-managing-packages"></a>

The Dynamic Content Cloud Gem provides an easy way for you to update your game content for your customers\. After a release, you can update content without an app submission or traditional patch process\. The Dynamic Content Cloud Gem provides a framework for you to group outdated assets into manifests\. You can assign groups of assets together into `.pak` files \(`.zip` files\), and distribute these files to customers according to your own rules or schedules\.

## Prerequisites<a name="cloud-canvas-cloud-gem-dc-managing-packages-prerequisites"></a>

To use the Dynamic Content Cloud Gem, you must meet these requirements:
+ You must be using a Lumberyard Editor project that has the Dynamic Content Cloud Gem enabled \(in the Project Configurator, select **Cloud Gem Dynamic Content**\)\.
+ You have a project stack created in [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md)\.
+ You have created a deployment stack in Cloud Canvas Resource Manager\.
+ You have created dynamic content packages that contain the updates\. For more information, see [Using Dynamic Content Manager](cloud-canvas-cloud-gem-dc-manager.md)\.
+ You have the Cloud Gem Portal open\. In Lumberyard Editor, click **AWS**, **Open Cloud Gem Portal**\.

**To view packages in the Dynamic Content Gem Portal**

1. On the welcome page of the Cloud Gem Portal, click **Cloud Gems** or **View all Cloud Gems**\.  
![\[Cloud Gem Portal welcome page\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-1.png)

1. In the list of enabled cloud gems, pause on the thumbnail for the Dynamic Content Gem\.  
![\[Dynamic Content Gem\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-2.png)

   The thumbnail shows the number of files in the gem and the status of the cloud API \(**Online** or **Offline**\)\. The online status comes from an API Gateway call to the Dynamic Content Cloud Gem\. 

1. Click the thumbnail\. The dynamic content might take a few seconds to appear as AWS resources load\.

   The loaded page shows the packages \(`.pak` files\) that you added when you used **Dynamic Content Manager**\.  
![\[List of dynamic content packages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-3.png)

## Dynamic Content Package Stages<a name="cloud-canvas-cloud-gem-dc-managing-packages-stages"></a>

You can use separate deployment stacks to handle different release workflows\. For this purpose, the Dynamic Content Cloud Gem currently supports the following publishing stages\.
+ **Private** – The packages are never downloaded by the game client\. When you upload new or altered content to the cloud from **Dynamic Content Manager**, your packages and manifest are always put in the **Private** stage\. This empowers you to choose when and how your changes are released to customers\.
+ **Scheduled** – The packages are conditionally downloaded by the game client based on a specific date and time\.
+ **Public** – The packages are available to everyone that uses the deployment\.

You can use these stages to add an additional layer of protection against inadvertent deployments of dynamic content to your players\.

## Package Nesting<a name="cloud-canvas-cloud-gem-dc-managing-packages-nesting"></a>

Each stage includes entries for your manifests and packages\. Packages are nested according to the hierarchy that you determine when you create them\. In the following example, the two root\-level manifest packages highlighted in yellow have one child asset package each, which are highlighted in gold\.

![\[Nested packages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-4.png)

The icons next to the package names show the actions available for the packages\.


****  

| Icon | Description | 
| --- | --- | 
| ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-5.png)  | You can edit or delete root level packages\. | 
|  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-6.png)  | You can only delete child packages\. | 

## Editing Packages<a name="cloud-canvas-cloud-gem-dc-managing-packages-editing"></a>

Editing is triggered when you drag and drop a root\-level package from one stage to another\.

![\[Changing package stages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-7.png)

When you edit a package, you can alter its **Transition**, **Scheduling**, and **Package Children**, as the following image shows\.

![\[Editing a package\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-8.png)
+ **Transition** – Choose the target stage that you want to move the package to\.
+ **Scheduling** – Set packages to `scheduled` or `indefinite`\. Packages that you place in the public stage cannot have a date; they are always indefinite\.
+  **Package Children** – Select which children of the root package you would like to include in this transition\.

   By default all children move with the root package\. If you clear the selection for some children, they become orphans in the current stage and no longer visible to the game client\.

## Deleting Packages<a name="cloud-canvas-cloud-gem-dc-managing-packages-deleting"></a>

Deleting a root package causes its child packages to become orphans that are no longer visible to the game client\. Accordingly, when you delete a package, the following confirmation message appears\.

![\[Deleting a package\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-9.png)

## Displaying Package Metadata<a name="cloud-canvas-cloud-gem-dc-managing-packages-displaying-metadata"></a>

To display the metadata for a package, click the space next to the package name\. The metadata for the package appears at the bottom of the browser\.

![\[Click to display metadata\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-10.png)

![\[Package metadata\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-managing-packages-11.png)