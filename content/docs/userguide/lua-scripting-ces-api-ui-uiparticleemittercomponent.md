---
description: ' Use Lua scripting to control the UI particle emitter component in &ALYlong;. '
title: UIParticleEmitterComponent
---
# UIParticleEmitterComponent<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent"></a>

Controls the emission of two dimensional particles\. The source code location is `\dev\Gems\LyShine\Code\Source\UiParticleEmitterComponent.*`\.

## UiParticleEmitterBus<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-uiparticleemitterbus"></a>

Services messages for the `UiParticleEmitterComponent`\.

### GetIsEmitting<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisemitting"></a>

Returns whether the emitter is currently emitting\.

**Syntax**

```
bool GetIsEmittingColor()
```

### SetIsEmitting<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisemitting"></a>

Sets whether the emitter is currently emitting\.

**Syntax**

```
void SetIsEmitting(bool isEmitting)
```

### GetIsRandomSeedFixed<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisrandomseedfixed"></a>

Returns whether the emitter uses a fixed random seed\.

**Syntax**

```
bool GetIsRandomSeedFixed()
```

### SetIsRandomSeedFixed<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisrandomseedfixed"></a>

Sets whether the emitter uses a fixed random seed\.

**Syntax**

```
void SetRandomSeed(bool randomSeedFixed)
```

### GetRandomSeed<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getrandomseed"></a>

Returns the current random seed\.

**Syntax**

```
int GetRandomSeed()
```

### SetRandomSeed<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setrandomseed"></a>

Sets the random seed used by the emitter\.

**Syntax**

```
void SetRandomSeed(int randomSeed)
```

### GetIsParticlePositionRelativeToEmitter<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticlepositionrelativetoemitter"></a>

Returns whether the emitted particles move relative to the emitter\.

**Syntax**

```
bool GetIsParticlePositionRelativeToEmitter()
```

### SetIsParticlePositionRelativeToEmitter<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticlepositionrelativetoemitter"></a>

Sets whether the emitted particles move relative to the emitter\.

**Syntax**

```
void SetIsParticlePositionRelativeToEmitter(bool relativeToEmitter)
```

### GetParticleEmitRate<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleemitrate"></a>

Returns, in particles per second, the current particle emitter emit rate\.

**Syntax**

```
float GetParticleEmitRate()
```

### SetParticleEmitRate<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleemitrate"></a>

Sets, in particles per second, the current particle emitter emit rate\.

**Syntax**

```
void SetParticleEmitRate(float particleEmitRate) 
```

### GetIsEmitOnActivate<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisemitonactivate"></a>

Returns whether the particle emitter starts emitting when the component is activated\.

**Syntax**

```
bool GetIsEmitOnActivate()
```

### SetIsEmitOnActivate<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisemitonactivate"></a>

Sets whether the particle emitter starts emitting when the component is activated\.

**Syntax**

```
void SetIsEmitOnActivate(bool emitOnActivate)
```

### GetIsHitParticleCountOnActivate<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getishitparticlecountonactivate"></a>

Returns whether the average amount of particles are emitted and processed when the emitter starts emitting\.

**Syntax**

```
bool GetIsHitParticleCountOnActivate()
```

### SetIsHitParticleCountOnActivate<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setishitparticlecountonactivate"></a>

Sets whether the average amount of particles are emitted and processed when the emitter starts emitting\.

**Syntax**

```
void SetIsHitParticleCountOnActivate(bool hitParticleCountOnActivate)
```

### GetIsEmitterLifetimeInfinite<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisemitterlifetimeinfinite"></a>

Returns whether the emitter lifetime is infinite\.

**Syntax**

```
bool GetIsEmitterLifetimeInfinite()
```

### SetIsEmitterLifetimeInfinite<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisemitterlifetimeinfinite"></a>

Sets whether the emitter lifetime is infinite\.

**Syntax**

```
void SetIsEmitterLifetimeInfinite(bool emitterLifetimeInfinite)
```

### GetEmitterLifetime<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getemitterlifetime"></a>

