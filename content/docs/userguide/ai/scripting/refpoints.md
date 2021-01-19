---
description: ' Specify a position and a direction with refpoints in &ALYlong;. '
title: Refpoints
---
# Refpoints {#ai-scripting-refpoints}


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

A refpoint, or reference point, is a special AI object used by goalpipes\. It primarily specifies a position and, as needed, a direction\. The following examples illustrate how refpoints are used\.

**Example 1: Updating a refpoint involving sub\-goalpipes**

In this example, a refpoint position is set, and a goalpipe is created containing three goalops: Locate, Stick, and Signal\. Using the refpoint, Locate sets a value called LASTOP, which is used in Stick to pinpoint a destination\. 

Notice that the goalop Stick is defined as "\+stick"\. This ensures that Stick is grouped with the previous goalop \(Locate\)\. As a result, if the interrupting goalpipe affects values that Stick depends on \(such as LASTOP\), it will return to the appropriate goalop to update the dependent values\. 

```
ACT_GOTO = function(self, entity, sender, data)
    if (data and data.point) then
        AI.SetRefPointPosition(entity.id, data.point);
 
        -- use dynamically created goal pipe to set approach distance
        g_StringTemp1 = "action_goto"..data.fValue;
        AI.CreateGoalPipe(g_StringTemp1);
        AI.PushGoal(g_StringTemp1, "locate", 0, "refpoint");
        AI.PushGoal(g_StringTemp1, "+stick", 1, data.point2.x, AILASTOPRES_USE, 1, data.fValue); -- noncontinuous stick
        AI.PushGoal(g_StringTemp1, "signal", 0, 1, "VEHICLE_GOTO_DONE", SIGNALFILTER_SENDER);
        entity:InsertSubpipe(AIGOALPIPE_SAMEPRIORITY, g_StringTemp1, nil, data.iValue);
    end
end,
```

**Example 2: Using an AI anchor to set a refpoint**

In this example, the Smart Object system spots a relevant AI anchor using `OnBiomassDetected`\. This anchor is used to set both the position and direction of the refpoint\. As a result, the AI agent walks to the refpoint, turns to the indicated direction, and then selects the next goalpipe\. 

```
OnBiomassDetected = function(self, entity, sender, data)
    entity:SetTargetBiomass(sender);
    entity:SelectPipe(0, "AlienTick_ReachBiomass");
end,
```

```
function AlienTick_x:SetTargetBiomass(biomass)
    self.AI.targetBiomassId = biomass.id;
    AI.SetRefPointPosition(self.id, biomass:GetWorldPos());
    AI.SetRefPointDirection(self.id, biomass:GetDirectionVector(1));
end
```

```
<GoalPipe name="AlienTick_ReachBiomass">
    <Speed id="Walk"/>
    <Locate name="refpoint"/>
    <Stick distance="0.3" useLastOp="true"/>
    <Signal name="OnBiomassReached"/>
</GoalPipe>
```

```
OnBiomassReached = function(self, entity)
    entity.actor:SetForcedLookDir(AI.GetRefPointDirection(entity.id));
    entity:SelectPipe(0, "AlienTick_CollectBiomass");
end,
```

**Note**  
The tag <Group> was not used in this example because this particular goalpipe is not intended to be interrupted \(which is not generally the case\)\.