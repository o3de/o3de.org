# Asset Memory Analyzer Gem<a name="asset-memory-analyzer-gem"></a>

Resource management is crtitcal, particularly on platforms such as mobile devices and consoles where heap \(system memory\) and VRAM \(video memory\) are limited\. In any given project, the model, texture, animation, and audio resource files that make up the project's assets use the bulk of the memory allocated to run the project\. **Asset Memory Analyzer** shows how memory is allocated to assets as your project runs\. It is an indispensable tool to balance memory usage and get the best performance for your project\. 

The **Asset Memory Analyzer** is an Amazon Lumberyard Gem that displays a table of heap and VRAM memory allocations per asset through the **ImGUI** \(Immediate Mode Graphical User Interface\) overlay\. In addition to live display of memory allocations for assets loaded in the project, the **Asset Memory Analyzer** can export allocation data to `JSON` and `CSV` files\. 
+ [Enable the **Asset Memory Analyzer**](#enable-asset-memory-analyzer) 
+ [View Live Asset Memory Analysis with **ImGUI**](#view-live-asset-memory-analysis) 
+ [Export an Asset Memory Analysis Snapshot to a File](#export-asset-memory-analysis-to-file) 
+ [View a JSON Asset Memory Analysis Snapshot in a Browser](#view-json-snapshot-in-browser) 
+ [Instrumenting Code for Asset Memory Analysis](#instrumenting-code) 

## Enable the **Asset Memory Analyzer**<a name="enable-asset-memory-analyzer"></a>

To use the **Asset Memory Analyzer**, enable asset scope tracking, configure and compile a **profile** build of your project, and enable asset memory analysis\. 

1. Use Project Configurator to add the **Asset Memory Analyzer** Gem and ImGUI Gem to your project\. 

1. Uncomment the line `enable_memory_tracking` and set its value to `True` in the `user_settings.options` file located in `\dev\_WAF_\` to enable asset scope tracking\. 

   ```
   ...
   ;use_crcfix = True
   enable_memory_tracking = True
   ;generate_sig_debug_output = False
   ...
   ```

1. Configure your project\. 

   **lmbr\_waf configure** 

1. Create a **profile** build of your project\. 

   **lmbr\_waf build\_*win\_x64\_vs2019*\_profile \-p all \-\-progress** 

1. Set the CVAR `assetmem_enabled=1` via the Editor Console to enable asset memory analysis\. To make the setting persistent, add `assetmem_enabled=1` to an appropriate config file such as `/dev/system_windows_pc.cfg`\. 

## View Live Asset Memory Analysis with **ImGUI**<a name="view-live-asset-memory-analysis"></a>

To view live asset memory allocation, enable the **ImGUI** overlay during gameplay and choose **Asset Memory Analyzer** in the **ImGUI** window\. 

1. In the Lumberyard Editor, press Ctrl\+G or press the **Play** button to run your project\. 

1. Press the Home key to open the ImGUI overlay window\. 

1. Choose **Asset Memory Analyzer** from the top of the **ImGUI** overlay window\. 

![\[The ImGUI overlay dispalying the Asset Memory Analyzer.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/assetmemoryanalyzer/ui-asset-memory-analyzer-A-1.22.png)

Each recorded asset is displayed along with the number of allocations and total size in kilobytes for both heap and VRAM\. Use the selections at the top of the **ImGUI** overlay window to sort the table by heap size, heap count, VRAM size, VRAM count or by asset label alphabetically\. 

**Note**  
The asset label is the full path for each asset from the root of the project folder\. 

Click the **arrow** to the left of an asset to expand it and view individual allocations and references belonging to the asset\. 

![\[Expanded view of an asset in the Asset Memory Analyzer.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/assetmemoryanalyzer/ui-asset-memory-analyzer-B-1.22.png)

## Export an Asset Memory Analysis Snapshot to a File<a name="export-asset-memory-analysis-to-file"></a>

Snapshots of asset memory allocation can be exported to `JSON` or `CSV` files through three methods: 
+ Click **Asset Memory Analyzer** in the **ImGUI** overlay window and choose **Export JSON** or **Export CSV**\.   
![\[Snapshot output options for the Asset Memory Analyzer.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/assetmemoryanalyzer/ui-asset-memory-analyzer-C-1.22.png)
+ Use the console commands **assetmem\_export\_json** or **assetmem\_export\_csv** in the Editor Console to generate the file\. 
+ Call `ExportJSONFile` or `ExportCSVFile` on the `AssetMemoryAnalyzerRequestBus` in C\+\+, with `nullptr` as the parameter, to generate the file in the default location\. 

  ```
  EBUS_EVENT(AssetMemoryAnalyzerRequestBus, ExportJSONFile, nullptr);
  ```

The snapshot file is created in the project log directory located at `dev/Cache/ProjectName/pc/user/log` and named `assetmem-2020-01-30-11-45-25.json` or `.csv`\. 

**Note**  
Due to the limitations of the `CSV` format, only a top\-level overview of assets will be written to `CSV`, *without* the hierarchical drill\-down available in the `JSON` file or the **ImGUI** overlay window\. 

## View a JSON Asset Memory Analysis Snapshot in a Browser<a name="view-json-snapshot-in-browser"></a>

`JSON` snapshots can be viewed in a browser with a web viewer provided with Lumberyard\. The web viewer is located at `\dev\Gems\``AssetMemoryAnalyzer/www/AssetMemoryViewer/index.html`\. Open the `index.html` file and drag\-and\-drop the `JSON` file onto the page, or click on the target area to browse to it\. This displays the contents of the file in an expandable table\. 

![\[The Asset Memory Viewer displaying a JSON snapshot in a browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/assetmemoryanalyzer/ui-asset-memory-analyzer-D-1.22.png)

**Note**  
Chromium based browsers are most reliable\. 

The table can be sorted by any column\. The columns give a breakdown by multiple categories: 
+ **Heap** allocations and **VRAM** allocations 
+ **Local** summary not including any sub\-assets and **Total** summary including all sub\-assets 
+ **Number** of allocations and **Kilobytes** allocated 

Expanding assets will display individual allocations belonging to the asset and sub\-assets that were loaded through references\. 

The fields at the top of the table can be used to filter the assets by their label on a number of conditions, including regular expressions\. 

![\[The Asset Memory Viewer filtering a JSON snapshot in a browser by keyword.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/assetmemoryanalyzer/ui-asset-memory-analyzer-E-1.22.png)

## Instrumenting Code for Asset Memory Analysis<a name="instrumenting-code"></a>

**Initial Loading of an Asset**  
The **Asset Memory Analyzer** traps allocations \(heap and VRAM\) that occur during a slice of code execution or scope when an asset is active for recording\. When a system begins loading a new asset, it should use the `AZ_ASSET_NAMED_SCOPE` macro to demarcate the C\+\+ scope in which that asset may be actively making allocations\. For example: 

```
#include <AzCore/Debug/AssetMemoryDriller.h>
 
Foo* LoadMyFooAsset(const char* name)
{
    AZ_ASSET_NAMED_SCOPE("Foo: %s", name);
    Foo* result = aznew Foo(name);  // The call to aznew will be recorded as associated with the asset "Foo: <name>"
     
    return result;  // Once we exit this function, the asset will no longer be in scope, and subsequent allocations will not be recorded
}
```

**Subsequent Processing of an Asset**  
When the asset is being updated, otherwise processed, or is being handed off to a different thread, it should use the `AZ_ASSET_ATTACH_TO_SCOPE` macro with a pointer that was allocated and tracked by the initial asset\. This will associate any further allocations with the same asset until the scope of the declaration closes\. 

```
#include <AzCore/Debug/AssetMemoryDriller.h>
 
void UpdateAllFoos(const AZStd::vector<Foo*>& allFoos)
{
    for (Foo* foo : allFoos)
    {
        AZ_ASSET_ATTACH_TO_SCOPE(foo);  // Subsequent allocations in this scope will associate with any asset that was in scope when foo was allocated
        UpdateFoo(foo);
    }
}
 
void UpdateFoo(Foo* foo)
{
    aznew Bar;  // This automatically gets recorded with the owning asset for foo
    AZStd::thread doThreadedWork([foo]()
    {
        // Work being done on a different thread means we need to reattach to the owning asset
        AZ_ASSET_ATTACH_TO_SCOPE(foo);
        aznew Bar;  // This will now be recorded under the owning asset for foo
    });
    doThreadedWork.join();
}
```

You can attempt to attach to any pointer that was created while that asset was in scope, *or even any portion of memory that was allocated to it*\. 

For instance, the following code is valid: 

```
#include <AzCore/Debug/AssetMemoryDriller.h>
 
struct Baz
{
    int a;
    char* b;
    double c;
};
 
Baz* CreateBaz(const char* name)
{
    AZ_ASSET_NAMED_SCOPE(name);
    Baz* baz = aznew Baz;  // bar is associated with the named asset
    return baz;
}
 
void TestScopes()
{
    Baz* baz = CreateBaz("My test baz");
     
    {
        AZ_ASSET_ATTACH_TO_SCOPE(&baz->c);  // This works, even though "c" didn't have its own allocation
        baz->b = aznew char[32];  // This allocation will be recorded under the asset "My test baz"
    }
}
```

An original pointer to an object that was allocated within a scope is *not* required in order to attach to it\. This makes it possible to attach across systems to objects that have been defined with multiple inheritance\. 

**EBus Processing of and Asset**  
EBus handlers can automatically attempt to attach to a scope for each handler receiving an event\. This works when the handler was allocated as part of an asset\. 

If the handler was created while an asset was in scope, you can modify an EBus as follows: 

```
#include <AzCore/Debug/AssetMemoryDriller.h>
 
class MyEvents : public AZ::EBusTraits
{
    // Process individual events by first attempting to attach to the asset that owns the handler
    template<typename Bus>
    using EventProcessingPolicy = Debug::AssetTrackingEventProcessingPolicy<Bus>;
 
    // Regular Ebus definitions
    virtual void MyFunction() = 0;
};
```

Some Lumberyard EBuses use this feature, such as the **TickBus**\. If you find others that should use it, please add them\! You should not default to using this `EventProcessingPolicy` if it is not applicable\. 

Instrumentation does create some overhead which can negatively affect your project's performance\. 

Creating a new named scope requires: 
+ function calls 
+ an environment lookup 
+ locking a mutex 
+ two hashtable lookups 
+ thread\-local modificationss 

Attaching to an existing scope requires: 
+ function calls 
+ an environment lookup 
+ locking a mutex 
+ a lookup in a large red\-black tree 
+ thread\-local modificationss 

Most often this is a relatively small cost, but it is significant enough that you should not use the `AZ_ASSET_ATTACH_TO_SCOPE` macro or use the `AssetTrackingEventProcessingPolicy` on your EBus gratuitously, especially if it is unlikely to attach to anything\. 

When asset tracking is disabled, i\.e\. if the `AZ_ANALYZE_ASSET_MEMORY` macro remains undefined, there is zero cost to instrumentation of scopes\. This is default in **performance** builds\. 

**Note**  
EBuses that use the `AssetTrackingEventProcessingPolicy` will still have the indirection of a function call for each handler on the bus in **debug** builds only\. Non\-debug builds inline this function call away\. 