Returns the total emitter lifetime in seconds\. When the lifetime is reached, the emitter stops emitting\.

**Syntax**

```
float GetEmitterLifetime()
```

### SetEmitterLifetime<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setemitterlifetime"></a>

Sets the total emitter lifetime in seconds\. When the lifetime is reached, the emitter stops emitting\.

**Syntax**

```
void SetEmitterLifetime(float emitterLifetime)
```

### GetIsParticleCountLimited<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticlecountlimited"></a>

Returns whether there is a limit to the number of active particles\.

**Syntax**

```
bool GetIsParticleCountLimited()
```

### SetIsParticleCountLimited<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticlecountlimited"></a>

Sets whether there is a limit to the number of active particles\.

**Syntax**

```
void SetIsParticleCountLimited(bool particleCountLimited)
```

### GetMaxParticles<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getmaxparticles"></a>

Returns the numerical limit of active particles\.

**Syntax**

```
AZ::u32 GetMaxParticles()
```

### SetMaxParticles<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setmaxparticles"></a>

Sets the numerical limit of active particles\.

**Syntax**

```
void SetMaxParticles(AZ::u32 maxParticles)
```

### GetEmitterShape<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getemittershape"></a>

Returns the current emitter shape\.

**Syntax**

```
eUiEmitShape GetEmitterShape()
```

Possible emitter shapes are as follows\.

```
enum eUiEmitShape
    {
        eUiEmitShape_Point,
        eUiEmitShape_Circle,
        eUiEmitShape_Quad
    };
```

### SetEmitterShape<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setemittershape"></a>

Sets the current emitter shape\.

**Syntax**

```
void SetVariable(eUiEmitShape emitShape)
```

For possible emitter shapes, see `GetEmitterShape`\.

### GetIsEmitOnEdge<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisemitonedge"></a>

Returns whether the particles are emitted on the edge of the selected shape\.

**Syntax**

```
bool GetIsEmitOnEdge()
```

### SetIsEmitOnEdge<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisemitonedge"></a>

Sets whether the particles are emitted on the edge of the selected shape\.

**Syntax**

```
void SetIsEmitOnEdge(bool emitOnEdge)
```

### GetInsideEmitDistance<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getinsideemitdistance"></a>

Returns the distance that particles are emitted inside the emitter shape edge\.

**Syntax**

```
float GetInsideEmitDistance()
```

### SetInsideEmitDistance<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setinsideemitdistance"></a>

Sets the distance that particles are emitted inside the emitter shape edge\.

**Syntax**

```
void SetInsideEmitDistance(float insideEmitDistance) 
```

### GetOutsideEmitDistance<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getoutsideemitdistance"></a>

Returns the distance that particles are emitted outside the emitter shape edge\.

**Syntax**

```
float GetOutsideEmitDistance()
```

### SetOutsideEmitDistance<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setoutsideemitdistance"></a>

Sets the distance that particles are emitted outside the emitter shape edge\.

**Syntax**

```
void SetOutsideEmitDistance(float outsideEmitDistance) 
```

### GetParticleInitialDirectionType<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialdirectiontype"></a>

Returns how the initial direction of the emitted particles are calculated\.

**Syntax**

```
eUiParticleInitialDirectionType GetParticleInitialDirectionType()
```

Possible values are as follows\.

```
enum eUiParticleInitialDirectionType
    {
        eUiParticleInitialDirectionType_RelativeToEmitAngle,
        eUiParticleInitialDirectionType_RelativeToEmitterCenter
    };
```

### SetParticleInitialDirectionType<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialdirectiontype"></a>

Sets how the initial direction of the emitted particles is calculated\.

**Syntax**

```
void SetVariable(eUiEmitShape emitShape)
```

For possible direction types, see `GetParticleInitialDirectionType`\.

### GetEmitAngle<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getemitangle"></a>

Returns, in degrees clockwise from straight up, the angle along which particles are emitted\.

**Syntax**

```
float GetEmitAngle()
```

### SetEmitAngle<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setemitangle"></a>

