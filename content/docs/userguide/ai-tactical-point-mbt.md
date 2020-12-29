# Integration with the Modular Behavior Tree System<a name="ai-tactical-point-mbt"></a>

From inside the Modular Behavior Tree \(MBT\), the **<QueryTPS>** node can be used to call pre\-defined TPS queries by name\. The **<QueryTPS>** node will return either success or failure\. 

The most common usage pattern involving the **<QueryTPS>** node is to use it in conjunction with the **<Move>** node inside a **<Sequence>** to determine the status of a specified position\. The example below illustrates a call to a pre\-defined TPS query called **SDKGrunt\_TargetPositionOnNavMesh**, with the expected inputs\. If the query succeeds, the AI agent will move to the queried position\.

```
<Sequence>
    <QueryTPS name="SDKGrunt_TargetPositionOnNavMesh" register="RefPoint"/>
    <Move to="RefPoint" speed="Run" stance="Alerted" fireMode="Aim" avoidDangers="0"/>
</Sequence>
```

The definition of the pre\-defined query **SDKGrunt\_TargetPositionOnNavMesh** is as follows\.

```
AI.RegisterTacticalPointQuery({
    Name = "SDKGrunt_TargetPositionOnNavMesh",
    {
        Generation =
        {
            pointsInNavigationMesh_around_attentionTarget = 20.0
        },
        Conditions =
        {
        },
        Weights =
        {
            distance_to_attentionTarget = -1.0
        },
    },
});
```