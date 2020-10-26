# Tweener Supported Components<a name="ui-animating-tweener-components"></a>

You can use the Scripted Entity Tweener system for any entity parameter currently recognized by the tweener system\.

You can see the list of supported entity parameters in the `lumberyard_version\dev\Gems\ScriptedEntityTweener\Assets\Scripts\ScriptedEntityTweener\ScriptedEntityTweener.lua` file in the table `self.animationParameterShortcuts`\. 

The following example shows the `self.animationParameterShortcuts` table that is inside of the `ScriptedEntityTweener.lua` file\.

```
		self.animationParameterShortcuts =	
		{
			--UI Related
			["opacity"] = {"UiFaderComponent", "Fade" },
			["imgColor"] = {"UiImageComponent", "Color" },
			["layoutMinWidth"] = {"UiLayoutCellComponent", "MinWidth" },
			["layoutMinHeight"] = {"UiLayoutCellComponent", "MinHeight" },
			["layoutTargetWidth"] = {"UiLayoutCellComponent", "TargetWidth" },
			["layoutTargetHeight"] = {"UiLayoutCellComponent", "TargetHeight" },
			["layoutExtraWidthRatio"] = {"UiLayoutCellComponent", "ExtraWidthRatio" },
			["layoutExtraHeightRatio"] = {"UiLayoutCellComponent", "ExtraHeightRatio" },
			["layoutColumnPadding"] = {"UiLayoutColumnComponent", "Padding" },
			["layoutColumnSpacing"] = {"UiLayoutColumnComponent", "Spacing" },
			["layoutRowPadding"] = {"UiLayoutRowComponent", "Padding" },
			["layoutRowSpacing"] = {"UiLayoutRowComponent", "Spacing" },
			["scrollHandleSize"] = {"UiScrollBarComponent", "HandleSize" },
			["scrollHandleMinPixelSize"] = {"UiScrollBarComponent", "MinHandlePixelSize" },
			["scrollValue"] = {"UiScrollBarComponent", "Value" },
			["sliderValue"] = {"UiSliderComponent", "Value" },
			["sliderMinValue"] = {"UiSliderComponent", "MinValue" },
			["sliderMaxValue"] = {"UiSliderComponent", "MaxValue" },
			["sliderStepValue"] = {"UiSliderComponent", "StepValue" },
			["textSize"] = {"UiTextComponent", "FontSize" },
			["textColor"] = {"UiTextComponent", "Color" },
			["textCharacterSpace"] = {"UiTextComponent", "CharacterSpacing" },
			["textSpacing"] = {"UiTextComponent", "LineSpacing" },
			["textInputSelectionColor"] = {"UiTextInputComponent", "TextSelectionColor" },
			["textInputCursorColor"] = {"UiTextInputComponent", "TextCursorColor" },
			["textInputCursorBlinkInterval"] = {"UiTextInputComponent", "CursorBlinkInterval" },
			["textInputMaxStringLength"] = {"UiTextInputComponent", "MaxStringLength" },
			["tooltipDelayTime"] = {"UiTooltipDisplayComponent", "DelayTime" },
			["tooltipDisplayTime"] = {"UiTooltipDisplayComponent", "DisplayTime" },
			["scaleX"] = {"UiTransform2dComponent", "ScaleX" },
			["scaleY"] = {"UiTransform2dComponent", "ScaleY" },
			["pivotX"] = {"UiTransform2dComponent", "PivotX" },
			["pivotY"] = {"UiTransform2dComponent", "PivotY" },
			["x"] = {"UiTransform2dComponent", "LocalPositionX" },
			["y"] = {"UiTransform2dComponent", "LocalPositionY" },
			["rotation"] = {"UiTransform2dComponent", "Rotation" },
			["w"] = {"UiTransform2dComponent", "LocalWidth" },
			["h"] = {"UiTransform2dComponent", "LocalHeight" },
			
			--3d transform
			["3dposition"] = {"TransformComponent", "Position" },
			["3drotation"] = {"TransformComponent", "Rotation" },
			["3dscale"] = {"TransformComponent", "Scale" },
			--Camera
			["camFov"] = {"CameraComponent", "FieldOfView" },
			["camNear"] = {"CameraComponent", "NearClipDistance" },
			["camFar"] = {"CameraComponent", "FarClipDistance" },
			--[[
			--Some available virtual properties without shortcuts
			--Lights
			[""] = {"LightComponent", "Visible" },
			[""] = {"LightComponent", "Color" },
			[""] = {"LightComponent", "DiffuseMultiplier" },
			[""] = {"LightComponent", "SpecularMultiplier" },
			[""] = {"LightComponent", "Ambient" },
			[""] = {"LightComponent", "PointMaxDistance" },
			[""] = {"LightComponent", "PointAttenuationBulbSize" },
			[""] = {"LightComponent", "AreaMaxDistance" },
			[""] = {"LightComponent", "AreaWidth" },
			[""] = {"LightComponent", "AreaHeight" },
			[""] = {"LightComponent", "AreaFOV" },
			[""] = {"LightComponent", "ProjectorMaxDistance" },
			[""] = {"LightComponent", "ProjectorAttenuationBulbSize" },
			[""] = {"LightComponent", "ProjectorFOV" },
			[""] = {"LightComponent", "ProjectorNearPlane" },
			[""] = {"LightComponent", "ProbeAreaDimensions" },
			[""] = {"LightComponent", "ProbeSortPriority" },
			[""] = {"LightComponent", "ProbeBoxProjected" },
			[""] = {"LightComponent", "ProbeBoxHeight" },
			[""] = {"LightComponent", "ProbeBoxLength" },
			[""] = {"LightComponent", "ProbeBoxWidth" },
			[""] = {"LightComponent", "ProbeAttenuationFalloff" },
			--Particles
			[""] = {"ParticleComponent", "Visible" },
			[""] = {"ParticleComponent", "Enable" },
			[""] = {"ParticleComponent", "ColorTint" },
			[""] = {"ParticleComponent", "CountScale" },
			[""] = {"ParticleComponent", "TimeScale" },
			[""] = {"ParticleComponent", "SpeedScale" },
			[""] = {"ParticleComponent", "GlobalSizeScale" },
			[""] = {"ParticleComponent", "ParticleSizeScaleX" },
			[""] = {"ParticleComponent", "ParticleSizeScaleY" },
			--Static mesh
			["meshVisibility"] = {"StaticMeshComponent", "Visibility" },
		...
```