# Exporting Static Meshes<a name="char-fbx-importer-export-static-meshes-best-practices"></a>

Use the following best practices when you export your static meshes with the **FBX Settings** tool:
+ Ensure that each object that needs a runtime collision has a physics mesh\. Low\-resolution physics meshes work better than high\-resolution meshes\. Primitives such as a cube, sphere, or capsule are best for optimal physics performance\.
+ The maximum number of vertices for any static geometry is 65,536\. You can export a scene where the total number of vertices exceeds 65,536, but each static geometry piece can't exceed 65,536\. 

  If the combined mesh has more than 65,536 vertices, make the following changes in the **FBX Settings** tool\.

**To use a combined mesh that has more than 65,536 vertices**

  1. In Lumberyard Editor, in the **Asset Browser**, right\-click the `.fbx` file and choose **Edit Settings**\.

  1. In the **FBX Settings** tool, on the **Meshes** tab, click **Add Modifier** and then choose **Mesh \(Advanced\)**\.

  1. Clear the **Merge Meshes** setting\. This prevents Asset Processor from merging the meshes, which allows Asset Processor to process the geometry\. 