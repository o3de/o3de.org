# Editor Components<a name="component-entity-system-pg-editor-components"></a>

Some components in Lumberyard have separate `editor` and `runtime` versions\. The editor version is active in the editor\. The runtime version is used for running the level in game or in the editor by pressing **Ctrl\+G** or clicking **AI/Physics** below the viewport\. Lumberyard uses editor components to maintain a clean separation between tools\-specific code and data on one hand, and leaner runtime component data on the other\. In general, runtime game components do not require editor counterparts\. Components rarely need to be fully active at edit time\. The light and mesh components are exceptions because they must behave the same at edit time as at run time\.

`EditContext` reflection is fully supported in runtime components\. Edit time is the only time when editor components are active\. At run time, when Lumberyard processes a level or dynamic slice, it uses the runtime equivalents of editor components\. Using the `EditContext` from a runtime component is usually sufficient to provide a rich editing experience\.

**Important**  
Editor components are not required\. An editor component is necessary only if one of the following is true:  
Your component must be fully active at edit time\. Edit time refers to standard editing mode; runtime components are used for the **AI/Physics** mode and gameplay \(**Ctrl\+G**\)\.
You must add special tools functionality to your component that requires that you compile only into your editor binaries\.
Your component provides functionality only in the editor and does not export a runtime component \(for example, if your component manages selection logic\)\.

## Sample Editor Component<a name="component-entity-system-pg-editor-components-sample"></a>

The following code shows a sample editor component\.

```
/* Include the following headers:
 * EditorComponentBase.h - the editor component base class. Derive from
 * this class to create a component to use in the editor that is the 
 * counterpart of the version of the component that is used during runtime. 
 * EntityDebugDisplayBus.h - provides a debug draw API to be used by components. 
 * EditorVisibilityBus.h - controls whether an entity is shown or hidden in the editor 
 * MyComponent.h - header file for the runtime version of the component. 
*/
#include <AzToolsFramework/ToolsComponents/EditorComponentBase.h>
#include <AzToolsFramework/ToolsComponents/EditorVisibilityBus.h>
#include <AzFramework/Entity/EntityDebugDisplayBus.h>
#include <MyComponent.h>

class MyEditorComponent 
      : public AzToolsFramework::Components::EditorComponentBase
      , private AzFramework::EntityDebugDisplayEventBus::Handler
{
public:
      AZ_EDITOR_COMPONENT(MyEditorComponent, "{5034A7F3-63DB-4298-83AA-915AB23EFEA0}");
      
      // Perform reflection for this component. The context parameter is the reflection context.
      static void Reflect(AZ::ReflectContext* context);
 
      // AZ::Component interface implementation.
      void Init() override;
      void Activate() override;
      void Deactivate() override;

    
      // AzFramework::EntityDebugDisplayEventBus implementation.
      void DisplayEntityViewport(const AzFramework::ViewportInfo& viewportInfo, AzFramework::DebugDisplayRequests& debugDisplay) override;
 
      // Optional functions for defining provided and dependent services.
      static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
      static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);
      static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
      static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);
      
      // Faciliate the translation of an editor component into a runtime component.
      void BuildGameEntity(AZ::Entity* gameEntity) override;
      
};
```

## Editor Component and Runtime Component Differences<a name="component-entity-system-pg-editor-components-editor-runtime-differences"></a>

The code for editor components is similar to the code for runtime components\. The following sections list the key differences\. It is safe to assume that editor component code is the same as it is for runtime component code other than the differences listed\. For more information, see [Creating a Component](component-entity-system-create-component.md)\.

### Base Classes<a name="component-entity-system-pg-editor-components-base-classes"></a>

All editor components include the `AzToolsFramework::Components::EditorComponentBase` class somewhere in their inheritance ancestry\. If a component must display edit\-time visualization, it must be a handler on the `AzFramework::EntityDebugDisplayEventBus::Handler` bus, as in the following example\.

```
#include <AzToolsFramework/ToolsComponents/EditorComponentBase.h>
#include <AzFramework/Entity/EntityDebugDisplayBus.h>
... 
class MyComponent 
      : public AzToolsFramework::Components::EditorComponentBase
      , private AzFramework::EntityDebugDisplayEventBus::Handler
```

### Macro<a name="component-entity-system-pg-editor-components-macro"></a>

Every editor component must specify the `AZ_EDITOR_COMPONENT` macro within its class definition\. The macro takes two arguments:

1. The component type name\.

1. A unique UUID\. You may use any UUID generator to produce the value\. Visual Studio provides this functionality through **Tools**, **Create GUID**\. Use the **Registry Format** setting, and then copy and paste the value that is generated\.

A sample `AZ_EDITOR_COMPONENT` macro follows\.

```
AZ_EDITOR_COMPONENT(MyEditorComponent, "{5034A7F3-63DB-4298-83AA-915AB23EFEA0}");
```

**Note**  
Some Lumberyard editor components specify `AzToolsFramework::Components::EditorComponentBase` as the base class but use the `AZ_COMPONENT` instead of the `AZ_EDITOR_COMPONENT` macro, as in the following example\.  

```
AZ_COMPONENT(EditorMannequinComponent, "{C5E08FE6-E1FC-4080-A053-2C65A667FE82}", AzToolsFramework::Components::EditorComponentBase);
```

### The DisplayEntityViewport Method<a name="component-entity-system-pg-editor-components-displayentityviewport"></a>

To draw debug visuals in the viewport for a specific entity, implement the `DisplayEntityViewport` method of the `AzFramework::EntityDebugDisplayEventBus` interface\. Use this location for custom primitive edit\-time visualization code\.

```
#include <AzFramework/Entity/EntityDebugDisplayBus.h>
...
void DisplayEntityViewport(const AzFramework::ViewportInfo& viewportInfo, AzFramework::DebugDisplayRequests& debugDisplay) override;
```


****  

| Parameter | Description | 
| --- | --- | 
| viewportInfo | Determines information such as camera position\. | 
| debugDisplay | Contains the interface for debug draw or display commands\. | 

lala

### The BuildGameEntity Method<a name="component-entity-system-pg-editor-components-buildgameentity"></a>

The `BuildGameEntity` method from `EditorComponentBase.h` facilitates the translation of an editor component into a runtime component\. Override this method as follows\.

```
#include <AzToolsFramework/ToolsComponents/EditorComponentBase.h>
...
void BuildGameEntity(AZ::Entity* gameEntity) override;
```

A typical implementation of the `BuildGameEntity` method performs the following actions:

1. Create a runtime component based on the editor component of the specified `gameEntity`\.

1. Copy the configuration data from the editor component into the runtime component\.

1. Add the runtime component to the `gameEntity` that was specified\.

At this point, the runtime component serializes the `gameEntity` and reloads it to create a new, clean version of the runtime entities\.