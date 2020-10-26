# Using Custom Normals for DCC Assets<a name="fbx-importer-use-custom-normals"></a>

You can specify Lumberyard to use custom normals from [DCC](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#dcc) data when importing a mesh asset\. When using custom normals, Asset Processor uses the MikkT technique for tangent calculation\. You can specify this setting so that your mesh assets appear as you authored them in your DCC\. If you disable this setting, Asset Processor averages them instead\. You can specify to use custom normals for the project level or for a specific `.fbx` file\.

**Note**  
The first time you start Lumberyard Editor, Asset Processor recompiles all assets for the current project\. All meshes have the default setting to use custom normals\.

You can configure your game project so that by default, all mesh assets use the custom normals setting\. 

**To use custom normals at the project level**

1. Start the Project Configurator\.

1. Select your game project and choose **Advanced Settings**\.

1. In the System Entity Editor, for **Configuration**, select **Editor**\.

1. In **Scene Processing Config**, for **Use Custom Normals**, select the check box\.  
![\[Use Custom Normals when importing assets from a DCC.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/system-entity-editor-using-custom-normals-for-mesh-assets.png)
**Note**  
When you update the **Use Custom Normals** setting, your cache isn't recompiled\. New assets that you import have this setting by default\. If you want to recompile your cache, delete the cache manually, and Asset Processor automatically processes your assets\. You can find the cache in the `lumberyard_version\dev\Cache` directory\. 
Updates to this setting are saved to the `editor.xml` file\.

You can configure specific `.fbx` files so that the mesh assets use custom normals\.

**To use custom normals for a specific mesh**

1. In Lumberyard Editor, choose **Tools**, **Asset Browser**\.

1. In the **Asset Browser**, right\-click an `.fbx` file and choose **Edit Settings**\.

1. In the **FBX Settings** tool, for the **Meshes** tab, choose **Add Modifier** and then choose **Mesh \(Advanced\)** if the modifier doesn't already exist\.

1. Select the **Use Custom Normals** check box and click **Update**\.  
![\[Use Custom Normals when importing assets from a DCC.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/fbx-settings-using-custom-normals-for-mesh-assets.png)

   For more information, see [Editing the FBX Settings](char-fbx-importer-edit-import-settings.md)\.