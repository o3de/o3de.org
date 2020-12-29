# Applying Parallax Occlusion Mapping \(POM\)<a name="mat-maps-parallax-pom"></a>

To apply POM, complete the following procedure\.

**To apply Parallax Occlusion Mapping**

1. In Lumberyard Editor, click **Tools**, **Material Editor**\.

1. In the left tree, select the desired asset\.

1. In the right pane, under **Shader Generation Params**, select **Offset bump mapping** and **Parallax occlusion mapping**\. 

1. Under **Shader Params**, adjust the values of the following parameters\.

   1. **Height bias** – Moves the plane where the displacement is applied\. This reduces gaps in meshes, and prevents objects from displacing other objects that are placed above them\.

   1. **POM Displacement** – Sets the POM depth\. A larger value adds more depth\.

   1. **Self shadow strength** – Changes the strength of self\-shadowing\. A larger value imparts more shadowing

1. Under **Texture Maps**, enter the paths to the various textures\.