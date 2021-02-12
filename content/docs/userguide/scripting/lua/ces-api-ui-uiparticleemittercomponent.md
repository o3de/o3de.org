---
description: ' Use Lua scripting to control the UI particle emitter component in Amazon Lumberyard. '
title: UIParticleEmitterComponent
---
# UIParticleEmitterComponent {#lua-scripting-ces-api-ui-uiparticleemittercomponent}

Controls the emission of two dimensional particles\. The source code location is `\dev\Gems\LyShine\Code\Source\UiParticleEmitterComponent.*`\.

## UiParticleEmitterBus {#lua-scripting-ces-api-ui-uiparticleemittercomponent-uiparticleemitterbus}

Services messages for the `UiParticleEmitterComponent`\.

### GetIsEmitting {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisemitting}

Returns whether the emitter is currently emitting\.

**Syntax**

```
bool GetIsEmittingColor()
```

### SetIsEmitting {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisemitting}

Sets whether the emitter is currently emitting\.

**Syntax**

```
void SetIsEmitting(bool isEmitting)
```

### GetIsRandomSeedFixed {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisrandomseedfixed}

Returns whether the emitter uses a fixed random seed\.

**Syntax**

```
bool GetIsRandomSeedFixed()
```

### SetIsRandomSeedFixed {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisrandomseedfixed}

Sets whether the emitter uses a fixed random seed\.

**Syntax**

```
void SetRandomSeed(bool randomSeedFixed)
```

### GetRandomSeed {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getrandomseed}

Returns the current random seed\.

**Syntax**

```
int GetRandomSeed()
```

### SetRandomSeed {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setrandomseed}

Sets the random seed used by the emitter\.

**Syntax**

```
void SetRandomSeed(int randomSeed)
```

### GetIsParticlePositionRelativeToEmitter {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticlepositionrelativetoemitter}

Returns whether the emitted particles move relative to the emitter\.

**Syntax**

```
bool GetIsParticlePositionRelativeToEmitter()
```

### SetIsParticlePositionRelativeToEmitter {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticlepositionrelativetoemitter}

Sets whether the emitted particles move relative to the emitter\.

**Syntax**

```
void SetIsParticlePositionRelativeToEmitter(bool relativeToEmitter)
```

### GetParticleEmitRate {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleemitrate}

Returns, in particles per second, the current particle emitter emit rate\.

**Syntax**

```
float GetParticleEmitRate()
```

### SetParticleEmitRate {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleemitrate}

Sets, in particles per second, the current particle emitter emit rate\.

**Syntax**

```
void SetParticleEmitRate(float particleEmitRate)
```

### GetIsEmitOnActivate {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisemitonactivate}

Returns whether the particle emitter starts emitting when the component is activated\.

**Syntax**

```
bool GetIsEmitOnActivate()
```

### SetIsEmitOnActivate {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisemitonactivate}

Sets whether the particle emitter starts emitting when the component is activated\.

**Syntax**

```
void SetIsEmitOnActivate(bool emitOnActivate)
```

### GetIsHitParticleCountOnActivate {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getishitparticlecountonactivate}

Returns whether the average amount of particles are emitted and processed when the emitter starts emitting\.

**Syntax**

```
bool GetIsHitParticleCountOnActivate()
```

### SetIsHitParticleCountOnActivate {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setishitparticlecountonactivate}

Sets whether the average amount of particles are emitted and processed when the emitter starts emitting\.

**Syntax**

```
void SetIsHitParticleCountOnActivate(bool hitParticleCountOnActivate)
```

### GetIsEmitterLifetimeInfinite {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisemitterlifetimeinfinite}

Returns whether the emitter lifetime is infinite\.

**Syntax**

```
bool GetIsEmitterLifetimeInfinite()
```

### SetIsEmitterLifetimeInfinite {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisemitterlifetimeinfinite}

Sets whether the emitter lifetime is infinite\.

**Syntax**

```
void SetIsEmitterLifetimeInfinite(bool emitterLifetimeInfinite)
```

### GetEmitterLifetime {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getemitterlifetime}

Returns the total emitter lifetime in seconds\. When the lifetime is reached, the emitter stops emitting\.

**Syntax**

```
float GetEmitterLifetime()
```

### SetEmitterLifetime {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setemitterlifetime}

Sets the total emitter lifetime in seconds\. When the lifetime is reached, the emitter stops emitting\.

**Syntax**

```
void SetEmitterLifetime(float emitterLifetime)
```

### GetIsParticleCountLimited {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticlecountlimited}

