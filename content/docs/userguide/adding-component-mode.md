# Step 1: Choose a Component<a name="adding-component-mode"></a>

Select a component to add a Component Mode to\. Components such as shape, light, and physics are good examples because their data exists in the 3D world and you can view the changes directly in the viewport\. Other components such as **Audio** and **Script Canvas** are less useful because they have properties that you can't edit in the viewport\.

This walkthrough uses the **[Point Light](component-point-light.md)** component because it's visually easy to model\. At the end of the walkthrough, you can edit the **Point Light** component in the viewport instead of manually entering values in the **Entity Inspector**\.

**Note**  
Component Mode is an edit\-time only feature\. For more information, see [Editor Components](component-entity-system-pg-editor-components.md)\.

------
#### [ Before ]

By default, you can't edit the **Point Light** component in the viewport\. You can edit its properties only in the **Entity Inspector**\.

![\[Decrease the area of effect of the Point Light component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/componentmode/programmers-guide-component-mode-1.png)

------
#### [ After ]

After you add a Component Mode to a component, you can click and drag the manipulator to adjust the **Point Light** component's area of effect\.

![\[Use manipulators to adjust the Point Light component in the viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/componentmode/programmers-guide-component-mode.png)

For a list of available components, see [Component Reference](component-components.md)\.

------