---
description: ' Use the White Box component to quickly sketch geometry for entities
  and levels in Open 3D Engine. '
title: 'White Box component'
---




The **White Box** component is a tool you can use to sketch 3D proxy meshes in O3DE Editor. Add the **White Box** component to an entity, select a primitive shape to use as a basis for your proxy mesh, then enter edit mode to access the tools to quickly rough out a mesh for your entity.

![White Box component interface.](/images/user-guide/component/whitebox/white-box-A.gif)

Because **White Box** is implemented as a component, you can create well-defined entities that accurately represent the size, shape, and function of the final production entity in O3DE Editor before investing the time and effort into building finished models for your entity. Meshes created with **White Box** can be saved to disk as white box mesh assets \(`.wbm`\) and reused in other **White Box** components. White box meshes can also be exported to `.obj` files and used as a template in a third-party 3D modeling application to build final production assets.

**Topics**
+ [White Box properties](#component-white-box-properties)
+ [White Box edit mode](#component-white-box-edit-mode)

## White Box properties 

![White Box component interface.](/images/user-guide/component/whitebox/ui-white-box.png)

****Default Shape****
The default primitive shape of the white box mesh. From the list you can select a primitive shape, or choose to load a saved white box mesh \(`.wbm`\) asset. The default primitive size is one meter in world space.

**White Box default shapes:**
+ **Cube**
+ **Tetrahedron**
+ **Icosahedron**
+ **Cylinder**
+ **Sphere**
+ **Custom Mesh Asset**
When **Custom Mesh Asset** is selected, a **Mesh Asset** file field appears in the component interface below **Default Shape** that you can use to select a saved white box mesh \(`.wbm`\) asset.

****Save as asset****
Save the proxy mesh to a white box mesh \(`.wbm`\) asset. You can load the saved \(`.wbm`\) asset in other **White Box** components. The `.wbm` file functions like an instance, and any changes made to the mesh propagate to all **White Box** components that use the `.wbm` file.

![White Box .wbm mesh instancing animation.](/images/user-guide/component/whitebox/white-box-mesh-instancing.gif)

****Tint****
Set a tint color for the white box mesh. Choose the swatch to open a color picker, or enter comma separated red, blue, and green 8-bit values into the field to set a tint color for the **White Box** component.

****Use Texture****
Enable **Use Texture **to display a checkerboard texture on the white box mesh. Each square is a half meter in size, and the texture is projected on the local X, Y, and Z axes of the mesh. This maintains an easy reference for the size of the proxy mesh, regardless of how the entity is oriented in the level.

****Visible****
Enable **Visible** to make the white box mesh visible at runtime. When you use White Box to create custom invisible collision meshes, disable the **Visible** property to hide the mesh at runtime.

****Edit****
Choose this button to enter edit mode and modify the white box mesh. For information on editing the white box mesh, see [White Box edit mode](#component-white-box-edit-mode). Choose this same button (labeled **Done**) to exit edit mode.

****Export****
Export the mesh to a `.obj` file. The `.obj` file can be loaded into a 3D modeling application and used as a template for creating the production mesh asset for the entity.

## White Box edit mode 

In edit mode, you can quickly sketch meshes for your entities in O3DE Editor by selecting and dragging the face, edge, and vertex components of the white box mesh. To begin, add a **White Box** component to an entity, choose a default primitive shape in the **White Box** component interface, and choose **Edit** to enter edit mode.

### Move 

****Move polygon****

1. Hover over a polygon.

1. Hold the left mouse button.

1. Drag the polygon along its normal.

![White Box move face animation.](/images/user-guide/component/whitebox/white-box-move-face.gif)

**Move edge**

1. Hover over an edge.

1. Hold the left mouse button.

1. Drag the edge.

![White Box move edge animation.](/images/user-guide/component/whitebox/white-box-move-edge.gif)

**Move vertex**

1. Hover over a vertex. The vertex will highlight.

1. Hold the left mouse button.

1. Drag the vertex along the edge guides.

![White Box move vertex animation.](/images/user-guide/component/whitebox/white-box-move-vertex.gif)

### Scale 

****Scale polygon****

1. Select (left click) a polygon.

1. Hover over one of the polygon's vertices.

1. Hold the left mouse button.

1. Drag the vertex toward or away from the center of the selected polygon.

![White Box scale face animation.](/images/user-guide/component/whitebox/white-box-scale-face.gif)

****Scale edge****

1. Select (left click) an edge.

1. Hover over one of the edge's vertices.

1. Hold the left mouse button.

1. Drag the vertex along the length of the selected edge.

![White Box scale edge animation.](/images/user-guide/component/whitebox/white-box-scale-edge.gif)

****Non-uniform scale edge****

1. Select (left click) an edge.

1. Hover over one of the edge's vertices.

1. Hold **Alt** and drag the vertex along the length of the selected edge.

![White Box scale edge animation.](/images/user-guide/component/whitebox/white-box-non-uniform-scale-edge.gif)

### Extrude 

****Extrude polygon****

1. Hover over a polygon.

1. Hold **Ctrl** and left mouse button.

1. Drag the polygon along its normal.

![White Box extrude face animation.](/images/user-guide/component/whitebox/white-box-extrude-face.gif)

****Extrude edge****

1. Hover over an edge.

1. Hold **Ctrl** and left mouse button.

1. Drag the edge.

![White Box extrude edge animation.](/images/user-guide/component/whitebox/white-box-extrude-edge.gif)

****Extrude scale****

1. Select (left click) a polygon.

1. Hover over one of the polygon's vertices.

1. Hold **Ctrl** and left mouse button.

1. Drag the vertex toward or away from the center of the selected polygon to scale.

1. Hover over the selected polygon.

1. Hold the left mouse button.

1. Drag the polygon along its normal.

![White Box extrude scale animation.](/images/user-guide/component/whitebox/white-box-extrude-scale.gif)

### Flip edge 

****Flip edge****

1. Hold **Ctrl + Shift** to show hidden edges.

1. Right click on a hidden edge to flip its orientation.

![White Box flip edge animation.](/images/user-guide/component/whitebox/white-box-flip-edge.gif)

### Hide/Show edge 

****Hide an edge****

1. Select (left click) an edge.

1. Press **H**.

![White Box hide edge animation.](/images/user-guide/component/whitebox/white-box-hide-edge.gif)

****Show edge****

1. Hold **Ctrl** and **Shift** to show edges.

1. Select (left click) an edge to unhide it.

![White Box extrude edge animation.](/images/user-guide/component/whitebox/white-box-show-edge.gif)

### Hide/Show vertex 

****Hide a vertex****

1. Select (left click) a vertex.

1. Press **H**.

![White Box hide edge animation.](/images/user-guide/component/whitebox/white-box-hide-vertex.gif)

****Show vertex****

1. Hold **Ctrl** and **Shift** to show hidden vertices.

1. Select (left click) a vertex to unhide it.
