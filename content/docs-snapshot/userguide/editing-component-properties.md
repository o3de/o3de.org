# Editing Component Properties<a name="editing-component-properties"></a>

You can edit properties for your components such as changing the mesh asset file for the **Mesh** component\.

**To edit component properties**

1. In the **Entity Outliner** or the viewport, select the entity\.

1. In the **Entity Inspector**, select the component and edit its properties\.

1. To undo a change that you made to a property, press **Ctrl\+Z**\. To redo the change, press **Ctrl\+Shift\+Z**\.

1. To edit multiple entities at the same time, select the entities that you want and make your changes\. The changes that you make to the first entity propagate to all selected entities\.

**Note**  
If your entity is part of a slice instance, any properties that you modify from the source slice asset appear in orange in the **Entity Inspector**\.   
To save a change to a slice, see [Modifying a Slice and Saving Changes](component-slice-push-changes.md)
To revert an override, see [Reverting and Forcing Overrides](component-slice-override.md)
For more information about slices, see [Working with Slices](component-slices.md)\.

## Copying and Pasting Asset References<a name="component-entity-inspector-assetref"></a>

In the **Entity Inspector**, you can copy an asset reference from one component and paste it into another component\. You can copy assets as scripts, mesh assets, particle effect libraries, cubemap assets, and so on\.

**To copy and paste an asset reference**

1. In the **Entity Inspector**, select the component and right\-click the asset reference field\.

1. Choose **Copy asset reference**\.

1. Select another component, right\-click the asset reference field, and choose **Paste asset reference**\.  
![\[Copy and paste asset references between components.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-entity-inspector-assetref.png)

## Creating Custom Component Help Topics<a name="component-entity-inspector-help"></a>

If you have created your own components, you can point the component header's help icon to your own documentation\.

![\[Component helper icon.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-entity-inspector-help.png)

To do this, add the `HelpPageURL` attribute to your component reflection\.

For example:

```
Attribute(AZ::Edit::Attributes::HelpPageURL, "https://docs.aws.amazon.com/lumberyard/latest/userguide/component-comment.html")
```