Returns whether there is a limit to the number of active particles\.

**Syntax**

```
bool GetIsParticleCountLimited()
```

### SetIsParticleCountLimited {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticlecountlimited}

Sets whether there is a limit to the number of active particles\.

**Syntax**

```
void SetIsParticleCountLimited(bool particleCountLimited)
```

### GetMaxParticles {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getmaxparticles}

Returns the numerical limit of active particles\.

**Syntax**

```
AZ::u32 GetMaxParticles()
```

### SetMaxParticles {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setmaxparticles}

Sets the numerical limit of active particles\.

**Syntax**

```
void SetMaxParticles(AZ::u32 maxParticles)
```

### GetEmitterShape {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getemittershape}

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

### SetEmitterShape {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setemittershape}

Sets the current emitter shape\.

**Syntax**

```
void SetVariable(eUiEmitShape emitShape)
```

For possible emitter shapes, see `GetEmitterShape`\.

### GetIsEmitOnEdge {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisemitonedge}

Returns whether the particles are emitted on the edge of the selected shape\.

**Syntax**

```
bool GetIsEmitOnEdge()
```

### SetIsEmitOnEdge {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisemitonedge}

Sets whether the particles are emitted on the edge of the selected shape\.

**Syntax**

```
void SetIsEmitOnEdge(bool emitOnEdge)
```

### GetInsideEmitDistance {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getinsideemitdistance}

Returns the distance that particles are emitted inside the emitter shape edge\.

**Syntax**

```
float GetInsideEmitDistance()
```

### SetInsideEmitDistance {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setinsideemitdistance}

Sets the distance that particles are emitted inside the emitter shape edge\.

**Syntax**

```
void SetInsideEmitDistance(float insideEmitDistance)
```

### GetOutsideEmitDistance {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getoutsideemitdistance}

Returns the distance that particles are emitted outside the emitter shape edge\.

**Syntax**

```
float GetOutsideEmitDistance()
```

### SetOutsideEmitDistance {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setoutsideemitdistance}

Sets the distance that particles are emitted outside the emitter shape edge\.

**Syntax**

```
void SetOutsideEmitDistance(float outsideEmitDistance)
```

### GetParticleInitialDirectionType {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialdirectiontype}

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

### SetParticleInitialDirectionType {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialdirectiontype}

Sets how the initial direction of the emitted particles is calculated\.

**Syntax**

```
void SetVariable(eUiEmitShape emitShape)
```

For possible direction types, see `GetParticleInitialDirectionType`\.

### GetEmitAngle {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getemitangle}

Returns, in degrees clockwise from straight up, the angle along which particles are emitted\.

**Syntax**

```
float GetEmitAngle()
```

### SetEmitAngle {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setemitangle}

Sets, in degrees clockwise from straight up, the angle along which particles are emitted\.

**Syntax**

```
void SetEmitAngle(float emitAngle)
```

### GetEmitAngleVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getemitanglevariation}

Returns, in degrees, the variation in the emit angle\. For example, a variation value of 10 designates a range of plus or minus 10 degrees on each side of the current emit angle\.

**Syntax**

```
float GetEmitAngleVariation()
```

### SetEmitAngleVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setemitanglevariation}

Sets, in degrees, the variation in the emit angle\. For example, a variation value of 10 designates a range of plus or minus 10 degrees on each side of the current emit angle\.

**Syntax**

```
void SetEmitAngleVariation(float emitAngleVariation)
```

### GetIsParticleLifetimeInfinte {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticlelifetimeinfinte}

Returns whether the emitted particles have an infinite lifetime\.

**Syntax**

```
bool GetIsParticleLifetimeInfinite()
```

### SetIsParticleLifetimeInfinite {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticlelifetimeinfinite}

Sets whether the emitted particles have an infinite lifetime\.

**Syntax**

```
void SetIsParticleLifetimeInfinite(bool infiniteLifetime)
```

### GetParticleLifetime {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlelifetime}

Returns, in seconds, the lifetime of the emitted particles\.

**Syntax**

```
float GetParticleLifetime()
```

### SetParticleLifetime {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlelifetime}

Sets, in seconds, the initial lifetime of the emitted particles\.

**Syntax**

```
void SetParticleLifetime(float lifetime)
```

### GetParticleLifetimeVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlelifetimevariation}

Returns the variation in lifetime of the emitted particles\. For example, a variation of 5 seconds designates a range of 5 seconds on either side of the chosen initial lifetime\.

**Syntax**

```
float GetParticleLifetimeVariation()
```

### SetParticleLifetimeVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlelifetimevariation}

Sets the variation in lifetime of the emitted particles\. For example, a variation of 5 seconds designates a range of 5 seconds on either side of the chosen initial lifetime\.

**Syntax**

```
void SetPartcleLifetimeVariation(float lifetimeVariation)
```

### GetSpritePathname {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getspritepathname}

Returns the source location of the image to be used by the emitted particles\.

**Syntax**

```
AZStd::string GetSpritePathname()
```

### SetSpritePathname {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setspritepathname}

Sets the source location of the image to be used by the emitted particles\.

**Syntax**

```
void SetSpritePathname(AZStd::string spritePath)
```

### GetIsSpriteSheetAnimated {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisspritesheetanimated}

Returns whether the sprite sheet cell index changes over time on each particle\.

**Syntax**

```
bool GetIsSpriteSheetAnimated()
```

### SetIsSpriteSheetAnimated {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisspritesheetanimated}

Sets whether the sprite sheet cell index changes over time on each particle\.

**Syntax**

```
void SetIsSpriteSheetAnimated(bool spriteSheetAnimated)
```

### GetIsSpriteSheetAnimationLooped {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisspritesheetanimationlooped}

Returns whether the sprite sheet cell animation is looped\.

**Syntax**

```
bool GetIsSpriteSheetAnimationLooped()
```

### SetIsSpriteSheetAnimationLooped {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisspritesheetanimationlooped}

Sets whether the sprite sheet cell animation is looped\.

**Syntax**

```
void SetIsSpriteSheetAnimationLooped(bool spriteSheetAnimationLooped)
```

### GetIsSpriteSheetIndexRandom {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisspritesheetindexrandom}

Returns whether the initial sprite\-sheet index is randomly chosen\.

**Syntax**

```
bool GetIsSpriteSheetIndexRandom()
```

### SetIsSpriteSheetIndexRandom {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisspritesheetindexrandom}

Sets whether the initial sprite\-sheet index is randomly chosen\.

**Syntax**

```
void SetIsSpriteSheetIndexRandom(bool spriteSheetIndexRandom)
```

### GetSpriteSheetCellIndex {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getspritesheetcellindex}

Returns the sprite\-sheet index to be used for emitted particles\.

**Syntax**

```
int GetSpriteSheetCellIndex()
```

### SetSpriteSheetCellIndex {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setspritesheetcellindex}

Sets the sprite\-sheet index to be used for emitted particles\.

**Syntax**

```
void SetSpriteSheetCellIndex(int spriteSheetIndex)
```

### GetSpriteSheetCellEndIndex {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getspritesheetcellendindex}

Returns the end index of the sprite\-sheet cell range that is used for sprite\-sheet animation or random index selection\.

**Syntax**

```
int GetSpriteSheetCellEndIndex()
```

### SetSpriteSheetCellEndIndex {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setspritesheetcellendindex}

Sets the end index of the sprite\-sheet cell range that is used for sprite\-sheet animation or random index selection\.

**Syntax**

```
void SetSpriteSheetCellEndIndex(int spriteSheetEndIndex)
```

### GetSpriteSheetFrameDelay {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getspritesheetframedelay}

Returns, in seconds, the delay between each sprite\-sheet frame\.

**Syntax**

```
float GetSpriteSheetFrameDelay()
```

### SetSpriteSheetFrameDelay {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setspritesheetframedelay}

Sets, in seconds, the delay between each sprite\-sheet frame\.

**Syntax**

```
void SetSpriteSheetFrameDelay(float spriteSheetFrameDelay)
```

### GetIsParticleAspectRatioLocked {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticleaspectratiolocked}

Returns whether the width and height of the emitted particles are locked into the current aspect ratio\.

**Syntax**

```
bool GetIsParticleAspectRatioLocked()
```

### SetIsParticleAspectRatioLocked {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticleaspectratiolocked}

Sets whether the width and height of the emitted particles are locked into the current aspect ratio\.

**Syntax**

```
void SetIsParticleAspectRatioLocked(bool aspectRatioLocked)
```

### GetParticlePivot {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlepivot}

Returns the pivot for the particles in a range from \(0,0\) at the top left to \(1,1\) at the bottom right\.

**Syntax**

```
AZ::Vector2 GetParticlePivot()
```

### SetParticlePivot {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlepivot}

Sets the pivot for the particles in a range from \(0,0\) at the top left to \(1,1\) at the bottom right\.

**Syntax**

```
void SetParticlePivot(AZ::Vector2 particlePivot)
```

