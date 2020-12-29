# Avoiding Data Loss when Serializing Component Data<a name="best-practices-for-component-data-serialization"></a>

There are ways that you can avoid data loss when serializing component data\. This topic describes how to deal with slice data patch issues when using version converters, and provides some best practices for avoiding data loss\.

## Avoiding Data Loss and Maintaining Stability in Lumberyard v1\.22 and Earlier<a name="best-practices-for-component-data-serialization-version-converters"></a>

This section provides specific information and best practices for avoiding data loss in versions of Lumberyard up through and including v1\.22\. First, it describes what you need to keep in mind when using version converters, and how to help avoid subsequent data loss in your slice data patches\. Then, it provides a two\-step process for avoiding data loss and maintaining stability\.

**Note**  
In Lumberyard v1\.23, the issues described in the following topics were addressed with the introduction of the new slice file format and the NameChange and TypeChange class builders\. For more information about these class builders and how to upgrade your slice file format, see [Versioning your Component Serialization](component-entity-system-versioning.md)\.

**Topics**
+ [The Data Patching Issue](#version-converters-and-data-patches)
+ [How to Avoid Data Loss](#version-converters-and-avoiding-data-loss)

### The Data Patching Issue<a name="version-converters-and-data-patches"></a>

During development, components undergo significant changes\. Member variables are added, removed, renamed, and changed\. Consequentially, serialization of the component also changes\. When any change affects serialization, a version converter function can modify older data so that it can continue working with the new object state\.

**Note**  
Version converter functions work only when an entire class is supplied\.

However, there are some scenarios where an entire class is not available\. For example, consider data patches in slice files, which represent the difference between two serializable objects\. These patches can be as small as a single serialized value or include entire classes\. In the cases where they don't have a full class worth of information, the information in a data patch cannot be run through a version converter function\. This means that when serialization of a component changes, any data patches stored in nested slices that apply to those components are no longer valid and cannot be recovered\.

The following is an example of a version change that could lead to data loss\. This example starts with a basic component that has just enough information to be reflected\. It uses an integer with a value between 1 and 100 to represent the current blend state\.

```
// Blend Component (V1)
class BlendComponent : public Component
{
public:
    AZ_TYPE_INFO(BlendComponent , "{ED986571-2B3D-4E22-A2D8-F74A29A730DE}");
    static void Reflect(ReflectContext* context)
    {
        if (auto serializeContext = azrtti_cast<SerializeContext*>(context))
        {
            serializeContext->Class<BlendComponent>()
                ->Version(1)
                ->Field("BlendState", &BlendComponent::m_blendState);
        }
    }
private:
    // A value from 1 to 100 representing the blend state
    int m_blendState;
};
```

At some point during development, it's decided that additional resolution is required for the blend component\. So the integer is changed to a floating point value with a valid range between 0\.0f and 1\.0f to represent the current blend state\. There are a lot of assets that were saved with the original integer value, so a version converter is added which performs this upgrade automatically\.

```
// Blend Component (V2)
class BlendComponent : public Component
{
public:
    AZ_TYPE_INFO(BlendComponent , "{ED986571-2B3D-4E22-A2D8-F74A29A730DE}");
    static void Reflect(ReflectContext* context)
    {
        if (auto serializeContext = azrtti_cast<SerializeContext*>(context))
        {
            serializeContext->Class<BlendComponent>()
                ->Version(2, BlendComponent::VersionUpgrader)
                ///// SERIALIZATION OF THE FIELD HASN'T CHANGED /////
                ->Field("BlendState", &BlendComponent::m_blendState);
        }
    }
 
    ///// ONLY WORKS WITH A CLASS ELEMENT REPRESENTING THE ENTIRE BLEND COMPONENT TYPE /////
    bool VersionUpgrader(SerializeContext& context, DataElementNode& classElement)
    {
        if(version < 2)
        {
            int oldBlendValue;
            int oldBlendIndex = classElement.FindElement(AZ_CRC("BlendState"));
            if(oldBlendIndex != -1)
            {
                if(classElement.GetSubElement(oldBlendIndex).GetData(oldBlendValue))
                {
                    float newBlendValue = float(oldBlendValue) / 100.0f;
                    classElement.RemoveElement(oldBlendIndex);
                    classElement.AddElementWithData(context, "BlendState", newBlendValue);
                }
            }
             
             
        }
    }
private:
    // A value from 1 to 100 representing the blend state
    ///// CHANGED FROM INT TO FLOAT /////
    float m_blendState;
};
```

This automatic conversion works great when loading all slices and levels containing entities with old BlendComponents in them\. The earlier versions are automatically modified to properly take advantage of the new floating point format\. However, this conversion function is not effective when data patches are involved\. Since data patches do not contain a representation of the entire BlendComponent class, the version converter cannot be used to modify the lone value stored in the data patch\. In fact, there is no way for the serializer to know that the integral value being supplied is out of date\. Behavior at this point is undefined and could result in a crash or, in some cases, data loss and data corruption\.

The following example shows the sequence of events that can cause the data loss or corruption\.

**An example sequence of events**

1. BlendComponent Version 1 is created\.

1. A content creator makes "Slice A," which includes an entity with BlendComponent Version 1 on it\.

1. A content creator instantiates Slice A and changes the Blend Value field in the Blend Component\.

1. The creator now selects Slice A, and possibly other entities, and creates a new nested slice, "Slice B\."

1. Slice B now contains a *data patch*, which points to the Blend Value field in Slice A and contains an integer\.

1. The BlendComponent is updated to Version 2\. Blend Value is now stored as a float\.

1. A content creator instantiates Slice B\. This results in undefined behavior\.

### How to Avoid Data Loss<a name="version-converters-and-avoiding-data-loss"></a>

We recommend the following three\-step process to help avoid data loss and stability issues in Lumberyard v1\.22 and earlier:

1. Do not change existing serialization fields\. If a change is required, add a new field\. This prevents earlier data patches from potentially causing crashes and lets you continue loading old assets\. When implementing a version converter, do not remove the old field\. Just read the old field and add a new one\. 

1. In your component's Init function, perform the conversion again on the old data\. If the result differs from the data in the new field, it must have come from a data patch, and you can replace it\.

1. Propagate all changes made to the value in the new field over to the old field\. This prevents the Init function from overwriting any future changes made to the new field's value when loading\.

**Note**  
If it is not possible to keep the two values in sync in step 3, then the only way to prevent further issues after following steps 1 and 2 is to load and resave all slices which contain the versioned component, and then remove the Init function and the old field\.

The following example demonstrates these steps for preventing data loss by revising the earlier example of version 2 of the **BlendComponent **\.

```
// Blend Component (V2)
class BlendComponent : public Component
{
public:
    AZ_TYPE_INFO(BlendComponent , "{ED986571-2B3D-4E22-A2D8-F74A29A730DE}");
    static void Reflect(ReflectContext* context)
    {
        if (auto serializeContext = azrtti_cast<SerializeContext*>(context))
        {
            serializeContext->Class<BlendComponent>()
                ->Version(2, BlendComponent::VersionUpgrader)
                ->Field("BlendState", &BlendComponent::m_blendState)
                ///// REFLECT THE NEW FIELD AND THE OLD FIELD /////
                ->Field("NewBlendState", &BlendComponent::m_floatBlendState);
        }
    }
 
 
    void Init() override
    {
        ///// MIGRATE DATA PATCHES TO NEW DATA HERE /////
        float newBlendState = float(m_blendState) / 100.0f;
        if(newBlendState != m_floatBlendState)
        {
            m_floatBlendState = newBlendState;
        }
    }
 
    bool VersionUpgrader(SerializeContext& context, DataElementNode& classElement)
    {
        if(version < 2)
        {
            int oldBlendValue;
            int oldBlendIndex = classElement.FindElement(AZ_CRC("BlendState"));
            if(oldBlendIndex != -1)
            {
                if(classElement.GetSubElement(oldBlendIndex).GetData(oldBlendValue))
                {
                    float newBlendValue = float(oldBlendValue) / 100.0f;
                    ///// NO LONGER REMOVE THE OLD DATA /////
                    classElement.AddElementWithData(context, "NewBlendState", newBlendValue);
                }
            }
        }
    }
private:
    // A value from 1 to 100 representing the blend state
    ///// ADD A NEW FIELD RATHER THAN REPLACING THE OLD ONE /////
    int m_blendState;
    float m_floatBlendState;
};
```