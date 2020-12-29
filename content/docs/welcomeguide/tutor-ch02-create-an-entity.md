# Tutorial Two: Create an entity with White Box<a name="tutor-ch02-create-an-entity"></a>

In this tutorial, you will create a simple environment prop using [White Box](https://docs.aws.amazon.com/lumberyard/latest/userguide/gem-white-box.html), a component tool that you can use to quickly sketch 3D models in Lumberyard\. You will also learn the basics of the component entity system, including creating entities and adding components\.

**Tip**  
If you like, you can follow this chapter in video \(4:43 minutes\) form:  

[![AWS Videos](http://img.youtube.com/vi/https://www.youtube.com/embed/em15_n28R-k?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/em15_n28R-k?rel=0)

Begin this tutorial either with the level you created in [Tutorial One: Create a level](tutor-ch01-create-a-level.md), or by opening `ch01_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in Lumberyard, choose **Open Level…​** from the **File** menu in the main menu bar, or press **Control \+ O**\.

1.  This tutorial is written for the default **Lumberyard Editor** layout, so make sure this is the layout that you’re using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.   
![\[Lumberyard select default layout\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-default-layout-1.25.png)

1.  Create an entity by right\-clicking in **Entity Outliner** on the left side of the editor and choose **Create entity** from the context menu\. Click on the newly created entity to select it\.   
![\[Lumberyard create entity\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-create-entity-1.25.png)

1.  With the entity selected, review the **Entity Inspector** on the right of the editor\. You can see the entity has a **Transform** component, a default **Name**, and a unique **Entity ID**\. All entities have a **Transform** component that defines the position, orientation, and scale of the entity in the level\. Also notice the transform *gizmo* \(the three\-axis object labeled X, Y, and Z\) in the **Perspective** view\. If you don’t see the gizmo, with the entity selected press **Z** to focus on it\. The gizmo is the representation of your new entity’s transform in the level\. 

   Change the name of the entity\. In **Entity Inspector**, click in the **Name** property and enter `feed_locker` as the name for the entity\.  
![\[Lumberyard entity name\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-entity-name-1.25.png)

1.  Entities are collections of components that define a *thing* for your project\. An entity can be a character, a prop for the environment, a visual effect, and more\. Components add functionality to an entity such as a renderable mesh, a PhysX collider, or a script that responds to user input \(for example\)\. In the following steps use the White Box component tool to quickly sketch out the prop\. This way, you can further develop your project before investing considerable time and resources in building the final asset\. 

   With the **feed\_locker** selected, in **Entity Inspector**, choose **Add Component**\. Begin typing `whi` in the search field, and select **White Box** from the filtered list\.  
![\[Lumberyard White Box Component\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-white-box-component-1.25.png)

1.  The entity now has a cube with a checkerboard texture, but it might be partly beneath the terrain\. 

   1.  To move the cube above the terrain, with the **feed\_locker** entity selected, press the **2** key\. You can also choose the **Move** icon in the top toolbar to enable the move tool\. 

   1.  Hover your mouse cursor above the Z axis of the transform gizmo in **Perspective** view \(the axis turns yellow\), hold the left mouse button, and drag up until the box is above the terrain\.   
![\[Lumberyard move tool\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/anim-move-entity-1.25.gif)
**Note**  
If **Snap to grid** is enabled, the feed locker entity will automatically snap to a position above the terrain\. To freely position the entity, press **G** or click the **Snap to grid** icon in the top menu bar to disable **Snap to grid**\.

1.  You’ll use a few modeling operations to modify the White Box cube into the rough shape of a feed locker\. To modify the White Box, you must be in White Box edit mode\. Choose **Edit** in the White Box component to enter edit mode\.   
![\[Lumberyard White Box component edit mode\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-white-box-edit-mode-1.26.png)
**Note**  
A complete list of White Box edit mode operations can be found in the [White Box component](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-white-box.html) documentation\.

1.  Hover over a side of the box\. Hold the **left mouse button** and drag to pull the side of the box, increasing its width\.   
![\[Lumberyard White Box edit - move face\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/anim-wb-move-face-1.25.gif)

1.  Hover over the top front edge of the box\. Hold the **left mouse button** and drag to pull the edge down a bit, creating a slope on the top of the box\.   
![\[Lumberyard White Box edit - move edge\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/anim-wb-move-edge-1.25.gif)

1.  Next you’ll perform a bit more complex of an operation to create the lid for the locker\. Start by clicking the top of the box to select the top face\. The face highlights blue and the vertices of the face are displayed\.   
![\[Lumberyard White Box select face\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-white-box-select-face-1.25.png)

1.  Perform an extrude scale operation\. Hold the **Control** key, hover over one of the vertices of the selected face, and hold the **left mouse button** as you drag the mouse outward from the box\. 

1.  Perform an extrude operation\. Hold the **Control** key, hover over the selected face, and hold the **left mouse button** as you drag the mouse upward from the box\.   
![\[Lumberyard White Box edit - extrude face\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/anim-wb-extrude-face-1.25.gif)

1.  Choose **Done** in the White Box component to exit White Box edit mode\. The completed feed\_locker White Box model should resemble the image below\.   
![\[Lumberyard White Box feed locker proxy complete\]](http://docs.aws.amazon.com/lumberyard/latest/welcomeguide/images/ui-feed-locker-complete-1.25.png)

1.  Save the level\. Press **Control \+ S** or select **Save** from the **File** menu\. 

For extra credit, try using the steps above to create an new entity, add a White Box component, and use some of the additional editing features of the [White Box component](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-white-box.html) to create a more complex environment asset\.

When you’re ready, try [Tutorial Three: Build a player character](tutor-ch03-build-a-player-character.md)\.