---
description: ' Use the UIImageComponent to control sprites, images, and textures in
  Amazon Lumberyard. '
title: UIImageComponent
---
# UIImageComponent {#lua-scripting-ces-api-ui-uiimagecomponent}

Controls sprites, images, and textures\.

## UiImageBus {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus}

Services messages for the `UiImageComponent`\.

### GetColor {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getcolor}

Returns the color tint for the image\.

**Syntax**

```
AZ::Color GetColor()
```

### SetColor {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setcolor}

Sets the color tint for the image\.

**Syntax**

```
void SetColor(const AZ::Color& color)
```

### GetSpritePathname {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritepathname}

Returns the source location of the image to be displayed by the element\.

**Syntax**

```
AZStd::string GetSpritePathname()
```

### SetSpritePathname {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setspritepathname}

Sets the source location of the image to be displayed by the element\.

**Syntax**

```
void SetSpritePathname(AZStd::string spritePath)
```

### GetRenderTargetName {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getrendertargetname}

Returns the name of the render target associated with the sprite\.

**Syntax**

```
AZStd::string GetRenderTargetName()
```

### SetRenderTargetName {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setrendertargetname}

Sets the name of the render target associated with the sprite\.

**Syntax**

```
void SetRenderTargetName(AZStd::string renderTargetName)
```

### GetSpriteType {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritetype}

Returns the type of the sprite\.

**Syntax**

```
eUiSpriteType GetSpriteType()
```

Possible sprite types are as follows\.

```
enum eUiSpriteType
    {
        eUiSpriteType_SpriteAsset,
        eUiSpriteType_RenderTarget
    };
```

### SetSpriteType {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setspritetype}

Sets the type of the sprite\.

**Syntax**

```
void SetSpriteType(eUiSpriteType spriteType)
```

For possible sprite types, see [GetSpriteType](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritetype)\.

### GetImageType {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getimagetype}

Returns the type of the image\. Affects how the texture or sprite is mapped to the image rectangle\.

**Syntax**

```
eUiImageType GetImageType()
```

Possible values for `eUiImageType` are as follows\.

```
enum eUiImageType
    {
        eUiImageType_Stretched,
        eUiImageType_Sliced,
        eUiImageType_Fixed,
        eUiImageType_Tiled,
        eUiImageType_StretchedToFit,
        eUiImageType_StretchedToFill
    };
```

### SetImageType {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setimagetype}

Sets the type of the image\. Affects how the texture or sprite is mapped to the image rectangle\.

**Syntax**

```
void SetImageType(eUiImageType imageType)
```

For possible values for `eUiImageType`, see [GetImageType](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getimagetype)\.

### GetFillType {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfilltype}

Returns the **Fill Type** of the image\. **Fill Type** determines how the image component is filled\.

**Syntax**

```
eUiFillType GetFillType()
```

Possible values for `eUiFillType` are as follows\.

```
enum eUiFillType
    {
        eUiFillType_None,
        eUiFillType_Linear,
        eUiFillType_Radial,
        eUiFillType_RadialCorner,
        eUiFillType_RadialEdge
    };
```

### SetFillType {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setfilltype}

Sets the **Fill Type** of the image\. **Fill Type** determines how the image component is filled\.

**Syntax**

```
void SetFillType(eUiFillType fillType)
```

For possible values for `eUiFillType`, see [GetFillType](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfilltype)\.

### GetFillAmount {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfillamount}

Returns the **Fill Amount**\. The **Fill Amount** is a float between zero and one\. `1.00` indicates that the image is completely filled\. `0.00` means no part of the image is filled\.

**Syntax**

```
float GetFillAmount()
```

### SetFillAmount {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setfillamount}

Sets the **Fill Amount**\.

**Syntax**

```
void SetFillAmount(float fillAmount)
```

### GetRadialFillStartAngle {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getradialfillstartangle}

Returns the starting angle of the **Radial Fill** in degrees clockwise\. A value of `0` indicates the top center of the image\.

**Syntax**

```
float GetRadialFillStartAngle()
```

### SetRadialFillStartAngle {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setradialfillstartangle}

Sets the starting angle of the **Radial Fill**\.

**Syntax**

```
void SetRadialFillStartAngle(float radialFillStartAngle)
```

