---
description: ' See the following decal projection types in &ALYlong;. '
title: Decal Projection Types
---
# Decal Projection Types {#mat-maps-decal-types}

Decals have several different projection types\. To change projection type, select the decal and change the **ProjectionType** value\.

## Planar Projection {#mat-maps-decal-types-planar}

Planar projection is the cheapest performance\-wise\. The decal is displayed in the same location as the center of the object\. Use planer projection only on flat surfaces, otherwise the decal may appear to be floating\.

## Deferred Projection {#mat-maps-decal-types-deferred}

Deferred projection is a simple method to get decals to follow the contours of objects and is similar to Planar projection, but slower\. As such, use Planar projection wherever possible\.

Deferred projection is enabled by selecting the **Decal Params, Deferred** check box\.

## ProjectOnTerrain Projection {#mat-maps-decal-types-terrain}

The decal is projected directly onto the terrain, ignoring any objects that might otherwise receive the projection\.

## ProjectOnStaticObjects Projection {#mat-maps-decal-types-objects}

The decal is projected onto the geometry of an object along the opposite direction of the blue z\-axis\. This method is automatically done as a deferred pass\.

## ProjectOnTerrainAndStaticObjects Projection {#mat-maps-decal-types-terrain-objects}

A combination of ProjectOnStaticObjects and ProjectOnTerrain, the decal is displayed on both the terrain and on objects\. This method is automatically performed as a deferred pass\.