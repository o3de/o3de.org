# Blending Environment Probes<a name="level-blending-environment-probe"></a>

You can use an **[Environment Probe](component-environment-probe.md)** component to achieve the right visual quality for a space\. Environment probes help to determine proper reflections, ambient diffuse values, particle diffuse values, and shadow colors\. 

Each environment probe in a scene represents ambient lighting information\. The probe data does not change even when other lights in the scene move or change in brightness\. This can result in an unnatural appearance\. For example, the sun sets but objects are still brightly lit by an environment probe used for daytime lighting\.

To achieve convincing transitions in lighting: 
+ Create multiple environment probes that represent different lighting conditions\.
+ Write a script that blends and puts them in sync with the scene's dynamic lights\. 

 For example, as the sun moves from noon to dusk, a script takes brighter environment probes and blends them gradually to darker environment probes\. A realistic full day\-to\-night cycle can require eight or more probes\.

Environment probes have a **Probe Fade** property that fades out the environment probe\. You can change the **Probe Fade** property with Script Canvas, Lua, and the Track View\. For this property, you can specify a value between `0.0` and `1.0`, which represents a percentage of ambient lighting\. For example, in a scenario with two overlapping environment probes, the higher priority probe \(Probe A\) normally hides the lower priority probe \(Probe B\)\. Only Probe A lights objects in that area\. However, if you set Probe A's **Probe Fade** value to **0\.5**, then 50% of the ambient lighting comes from Probe A and the rest comes from Probe B\.

