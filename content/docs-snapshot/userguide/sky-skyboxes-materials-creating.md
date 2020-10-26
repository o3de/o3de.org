# Creating Skybox Materials<a name="sky-skyboxes-materials-creating"></a>

Skyboxes in Lumberyard are 5\-sided\. Sides 1 through 4 are the sides of the box, and side 5 is the top of the box\. Skyboxes in Lumberyard do not have a bottom\.

The sides of the box are represented by three textures that follow a specific naming convention:

1. `skybox_12.tif`

1. `skybox_34.tif`

1. `skybox_5.tf`

The suffix in the name indicates which sides of the box that the texture is mapped to\.

You can use any image editing software to create a skybox texture\. We used Adobe Photoshop to create this example and followed these specifications:
+ The source sky image is authored at 8192 x 1024\.
+ The image uses 16 bits per channel to help preserve smooth gradients in the sky\. 
+ The image is divided into four sections that are 2048 x 1024 each \(for illustration purposes\)\.

The numbers represent each side of the skybox that the texture is mapped to\. Sides 1 and 2 will become `skybox_12.tif` and sides 3 and 4 will become `skybox_34.tif`\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/sky/static-skybox-setup-1.png)

The top of the example sky is a separate texture\. The numbers represent which edge of the texture to map to which side\. This is important for you to manage texture seams\. You must name this 2048 x 2048 texture `skybox_5.tif`\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/sky/static-skybox-setup-2.png)

When you combine sides 1 and 2 into a single texture \(`skybox_12.tif`\), you must flip side 2 horizontally\. When you combine sides 3 and 4 into a single texture \(`skybox_34.tif`\), you must flip side 4 horizontally\. This results in two textures that are 2048 x 2048 each\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/sky/static-skybox-setup-3.png)

**To prepare the skybox textures for Lumberyard**

1. Navigate to the directory with your newly created textures\.

1. Right\-click each texture and choose **RC Open Image**\.
**Note**  
If you do not see **RC Open Image**, you must install RC Shell Commands using the Lumberyard Setup Assistant\. For more information, see [Using Lumberyard Setup Assistant to Set Up Your Development Environment](lumberyard-launcher-intro.md)\.

1. In the texture dialog box, under **Preset**, choose **SkyboxHDR** from the drop\-down list\. Click **OK**\. This will create a text file \(`imagename.exportsettings`\) that Lumberyard uses to compile the texture correctly\.

1. If you use source control, you must check in all images and `.exportsettings` files\. If you do not check in these files, your scene will not render similarly for each person on your project\. 