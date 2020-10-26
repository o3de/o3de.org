# CryEntity Removal Gem<a name="gems-system-cryentity-removal-gem"></a>

You can use the CryEntity Removal gem to disable all [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy) features from Lumberyard Editor\. Legacy features appear as *legacy* in Lumberyard Editor and will eventually be removed\. This includes the following features:
+ [Database View](level-database-view.md) \(Legacy\)
+ [Object Selector](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-object-selector.html) \(Legacy\)
+ [Layer Editor](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/level-layers-intro.html) \(Legacy\)
+ Rollup Bar\(Legacy\)
+ Asset Browser \(Legacy\) 

When the gem is enabled, Lumberyard Editor displays only the features and tools that use the new component entity system\. For more information, see [Working with component entities](component-intro.md)\.

By default, the gem is disabled\. For more information about enabling gems, see [Add modular features and assets with Gems](gems-system-gems.md)\.

![\[The CryEntity Removal gem disables all legacy features and tools in Lumberyard Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-cryentity-removal-gem.png)

**Note**  
When you enable the gem and open Lumberyard Editor, you are prompted to convert your legacy entities \(CryEntities\) to the new component entity system\. Once an entity is converted, it cannot be converted back to a legacy entity\. For more information about converting your entities, see [Converting Entities with the Legacy Converter](component-entity-data-converter.md)\. 
If you want to enable the legacy features again, return to the Project Configurator and disable the CryEntity Removal gem\. When you reload Lumberyard Editor, the legacy features reappear\. 
If you create a project with Lumberyard 1\.12 or newer, the CryEntity Removal gem is enabled by default\. If you want to use legacy features, disable the gem\. 