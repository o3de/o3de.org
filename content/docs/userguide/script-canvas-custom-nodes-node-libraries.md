# Node Libraries<a name="script-canvas-custom-nodes-node-libraries"></a>

Nodes in a gem are typically stored in node libraries\. These libraries aid in the registration of the nodes with the Script Canvas Gem\. They also help organize the nodes within the Script Canvas editor's **Node Palette**\.

The following procedure uses the Script Canvas Diagnostic Library Gem, which is an example of how to create gems that extend Script Canvas\. The source code files are in the directory `\dev\Gems\ScriptCanvasDiagnosticLibrary\Code\Source`\.

**To create a node library for a gem for use with Script Canvas**

1. Declare your library\. The following example \(`Debug.h`\) shows a library declaration from the Script Canvas Diagnostic Library Gem\.

   ```
   struct Debug : public Library::LibraryDefinition
   {
       AZ_RTTI(Debug, "{3E28E41D-F4C9-4542-A08F-2B1F5DAA9509}", Library::LibraryDefinition); 
       static void Reflect(AZ::ReflectContext*);
       static void InitNodeRegistry(NodeRegistry& nodeRegistry);
       static AZStd::vector<AZ::ComponentDescriptor*> GetComponentDescriptors();
   };
   ```

1. After you declare the library, reflect it\. The following example is from `Debug.cpp`\.

   ```
   void Debug::Reflect(AZ::ReflectContext* reflection)
   {
       AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(reflection);
       if (serializeContext)
       {
           serializeContext->Class<Debug, Library::LibraryDefinition>()
               ->Version(1)
               ; 
           AZ::EditContext* editContext = serializeContext->GetEditContext();
           if (editContext)
           {
               editContext->Class<Debug>("Debug", "")->
                   ClassElement(AZ::Edit::ClassElements::EditorData, "")->
                   Attribute(AZ::Edit::Attributes::Icon, "Editor/Icons/ScriptCanvas/Debug.png")
                   ;
           }
       }
   }
   ```

1. Use the `InitNodeRegistry` and `AddNodeToRegistry` functions to register the library's nodes \(`Debug.cpp`\)\.

   ```
   void Debug::InitNodeRegistry(NodeRegistry& nodeRegistry)
   {
       Library::AddNodeToRegistry<Debug, Nodes::Debug::Log>(nodeRegistry);
   } 
   AZStd::vector<AZ::ComponentDescriptor*> Debug::GetComponentDescriptors()
   {
       return AZStd::vector<AZ::ComponentDescriptor*>({
              Nodes::Debug::Log::CreateDescriptor()
        });
   }
   ```

1. Ensure that your library and its nodes are reflected in your gem's `Reflect` function\.

   ```
   ScriptCanvas::Libraries::Debug::Reflect(context); 
   ```

1. Add the following code your gem's `Init` function\. The following example is from `ScriptCanvasDiagnosticSystemComponent.cpp`\. This code is important because it inserts your gem's nodes into the Script Canvas Gem's environment\.

   ```
   AZ::EnvironmentVariable<ScriptCanvas::NodeRegistry> nodeRegistryVariable = AZ::Environment::FindVariable<ScriptCanvas::NodeRegistry>(ScriptCanvas::s_nodeRegistryName);
   if (nodeRegistryVariable)
   {
       ScriptCanvas::NodeRegistry& nodeRegistry = nodeRegistryVariable.Get();
       ScriptCanvas::Libraries::Debug::InitNodeRegistry(nodeRegistry);
   }
   ```

1. Make sure the library's descriptor is registered in your gem's module\. The following code is from `ScriptCanvasDiagnosticLibraryGem.cpp`\.

   ```
   Module::Module()
       : AZ::Module()
   {
       m_descriptors.insert(m_descriptors.end(), {
           ScriptCanvasDiagnostics::SystemComponent::CreateDescriptor(),
       }); 
       AZStd::vector<AZ::ComponentDescriptor*> componentDescriptors(ScriptCanvas::Libraries::Debug::GetComponentDescriptors());
       m_descriptors.insert(m_descriptors.end(), componentDescriptors.begin(), componentDescriptors.end());
   }
   ```