# EMotion FX transition guide version 1\.25<a name="emfx-1.25-transition-guide"></a>

Lumberyard version 1\.25 introduces deferred initialization for unique datas in anim graphs\. Rather than preallocating unique datas for the whole anim graph upfront, allocation is deferred until the objects are used the first time\. For example, when transitioning into a given state, the unique data of the transition target isallocated and initialized right before the transition starts blending\. This decreases instantiation time and makes spawning new characters that run an anim graph faster\. The bigger the anim graph, the greater the speed improvement\. 

## Changes and using unique datas in custom nodes<a name="emfx-1.25-changes"></a>
+ Unique datas are no longer pre\-allocated for the whole anim graph\. 
+ Unique datas are now allocated when they are needed and requested via `AnimGraphInstance::FindOrCreateUniqueData()`\. 
+ Data shared across characters using the same anim graphs should be members of the anim graph node; for example, the name of the joint a look at node operates on\. 
+ Instanced data belongs inside the node's unique data class\. For example, the actual joint index based on the joint name stored in the node, as anim graphs can be shared across characters that have different skeletons\. 
+ `UniqueData::Update()` is the place where the shared data is read and prepared to be used in an optimal way on the character instance\. For example, this is where we would find the joint index for the given character instance, based on the shared joint name\. 
+ `Update()` is called if the unique data is invalidated and requested for use with `AnimGraphInstance::FindOrCreateUniqueData()`\. 
+ When a new joint name is selected in the UI, the unique datas for all currently present anim graph instances are invalidated and `Update()` is called to update all the joint indices\. 
+ Newly created unique datas are invalidated by default and are updated automatically before their first usage\. 

## Accessing unique datas from within a custom node<a name="emfx-1.25-data-access"></a>

There are two ways to access unique datas: 
+ `AnimGraphInstance::FindOrCreateUniqueData():` 

  Use `AnimGraphInstance::FindOrCreateUniqueData():` in your node's `Update()`, `TopDownUpdate()`, `PostUpdate()` or `Output()` functions\. This guarantees that you have access to up\-to\-date unique data\. If the unique data doesn't exist yet, it's created and initialized\. If the unique data does exist, its pointer is available\. `UniqueData::Update()` is called automatically if the unique data is invalidated when requesting it\. The resulting object is valid and current in all ways\. 
+ `AnimGraphInstance::GetUniqueObjectData():` 

  Use `AnimGraphInstance::GetUniqueObjectData():` for direct access to the unique data for the given node\. If the unique data does not exist, it returns a `nullptr`\. The unique data might also be invalidated and outofdate\. `AnimGraphInstance::GetUniqueObjectData():` might be used in the `Rewind()` method since it's not required to create or update the unique data if the node hasn't been active yet\. 

## Port an existing custom node to version 1\.25<a name="emfx-1.25-porting-custom-nodes"></a>

1. Remove the `mMustUpdate` flag from the unique data if you use the flag to skip heavy operations when shared data changes \(a picked joint in the LookAtNode, for example\)\. 

1. Remove the `mIsValid` flag from the unique data and use the error flag `m_hasError` from the base `AnimGraphObjectData`\. 
**Note**  
If you need to populate the error flag up/down the hierarchy, don't check and set it inside `UniqueData::Update()`\. Instead, call `AnimGraphNode::SetHasError()` inside the node to automatically populate the update flag\. 

1. If you use `AnimGraphNode::SetHasError()`, be aware the first parameter has changed from an anim graph instance to a unique data pointer for performance reasons\. 

1. Override `AnimGraphObject::CreateUniqueData()` for your custom node and return a newly allocated node\-custom unique data\. No exceptions, the method should always return a newly allocated unique data\. 

   ```
   AnimGraphObjectData* CreateUniqueData(AnimGraphInstance* animGraphInstance) override { return aznew UniqueData(this, animGraphInstance); }
   ```

1. Remove the `YourCustomNode::UpdateUniqueData()` and move its contents to `UniqueData::Update()`\. 
**Note**  
There is no need to check for `mMustUpdate` anymore\. We removed this flag in step 1\. 
There is no need to manually call `UniqueData::Update()` manually inside any of the methods called at runtime: `Update()`, `PostUpdate()`, `Output()`\. Whenever you retrieve the unique data with `AnimGraphInstance::FindOrCreateUniqueData()`, it is up to date\. 
If you need access to the node itself, you can do this with the following code inside your unique data's `Update()` method:   

     ```
     YourCustomNode* customNode = azdynamic_cast<YourCustomNode*>(mObject);
     AZ_Assert(customNode, "Unique data linked to incorrect node type.");
     ```

1. Make sure to call `YourCustomNode::Reinit` when a UI element changes that should invalidate the unique datas\. This can be done via: `->Attribute(AZ::Edit::Attributes::ChangeNotify, &YourCustomNode::Reinit)` 

1. `AnimGraphObject::Reinit()` default implementation invalidates unique datas for all existing anim graph objects for the called object\. Override `Reinit()` only if you need to do additional things and make sure to call `Reinit()` from the base class\. Remove `Reinit()` from your custom node if all you need to do is invalidate the unique data of the node\. 