Sets, in degrees clockwise from straight up, the angle along which particles are emitted\.

**Syntax**

```
void SetEmitAngle(float emitAngle)
```

### GetEmitAngleVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getemitanglevariation"></a>

Returns, in degrees, the variation in the emit angle\. For example, a variation value of 10 designates a range of plus or minus 10 degrees on each side of the current emit angle\.

**Syntax**

```
float GetEmitAngleVariation()
```

### SetEmitAngleVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setemitanglevariation"></a>

Sets, in degrees, the variation in the emit angle\. For example, a variation value of 10 designates a range of plus or minus 10 degrees on each side of the current emit angle\.

**Syntax**

```
void SetEmitAngleVariation(float emitAngleVariation) 
```

### GetIsParticleLifetimeInfinte<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticlelifetimeinfinte"></a>

Returns whether the emitted particles have an infinite lifetime\.

**Syntax**

```
bool GetIsParticleLifetimeInfinite()
```

### SetIsParticleLifetimeInfinite<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticlelifetimeinfinite"></a>

Sets whether the emitted particles have an infinite lifetime\.

**Syntax**

```
void SetIsParticleLifetimeInfinite(bool infiniteLifetime)
```

### GetParticleLifetime<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlelifetime"></a>

Returns, in seconds, the lifetime of the emitted particles\.

**Syntax**

```
float GetParticleLifetime()
```

### SetParticleLifetime<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlelifetime"></a>

Sets, in seconds, the initial lifetime of the emitted particles\.

**Syntax**

```
void SetParticleLifetime(float lifetime)
```

### GetParticleLifetimeVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlelifetimevariation"></a>

Returns the variation in lifetime of the emitted particles\. For example, a variation of 5 seconds designates a range of 5 seconds on either side of the chosen initial lifetime\.

**Syntax**

```
float GetParticleLifetimeVariation()
```

### SetParticleLifetimeVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlelifetimevariation"></a>

Sets the variation in lifetime of the emitted particles\. For example, a variation of 5 seconds designates a range of 5 seconds on either side of the chosen initial lifetime\.

**Syntax**

```
void SetPartcleLifetimeVariation(float lifetimeVariation)
```

### GetSpritePathname<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getspritepathname"></a>

Returns the source location of the image to be used by the emitted particles\.

**Syntax**

```
AZStd::string GetSpritePathname()
```

### SetSpritePathname<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setspritepathname"></a>

Sets the source location of the image to be used by the emitted particles\.

**Syntax**

```
void SetSpritePathname(AZStd::string spritePath) 
```

### GetIsSpriteSheetAnimated<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisspritesheetanimated"></a>

Returns whether the sprite sheet cell index changes over time on each particle\.

**Syntax**

```
bool GetIsSpriteSheetAnimated()
```

### SetIsSpriteSheetAnimated<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisspritesheetanimated"></a>

Sets whether the sprite sheet cell index changes over time on each particle\.

**Syntax**

```
void SetIsSpriteSheetAnimated(bool spriteSheetAnimated)
```

### GetIsSpriteSheetAnimationLooped<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisspritesheetanimationlooped"></a>

Returns whether the sprite sheet cell animation is looped\.

**Syntax**

```
bool GetIsSpriteSheetAnimationLooped()
```

### SetIsSpriteSheetAnimationLooped<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisspritesheetanimationlooped"></a>

Sets whether the sprite sheet cell animation is looped\.

**Syntax**

```
void SetIsSpriteSheetAnimationLooped(bool spriteSheetAnimationLooped)
```

### GetIsSpriteSheetIndexRandom<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisspritesheetindexrandom"></a>

Returns whether the initial sprite\-sheet index is randomly chosen\.

**Syntax**

```
bool GetIsSpriteSheetIndexRandom()
```

### SetIsSpriteSheetIndexRandom<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisspritesheetindexrandom"></a>

Sets whether the initial sprite\-sheet index is randomly chosen\.

**Syntax**

