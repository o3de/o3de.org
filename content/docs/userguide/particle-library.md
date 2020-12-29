# Managing Particle Libraries<a name="particle-library"></a>

Particle libraries are `.xml` assets that contain the data for all effects in the library\. The `.xml` files are located in the `\game_project_name\libs\particles` directory\.

Use the **Particle Editor** to add and manage particle libraries\. You can rename library assets by duplicating and renaming a library in the **Particle Editor**\. Do not rename the base `.xml` file; doing so can negatively affect the entities in your levels\.

**Multiple selection**  
Press **Ctrl** or **Shift** to select multiple emitters\. The emitters can be from different libraries\. You can do any of the following:  
**Copy** – Copies the selected item\. If you copy multiple items, they become children of the item that you paste them on\.  
**Delete** – Deletes all selected emitters\.  
**Group** – Groups the selected items that share the same parent\. Select the emitters that you want to group and press **Ctrl\+G**\. Alternatively, you can right\-click the selected emitters and choose **Group**\.  
If you use hot keys while multiple items are selected, the hot keys apply to all selected items\.

**Drag and drop**  
Add emitters from any of the libraries into a specific library\. To do this, drag and drop the emitters onto the library name\. You can also drag emitters from the library to a new parent in the same library\.

**Search**  
Type queries into the **Libraries** panel search box to instantly view results\. Click the arrow icon on the left to display previous search results\.

**Level library \(Deprecated\)**  
The level library is no longer updated\. You can import particle data stored in level files that were created in Lumberyard 1\.8 and earlier\. To do so, open a level and, in the **Particle Editor**, choose **File**, **Import Level Library**\. This imports the data to a project particle library in the `\game_project_name\libs\particles` directory\.  
We recommended that you update all entities that reference the level library emitters to use this newly created library\.

**Topics**
+ [Adding Particle Libraries](particle-creating-library.md)
+ [Importing Particle Libraries](particle-importing-library.md)
+ [Saving Particle Libraries](particle-saving-library.md)
+ [Using Particle Libraries](particle-using-library.md)