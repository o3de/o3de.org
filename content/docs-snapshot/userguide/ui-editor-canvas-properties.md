# Configuring Canvas Properties<a name="ui-editor-canvas-properties"></a>

The canvas properties are displayed in the **UI Editor** **Properties** pane when no elements are selected\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-canvas-properties.png)

## Rendering Properties<a name="rendering-properties"></a>

The following properties define how a canvas is rendered:
+ **Draw order** – The value of this property determines the order that this canvas draws relative to other canvases\. Higher numbers draw on top of lower numbers\. When canvases have the same draw order, Lumberyard draws them in the order that they are loaded\.
+ **Is pixel aligned** – Selected by default\. This property makes textures look sharper by rounding the position of the elements' corners to the nearest exact pixel\. For example, if the position of a corner of an element rectangle is at 123\.45, 678\.90, then it is rounded to 123\.00, 679\.00\.
+ **Is text pixel aligned** – Selected by default\. This property makes text look crisper by rounding text positions down to the nearest pixel\. An exception to this rule occurs when fonts have been scaled down, in which case the text position is rounded to the nearest pixel\. If the property is not checked, the text position is not rounded\. You might consider unchecking this property if, for example, a text element will animate or move\.
+ **Render to texture** – Cleared by default\. When this property is selected, the canvas is drawn to a texture rather than to the screen\. When you select this property, you are prompted to enter a **Render target name** for the texture\. You can enter any name, but the convention is to prefix the name with the **$** symbol to distinguish it from texture assets\.

## Input Properties<a name="input-properties"></a>

The following properties define how a canvas handles inputs:
+ **Handle positional** – Selected by default\. This property causes an automatic response to positional input such as mouse movement, mouse button clicks, and touch screen input\. Keyboard inputs also cause an automatic response when an interactive UI element is active \(such as an elemental with a **Text Input** component on it\)\.

  Common reasons to de\-select this property are if the canvas doesn't resuire input, or if you configure your game to handle all inputs and pass selected inputs to the UI system\.
+ **Consume all input** – Cleared by default\. When this property is selected, this canvas consumes *all* input events while it's enabled, regardless of whether the canvas handles a specific input event\. For example, if you have canvas A covering canvas B, you probably don't want canvas B handling any input while canvas A is obstructing it, so you would select this property on canvas A\. Modal dialog boxes are another example of a canvas that should have this property selected\.

  Note that anytime a canvas is loaded, if it's set to consume all input, then it steals the inputs from any other loaded canvas\. This includes canvases that are set to consume all inputs themselves\.
+ **Handle multi\-touch** – Cleared by default\. When this property is selected, it enables elements on the canvas to handle multi\-touch input\. This is useful for handling input from touch\-based screens, such as mobile devices\.
+ **Handle navigation** – Cleared by default\. When this property is selected, it causes an automatic response to navigation input\. For example, on a PC, pressing arrow keys moves focus from one interactive UI element to the next, and pressing **Enter** activates an interactive UI element\. We recommend de\-selecting this property for canvases that are placed in the game world\.
+ **Navigation threshold** – The analog input value, from a thumbstick, for example, that must be exceeded before a navigation command is processed\. Valid ranges are decimal values between 0 and 1, and the default is 0\.4\. Adjust this value based on the input sensitivity needs of your UI\.
+ **Navigation repeat delay** – The delay, in milliseconds, before a held navigation command begins repeating\. The default is 300 ms\. Adjust this value based on the needs of your UI\.
+ **Navigation repeat period** – The delay, in milliseconds, after the initial repeat delay, before a held navigation command repeats again\. The default is 150 ms\. Adjust this value based on the needs of your UI\.

  For example, if you had a menu list where you hold a button to navigate to the next item in the list, the navigation property settings are used as follows:

  1. Hold down the button past the *navigation threshold* to navigate to the next item\.

  1. Continue holding for an amount of time equal to the *navigation repeat delay* to navigate a second time\.

  1. Continue holding for an amount of time equal to the *navigation repeat period* to navigate a third time\. Thereafter, as you continue holding the button, you will navigate again, every time an amount of time equal to the navigation period elapses\.
+ **First focus element** – Displayed when **Handle navigation** is selected\. **First focus element** specifies which element gains focus when a canvas is first loaded and a mouse is not detected\. For more information about element navigation, see [First Focus Element](ui-editor-components-firstfocus.md)\.

## Tooltips Properties<a name="editor-properties-tooltips"></a>

The following property defines how a canvas displays tooltips:
+ **Tooltip display element** – Controls which element the game displays when your users hover over an interactive element\. Select an element from the drop\-down list\. This list is composed of the elements on your current canvas that contain the **TooltipDisplay** component\. For more information about the **Tooltips** components, see [Tooltip Components](ui-editor-components-tooltips.md)\.

## Editor Settings Properties<a name="editor-properties-group"></a>

The following properties define UI Editor behavior:
+ **Snap distance** – The distance between positions on the grid when **Snap to grid** is selected in the toolbar\.
+ **Snap rotation** – The number of degrees between each step of rotation when you use the rotation gizmo to rotate an element in the viewport when **Snap to grid** is selected in the toolbar\.
+ **Guide color** – The color of the guide lines on this canvas\. For more information about using guides in **UI Editor**, see [Rulers and Guides](ui-editor-rulers-guides.md)\.
+ **Texture atlases** – The texture atlas that this canvas loads\. Using a texture atlas can reduce the number of draw calls in certain situations, resulting in better performance for your UI\. For more information about *texture atlases*, see [Using Texture Atlases](ui-editor-texture-atlases.md)\.