### GetParticleSize {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlesize}

Returns the size of the emitted particles\.

**Syntax**

```
AZ::Vector2 GetParticleSize()
```

### SetParticleSize {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlesize}

Sets the size of the emitted particles\.

**Syntax**

```
void SetParticleSize(AZ::Vector2 particleSize)
```

### GetParticleWidth {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlewidth}

Returns the width of the emitted particles\.

**Syntax**

```
float GetParticleWidth()
```

### SetParticleWidth {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlewidth}

Sets the width of the emitted particles\.

**Syntax**

```
void SetParticleWidth(float particleWidth)
```

### GetParticleWidthVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlewidthvariation}

Returns the variation in width of the emitted particles\.

**Syntax**

```
float GetParticleWidthVariation()
```

### SetParticleWidthVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlewidthvariation}

Sets the variation in width of the emitted particles\.

**Syntax**

```
void SetParticleWidthVariation(float particleWidthVariation)
```

### GetParticleHeight {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleheight}

Returns the height of the emitted particles\.

**Syntax**

```
float GetParticleHeight()
```

### SetParticleHeight {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleheight}

Sets the height of the emitted particles\.

**Syntax**

```
void SetParticleHeight(float particleHeight)
```

### GetParticleHeightVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleheightvariation}

Returns the variation in height of the emitted particles\.

**Syntax**

```
float GetParticleHeightVariation()
```

### SetParticleHeightVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleheightvariation}

Sets the variation in height of the emitted particles\.

**Syntax**

```
void SetParticleHeightVariation(float particleHeightVariation)
```

### GetParticleMovementCoordinateType {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlemovementcoordinatetype}

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

### SetParticleMovementCoordinateType {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlemovementcoordinatetype}

Sets the coordinate system that is used for the movement of the emitted particles\.

**Syntax**

```
void SetParticleMovementCoordinateType(eUiParticleCoordinateType movementCoordinateType)
```

For possible values for the coordinate type, see `GetParticleMovementCoordinateType`\.

### GetParticleAccelerationMovementSpace {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleaccelerationmovementspace}

Returns the coordinate system that is used for the acceleration of particles\.

**Syntax**

```
eUiParticleCoordinateType GetParticleAccelerationMovementSpace()
```

For possible values for the movement space, see `GetParticleMovementCoordinateType`\.

### SetParticleAccelerationMovementSpace {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleaccelerationmovementspace}

Sets the coordinate system that is used for the acceleration of particles\.

**Syntax**

```
void SetParticleAccelerationMovementSpace(eUiParticleCoordinateType accelerationMovementSpace)
```

For possible values for the movement space, see `GetParticleMovementCoordinateType`\.

### GetParticleInitialVelocity {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialvelocity}

Returns the initial velocity of the emitted particles\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
AZ::Vector2 GetParticleInitialVelocity()
```

### SetParticleInitialVelocity {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialvelocity}

Sets the initial velocity of the emitted particles\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
void SetParticleInitialVelocity(AZ::Vector2 particleInitialVelocity)
```

### GetParticleInitialVelocityVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialvelocityvariation}

Returns the variation in the particle initial velocity\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
AZ::Vector2 GetParticleInitialVelocityVariation()
```

### SetParticleInitialVelocityVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialvelocityvariation}

Sets the variation in the particle initial velocity\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
void SetParticleInitialVelocityVariation(AZ::Vector2 initialVelocityVariation)
```

### GetParticleSpeed {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlespeed}

Returns the initial particle speed\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
float GetParticleSpeed()
```

### SetParticleSpeed {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlespeed}

Sets the initial particle speed\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
void SetParticleSpeed(float particleSpeed)
```

### GetParticleSpeedVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlespeedvariation}

