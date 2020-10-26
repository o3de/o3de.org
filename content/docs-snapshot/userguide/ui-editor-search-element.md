# Searching for UI Elements<a name="ui-editor-search-element"></a>

You can find UI elements by filtering by their name or their attached components\. The **Find Element** tool hierarchically displays UI elements for the active UI canvas\.

![\[The UI Editor's Find Element tool.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-search-element-tool.png)

**To open the **Find Element** tool**
+ In the **UI Editor**, do one of the following:
  + From the menu, choose **Edit** and then **Find Elements**\.
  + Press **Ctrl\+F**\.

  Initially, all UI elements in the currently active UI canvas appear in a tree view\.

![\[To find UI elements by name, enter the name in the search box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-search-element-name.png)

**To filter by UI element name**
+ Enter the name in the search filter box\.

  UI element names that contain the entered text remain visible\. All other UI elements are hidden\.

![\[To find UI elements by components, click the filter button and select a component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-search-element-component.png)

**To filter by component**

1. Select the filter button next to the search filter box\.

1. In the menu that appears, select one or more components\.

   UI elements that contain the selected components are visible\. All other UI elements are hidden\.
**Note**  
The **Find Element** tool displays for selection only the components used by the UI elements in the active UI canvas\.

UI elements that don't match the search criteria are typically hidden\. However, a parent element that doesn't match the search criteria remains visible if one of its children meets the search criteria\. This maintains the tree structure used to display the UI elements\. Displayed UI elements that meet search criteria appear as white text\. Displayed UI elements that don't meet the criteria but are visible to maintain tree structure appear in gray text\.

![\[The parent of a child element that meets search criteria appears in gray text.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-search-element-gray.png)

After you select one or more UI elements, you can choose to select them in your **UI Editor** hierarchy\.

**To transfer your selections to the **Hierarchy** panel**

1. In the **Find Elements** tool, select one or more UI elements\. Press **Ctrl** to select multiple elements\.

1. Choose **Select in Hiearchy**\.

   The **Hierarchy** panel appears, with the same UI elements selected\.  
![\[Choose Select in Hierarchy to transfer your selections to the Hierarchy panel.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-search-element-hierarchy.png)