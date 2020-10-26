# Post Effect Group XML Files<a name="effect-groups-xml-files"></a>

When you open Lumberyard Editor, the effect group located at `lumberyard_version\dev\Engine\Libs\PostEffectGroups\Default.xml` automatically loads\. The `Default.xml` file includes all available effects and the default values for each parameter\. You can modify the default values and copy and paste sections of the `Default.xml` file into custom effect groups\.

**Example**  

```
<PostEffectGroup priority="1" hold="1">
    <Effect name="Global">
        <Param name="User_Brightness" floatValue="0.5"/>
    </Effect>
</PostEffectGroup>
```

**Priority**  
Non\-negative integer used to set priorities\. Larger priorities override smaller priorities\. If multiple effect groups that are enabled have the same priority value, the effect group that was enabled later has the higher priority\.  
Default value: `0` \(for Time of Day and Script Canvas nodes that set effects\)  
Valid values: `0 - 999`

**Hold**  
Indicates if the effect should stay enabled until explicitly disabled\.  
Default value: `0`  
Valid values: `0`=effect is disabled after blending is complete \| `1`=effect remains enabled until explicitly disabled

If you create a custom effect groups, create a directory named `\PostEffectGroups` under `/Engine/Libs`\. You can then load the post effect group XML files from any valid path location\.