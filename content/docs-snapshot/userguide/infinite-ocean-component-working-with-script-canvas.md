# Using the Infinite Ocean Component with Script Canvas<a name="infinite-ocean-component-working-with-script-canvas"></a>

You can use the **Infinite Ocean** component with the **Script Canvas** editor to change the component parameters at run time, using a visual scripting workflow\. In the following example, the Script Canvas script changes the size of the ocean waves over time\.

**To use the **Infinite Ocean** component with the Script Canvas editor**

1. In Lumberyard Editor, [create an entity](creating-entity.md) and attach the **Infinite Ocean** component\. Ensure that the component is positioned correctly in your level\.

1. In the Entity Inspector, for **Wave Size**, enter `0`\. This creates a flat ocean, so you can see how the **Script Canvas** editor interacts with the component\.

1. Click **Add Component** and then click the **[Script Canvas](component-script-canvas.md)** component\.

1. In the **Script Canvas** component, click the icon to open the **Script Canvas** editor\.

1. Select the entity with the **Infinite Ocean** component attached and drag it to the **Script Canvas** editor\.

1. In the **Script Canvas** editor, save the file as `oceanscript.scriptcanvas`\.

1. In the **Node Palette**, search for the **On Entity Activated** node and drag it to the canvas\.

   1. In the canvas, from the **Ocean EntityRef** node, drag **Get** to connect it to the **Source** pin of the **Game Entity** node\.

1. In the **Node Palette**, search for the **Timer** node and drag it to the canvas\.

   1. In the canvas, from the **Game Entity** node, drag the **Out** pin to connect it to the **Start** pin of the **Timer** node\.

1. In the **Node Palette**, search for the **Sin** node and drag it to the canvas\. This node provides a value that goes up and down\.

   1. In the canvas, from the **Timer** node, drag the **Out** pin to connect it to the **In** pin of the **Sin** node\.

   1. Drag the **Seconds** pin to connect it to the **Angle** pin of the **Sin** node\.
**Note**  
The **Sin** node returns values that are –/\+\. Negative numbers cause errors with the **Wave Size** parameter\. Use the **Add** node to ensure that only positive values are returned\.

1. In the **Node Palette**, search for the **Add** node and drag it to the canvas\.

   1. In the canvas, from the **Sin** node, drag the **Out** pin to connect it to the **In** pin of the **Add** node\.

   1. Drag the **Angle** pin and to connect it to the **Value A** pin of the **Add** node\.

   1. For the **Add** node, enter `1.0` for **Value B**\. This shifts the sine wave from \(`-1.0` to `1.0`\) to \(`0.00` to `2.00`\)\.

1. In the **Node Palette**, search for the **SetAnimationWavesSize** node and drag it to the canvas\.

   1. In the canvas, from the **Add** node, drag the **Out** pin to connect it to the **In** pin of the **SetAnimationWavesSize** node\.

   1. Drag the **Result** pin to connect it to the **Number:0** pin of the **SetAnimationWavesSize** node\.

   Your script should look like the following:  
![\[Example Script Canvas script for working with the Infinite Ocean component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-example-script.png)

1. Save your script\.

1. In the **Entity Inspector**, select the entity with the **Script Canvas** component attached\. Click the browse \(**\.\.\.**\) button and navigate to the `oceanscript.scriptcanvas` file\. Select `oceanscript.scriptcanvas` and then click **OK**\.

1. To start the game, press **Ctrl\+G**\. You can see the size of the ocean waves increase and decrease over time\.