Returns the variation in initial particle speed\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
float GetParticleSpeedVariation()
```

### SetParticleSpeedVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlespeedvariation}

Sets the variation in initial particle speed\. Applicable only when the emitter doesn't control the emit direction\.

**Syntax**

```
void SetParticleSpeedVariation(float particleSpeedVariation)
```

### GetParticleAcceleration {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleacceleration}

Returns the acceleration of the emitted particles\.

**Syntax**

```
AZ::Vector2 GetParticleAcceleration()
```

### SetParticleAcceleration {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleacceleration}

Sets the acceleration of the emitted particles\.

**Syntax**

```
void SetParticleAcceleration(AZ::Vector2 particleAcceleration)
```

### GetIsParticleRotationFromVelocity {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticlerotationfromvelocity}

Returns whether the particle is oriented so that its top points towards the current velocity vector\.

**Syntax**

```
bool GetIsParticleRotationFromVelocity()
```

### SetIsParticleRotationFromVelocity {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticlerotationfromvelocity}

Sets whether the particle is oriented so that its top points towards the current velocity vector\.

**Syntax**

```
void SetIsParticleRotationFromVelocity(bool rotationFromVelocity)
```

### GetIsParticleInitialRotationFromInitialVelocity {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getisparticleinitialrotationfrominitialvelocity}

Returns whether the particle is initially oriented so that its top points towards the initial velocity vector\.

**Syntax**

```
bool GetIsParticleInitialRotationFromInitialVelocity()
```

### SetIsParticleInitialRotationFromInitialVelocity {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setisparticleinitialrotationfrominitialvelocity}

Sets whether the particle is initially oriented so that its top points towards the initial velocity vector\.

**Syntax**

```
void SetIsParticleInitialRotationFromInitialVelocity(bool initialRotationFromVelocity)
```

### GetParticleInitialRotation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialrotation}

Returns, in degrees clockwise measured from straight up, the initial rotation\.

**Syntax**

```
float GetParticleInitialRotation()
```

### SetParticleInitialRotation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialrotation}

Sets, in degrees clockwise measured from straight up, the initial rotation\.

**Syntax**

```
void SetParticleInitialRotation(float particleInitialRotation)
```

### GetParticleInitialRotationVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticleinitialrotationvariation}

Returns, in degrees clockwise measured from straight up, the variation of the initial rotation\.

**Syntax**

```
float GetParticleInitialRotationVariation()
```

### SetParticleInitialRotationVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticleinitialrotationvariation}

Sets, in degrees clockwise measured from straight up, the variation of the initial rotation\.

**Syntax**

```
void SetParticleInitialRotation(float particleInitialRotationVariation)
```

### GetParticleRotationSpeed {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlerotationspeed}

Returns, in degrees clockwise per second, the rotation speed of the emitted particles\.

**Syntax**

```
float GetParticleRotationSpeed()
```

### SetParticleRotationSpeed {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlerotationspeed}

Sets, in degrees clockwise per second, the rotation speed of the emitted particles\.

**Syntax**

```
void SetParticleRotationSpeed(float rotationSpeed)
```

### GetParticleRotationSpeedVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlerotationspeedvariation}

Returns, in degrees clockwise per second, the variation in rotation speed of the emitted particles\.

**Syntax**

```
float GetParticleRotationSpeedVariation()
```

### SetParticleRotationSpeedVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlerotationspeedvariation}

Sets, in degrees clockwise per second, the variation in rotation speed of the emitted particles\.

**Syntax**

```
void SetParticleRotationSpeedVariation(float rotationSpeedVariation)
```

### GetParticleColor {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlecolor}

Returns the color of the emitted particles\.

**Syntax**

```
AZ::Color GetParticleColor()
```

### SetParticleColor {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlecolor}

Sets the color of the emitted particles\.

**Syntax**

```
void SetParticleColor(AZ::Color particleColor)
```

### GetParticleColorBrightnessVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlecolorbrightnessvariation}

Returns, in the range \[0,1\], the variation in color brightness of the emitted particles\.

**Syntax**

```
float GetParticleColorBrightnessVariation()
```

### SetParticleColorBrightnessVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlecolorbrightnessvariation}

Sets, in the range \[0,1\], the variation in color brightness of the emitted particles\.

**Syntax**

```
void SetParticleColorBrightnessVariation(float brightnessVariation)
```

### GetParticleColorTintVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlecolortintvariation}

Returns, in the range \[0,1\], the variation in color tint of the emitted particles\.

**Syntax**

```
float GetParticleColorTintVariation()
```

### SetParticleColorTintVariation {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlecolortintvariation}

Sets, in the range \[0,1\], the variation in color tint of the emitted particles\.

**Syntax**

```
void SetParticleColorTintVariation(float tintVariation)
```

### GetParticleAlpha {#lua-scripting-ces-api-ui-uiparticleemittercomponent-getparticlealpha}

Returns, in the range \[0,1\], the alpha of the emitted particles\.

**Syntax**

```
float GetParticleAlpha()
```

### SetParticleAlpha {#lua-scripting-ces-api-ui-uiparticleemittercomponent-setparticlealpha}

Sets, in the range \[0,1\], the alpha of the emitted particles\.

**Syntax**

```
void SetParticleAlpha(float particleAlpha)
```