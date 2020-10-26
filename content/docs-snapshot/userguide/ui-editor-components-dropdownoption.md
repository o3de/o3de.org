# DropdownOption<a name="ui-editor-components-dropdownoption"></a>

You can use the **DropdownOption** component to make an element an option in a drop\-down menu\. When using the **DropdownOption** component, note the following:
+ The **DropdownOption** is used along with the **Dropdown** component on an element\.
+ The **DropdownOption** requires an interactive component, typically a **RadioButton** component so that only one option can be selected at any time in the drop\-down menu\.
+ Its child elements typically contain the **Text** component, which appears when the option is selected\.

To see an in\-game example of a completed canvas with the **DropdownOption** component, open the level UiFeatures in the project SamplesProject\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Interactable Components**, **Dropdown**, **Using UI Components and Dropdowns**\. Press **Esc** to exit the game\.

To view this same canvas in the **UI Editor**, navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Dropdown` directory and open the `UsingUi.uicanvas` file\. This canvas features a drop\-down menu with a scroll box, image, check box, slider, and radio buttons\.

**To edit a DropdownOption component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **DropdownOption** and do the following, as appropriate:    
**Interactable**  
See [Properties](ui-editor-components-interactive-properties.md) to edit the common interactive component settings\.  
**Elements, Owning Dropdown**  
Select an element from the list that has the **DropdWown** component\. This is the element to be modified when this option is selected\.  
**Elements, Text Element**  
Select an element from the list that displays the text corresponding to this option\. This text is displayed on the owning drop\-down menu when this option is selected \(as long as the drop\-down menu has a **Text Element** configured\)\.  
**Elements, Icon Element**  
Select an element from the list that displays the icon corresponding to this option\. This icon is displayed on the owning drop\-down menu when this option is selected \(as long as the drop\-down menu has an **Icon Element** configured\)\.