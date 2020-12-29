# Creating Skinned Meshes for Actors<a name="char-fbx-importer-create-skinned-meshes-best-practices"></a>

Use the following best practices when you create your character for the **Animation Editor**\. In Lumberyard, a character is a skinned mesh\.

## Setting up the World Coordinate System and Root Joint<a name="char-fbx-importer-skinned-meshes-best-practices-setting-up-root-joint"></a>

If you use the y\-up or z\-up world coordinate system in your DCC, use the following guidelines to set up your character:
+ Use a root joint for your skinned mesh\. This is required to ensure that motion extraction works properly in the **Animation Editor**\.
+ Do not use transforms, groups, or parent nodes in the hierarchy above your root joint\. The root joint must be the top parent of the skeletal hierarchy to ensure that motion extraction works properly\.
+ Set the root joint position at the origin: 0,0,0\.
+ Set the root joint rotation and orientation to 0,0,0\.
+ Orient your character so that the front orthographic camera view shows the front of your character\.
+ When using the Lumberyard **Animation Editor**, ensure that your imported character faces the positive y direction\. The Asset Processor automatically adds a **Coordinate system change** modifier in the `.fbx` settings\. The default value for **Facing Direction** is **Rotate 180 degrees around the up axis**\. This enables the game entity's forward direction and character to point in the same direction\.
+ If your character faces the negative y direction after you import the character into the **Animation Editor**, in the **Asset Browser** right\-click your `.fbx` file and choose **Edit Settings**\. For the **Coordinate system change** modifier, set **Facing Direction** to **Do Nothing**\.
+ Use the same **Coordinate system change** modifier for the actor and each of the actor's motions\. This is required to ensure that animations work properly in the **Animation Editor**\.

## Setting up Skin Binding<a name="char-fbx-importer-skinned-meshes-best-practices-skin-binding"></a>

Observe the following best practices when you set up skin binding:
+ Delete the geometry history on your mesh before skinning the geometry to joints\.
+ When skinning your mesh, limit your maximum influences per vertex to four\. Lumberyard currently supports only four weight influences per vertex using the `.fbx` pipeline\.
+ Skin bind your mesh at the origin and in the same forward direction as the root joint\.
+ Check the bind pose before exporting your skinned mesh\. For example, if the mesh moves after unbinding, you must reskin the mesh in order to prevent any errors in Lumberyard\. 
+ Ensure that your skinned mesh has one bind pose in your DCC before you export to an `.fbx` file\.
+ Do not include any static meshes with your skinned meshes\. Lumberyard cannot render unskinned meshes that are parented to bones\.

Do the following to reskin your mesh:

**To reskin your mesh in Maya**

1. For **Menu Set**, choose **Rigging**\.

1. Click **Skin**, **Unbind Skin**\.

1. In the **Detach Skin Options** dialog box, for **History**, choose **Delete history**\. Click **Detach** and then click **Close**\.

1. Move or rotate your mesh to the appropriate position\.

1. Click **Modify**, **Freeze Transformations**\.

1. In the **Freeze Transformations Options** dialog box, select the **Translate**, **Rotate**, and **Scale** check boxes\. Click **Freeze Transform** and then click **Close**\.

1. Select your mesh\.

1. Choose **Edit**, **Delete by Type**, **History**\.

1. In the outliner, select the bones that you want skinned\. Hold **Ctrl** and select the mesh that you want skinned\.

1. Click **Skin**, **Bind Skin**\.

1. In the **Bind Skin Options** dialog box, for **Bind to** choose **Selected joints**\. For **Bind method**, choose your preferred bind method\. For the **Skinning method**, choose **Dual quaternion** or **Linear**\. Click **Bind Skin** and then click **Close**\.
**Note**  
You must export and save your deformer weights in order to import the weight maps after reskinning\.

**To reskin your mesh in 3ds Max**

1. Select your mesh\.

1. On the **Modify** tab, expand **Advanced Parameters**\. Click **Save**\.

1. Save the mesh envelope \(skin\)\.

1. On the **Modify** tab, select the skin\. Right\-click the skin and choose **Delete**\.

1. On the **Utilities** tab, click **Reset XForm**\.

1. Click **Reset Selected**\.

1. Click **Collapse**\.

1. Click **Collapse Selected**\.

1. On the **Modify** tab, right\-click **Editable Mesh**, and choose **Editable Poly**\.

1. For **Modifier List**, choose **Skin**\.

1. Under **Advanced Parameters**, click **Load** and choose the mesh envelope \(skin\) that you saved earlier\.
**Note**  
You must save your weights in order to load the weights after adding a new skin modifier\.

1. In the **Load Envelopes** dialog box, click **Match by Name** to preserve the weights that you saved earlier\. Close the dialog box\.

If you want to add a root joint to a skinned mesh, follow the preceding steps to unbind and reskin your mesh\.