# LayoutRow<a name="ui-editor-components-layout-row"></a>

You can use a **LayoutRow** component to organize child elements into a row\. To use this feature, you add the **LayoutRow** component to an element and then add child elements\. The UI system positions the child elements within the row, from left to right or right to left, depending on the order you choose\. The child elements can contain a texture or image, a piece of text, a button, a check box, more columns, rows, grids, and so on\. To control the sizes of specific, or all, children, add the [layout cell](ui-editor-components-layout-cell.md) component to those children\. 

Similar to the **LayoutColumn** component, the **LayoutRow** component has an **Ignore Default Cell** property\. For more information, see [LayoutColumn](ui-editor-components-layout-column.md)\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-layout-row.png)

To see an in\-game example of a completed canvas with the **Layout Row** component, open the level UiFeatures in the project SamplesProject\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Layout Components**, **Layout Row**\. You can view examples of different child sizes within a row\. Press **Esc** to exit the game\.

To view this same canvas in the **UI Editor**, navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Layout` directory and open the `SimpleRow.uicanvas` file\.

You can add a prebuilt **Layout Row** element from the slice library\. When you do this, a simple layout row is automatically created and nested in your **Hierarchy** pane\.

**To add a Layout Row element from the slice library**
+ In the [**UI Editor**](ui-editor-using.md), choose **New**, **Element from Slice Library**, **LayoutRow**\.

**To edit a layout row component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **LayoutRow** and do the following, as appropriate:    
****Padding****  
Type values in pixels, relative to the element's borders\.  
****Spacing****  
Type values in pixels to adjust spacing between elements\.  
****Order****  
Select **Left\-to\-Right** or **Right\-to\-Left** to specify the order in which the child elements appear in the row\.  
****Child Alignment****  
If the layout's children don't occupy all the available layout space, use this setting to determine how the children are aligned\.  
For **Horizontal**, select **Left**, **Center**, or **Right** to determine how the children are aligned horizontally\.   
For **Vertical**, select **Top**, **Center**, or **Bottom** to determine how the children are aligned vertically\.  
****Ignore Default Cell****  
Selected by default, this property causes the layout row to give each child an equal amount of space regardless of their contents \(unless the child has a [**LayoutCell**](ui-editor-components-layout-cell.md) component\)\. The layout row ignores the layout cell's content\-based default calculations\.  
When you clear this option, the layout row uses the children's layout cell calculated values to determine how much space to give each child based on its contents\. For more information, see [LayoutCell](ui-editor-components-layout-cell.md)\.