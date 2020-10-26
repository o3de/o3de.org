# Decal Projection Types<a name="mat-maps-decal-types"></a>

Decals have several different projection types\. To change projection type, select the decal and change the **ProjectionType** value\.

## Planar Projection<a name="mat-maps-decal-types-planar"></a>

Planar projection is the cheapest performance\-wise\. The decal is displayed in the same location as the center of the object\. Use planer projection only on flat surfaces, otherwise the decal may appear to be floating\.

## Deferred Projection<a name="mat-maps-decal-types-deferred"></a>

Deferred projection is a simple method to get decals to follow the contours of objects and is similar to Planar projection, but slower\. As such, use Planar projection wherever possible\.

Deferred projection is enabled by selecting the **Decal Params, Deferred** check box\.

## ProjectOnTerrain Projection<a name="mat-maps-decal-types-terrain"></a>

The decal is projected directly onto the terrain, ignoring any objects that might otherwise receive the projection\.

## ProjectOnStaticObjects Projection<a name="mat-maps-decal-types-objects"></a>

The decal is projected onto the geometry of an object along the opposite direction of the blue z\-axis\. This method is automatically done as a deferred pass\.

## ProjectOnTerrainAndStaticObjects Projection<a name="mat-maps-decal-types-terrain-objects"></a>

A combination of ProjectOnStaticObjects and ProjectOnTerrain, the decal is displayed on both the terrain and on objects\. This method is automatically performed as a deferred pass\.