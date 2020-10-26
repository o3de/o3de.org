# Switching Skyboxes with the Script Canvas Editor<a name="sky-skyboxes-switch"></a>

You can use the **Script Canvas** editor to create a script that switches the skybox material \.

**To switch skyboxes with a script**

1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Script Canvas** editor, choose **File**, **New Script**\.

1. Right\-click the canvas, search and then select the following nodes: 
   + **On Graph Start**
   + **[Load by Name](material-load-by-name-node.md)**
   + **[Set Skybox Material](set-sky-box-material.md)**

1. For your script, do the following:

   1. Select the **Out** pin for **On Graph Start** and drag to connect it to the **In** pin for **Load By Name**\. 

   1. For the **Material Name** parameter, specify the path to the material to use for the skybox\. For more information, see [Finding the Material Name](finding-materials-by-name.md)\.

   1. Select the **Out** pin for **Load By Name** and drag to connect it to the **In** pin for **Set Skybox Material**\.

   1. Select the **Material** pin for **Load By Name** and drag to connect it to the **Material** pin for **Set Skybox Material**\.  
**Example**    
![\[Switch the skybox material with the Script Canvas editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/sky/scriptcanvasnodes/set-skybox-material-example-script.png)

1. Save the script and attach it to an entity with the **[Script Canvas](component-script-canvas.md)** component\. 

1. Close the **Script Canvas** editor\.