```
void SetIsSpriteSheetIndexRandom(bool spriteSheetIndexRandom)
```

### GetSpriteSheetCellIndex<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getspritesheetcellindex"></a>

Returns the sprite\-sheet index to be used for emitted particles\.

**Syntax**

```
int GetSpriteSheetCellIndex()
```

### SetSpriteSheetCellIndex<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setspritesheetcellindex"></a>

Sets the sprite\-sheet index to be used for emitted particles\.

**Syntax**

```
void SetSpriteSheetCellIndex(int spriteSheetIndex) 
```

### GetSpriteSheetCellEndIndex<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getspritesheetcellendindex"></a>

Returns the end index of the sprite\-sheet cell range that is used for sprite\-sheet animation or random index selection\.

**Syntax**

```
int GetSpriteSheetCellEndIndex()
```

### SetSpriteSheetCellEndIndex<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setspritesheetcellendindex"></a>

Sets the end index of the sprite\-sheet cell range that is used for sprite\-sheet animation or random index selection\.

**Syntax**

```
void SetSpriteSheetCellEndIndex(int spriteSheetEndIndex)
```

### GetSpriteSheetFrameDelay<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getspritesheetframedelay"></a>

Returns, in seconds, the delay between each sprite\-sheet frame\.

**Syntax**

```
float GetSpriteSheetFrameDelay()
```

### SetSpriteSheetFrameDelay<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setspritesheetframedelay"></a>

Sets, in seconds, the delay between each sprite\-sheet frame\.

**Syntax**

```
void SetSpriteSheetFrameDelay(float spriteSheetFrameDelay)
```

### GetIsParticleAspectRatioLocked<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticleaspectratiolocked"></a>

Returns whether the width and height of the emitted particles are locked into the current aspect ratio\.

**Syntax**

```
bool GetIsParticleAspectRatioLocked()
```

### SetIsParticleAspectRatioLocked<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticleaspectratiolocked"></a>

Sets whether the width and height of the emitted particles are locked into the current aspect ratio\.

**Syntax**

```
void SetIsParticleAspectRatioLocked(bool aspectRatioLocked)
```

### GetParticlePivot<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlepivot"></a>

Returns the pivot for the particles in a range from \(0,0\) at the top left to \(1,1\) at the bottom right\.

**Syntax**

```
AZ::Vector2 GetParticlePivot()
```

### SetParticlePivot<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlepivot"></a>

Sets the pivot for the particles in a range from \(0,0\) at the top left to \(1,1\) at the bottom right\.

**Syntax**

```
void SetParticlePivot(AZ::Vector2 particlePivot) 
```

### GetParticleSize<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlesize"></a>

Returns the size of the emitted particles\.

**Syntax**

```
AZ::Vector2 GetParticleSize()
```

### SetParticleSize<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlesize"></a>

Sets the size of the emitted particles\.

**Syntax**

```
void SetParticleSize(AZ::Vector2 particleSize)
```

### GetParticleWidth<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlewidth"></a>

Returns the width of the emitted particles\.

**Syntax**

```
float GetParticleWidth()
```

### SetParticleWidth<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlewidth"></a>

Sets the width of the emitted particles\.

**Syntax**

```
void SetParticleWidth(float particleWidth)
```

### GetParticleWidthVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlewidthvariation"></a>

Returns the variation in width of the emitted particles\.

**Syntax**

```
float GetParticleWidthVariation()
```

### SetParticleWidthVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlewidthvariation"></a>

Sets the variation in width of the emitted particles\.

**Syntax**

```
void SetParticleWidthVariation(float particleWidthVariation)
```

### GetParticleHeight<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleheight"></a>

Returns the height of the emitted particles\.

**Syntax**

```
float GetParticleHeight()
```

### SetParticleHeight<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleheight"></a>

Sets the height of the emitted particles\.

**Syntax**

```
void SetParticleHeight(float particleHeight)
```

### GetParticleHeightVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleheightvariation"></a>

Returns the variation in height of the emitted particles\.

**Syntax**

```
float GetParticleHeightVariation()
```

### SetParticleHeightVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleheightvariation"></a>

Sets the variation in height of the emitted particles\.

**Syntax**

```
void SetParticleHeightVariation(float particleHeightVariation)
```

### GetParticleMovementCoordinateType<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlemovementcoordinatetype"></a>

Returns the co\-ordinate system used for the movement of the emitted particles\.

**Syntax**

```
eUiParticleCoordinateType GetParticleMovementCoordinateType()
```

Possible values for the movement space are as follows\.

```
enum eUiParticleCoordinateType
    {
        eUiParticleCoordinateType_Cartesian,
        eUiParticleCoordinateType_Polar
    };
```

### SetParticleMovementCoordinateType<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlemovementcoordinatetype"></a>

Sets the coordinate system that is used for the movement of the emitted particles\.

**Syntax**

```
void SetParticleMovementCoordinateType(eUiParticleCoordinateType movementCoordinateType)
```

For possible values for the coordinate type, see `GetParticleMovementCoordinateType`\.

### GetParticleAccelerationMovementSpace<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleaccelerationmovementspace"></a>

Returns the coordinate system that is used for the acceleration of particles\.

**Syntax**

```
eUiParticleCoordinateType GetParticleAccelerationMovementSpace()
```

For possible values for the movement space, see `GetParticleMovementCoordinateType`\.

### SetParticleAccelerationMovementSpace<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleaccelerationmovementspace"></a>

Sets the coordinate system that is used for the acceleration of particles\.

**Syntax**

```
void SetParticleAccelerationMovementSpace(eUiParticleCoordinateType accelerationMovementSpace)
```

For possible values for the movement space, see `GetParticleMovementCoordinateType`\.

### GetParticleInitialVelocity<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialvelocity"></a>

Returns the initial velocity of the emitted particles\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
AZ::Vector2 GetParticleInitialVelocity()
```

### SetParticleInitialVelocity<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialvelocity"></a>

Sets the initial velocity of the emitted particles\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
void SetParticleInitialVelocity(AZ::Vector2 particleInitialVelocity)
```

### GetParticleInitialVelocityVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialvelocityvariation"></a>

Returns the variation in the particle initial velocity\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
AZ::Vector2 GetParticleInitialVelocityVariation() 
```

### SetParticleInitialVelocityVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialvelocityvariation"></a>

Sets the variation in the particle initial velocity\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
void SetParticleInitialVelocityVariation(AZ::Vector2 initialVelocityVariation)
```

### GetParticleSpeed<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlespeed"></a>

Returns the initial particle speed\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
float GetParticleSpeed()
```

### SetParticleSpeed<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlespeed"></a>

Sets the initial particle speed\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
void SetParticleSpeed(float particleSpeed)
```

### GetParticleSpeedVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlespeedvariation"></a>

Returns the variation in initial particle speed\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
float GetParticleSpeedVariation()
```

### SetParticleSpeedVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlespeedvariation"></a>

Sets the variation in initial particle speed\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
void SetParticleSpeedVariation(float particleSpeedVariation)
```

### GetParticleAcceleration<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleacceleration"></a>

Returns the acceleration of the emitted particles\.

**Syntax**

```
AZ::Vector2 GetParticleAcceleration()
```

### SetParticleAcceleration<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleacceleration"></a>

Sets the acceleration of the emitted particles\.

**Syntax**

```
void SetParticleAcceleration(AZ::Vector2 particleAcceleration)
```

### GetIsParticleRotationFromVelocity<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticlerotationfromvelocity"></a>

Returns whether the particle is oriented so that its top points towards the current velocity vector\.

**Syntax**

```
bool GetIsParticleRotationFromVelocity()
```

### SetIsParticleRotationFromVelocity<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticlerotationfromvelocity"></a>

Sets whether the particle is oriented so that its top points towards the current velocity vector\.

**Syntax**

```
void SetIsParticleRotationFromVelocity(bool rotationFromVelocity)
```

### GetIsParticleInitialRotationFromInitialVelocity<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticleinitialrotationfrominitialvelocity"></a>

