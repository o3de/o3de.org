# Enabling and Disabling Effect Groups<a name="effect-groups-enabling-disabling"></a>

You can enable and disable effect groups with the **Script Canvas** editor or Lua scripting\.

**To enable or disable effect groups with Script Canvas**

1. In Lumberyard Editor, open your level\.

1. In the menu bar, choose **Tools**, **Script Canvas**\.

1. In the **Script Canvas** editor, choose **File**, **New Script**\.

1. Right\-click the canvas, search and then select the following nodes: 
   + **On Graph Start**
   + **[Enable Effect Group](enable-effect-group-node.md)** or **[Disable Effect Group](disable-effect-group-node.md)**

1. For your script, do the following:

   1. Select the **Out** pin for **On Graph Start** and drag to connect it to the **In** pin for the **Enable/Disable Effect Group** node\. 

   1. For the **Group Name** parameter, enter the file path for the group \(for example, `Libs\PostEffectGroups\MyEffectGroup.xml`\)\.  
![\[Use the Enable Effect Group node in the Script Canvas editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/enable-effect-group-node-example-script.png)

1. Save the script and attach it to an entity with the **[Script Canvas](component-script-canvas.md)** component\. 

1. Close the **Script Canvas** editor\.

**Note**  
You can manually enable or disable an effect group in Lumberyard Editor by running the Lua functions in the **Console** window\. To indicate a Lua command, prepend each command with the \# character\.