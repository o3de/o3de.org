# Edit Context<a name="component-entity-system-reflection-edit-context"></a>

The Lumberyard edit context is a utility context that relies on the [Serialization Context](component-entity-system-reflection-serialization-context.md)\. You can use the edit context to expose parameters of serialized data for editing in Lumberyard Editor\. However, the edit context is an abstract container for edit data\. As such, it is not directly tied to any specific editor\. Any editor can query the data in the edit context and implement its own visualization and editing controls\.

The following code shows an `EditContext` definition:

```
AZ::EditContext* editContext = serializeContext->GetEditContext();
if (editContext)
{
    editContext->Class<MyEditStruct>("MyEditStruct", "My edit struct class used for ...")
    ;
}
```

An `EditContext` consists of `ClassElements` and `DataElements`\.
+ `ClassElements` – Specify attributes of the class that was reflected through the `SerializeContext::Class`\. You can use this to group common elements\.
+ `DataElements` – Specify the display, behavior, and visualization of the fields that were serialized through `SerializeContext::Field`\.

## Attributes<a name="component-entity-system-reflection-edit-context-attributes"></a>

You can use the `EditContext` to add arbitrary attributes to class and data elements\. 

Attributes are template based\. As such, they can be of any type, including functions, as in the following example\.

```
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

For convenience, Lumberyard stores a library of frequently used and implemented attributes in the file `dev\Code\Framework\AzCore\AzCore\Serialization\EditContextConstants.inl`\.