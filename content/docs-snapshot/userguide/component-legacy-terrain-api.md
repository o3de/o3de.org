# TerrainDataRequestBus API<a name="component-legacy-terrain-api"></a>

`TerrainDataRequestBus` is an API introduced in Lumberyard release 1\.24\. This API presents an EBus interface to query *a terrain* system\. `TerrainDataRequestBus` enables you to easily swap different implementations of terrain systems\. The **Legacy Terrain** level component is implemented with the `TerrainDataRequestBus` API\. 

The `TerrainDataRequestBus` is a single address, single handler EBus\. This means that only one component that provides the service `TerrainService` can be active at any given time\. 

The [Legacy Terrain level component](component-legacy-terrain.md), which is provided by the [Legacy Terrain Gem](gems-system-gem-legacy-terrain.md), is a `TerrainService` provider and can answer to calls made to the `TerrainDataRequestBus`\. 

The `TerrainDataRequestBus` header file is located here: *`lumberyard_version`*`/Code/Framework/AzFramework/AzFramework/Terrain/TerrainDataRequestBus.h`\. 

The `TerrainDataRequestBus` API replaces all terrain\-related APIs that historically have been available in *`lumberyard_version`*`/Code/CryEngine/CryCommon/I3DEngine.h` and *`lumberyard_version`*`/Code/CryEngine/CryCommon/ITerrain.h`\. The old APIs have been marked for deprecation, along with notes about the new replacement API\. The example below is from `I3DEngine.h`: 

**I3DEngine\.h GetTerrainElevation\(\)**

```
        
//! LUMBERYARD_DEPRECATED(LY-107351) Use AzFramework::Terrain::TerrainDataRequestBus::GetHeight*(Sampler::BILINEAR) instead.
// Summary:
//     Gets the interpolated terrain elevation for a specified location.
// Notes:
//     All x,y values are valid.
// Arguments:
//     x                        - X coordinate of the location
//     y                        - Y coordinate of the location
// Return Value:
//     A float which indicate the elevation level.
virtual float GetTerrainElevation(float x, float y, int nSID = DEFAULT_SID) = 0;
```

## Notes on thread safety<a name="component-legacy-terrain-api-thread-safety"></a>

`TerrainDataRequestBus` was designed for multi\-threaded usage\. The following are some recommendations to efficiently use the `TerrainDataRequestBus` API with thread safety in mind\. 

**For loops running outside of the Main thread**

**Unsafe and Fast \(Bad\)**  
 In the following code, the **Legacy Terrain** level component is created and destroyed on the Main thread when switching levels or entering/leaving Game Mode\.   

```
        
auto terrain = AzFramework::Terrain::TerrainDataRequestBus::FindFirstHandler();
for ()
{
    float height = terrain->GetHeightFromFloats(x,y);
    //Do something.
}
```

**Safe and Slow \(Better\)**  
The following code locks and unlocks its internal mutex each time a call is made on a thread\-safe EBus\.   

```
            
for ()
{
    float height = 0.0f;
    AzFramework::Terrain::TerrainDataRequestBus::Broadcast(height,
        &AzFramework::Terrain::TerrainDataRequest::GetHeightFromFloats,x,y,
        AzFramework::Terrain::TerrainDataRequest::Sampler::BILINEAR);
    //Do something.
}
```

**Safe and Fast \(Best\)**  
In the following code, `EnumerateHandlers` locks the EBus mutex only once, allowing you to run the code you need, and `EnumerateHandlers` unlock the EBus mutex when the task completes\.   

```
            
auto enumerationCallback = [&](AzFramework::Terrain::TerrainDataRequests* terrain) -> bool
{
    float height = terrain->GetHeightFromFloats(x,y);
    //Do something.
 
    // Only one handler should exist.
    return false;
}
AzFramework::Terrain::TerrainDataRequestBus::EnumerateHandlers(enumerationCallback);
```

**A lock\-less alternative**  
Assuming that you have control over when to start or stop threads/jobs, the lock\-less alternative would be to subclass `TerrainDataNotificationBus`, and stop/restart your threads/jobs by reacting accordingly to one of these callbacks:   
**`AzFramework::Terrain::TerrainDataNotificationBus`**  

```
            
virtual void OnTerrainDataCreateBegin() {};
virtual void OnTerrainDataCreateEnd() {};
 
virtual void OnTerrainDataDestroyBegin() {};
virtual void OnTerrainDataDestroyEnd() {};
```

**Fast and safe, assuming proper usage of `TerrainDataNotificationBus`**  
Assuming threads/jobs are never running while the legacy terrain system is being destroyed or created, then the following case is safe and fast:   

```
            
auto terrain = AzFramework::Terrain::TerrainDataRequestBus::FindFirstHandler();
for ()
{
    float height = terrain->GetHeightFromFloats(x,y);
    //Do something.
}
```