Returns whether the particle is initially oriented so that its top points towards the initial velocity vector\.

**Syntax**

```
bool GetIsParticleInitialRotationFromInitialVelocity() 
```

### SetIsParticleInitialRotationFromInitialVelocity<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticleinitialrotationfrominitialvelocity"></a>

Sets whether the particle is initially oriented so that its top points towards the initial velocity vector\.

**Syntax**

```
void SetIsParticleInitialRotationFromInitialVelocity(bool initialRotationFromVelocity)
```

### GetParticleInitialRotation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialrotation"></a>

Returns, in degrees clockwise measured from straight up, the initial rotation\.

**Syntax**

```
float GetParticleInitialRotation()
```

### SetParticleInitialRotation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialrotation"></a>

Sets, in degrees clockwise measured from straight up, the initial rotation\.

**Syntax**

```
void SetParticleInitialRotation(float particleInitialRotation)
```

### GetParticleInitialRotationVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialrotationvariation"></a>

Returns, in degrees clockwise measured from straight up, the variation of the initial rotation\.

**Syntax**

```
float GetParticleInitialRotationVariation()
```

### SetParticleInitialRotationVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialrotationvariation"></a>

Sets, in degrees clockwise measured from straight up, the variation of the initial rotation\.

**Syntax**

```
void SetParticleInitialRotation(float particleInitialRotationVariation)
```

### GetParticleRotationSpeed<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlerotationspeed"></a>

Returns, in degrees clockwise per second, the rotation speed of the emitted particles\.

**Syntax**

```
float GetParticleRotationSpeed()
```

### SetParticleRotationSpeed<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlerotationspeed"></a>

Sets, in degrees clockwise per second, the rotation speed of the emitted particles\.

**Syntax**

```
void SetParticleRotationSpeed(float rotationSpeed) 
```

### GetParticleRotationSpeedVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlerotationspeedvariation"></a>

Returns, in degrees clockwise per second, the variation in rotation speed of the emitted particles\.

**Syntax**

```
float GetParticleRotationSpeedVariation()
```

### SetParticleRotationSpeedVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlerotationspeedvariation"></a>

Sets, in degrees clockwise per second, the variation in rotation speed of the emitted particles\.

**Syntax**

```
void SetParticleRotationSpeedVariation(float rotationSpeedVariation)
```

### GetParticleColor<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlecolor"></a>

Returns the color of the emitted particles\.

**Syntax**

```
AZ::Color GetParticleColor()
```

### SetParticleColor<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlecolor"></a>

Sets the color of the emitted particles\.

**Syntax**

```
void SetParticleColor(AZ::Color particleColor)
```

### GetParticleColorBrightnessVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlecolorbrightnessvariation"></a>

Returns, in the range \[0,1\], the variation in color brightness of the emitted particles\.

**Syntax**

```
float GetParticleColorBrightnessVariation()
```

### SetParticleColorBrightnessVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlecolorbrightnessvariation"></a>

Sets, in the range \[0,1\], the variation in color brightness of the emitted particles\.

**Syntax**

```
void SetParticleColorBrightnessVariation(float brightnessVariation)
```

### GetParticleColorTintVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlecolortintvariation"></a>

Returns, in the range \[0,1\], the variation in color tint of the emitted particles\.

**Syntax**

```
float GetParticleColorTintVariation()
```

### SetParticleColorTintVariation<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlecolortintvariation"></a>

Sets, in the range \[0,1\], the variation in color tint of the emitted particles\.

**Syntax**

```
void SetParticleColorTintVariation(float tintVariation)
```

### GetParticleAlpha<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlealpha"></a>

Returns, in the range \[0,1\], the alpha of the emitted particles\.

**Syntax**

```
float GetParticleAlpha()
```

### SetParticleAlpha<a name="lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlealpha"></a>

Sets, in the range \[0,1\], the alpha of the emitted particles\.

**Syntax**

```
void SetParticleAlpha(float particleAlpha)
```