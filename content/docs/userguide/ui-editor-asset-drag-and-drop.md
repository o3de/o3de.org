# Asset Drag and Drop<a name="ui-editor-asset-drag-and-drop"></a>

You can drag and drop existing assets from the **[Asset Browser](asset-browser-intro.md)** into the **UI Editor’s** viewport, hierarchy pane, properties pane, or a specific property field\. This can be a convenient way to create new entities and assets to work with in the **UI Editor**\.

**Dragging assets associated with components**
+ You can drop any asset that is associated with a component, such as a Script Canvas file or a Lua script file, into the **UI Editor** viewport or hierarchy pane\.

  When you drag an asset from the **Asset Browser** into the *viewport*, the **UI Editor** does the following:
  + Creates a new entity at the cursor's location\.
  + Adds the associated component, which is indicated by the icon next to the asset in the **Asset Browser**\.
  + Assigns the asset for that component's property\.

  When you drag an asset from the **Asset Browser** into the *hierarchy pane*, the **UI Editor** does the following:
  + Creates a new entity and places it as a child of an existing parent, unless the drop location is directly on an entity\. In this case, the associated component is added to that existing entity without creating a new one\. To override this behavior, press the **Shift** key down while you drop the asset\. This creates a new entity and places it as a child of the existing entity\.
  + Adds the associated component, which is indicated by the icon next to the asset in the **Asset Browser**\.
  + Assigns the asset for that component's property\.

  When you drag an asset from the **Asset Browser** into the *properties pane*, the **UI Editor** does the following to all selected entities:
  + Adds the associated component, which is indicated by the icon next to the asset in the **Asset Browser**\.
  + Assigns the asset for that component's property\.

**Dragging UI slice assets**
+ You can drop any slice asset that consists of only UI entities into the **UI Editor** viewport or hierarchy pane\.

  When you drag a UI slice asset from the **Asset Browser** into the *viewport*, the **UI Editor** does the following:
  + Instantiates a new entity from the dragged slice at the cursor's location\.

  When you drag a UI slice asset from the **Asset Browser** into the *hierarchy pane*, the **UI Editor** does the following:
  + Instantiates a new entity from the dragged slice and places it as a child of an existing parent, according to the drop location in the hierarchy\.

**Dragging UI Canvas assets**
+ Drag UI Canvas assets from the **Asset Browser** into the **UI Editor** to open them for editing\.

**Dragging assets to property fields**
+ Drag an asset from the **Asset Browser** onto an asset property field in the properties pane to assign that asset to a component’s property\.