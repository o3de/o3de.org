# Gems and AZ Modules<a name="az-module-gems"></a>

The gems system was developed to make it easy to share code between projects\. Gems are reusable packages of module code and assets which can be easily added to or removed from a Lumberyard game\. Gems also promote writing code in a way that is more modular than that found in legacy libraries\. For example, each gem has its own include folder for its public interface code files\. Gems also come with package management metadata such as semantic versioning and the ability to state dependencies on other gems\. 

## Structure of a Gem<a name="az-module-gems-structure-of-a-gem"></a>

A gem's directory contents are organized as follows: 

```
GemDirectory/
    Assets/
        (assets usable to projects)
    Code/
        Include/
            (public interface code files)
        Source/
            (private implementation code files)
        Tests/
            (code files for tests)
        wscript (waf build info)
    gem.json (gem metadata)
```

## Waf Integration<a name="az-module-gems-waf-integration"></a>

Each game project must explicitly list the gems that it uses\. When [Using the Waf Build System](waf-intro.md) runs, it builds only those gems which are actively in use\. Waf also makes a gem’s `include/` directory accessible to any gems or projects that explicitly depend upon the gem\.

## Gems Built as AZ Modules<a name="az-module-gems-as-az-modules"></a>

All gems that ship with Lumberyard are built as AZ modules\. When you build a gem as an AZ module, the gem uses the initialization functions expected by the AZ framework\. An AZ module gem has public interfaces that are [event buses](ebus-intro.md) and is better integrated with the new [component entity system](component-intro.md)\.

When you use the Project Configurator to enable or disable a gem, Lumberyard updates the [application descriptor file](az-module-system-entities-configuring.md#az-module-system-entities-configuring-app-descriptor-files) accordingly to ensure it references all AZ modules\. If you edit the `dev\<project_asset_directory>\gems.json` list of gems by hand, you can use the following command to bring the application descriptor file up to date: 

```
dev\Tools\LmbrSetup\Win\lmbr.exe projects populate-appdescriptors
```

### About Gem Versioning<a name="az-module-gems-about-versioning"></a>

The `GemFormatVersion` value is versioning for how a gem is built\. Gem version numbers like `0.1.0` refer to the gem's API version\. 

Gems from Lumberyard 1\.4 and earlier \(legacy gems\) all have a `GemFormatVersion` value of `2`\. Starting in Lumberyard 1\.5, all the gems included with Lumberyard are AZ modules and have a `GemFormatVersion` value of `3`\. This tells Lumberyard that the gem is an AZ module and that it should be loaded accordingly\. 

A gem may also have an API version number like `0.1.0`\. This is independent of the `GemFormatVersion`\. The API version alerts your users to API changes\. If the API version number changes, then users of the gem may need to make changes to their code\. For example, the Rain gem will stay at version `0.1.0` until its API changes\. If you were using the Rain gem from Lumberyard 1\.4, you can still use the Rain gem from Lumberyard 1\.5 without changing any of your data or code\. 

For more information about gems, see [Add modular features and assets with Gems](gems-system-gems.md)\.