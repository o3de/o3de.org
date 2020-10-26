# Legacy Terrain Gem<a name="gems-system-gem-legacy-terrain"></a>

The Legacy Terrain Gem enables the legacy terrain system in Lumberyard version 1\.24 or later\. With this gem, you can use the **Legacy Terrain** level component in the **Level Inspector** to add terrain to levels\. Levels that were created in Lumberyard versions before 1\.24 that use the legacy terrain system display a warning when they are loaded in Lumberyard version 1\.24 or later, and the new **Legacy Terrain** level component is automatically added to the level\. Newly created levels have the **Legacy Terrain** level component added by default\. 

![\[The Legacy Terrain Gem for Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gem-icons/ui-legacy-terrain-gem-1.24.png)

**Note**  
In Lumberyard versions 1\.24 and later, the Legacy Terrain Gem is enabled by default for Lumberyard projects and is required to enable the legacy terrain system\.  
For more information about Gems, see the [Gems documentation](gems-system-gems.md)\.

The Legacy Terrain Gem doesn't introduce new tools to edit terrain\. Terrain texture layers are created with the **Terrain Texture Layers** editor\. Terrain heightmaps are painted with the **Terrain Editor**\. Terrain can be painted and sculpted in the **Perspective** viewport with the **Terrain Tool**\. For more information about editing terrain, see [Creating Terrain](terrain-intro.md)\. 

In addition to the Legacy Terrain Gem, Lumberyard version 1\.24 introduces a new terrain API: [`AzFramework::Terrain::TerrainDataRequestBus`](component-legacy-terrain-api.md)\. The legacy terrain system has been refactored to integrate the new terrain API\. This new API makes it easier to seamlessly replace the legacy terrain system with your own terrain system\. The legacy terrain APIs that are present in `I3DEngine.h` and `ITerrain.h` have been marked for deprecation\. If your project uses the legacy terrain APIs, you should migrate your code as soon as possible to use the new `AzFramework::Terrain::TerrainDataRequestBus`\. The legacy terrain APIs will be removed in a future release\. 

## Disable terrain editor tools<a name="disable-terrain-editor-tools"></a>

Lumberyard builds the terrain editor tools by default\. If the Legacy Terrain Gem is disabled, a WAF configure\-time warning is raised because terrain can't be added to the level, so the terrain editor tools serve no purpose\. 

If you are **not** using the Legacy Terrain Gem, you can disable the terrain editor tools in the WAF build settings\. To disable the terrain editor tools, use one of the following options\. 
+ Manually set the build flag `enable_legacy_terrain_editor` to **False** in *`lumberyard_version`*`\dev\_WAF_\``user_settings.options:` 

  ```
  [Build Options]
  ...
  enable_legacy_terrain_editor = False
  ...
  ```
+ Change the value `enable_legacy_terrain_editor` in the Lumberyard WAF options dialog\. 

  1. Open the Lumberyard WAF options from *`lumberyard_version`*\\dev with the following command\.

     ```
     lmbr_waf show_option_dialog
     ```  
![\[WAF build options for legacy terrain editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/legacyterrain/ui-enable-legacy-terrain-editor-1.24.png)

  1. Find the **enable\_legacy\_terrain\_editor** option in the **Build** tab and deselect the check box on the right to disable the terrain editor tools\. 

## Legacy terrain system<a name="legacy-terrain-gem-topics"></a>
+ [Legacy Terrain level component](component-legacy-terrain.md)
+ [TerrainDataRequestBus API](component-legacy-terrain-api.md)