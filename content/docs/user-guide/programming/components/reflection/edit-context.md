---
linkTitle: Edit Context
title: Edit Context in O3DE
description: Use the edit context to expose parameters for editing in O3DE Editor, the content creation environment for Open 3D Engine (O3DE).
weight: 200
---

The O3DE edit context is a utility context that relies on the [serialization context](/docs/user-guide/programming/components/reflection/serialization-context/). You can use the edit context to expose parameters of serialized data for editing in **O3DE Editor**. However, the edit context is an abstract container for editable data. As such, it is not directly tied to any specific editor. Any editor can query the data in the edit context and implement its own visualization and editing controls.

The following code shows an `EditContext` definition:

```cpp
AZ::EditContext* editContext = serializeContext->GetEditContext();
if (editContext)
{
    editContext->Class<MyEditStruct>("MyEditStruct", "My edit struct class used for ...")
    ;
}
```

An `EditContext` consists of `ClassElements` and `DataElements`.
+ `ClassElement` - Specify attributes of the class that was reflected through the `SerializeContext::Class`. You can use this to group common elements.
+ `DataElement` - Specify the display, behavior, and visualization of the fields that were serialized through `SerializeContext::Field`.
+ `UIElement` - Specify the display, behavior, and visualization of a `UIHandler`, but without tying it to a `SerializeContext::Field`.

## Attributes 

You can use the `EditContext` to add arbitrary attributes to class and data elements.

Attributes are template based. As such, they can be of any type, including functions, as in the following example.

```cpp
editContext->Class<EditorLightComponent>(
	"Light", "Attach lighting to an entity.")
	->ClassElement(AZ::Edit::ClassElements::EditorData, "")
		->Attribute(AZ::Edit::Attributes::AutoExpand, true)
		->Attribute(AZ::Edit::Attributes::NameLabelOverride, &EditorLightComponent::GetLightTypeText)
	->DataElement(AZ::Edit::UIHandlers::Default, &EditorLightComponent::m_configuration, "Settings", "Light configuration")
		->Attribute(AZ::Edit::Attributes::Visibility, AZ_CRC("PropertyVisibility_ShowChildrenOnly", 0xef428f20))

    ->ClassElement(AZ::Edit::ClassElements::Group, "Cubemap generation")
	    ->Attribute(AZ::Edit::Attributes::Visibility, &EditorLightComponent::IsProbe)
    	->Attribute(AZ::Edit::Attributes::AutoExpand, true)
```

For convenience, O3DE stores a library of frequently used and implemented attributes in the file `dev\Code\Framework\AzCore\AzCore\Serialization\EditContextConstants.inl`.
