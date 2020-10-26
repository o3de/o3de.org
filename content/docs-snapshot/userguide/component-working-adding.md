# Adding Components to an Entity<a name="component-working-adding"></a>

After you create an entity, you can add components to it\. 

**To add a component to an entity**

1. In the **Entity Inspector**, click **Add Component** or right\-click and choose **Add Component**\.

1. Components are grouped by category, such as **Animation**, **Camera**, and **Gameplay**\. To find a specific component quickly, enter the name into the search bar at the top of the component list\. 
**Note**  
You can pause on the component name to see a description of that component\. 

1. Select the component\. 

1. Specify your settings for the component\.

1. If you add a component that requires another component to function, the **Entity Inspector** displays the following message\.  
![\[Some components require other components to work.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-working-adding.png)

   For example, the **Ragdoll** component also requires the **Skinned Mesh** component\. Click **Add Required Component** and select the required component\.
**Note**  
Components must have the required dependencies to appear in game mode\. The **Entity Inspector** displays a warning message for the following scenarios:  
Incompatibilities exist between components
A component is missing a required component
A component is a duplicate
You must resolve the issue before you can use the component for the entity\. Otherwise, the component is disabled\.