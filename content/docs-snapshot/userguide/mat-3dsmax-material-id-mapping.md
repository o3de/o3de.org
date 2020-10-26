# Material ID Mapping in Autodesk 3ds Max<a name="mat-3dsmax-material-id-mapping"></a>

A mesh \(`.cgf` file\) can have different materials assigned to different faces\. When you work in Autodesk 3ds Max, make sure you have enough submaterials to cover the number of material IDs assigned to faces on the mesh object\. Otherwise the material IDs won't get exported correctly to Lumberyard\.

The following procedure presents an example that uses a multimaterial cube\.

**To map multi\-material IDs in 3ds Max**

1. Open 3ds Max\. Then create and place a cube in the viewport\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-0.png)

1. Right\-click the cube and click **Convert To**, **Convert to Editable Mesh**\. You can now assign different material IDs to the faces\.   
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-1.png)

1. From the 3ds Max top menu, choose **Rendering**, **Material Editor**, **Compact Material Editor**\.

1. From the 3ds Max top menu, choose **Rendering**, **Material/Map Browser\.**  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-2.png)

1. In **Material/Map Browser**, under **Materials**, expand **Standard**\. Then double\-click **Multi/Sub\-Object**\. In the 3ds Max **Material Editor**, under **Multi/Sub\-Object Basic Parameters**, look for a material ID list to fill in\. Select the first entry by clicking **None** in the **Sub\-Material** column\. Select **Standard** under the **Standard** material rollout\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-3.png)

1. In the 3Ds Max **Material Editor**, under **Shader Basic Parameters**, select **Crytek Shader**\.

1. Under **Maps**, next to **Diffuse Color**, select **None**\.

1. In **Material/Map Browser**, under **Maps**, double\-click **Bitmap**\. Then double\-click to select the desired image file\. Afterward the image file appears in the 3DS Max **Material Editor** for the **Diffuse Color** parameter\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-4.png)

1. While still in **Material Editor**, choose **Navigation**, **Go to Parent**\. Then repeat to get back to the material ID list\. 

1. Create a second subshader by repeating steps 5 through 9 for the second entry in the list\. Click **Set Number**, then enter `2` in the **Number of Materials** pop\-up window\. The list shows only two submaterials\. 

1. In **Material Editor**, under **Name**, enter a name\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-8a.png)

1. With the object selected in the viewport, go to **Material Editor** and choose **Material**, **Assign to Selection**\.

1. Click the hammer icon\. Under **Utilities**, select **Lumberyard Export**, select the object, and then choose **Add Selected** to place the object in the **Geometry Export** list\.

1. In the 3ds Max panel on the right, under **Modifier List**, select **Editable Mesh**, **Polygon**\.

1. In the viewport, select the top face\. Then, under **Surface Properties**, click **Set ID** and set the value to 2\. This makes the top face use the second material in the final material group\.

1. Select the other faces and set their **Set ID** values to 1\. The final face coloring should match the one shown in the following image\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-7.png)

1. Select **Export Nodes** to create a `.cgf` file\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-8.png)

1. Click **Create Material** to open the Lumberyard **Material Editor** and display a file dialog box\.

1. Navigate to the directory where your `.cgf` files are located\. Then enter the same file name that you specified in 3ds Max\. This ensures that the `.cgf` file can automatically find the correct `.mtl` file when loaded in the Lumberyard **Material Editor**\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-3dsmax-material-id-mapping-9.png)

1. In Lumberyard Editor, create a level and open the `.cgf`\. The object should have the correct materials mapped onto its faces\.