To add an environment probe to your scene, see [Working with Components](component-working.md) and [Environment Probe](component-environment-probe.md)\. You can also find detailed, step\-by\-step instructions at [Lighting the Environment](https://docs.aws.amazon.com/lumberyard/latest/gettingstartedguide/lighting.html) in the *Amazon Lumberyard Getting Started Guide*\.

**Topics**
+ [Dimmer and Night Light Example](#level-environment-probe-nightlight)
+ [Day to Night Cycle Example](#level-environment-probe-daynight)

## Dimmer and Night Light Example<a name="level-environment-probe-nightlight"></a>

The following example scenario demonstrates how to dim a lamp\. The room has a dimmer lamp and a night light\. As the lamp dims, the ambient lighting provided by the environment probes must dim as well\. The room does not completely darken, because of the night light\.

![\[Example dimmer and night light scene with Environment Probe components.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/level-environment-probe-nightlight.gif)

**To set up the lights, environment probes, and script**

1. In Lumberyard Editor, do the following:

   1.  [Create an entity](creating-entity.md) named **lamp**\.

   1. Add the **[Point Light](component-point-light.md)** component to the entity\.

   1.  To assign a high brightness, specify the following property values:
      + **Cast shadow spec**: `Low`
      + **Diffuse multiplier**: **4**
      + **Max Distance**: **10**

1. Create another entity named **nightlight** and do the following:

   1. Add the **[Point Light](component-point-light.md)** component to the entity\.

   1.  To assign a low brightness, specify the following property values:
      + **Cast shadow spec**: `Low`
      + **Diffuse multiplier**: **1**
      + **Max Distance**: **10**

1. Create two [environment probes](component-environment-probe.md)\. Put them at the same location and make them the same size\. Name one **probe\_light** and the other **probe\_dark**\.

   1. For **probe\_light**, specify the [**Sort Priority**](component-environment-probe.md#component-environment-probe-settings) property to **1**\. This is the environment probe that fades in and out\.

   1. For **probe\_dark**, keep the default value for [**Sort Priority**](component-environment-probe.md#component-environment-probe-settings)\. The value should be **0**\.

1. In the following step, you need to bake the **probe\_light** entity\. Baked means to store information about the lighting in the environment probe\.

   To bake the **probe\_light**, do the following:

   1. Select the **probe\_light** entity\.

   1. In the **Entity Inspector**, under [**Cubemap generation**](component-environment-probe.md#component-environment-probe-cubemap), click **Generate**\. 

      After the cubemap is generated, the **Add Bounce** button replaces the **Generate** button\.

   1. Click **Add Bounce** to rebake the probe with bounced light\.

   1. [Hide](component-entity-outliner-entities.md#component-entity-outliner-hiding) the **probe\_light** entity\. This prevents the **probe\_light** entity's lighting from getting baked into the **probe\_dark** entity\.

1. To bake the **probe\_dark** entity, do the following:

   1. Select and [hide](component-entity-outliner-entities.md#component-entity-outliner-hiding) the **lamp** entity\. This prevents the **lamp** entity's light from getting baked into the **probe\_dark** entity\.

   1. Select the **probe\_dark** entity\.

   1. In the **Entity Inspector**, under [**Cubemap generation**](component-environment-probe.md#component-environment-probe-cubemap), click **Generate**\. 

      After the cubemap is generated, the **Add Bounce** button replaces the **Generate** button\.

   1. Click **Add Bounce** to rebake the probe with bounced light\.

1. [Show \(unhide\)](component-entity-outliner-entities.md#component-entity-outliner-hiding) the **probe\_light** and **lamp** entities\.

1. Create an entity and do the following:

   1. Add the **[Lua Script](component-lua-script.md)** component to the entity\.

   1. In the **Lua Script** component, for the **Script** property, click the \(**\.\.\.**\) icon, and then navigate and select the `RoomLights.lua` file\. See [`RoomLights.lua`](#room-light-example-script)\.
**Note**  
To create the script file, copy and paste the code into a text file\. Rename the file extension to `.lua` and save it in your project directory\.

1. In the **Lua Script** component, for the **LightEntity** property, click the target icon ![\[Target picker icon\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/picker.png) and in the viewport, select the **lamp** entity\. You can also use the **Entity Outliner** to select the **lamp** entity\.

   The **lamp** entity appears in the **LightEntity** box\.

1. In the **Lua Script** component, for the **ProbeEntity** property, click the target icon ![\[Target picker icon\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/picker.png) and in the viewport, select the **probe\_light** entity\.

   You can also use the **Entity Outliner** to select the **probe\_light** entity\.

   The **Lua Script** component should look like the following example:  
![\[Lua Script component has LightEntity set to lamp, and ProbeEntity set to probe_light.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/level-environment-probe-5.png)<a name="room-light-example-script"></a>

**Example**  
See the following `RoomLights.lua` script\.  

```
local RoomLights =
{
    -- Defines properties that are exposed in the Entity Inspector window
    Properties =
    {
        Speed = 1.0,              -- Use to modify the speed of the light cycle
        LightEntity = EntityId(), -- Set this to a Light component that will have its intensity changed
        ProbeEntity = EntityId(), -- Set this to an Environment Probe component that will be faded out in sync with the Light component
    }
}
 
function RoomLights:OnActivate()
    -- Subscribes to per-frame tick updates
    self.tickBusHandler = TickBus.Connect(self);
     
    -- Tracks the total number of seconds that the script has been running
    self.time = 0;
     
    -- The level at which the light starts is its max value. Light level is
    -- reduced periodically to dim the light, and then raised back to its max level.
    self.maxLightLevel = Light.Event.GetDiffuseMultiplier(self.Properties.LightEntity);
end
 
function RoomLights:OnDeactivate()
    self.tickBusHandler:Disconnect();
     
    -- Restores entities to their default settings
    Light.Event.SetDiffuseMultiplier(self.Properties.LightEntity, self.maxLightLevel);
    Light.Event.SetProbeAttenuation(self.Properties.ProbeEntity, 1);
end
 
function RoomLights:OnTick(deltaTime, timePoint)
    self.time = self.time + deltaTime;
     
    -- Increases and decreases brightness between 0 and 1 as time passes
    local brightness = Math.LerpInverse(-1, 1, Math.Sin(self.time * self.Properties.Speed));
     
    -- Sets the brightness of the light
    Light.Event.SetDiffuseMultiplier(self.Properties.LightEntity, brightness * self.maxLightLevel);
 
    -- Sets the fade value of the probe
    Light.Event.SetProbeFade(self.Properties.ProbeEntity, brightness);
     
end
 
return RoomLights
```

## Day to Night Cycle Example<a name="level-environment-probe-daynight"></a>

The following scenario is a more complex but commonly used example to develop a full day\-to\-night cycle\. This example uses a concept similar to the dimmer in the [Dimmer and Night Light Example](#level-environment-probe-nightlight), but instead of changing the light bulb intensity, you change the sun's position\. This requires a large number of probes blending together\. Also, dawn and dusk require more probes than noon and midnight\. See the following procedure and script outline to get started\. 

**To set up the day\-to\-night cycle probes and script**

1. [Create a set of entities](creating-entity.md) to represent times\. Put them in the same location and make them the same size\. 

1. Name the entities so that they correspond to a time on the 24\-hour clock, such as **probe1200** to represent noon\.

   For example, start with 0000, 0550, 0600, 0610, 1200, 1750, 1800, and 1810\. You don't need another probe at 2400 because that's the same as 0000\. Notice that there are more probes clustered around dawn and dusk than noon and midnight\.
**Note**  
You can name these probes whatever you like, but they must end with the 4\-digit time designation\. The script that you apply later in this procedure looks for entities that end with four digits corresponding to the time\.

1. [Add](component-working-adding.md) an **[Environment Probe](component-environment-probe.md)**component to each entity\.

1. [Hide](component-entity-outliner-entities.md#component-entity-outliner-hiding) the probes so that their outputs are not captured in each other's baked lighting\.

1. To bake each probe, do the following:

   1. Select an environment probe\. You do not need to show \(unhide\) it for the baking process\.

   1. Open the **[Time Of Day](sky-tod-day-night-cycle.md)** editor\.

   1. Set the **Current Time** to the time that corresponds to the probe name\. Close the **Time of Day** editor\.

   1. With the probe selected, click **Generate** to generate the cubemap\.

   1. \(Optional\) To simulate additional light bounces, show \(unhide\) the environment probe and click **Add Bounce**\.

   1. If it's not still hidden, [hide](component-entity-outliner-entities.md#component-entity-outliner-hiding) the probe and then repeat these steps for the next probe\.

1. After you set the time of day and generate \(bake\) the cubemap for every probe, create another entity named **probe\_set**\.

1. Select and move the probes into the **probe\_set** entity\.  
![\[Move all the environment probes into the parent entity, probe_set.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/level-environment-probe-daynight-1.png)

1. In the **Entity Outliner**, do the following:

   1. Select the **probe\_set** entity\.

   1. Add the **[Lua Script](component-lua-script.md)** component to the entity\.

   1. In the **Lua Script** component, for the **Script** property, click \(**\.\.\.**\) and then navigate and select the `ProbeBlending.lua` file\. See [`ProbeBlending.lua`](#probe-blending-example-script)\.
**Note**  
To create the script file, copy and paste the code into a text file\. Rename the file extension to `.lua` and save it in your project directory\.

1. In the **Lua Script** component, for **Probes**, click **\+** until the number of **EntityId** slots equals the number of probes that you have\.  
![\[Create EntityID slots to match the number of environment probes in the Lua Script component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/level-environment-probe-daynight-2.png)

1. Assign each of your probes to one of the script's **EntityId** probe slots\. In the **Entity Inspector**, click the target icon ![\[Target picker icon\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/picker.png) next to an empty slot\. In the **Entity Outliner**, select a probe\. Repeat until all slots are filled\.

   In the following example, all of the empty slots are filled\. When they are not yet selected, the **EntityId** boxes are blank\.  
![\[Lua Script component with all probes selected.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/level-environment-probe-daynight-3.png)<a name="probe-blending-example-script"></a>

**Example**  
See the following `ProbeBlending.lua` script\. To use this script, you must be in the StarterGame project\.  

```
-- This script connects a set of probes to the time-of-day cycle and blends between them as time progresses.
-- It supports an arbitrary number of probes. This means that you can use as many or as few as you need. 
-- A minimum of two environment probes are required. You likely need more to get convincing results, particularly around dawn and 
-- dusk when lighting conditions change dramatically.
  
-- This script is provided as an example to help you get started. It is not an official feature, and is 
-- therefore not guaranteed to address every need or be completely free from defects.
 
local ProbeBlending =
{
    Properties =
    {
        Probes = { default = { EntityId(),EntityId() } }, -- Each probe entity's name must end in a 24-hour time code such as "envProbe1830" for a probe at 6:30pm
        ShowDebugOutput = false, -- If true, on every frame the script dumps the blend values for all probes to the console output
        Blend = true,   -- If false, pops between probes rather than blending between them (mostly for demonstration purposes)
        UseToD = true,  -- If true, progression is based on Time of Day (ToD). If false, an internal timer. Turning this off can be useful for testing purposes.
        CycleTime = 10  -- If UseToD = false, this is the number of seconds in one full cycle
    },
 
    MAX_TIME = 24.0,
    ProbeData = {} -- Will be filled with entries {Probe=, Time=) sorted by time. Or nil if something went wrong.
}
 
-- Function for sorting probes by time
function ProbeBlending.ProbeLessThan(a, b)
    return EntityId.IsValid(a.Probe) and EntityId.IsValid(b.Probe) and a.Time < b.Time or
           EntityId.IsValid(a.Probe) and not EntityId.IsValid(b.Probe);
end
 
-- Extracts a floating point 24-hour time value from a probe entity name. The last four characters of the probe
-- name should be a 24 hour clock time value. For example, "1830" means "6:30pm" and returns a value of 18.5.
-- Returns -1 if there is a problem
function ProbeBlending.ExtractTimeValue(probeName)
    if probeName:len() < 4 then
        return -1;
    elseif probeName:len() == 4 and nil == probeName:sub(-4,-1):find("%d%d%d%d") then -- if only 4 characters, they must all be digits
        return -1
    elseif probeName:len() > 4 and nil == probeName:sub(-5,-1):find("[^%d]%d%d%d%d") then -- the number of time code digits shall be 4, no more, no less
        return -1
    else
        local hour = probeName:sub(-4,-3);
        local minutes = probeName:sub(-2,-1);
        return tonumber(hour) + tonumber(minutes)/60.0;
    end
end
 
-- This function is called upon activation to prepare self.ProbeData for processing
function ProbeBlending:ValidateAndSortProbeData()
    self.ProbeData = nil;
     
    if(#self.Properties.Probes < 2) then
        Debug.Error(false, "Script requires at least 2 Probes");
        return;
    end
     
    if(self.Properties.CycleTime <= 0 and not self.Properties.UseToD) then
        Debug.Error(false, "CycleTime must be > 0");
        return;
    end
     
    -- Copies the probe data into a different table where it can be easily sorted.
    local probeDataTable = {};
    for i=0,#self.Properties.Probes,1 do
        local probe = self.Properties.Probes[i];
        if(EntityId.IsValid(probe)) then
            local currentProbeName = GameEntityContextRequestBus.Broadcast.GetEntityName(probe);
            local probeTime = ProbeBlending.ExtractTimeValue(currentProbeName);
             
            if(probeTime < 0) then
                Debug.Error(false, "Probe Entity name '" .. currentProbeName .. "' does not end with a four-digit timecode");
                return;
            end
             
            probeDataTable[i] = {Probe=probe, Time=probeTime};
        end
    end
     
    -- Sorts the probes according to their time codes
    table.sort(probeDataTable, ProbeBlending.ProbeLessThan);
     
    -- Further validates the data
    for i=1,#probeDataTable,1 do
        local currentProbe = probeDataTable[i].Probe;
        local currentProbeTime = probeDataTable[i].Time;
         
        if(currentProbeTime < 0 or currentProbeTime > self.MAX_TIME)  then
            Debug.Error(false, "Probe time is out of range [0," .. self.MAX_TIME .. "]");
            return;
        end
         
        if(i > 1) then
            local prevProbe = probeDataTable[i-1].Probe;
            local prevProbeTime = probeDataTable[i-1].Time;
             
            if(prevProbeTime >= currentProbeTime) then
                Debug.Error(false, "Time values must increase");
                return;
            end
        end
    end
         
    -- Saves data after it has been validated
    self.ProbeData = probeDataTable;
end
 
 
function ProbeBlending:OnActivate()
    -- Subscribes to per-frame tick updates
    self.tickBusHandler = TickBus.Connect(self);
     
    self:ValidateAndSortProbeData();
     
    self.time = 0;
end
 
function ProbeBlending:OnDeactivate()
    self.tickBusHandler:Disconnect();
end
 
-- Per-frame updates are processed here
function ProbeBlending:OnTick(deltaTime, timePoint)
         
    local numProbes = #self.ProbeData;
    if(numProbes < 2) then return end
         
     
    local currentTime = 0;
     
    -- Updates currentTime
    if(self.Properties.UseToD) then
        currentTime = StarterGameTimeOfDayUtility.GetTimeOfDay();
    else
        local rate = 1.0 / self.Properties.CycleTime;
        self.time = self.time + deltaTime * rate;
        currentTime = (self.time % 1.0) * self.MAX_TIME;
    end
             
    -- Finds pair of probes that surround currentTime
    local probeIndexA = -1;
    local probeIndexB = -1;
    for i=1,numProbes,1 do
        local currentProbe = self.ProbeData[i].Probe;
        local currentProbeTime = self.ProbeData[i].Time;
         
        if(currentTime < currentProbeTime) then
            probeIndexB = i;
            if i == 1 then
                probeIndexA = numProbes;
            else
                probeIndexA = probeIndexB-1;
            end
             
            break;
        end
    end
     
    if(self.ProbeData[numProbes].Time <= currentTime) then
        probeIndexA = numProbes;
        probeIndexB = 1;
    end
     
    -- This first sets all attenuation values to 0 before blending in the relevant two.
    for i=1,numProbes,1 do
        Light.Event.SetProbeFade(self.ProbeData[i].Probe, 0);
    end
     
    -- Calculates the blend between the two bordering probes, such that the final color should be something like
    -- probeA * (1-blend) + probeB * blend
    local blend = 1.0;
    if(probeIndexA < probeIndexB) then
        blend = Math.LerpInverse(self.ProbeData[probeIndexA].Time, self.ProbeData[probeIndexB].Time, currentTime);
    elseif(probeIndexB < probeIndexA) then
        local passedTime = 0;
         
        timeBetweenProbes = self.ProbeData[probeIndexB].Time + (self.MAX_TIME - self.ProbeData[probeIndexA].Time);
        if(0 <= currentTime and currentTime <= self.ProbeData[probeIndexB].Time) then
            passedTime = currentTime + (self.MAX_TIME - self.ProbeData[probeIndexA].Time);
        else
            passedTime = currentTime - self.ProbeData[probeIndexA].Time;
        end
        blend = passedTime / timeBetweenProbes;
    end
     
    -- Applies the blend by setting probe fades for the two relevant probes
    if(self.Properties.Blend) then
        local priorityA = Light.Event.GetProbeSortPriority(self.ProbeData[probeIndexA].Probe);
        local priorityB = Light.Event.GetProbeSortPriority(self.ProbeData[probeIndexB].Probe);
        if(priorityA == priorityB) then
            -- Time-adjacent probes must have different priorities in order to know which one to fade out. We'll force one to be higher
            Light.Event.SetProbeSortPriority(self.ProbeData[probeIndexB].Probe, priorityB+1);
        end
         
        if (priorityA > priorityB) then
            Light.Event.SetProbeFade(self.ProbeData[probeIndexA].Probe, 1-blend);
            Light.Event.SetProbeFade(self.ProbeData[probeIndexB].Probe, 1);
        else
            Light.Event.SetProbeFade(self.ProbeData[probeIndexA].Probe, 1);
            Light.Event.SetProbeFade(self.ProbeData[probeIndexB].Probe, blend);
        end
    else
        Light.Event.SetProbeFade(self.ProbeData[probeIndexA].Probe, 1);
        Light.Event.SetProbeFade(self.ProbeData[probeIndexB].Probe, 0);
    end
     
    -- Generates debug output
    if self.Properties.ShowDebugOutput then
        local debugInfo = "Fades> ";
        for i=1,numProbes,1 do
            local currentProbe = self.ProbeData[i].Probe;
            local blendFactor = Light.Event.GetProbeFade(currentProbe);
            local currentProbeName = GameEntityContextRequestBus.Broadcast.GetEntityName(currentProbe);
             
            debugInfo = debugInfo .. string.format("%s: %.2f | ", currentProbeName, blendFactor)
        end
        Debug.Log(debugInfo);
    end
 
end
 
 
return ProbeBlending
```