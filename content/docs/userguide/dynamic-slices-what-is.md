# Working with Dynamic Slices<a name="dynamic-slices-what-is"></a>

Slices are a powerful tool for organizing entity data in your worlds\. In the editor, you can choose to cascade slices and organize entity data in any desired granularity and still receive the benefits of data sharing and inheritance throughout the hierarchy\. A level\-based game, for example, implements each level as its own slice asset that contains instances of many other slices\. These slices can potentially cascade many levels deep\. You can choose to create slices from other slices and inherit only the elements that you want\. 

Standard slice assets \(`.slice` files\) rely on the editor and cannot be instantiated at run time\. However, Lumberyard provides a mechanism for designating any `.slice` asset that you've built as a *dynamic slice*\. When you designate a slice as a dynamic slice, the Asset Processor processes and optimizes the slice for you, producing a `.dynamicslice` file asset\. A dynamic slice is simply the runtime version of its source slice, containing only runtime components\. The editor\-dependent components have been converted to their runtime counterparts\. Furthermore, dynamic slices no longer maintain a data hierarchy because doing so would increase memory footprint and reduce instantiation performance\. 

In the level\-based game example previously mentioned, you could designate your giant level slice as a dynamic slice\. When your game loads the level, it does so by instantiating the resulting `.dynamicslice` file\. 

You can choose to generate dynamic slices at whatever granularity is appropriate for your game\. Because slices are loaded entirely asynchronously, they are a good choice for streaming strategies\. For example, a driving game might represent each city block as a separate slice and choose to load the slices predictively based on player driving behavior\. 

**To create a dynamic slice**

1. In the **Asset Browser**, right\-click a `.slice` asset and choose **Set Dynamic Slice**\.  
![\[Set the dynamic slice in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/dynamic-slices-set-dynamic-flag.png)

1. Asset Processor processes the source `.slice` file and generates a `.dynamicslice` file\. In the **Asset Browser**, you can see the `.dynamicslice` file appears as its own asset\.  
![\[A newly created dynamic slice appears in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/dynamic-slices-dynamic-flag-set.png)

**To remove a dynamic slice**
+ In the **Asset Browser**, right\-click the dynamic file and choose **Unset Dynamic Slice**\.  
![\[Set the dynamic slice in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/dynamic-slices-unset-dynamic-flag.png)

  Asset Processor deletes the `.dynamicslice` file from the asset cache\.

## Instantiating Dynamic Slices<a name="dynamic-slices-how-to-instantiate"></a>

You can use the [Spawner](component-spawner.md) component to instantiate dynamic slices\. 

**To instantiate dynamic slices**

1. In the **Asset Browser**, select and then drag the `.dynamicslice` asset to the **Slice** property for the **Spawner** component\. 

1. To instantiate the dynamic slice when the level starts, select **Spawn On Activate**\.

1. To instantiate the dynamic slice at a different time, you can use scripting or C\+\+\. The following Lua snippet uses an EBus call to tell the **Spawner** component to instantiate its dynamic slice: 

   ```
   SpawnerComponentRequestBus.Event.Spawn(self.entityId)
   ```

   For more information about working with slices, see [Working with Slices](component-slices.md)\.

## Additional Links<a name="dynamic-slices-additional-links"></a>
+ [ Amazon Lumberyard Getting Started series \- Spawning dynamic slices \(video\)](https://www.youtube.com/watch?v=ERL4sqSXpMA&feature=youtu.be&t=1142)
+ [ Spawning and Shooting a Projectile with Legacy Physics and Dynamic Slices with Lumberyard Script Canvas \(video\)](https://www.youtube.com/watch?v=u_OwrFTLQfY&feature=youtu.be&t=320)