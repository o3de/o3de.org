# UIImageComponent<a name="lua-scripting-ces-api-ui-uiimagecomponent"></a>

Controls sprites, images, and textures\.

## UiImageBus<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus"></a>

Services messages for the `UiImageComponent`\.

### GetColor<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getcolor"></a>

Returns the color tint for the image\.

**Syntax**

```
AZ::Color GetColor()
```

### SetColor<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setcolor"></a>

Sets the color tint for the image\.

**Syntax**

```
void SetColor(const AZ::Color& color)
```

### GetSpritePathname<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritepathname"></a>

Returns the source location of the image to be displayed by the element\.

**Syntax**

```
AZStd::string GetSpritePathname()
```

### SetSpritePathname<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setspritepathname"></a>

Sets the source location of the image to be displayed by the element\.

**Syntax**

```
void SetSpritePathname(AZStd::string spritePath) 
```

### GetRenderTargetName<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getrendertargetname"></a>

Returns the name of the render target associated with the sprite\.

**Syntax**

```
AZStd::string GetRenderTargetName()
```

### SetRenderTargetName<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setrendertargetname"></a>

Sets the name of the render target associated with the sprite\.

**Syntax**

```
void SetRenderTargetName(AZStd::string renderTargetName)
```

### GetSpriteType<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritetype"></a>

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

### SetSpriteType<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setspritetype"></a>

Sets the type of the sprite\.

**Syntax**

```
void SetSpriteType(eUiSpriteType spriteType)
```

For possible sprite types, see [GetSpriteType](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritetype)\.

### GetImageType<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getimagetype"></a>

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

### SetImageType<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setimagetype"></a>

Sets the type of the image\. Affects how the texture or sprite is mapped to the image rectangle\.

**Syntax**

```
void SetImageType(eUiImageType imageType)
```

For possible values for `eUiImageType`, see [GetImageType](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getimagetype)\.

### GetFillType<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfilltype"></a>

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

### SetFillType<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setfilltype"></a>

Sets the **Fill Type** of the image\. **Fill Type** determines how the image component is filled\.

**Syntax**

```
void SetFillType(eUiFillType fillType)
```

For possible values for `eUiFillType`, see [GetFillType](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfilltype)\.

### GetFillAmount<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfillamount"></a>

Returns the **Fill Amount**\. The **Fill Amount** is a float between zero and one\. `1.00` indicates that the image is completely filled\. `0.00` means no part of the image is filled\.

**Syntax**

```
float GetFillAmount()
```

### SetFillAmount<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setfillamount"></a>

Sets the **Fill Amount**\.

**Syntax**

```
void SetFillAmount(float fillAmount)
```

### GetRadialFillStartAngle<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getradialfillstartangle"></a>

Returns the starting angle of the **Radial Fill** in degrees clockwise\. A value of `0` indicates the top center of the image\.

**Syntax**

```
float GetRadialFillStartAngle()
```

### SetRadialFillStartAngle<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setradialfillstartangle"></a>

Sets the starting angle of the **Radial Fill**\.

**Syntax**

```
void SetRadialFillStartAngle(float radialFillStartAngle)
```

### GetCornerFillOrigin<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getcornerfillorigin"></a>

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

### SetCornerFillOrigin<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setcornerfillorigin"></a>

Sets the **Corner Fill** origin of the image\. 

**Syntax**

```
void SetCornerFillOrigin(eUiFillCornerOrigin cornerFillOrigin)
```

For possible values for `eUiFillCornerOrigin`, see [GetCornerFillOrigin](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getcornerfillorigin)\.

### GetEdgeFillOrigin<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getedgefillorigin"></a>

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

### SetEdgeFillOrigin<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setedgefillorigin"></a>

Sets the **Edge Fill** origin of the image\.

**Syntax**

```
void SetEdgeFillOrigin(eUiFillEdgeOrigin edgeFillOrigin)
```

For possible values for `eUiFillEdgeOrigin`, see [GetEdgeFillOrigin](#lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getedgefillorigin)\.

### GetFillClockwise<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfillclockwise"></a>

Returns whether the image is radially filled clockwise\.

**Syntax**

```
bool GetFillClockwise() 
```

### SetFillClockwise<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setfillclockwise"></a>

Sets whether the image is radially filled clockwise\.

**Syntax**

```
void SetFillClockwise(bool fillClockwise) 
```

### GetFillCenter<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getfillcenter"></a>

Returns whether the center of a sliced image is filled\.

**Syntax**

```
bool GetFillCenter() 
```

### SetFillCenter<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setfillcenter"></a>

Sets whether the center of a sliced image is filled\.

**Syntax**

```
void SetFillCenter(bool fillCenter)
```

### SetSpriteSheetCellIndex<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setspritesheetcellindex"></a>

Sets the sprite sheet cell index for the image component to display\.

**Syntax**

```
void SetSpriteSheetCellIndex(AZ::u32 index)
```

### GetSpriteSheetCellIndex<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritesheetcellindex"></a>

Returns the sprite sheet cell index currently displayed by the image component\.

**Syntax**

```
AZ::u32 GetSpriteSheetCellIndex()
```

### GetSpriteSheetCellCount<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritesheetcellcount"></a>

Returns the number of cells in the sprite sheet\. 

If no image file is associated with this component, returns `0`\.

If an image file is associated but not configured as a sprite sheet, returns `1`\.

**Syntax**

```
AZ::u32 GetSpriteSheetCellCount()
```

### GetSpriteSheetCellAlias<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritesheetcellalias"></a>

Returns the string alias associated with the given sprite sheet cell index\.

Returns an empty string if an alias is not configured or is unavailable\.

**Syntax**

```
AZStd::string GetSpriteSheetCellAlias(AZ::u32 index)
```

### SetSpriteSheetCellAlias<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-setspritesheetcellalias"></a>

Given a cell index that is valid for the sprite sheet image associated with the image component, assign the alias string for that cell\.

**Syntax**

```
void SetSpriteSheetCellAlias(AZ::u32 index, AZStd::string alias)
```

### GetSpriteSheetCellIndexFromAlias<a name="lua-scripting-ces-api-ui-uiimagecomponent-uiimagebus-getspritesheetcellindexfromalias"></a>

Given a string alias that corresponds to an alias of a cell within the sprite sheet image of the component, return that cells index value\.

**Note**  
This returns only the first matching cell in the sprite sheet that matches the given string\. Other cells in the sprite sheet that have the same alias are not considered after the first match is found\.

**Syntax**

```
AZ::u32 GetSpriteSheetCellIndexFromAlias(AZStd::string alias)
```