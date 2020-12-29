# Debugging Decal Mapping Issues<a name="material-maps-decal-debug"></a>

See the following ways you can debug decals\.

## Debugging Deferred Decals<a name="material-maps-decal-debug-deferred"></a>

The cost of a deferred decal depends on how many objects the decal projects, how expensive the geometry is, and how many overdraws the decal creates\.

You can use the console variable \(CVAR\) `r_deferredDecalsDebug` to show how expensive it is to render a deferred decal\. Specify a value of `1`\. For more information, see [Using the Console Window](console-intro.md)\.

Deferred decals in the Lumberyard Editor viewport render in red, green and blue\. The colors show you the expense for rendering a deferred decal\.
+ Red = expensive
+ Green = medium
+ Blue = cheap

We recommend that you place deferred decals so that they display mostly in blue\.

## Debugging Decal Flicker<a name="material-maps-decal-debug-flicker"></a>

If a placed decal is flickering, follow these guidelines to ensure that the decal is correctly set up\.
+ In the **Material Editor**, for the **Shader Generation Params** pane, verify that the **Decal** parameter is selected for all submaterials\.
+ Check for overlapping layers that have the **Decal** parameter selected\. Use the **Sort Priority** parameter to specify which decal appears on top of the other\. Decals with higher **Sort Priority** values sort on top of decals with lower values\. For more information, see the [Decal Component Properties](component-decal.md#component-decal-properties)\.
+ Other than for decals, the mesh shouldn't have overlapping triangles\. Do not offset along the surface normal; this can still break in some situations and introduce floating parallax effects\.