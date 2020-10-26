# Tweener Timeline<a name="ui-animating-tweener-timeline"></a>

In the Scripted Entity Tweener system, you can create a timeline for granular control over your animations\. You can chain and group animations\. You can pause, resume, seek, play backward, label, and even dynamically control the playback speed of the animations\.

To create a timeline, you can customize the following Lua script\. 

In this example, the script first animates the entity specified by `ToAnimate`, increasing its size from its original value to a width `["w"]` and height `["h"]` of `600`\. The script then animates the entity by shrinking it to a width `["w"]` and height `["h"]` of `200`\. 

```
local AnimateUiEntity = 
{
	Properties =
	{
		ToAnimate = {default = EntityId()},
	},
}

function AnimateUiEntity:OnActivate()
	self.tickBusHandler = TickBus.Connect(self)
	self.ScriptedEntityTweener = require("Scripts.ScriptedEntityTweener.ScriptedEntityTweener")
end

function AnimateUiEntity:OnTick(deltaTime, timePoint)
	self.tickBusHandler:Disconnect()
	self.timeline = self.ScriptedEntityTweener:TimelineCreate()
	self.timeline:Add(
		{
			id = self.Properties.ToAnimate,
			easeMethod = ScriptedEntityTweenerEasingMethod_Bounce,
			easeType = ScriptedEntityTweenerEasingType_In,
			duration = 3.0,
			["w"] = 600, ["h"] = 600,
		})
	self.timeline:Add(
		{
			id = self.Properties.ToAnimate,
			easeMethod = ScriptedEntityTweenerEasingMethod_Sine,
			easeType = ScriptedEntityTweenerEasingType_in-out,
			duration = 3.0,
			["w"] = 200, ["h"] = 200,
		})
	self.timeline:Play()
end

function AnimateUiEntity:OnDeactivate()
	self.ScriptedEntityTweener:OnDeactivate()
end

return AnimateUiEntity
```

The following example shows all of the supported timeline operations\.

```
-- Chained animations	
self.timeline = self.ScriptedEntityTweener:TimelineCreate()
self.timeline:Add(…)
self.timeline:Add(…)
self.timeline:Play()

--Labels
self.timeline:AddLabel("Label", 0.5) –Add label that specifies 0.5 seconds  into animation
self.timeline:Play("Label") –Play from label

--General timeline operations
local animationParameters = { id = self.Properties.ToAnimate, duration = 3, ["opacity"] = 0.5 }
self.timeline:Add({animationParameters}, {["label"] = "LabelName"}, ["offset"] = 2) --Start animation 2 seconds after LabelName
self.timeline:Add({animationParameters}, {["initialStartTime"] = 2}, ["offset"] = -1) --Start animation at second 1

self.timeline:Play()
self.timeline:Play(2) –-Play timeline starting at 2 seconds
self.timeline:Pause() --Pause timeline
self.timeline:Resume() --Resumes timeline, Play() also resumes
self.timeline:Seek(3) --Play timeline starting at 3 seconds
self.timeline:PlayBackwards() --Start playing animation backwards
self.timeline:PlayBackwards(3) –-Start playing animation backwards starting from second 3
self.timeline:SetSpeed(2) –-Start playing animation at 2x speed
```