### GetCornerFillOrigin {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getcornerfillorigin}

Returns the **Corner Fill** origin of the image\.

**Syntax**

```
eUiFillCornerOrigin GetCornerFillOrigin()
```

Possible values for `eUiFillCornerOrigin` are as follows\.

```
enum eUiFillCornerOrigin
    {
        eUiFillCornerOrigin_TopLeft,
        eUiFillCornerOrigin_TopRight,
        eUiFillCornerOrigin_BottomRight,
        eUiFillCornerOrigin_BottomLeft
    };
```

### SetCornerFillOrigin {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setcornerfillorigin}

Sets the **Corner Fill** origin of the image\.

**Syntax**

```
void SetCornerFillOrigin(eUiFillCornerOrigin cornerFillOrigin)
```

For possible values for `eUiFillCornerOrigin`, see [GetCornerFillOrigin](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getcornerfillorigin)\.

### GetEdgeFillOrigin {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getedgefillorigin}

Returns the **Edge Fill** origin of the image\.

**Syntax**

```
eUiFillEdgeOrigin GetEdgeFillOrigin()
```

Possible values for `eUiFillEdgeOrigin` are as follows\.

```
enum eUiFillEdgeOrigin
    {
        eUiFillEdgeOrigin_Left,
        eUiFillEdgeOrigin_Top,
        eUiFillEdgeOrigin_Right,
        eUiFillEdgeOrigin_Bottom
    };
```

### SetEdgeFillOrigin {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setedgefillorigin}

Sets the **Edge Fill** origin of the image\.

**Syntax**

```
void SetEdgeFillOrigin(eUiFillEdgeOrigin edgeFillOrigin)
```

For possible values for `eUiFillEdgeOrigin`, see [GetEdgeFillOrigin](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getedgefillorigin)\.

### GetFillClockwise {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfillclockwise}

Returns whether the image is radially filled clockwise\.

**Syntax**

```
bool GetFillClockwise()
```

### SetFillClockwise {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setfillclockwise}

Sets whether the image is radially filled clockwise\.

**Syntax**

```
void SetFillClockwise(bool fillClockwise)
```

### GetFillCenter {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfillcenter}

Returns whether the center of a sliced image is filled\.

**Syntax**

```
bool GetFillCenter()
```

### SetFillCenter {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setfillcenter}

Sets whether the center of a sliced image is filled\.

**Syntax**

```
void SetFillCenter(bool fillCenter)
```

### SetSpriteSheetCellIndex {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setspritesheetcellindex}

Sets the sprite sheet cell index for the image component to display\.

**Syntax**

```
void SetSpriteSheetCellIndex(AZ::u32 index)
```

### GetSpriteSheetCellIndex {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritesheetcellindex}

Returns the sprite sheet cell index currently displayed by the image component\.

**Syntax**

```
AZ::u32 GetSpriteSheetCellIndex()
```

### GetSpriteSheetCellCount {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritesheetcellcount}

Returns the number of cells in the sprite sheet\.

If no image file is associated with this component, returns `0`\.

If an image file is associated but not configured as a sprite sheet, returns `1`\.

**Syntax**

```
AZ::u32 GetSpriteSheetCellCount()
```

### GetSpriteSheetCellAlias {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritesheetcellalias}

Returns the string alias associated with the given sprite sheet cell index\.

Returns an empty string if an alias is not configured or is unavailable\.

**Syntax**

```
AZStd::string GetSpriteSheetCellAlias(AZ::u32 index)
```

### SetSpriteSheetCellAlias {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setspritesheetcellalias}

Given a cell index that is valid for the sprite sheet image associated with the image component, assign the alias string for that cell\.

**Syntax**

```
void SetSpriteSheetCellAlias(AZ::u32 index, AZStd::string alias)
```

### GetSpriteSheetCellIndexFromAlias {#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritesheetcellindexfromalias}

Given a string alias that corresponds to an alias of a cell within the sprite sheet image of the component, return that cells index value\.

**Note**
This returns only the first matching cell in the sprite sheet that matches the given string\. Other cells in the sprite sheet that have the same alias are not considered after the first match is found\.

**Syntax**

```
AZ::u32 GetSpriteSheetCellIndexFromAlias(AZStd::string alias)
```