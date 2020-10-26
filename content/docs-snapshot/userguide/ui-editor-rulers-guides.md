# Rulers and Guides<a name="ui-editor-rulers-guides"></a>

Use **Rulers** and **Guides** to visually guide the placement of your UI elements on your UI canvas\.

**To show or hide Rulers**
+ Do one of the following:
  + Press **Ctrl\+R**
  + Choose **View** and then **Rulers**

The ruler's units are measured in pixels in the canvas space\. Magenta lines on the rulers mark the current location of your cursor\.

![\[Magenta lines on the Rulers mark the current location of the cursor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-rulers-guides-magenta.png)

**Guides** appear as green lines and act as a visual aid for positioning UI elements\.

**To show or hide **Guides****
+ Do one of the following:
  + Press **Ctrl\+;** \(semicolon\)
  + Choose **View** and then **Guides**

You place the guides at a specific pixel offset on a canvas\. The **UI Editor** displays guides as green lines, which you can position UI elements around or along\.

**To create a guide**

1. Ensure that the **Rulers** appear\.

1. Click on the top or side ruler and drag into the canvas\.

   If you start in the top ruler, you create a horizontal line\. Starting in the side ruler creates a vertical line\.

1. Release at the position that you want to place the guide\.  
![\[To create guides, ensure the Ruler is displayed and then drag down or across from the side or top ruler.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-rulers-guides-creating-gif.gif)

1. To adjust the position of the guide, click the guide and drag it to a new position\.  
![\[Adjust the guide position by placing the cursor on the guide and dragging it.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-rulers-guides-adjust.png)
**Note**  
You must be in **Move** or **Anchor** mode to adjust a guide's position\.

You can lock guides to protect against unintentionally moving them\. Locking the guides also makes it easier to move UI elements across and around the guides\.

**To lock guides**
+ Choose **View** and then **Lock Guides**\.

**To delete one guide**
+ Click on the guide and drag it off of the canvas\.

**To delete all guides**
+ Choose **View** and then **Clear Guides**\.

You can change the color of all guides\.

**To change guide color**

1. Click in an empty area on the viewport or hierarchy pane so that no UI elements are selected, and you see the **UI Canvas** component in the **Properties** pane\.

1. In the **UI Canvas** component, under **Editor settings**, click the **Guide color** and select a new color\.