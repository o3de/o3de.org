# Creating Physics Proxies for Static Meshes<a name="char-fbx-export-static-meshes-best-practices-physics"></a>

A physics proxy is a mesh that encapsulates physics geometry, such as hit detection and the ability to collide\. Physics proxies typically use primitive meshes or meshes with a low polygon count for better performance\. Primitive meshes such as cubes, spheres, or capsules work best to ensure optimal physics performance\.

You can create a physics proxy for your static mesh \(`.cgf` file\) with one of the following methods\.

**Note**  
These methods work with the legacy CryPhysics feature\. To create physics proxies for the new PhysX system, see [Export PhysX collider mesh assets](physx-export-physx-mesh-asset.md)\.

## Manually Creating Physics Proxies with the FBX Settings<a name="manually-creating-physics-meshes-with-the-fbx-settings"></a>

**To create a physics proxy modifier with the **FBX Settings** tool**

1. In the **Asset Browser**, right\-click the `.fbx` file to create a physics proxy for and then choose **Edit Settings**\.

1. In the **FBX Settings** tool, on the **Meshes** tab, click **Add Modifier** and then choose **CryPhysics Proxy**\.  
![\[FBX Settings for CryPhysics Proxy.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/char-fbx-export-static-meshes.png)

1. Next to **Physics meshes**, click the ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/hierarchy-icon.png) icon, select the meshes to use for the physics proxies and then click **Select**\.

1. For this procedure, the recommended best practice is to prevent the selected physics mesh from also rendering as a static mesh\. To do this, do the following:

   1. For **Select meshes**, click the ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/hierarchy-icon.png) icon\.

   1. Clear the mesh that you used for the physics proxy and click **Select**\. This prevents the mesh that you selected for the physics proxy from also rendering as a static mesh\.

1. Click **Update**\.

1. When the **File progress** completes, click **OK**\.

After you have assigned a physics proxy mesh to your static mesh, the static mesh is ready to display physics and collision behavior\.

## Automatically Creating Physics Proxies<a name="char-fbx-export-static-meshes-best-practices-physics-soft-naming"></a>

Instead of manually creating a physics proxy, you can use [soft naming conventions](char-fbx-importer-soft-naming.md)\. 

**To create physics proxies automatically**

1. Add the `_phys` as a suffix to the static mesh `.fbx` file name\. For example, rename `filename.fbx` to `filename_phys.fbx`\. 

   When you add the `_phys` suffix to the file name, Asset Processor automatically adds a new **CryPhysics Proxy** modifier\.

1. In the **Asset Browser**, right\-click the `filename_phys.fbx` file and then choose **Edit Settings**\.

1. In the **FBX Settings** tool, on the **Meshes** tab, you can view this physics proxy modifier\. 

Asset Processor also automatically deselects the mesh that is used as the physics proxy for the **Select meshes** parameter\. This prevents the physics mesh from rendering as a static mesh\.

**Note**  
Only one physics proxy modifier is automatically created for each node that has a `_phys` suffix\.