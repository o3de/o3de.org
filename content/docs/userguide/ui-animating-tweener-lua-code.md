# Tweener Lua Script<a name="ui-animating-tweener-lua-code"></a>

You must have a minimum set of code to play an animation in the Scripted Entity Tweener system\. As described in [Tweener Sample Level](ui-animating-tweener-sample.md), you add this code to a Lua script\. You can copy and paste the code into a text file, and then change the file name extension to `.lua`\. You use this script as part of a **Lua script** component\. For more information about Lua script components, see [Adding Lua Scripts to Component Entities](lua-scripting-intro-add-script-to-component.md)\.

In the following example, the entity's opacity is linearly tweened to `0.5` over `5` seconds\.

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
	self.ScriptedEntityTweener:StartAnimation
	{
		id = self.Properties.ToAnimate,
		duration = 5.0,
		["opacity"] = 0.5,
	}
end
function AnimateUiEntity:OnDeactivate()
	self.ScriptedEntityTweener:OnDeactivate()
end
return AnimateUiEntity
```

The following example shows a full call with all the default parameters\. In this example, the entity moves to the `["x"]` and `["y"]` positions indicated in the code over the `duration` of `5` seconds\.

```
self.ScriptedEntityTweener:StartAnimation
	{
		id = self.Properties.ToAnimate,
		duration = 5.0,
		["x"] = 150, ["y"] = 200,
		timeIntoTween = 0, -- Start tween some seconds in
		easeMethod = ScriptedEntityTweenerEasingMethod_Linear,
		easeType = ScriptedEntityTweenerEasingType_In,
		delay = 0,
		timesToPlay = 1,
		isFrom = false,
		isPlayingBackward = false,
		uuid = Uuid.Create(),
		--onComplete = function() Debug.Log("Called when this animation is done") end
		--onUpdate = function(currentValue, currentProgressPercent) Debug.Log("Called when this animation updates") end
		--onLoop = function() Debug.Log("Looped animation”) end
	}
```

For the parameter descriptions, see [Tweener Supported Components](ui-animating-tweener-components.md)\.