# Configuring System Entities<a name="az-module-system-entities-configuring"></a>

A single *system entity* lives at the heart of every Lumberyard application\. The system entity's components, known as [system components](az-module-system-components.md), power major systems within Lumberyard\. You can use the Project Configurator's System Entity Editor to choose and configure the system components for your project\. Editing the system entity for your project is like editing an entity in the **[Entity Inspector](component-entity-inspector.md)**\.

**To configure system entities**

1. Compile a profile build of your project so that the Project Configurator can load your project's compiled code\.

1. Open the Lumberyard Project Configurator, located at `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\.

1. In the Project Configurator, select your project\.

1. Click **Advanced Settings**\.  
![\[Click Advanced Settings in the Project Configurator.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-advanced-settings.png)

   The first time that you use the System Entity Editor, it performs the following tasks\.

   1. Loads the configuration for your system entity\.

   1. Identifies system components that are missing\.

   1. Adds the missing system components to the configuration\.

   1. Displays the list in the **Added required components** dialog box\. The following image shows an example\.  
![\[Added required components in the System Entity Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-added-required-components.png)
**Note**  
Some system components are optional, and some are required\. Both the Lumberyard engine and the gems that your project uses can require certain components\.

1. In the **Added required components** dialog box, click **OK**\.

1. The **Project** option shows the project that you selected\. Use the drop\-down menu to select a different project to edit\.   
![\[Choose a project in the System Entity Editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-choose-project.png)

1. For the **Configuration** option, choose **Game** if you want to make changes to the system entity for the `Game` \(launcher\), or **Editor** to modify the system entity for the `Editor`\.  
![\[Choose the Game system entity or the Editor system entity\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-choose-game-or-editor.png)

   The **System Entity** tab lists any components that have already been added\.  
![\[Added components for the system entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-tab-added-components.png)

1. To add a component to the system entity, click **Add Component**\.  
![\[Click Add Component to add a component to the system entity\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-add-component.png)

1. To see more information about a component before you add it, pause your pointer over the name\.  
![\[For a brief description of the component, see its tooltip\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-add-component-tool-tip.png)

1. To add the component to the system entity, select the component, and then click **Save**\. The component appears in the list of components for the system entity\.

1. To delete, disable, or change a component's position, right\-click the component and choose the corresponding action\.  
![\[Right-click a component to delete, disable, or move it.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-context-menu.png)

1. To configure system memory options, choose the **Memory Settings** tab\.  
![\[System memory settings in the System Entity Editor,\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/modules/az-module-system-entities-system-memory-settings.png)

1. Click **Save** to save your changes to disk\. The changes that you make on the **System Entity** and **Memory Settings** tabs are saved to a `Game.xml` or `Editor.xml` application descriptor file\.

## Application Descriptor Files<a name="az-module-system-entities-configuring-app-descriptor-files"></a>

When you edit a system entity's configuration with the Project Configurator **Advanced Settings** dialog box, you are actually editing an application descriptor file\.

Application descriptor files list all modules that a project uses\. Each project requires a `Game.xml` and an `Editor.xml` application descriptor file in its asset directory:

`lumberyard_version\dev\project_asset_directory\Config\Game.xml`

`lumberyard_version\dev\project_asset_directory\Config\Editor.xml`

In the Project Configurator **Advanced Settings** dialog box, these files correspond to the **Game** and **Editor** options in the **Configuration** menu\.

The following example shows the beginning of a `Game.xml` file\. Both the `Game.xml` file and the `Editor.xml` file have the same structure\.

```
<ObjectStream version="1">
   <Class name="ComponentApplication::Descriptor" type="{70277A3E-2AF5-4309-9BBF-6161AFBDE792}">
      <Class name="bool" field="useExistingAllocator" value="false" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
      <Class name="bool" field="grabAllMemory" value="false" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
      <Class name="bool" field="allocationRecords" value="true" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
      <Class name="bool" field="autoIntegrityCheck" value="false" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
      <Class name="bool" field="markUnallocatedMemory" value="true" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
      <Class name="bool" field="doNotUsePools" value="false" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
      <Class name="bool" field="enableScriptReflection" value="true" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
      <Class name="unsigned int" field="pageSize" value="65536" type="{43DA906B-7DEF-4CA8-9790-854106D3F983}"/>
      <Class name="unsigned int" field="poolPageSize" value="4096" type="{43DA906B-7DEF-4CA8-9790-854106D3F983}"/>
      <Class name="unsigned int" field="blockAlignment" value="65536" type="{43DA906B-7DEF-4CA8-9790-854106D3F983}"/>
      <Class name="AZ::u64" field="blockSize" value="0" type="{D6597933-47CD-4FC8-B911-63F3E2B0993A}"/>
      <Class name="AZ::u64" field="reservedOS" value="0" type="{D6597933-47CD-4FC8-B911-63F3E2B0993A}"/>
      <Class name="AZ::u64" field="reservedDebug" value="0" type="{D6597933-47CD-4FC8-B911-63F3E2B0993A}"/>
      <Class name="char" field="recordsMode" value="2" type="{3AB0037F-AF8D-48CE-BCA0-A170D18B2C03}"/>
      <Class name="unsigned char" field="stackRecordLevels" value="5" type="{72B9409A-7D1A-4831-9CFE-FCB3FADD3426}"/>
      <Class name="bool" field="enableDrilling" value="true" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
      <Class name="AZStd::vector" field="modules" type="{2BADE35A-6F1B-4698-B2BC-3373D010020C}">
         <Class name="DynamicModuleDescriptor" field="element" type="{D2932FA3-9942-4FD2-A703-2E750F57C003}">
            <Class name="AZStd::string" field="dynamicLibraryPath" value="LmbrCentral" type="{EF8FF807-DDEE-4EB0-B678-4CA3A2C490A4}"/>
         </Class>
[...]
```

The list of system components in the application descriptor file corresponds to the list of components on the **System Entity** tab in the Project Configurator, **Advanced Settings**, **System Entity Editor** dialog box\. Each component can have its own settings\. The application descriptor file also contains properties that determine how to allocate memory\. These correspond to the settings on the **Memory Settings** tab in the **System Entity Editor** dialog box\.