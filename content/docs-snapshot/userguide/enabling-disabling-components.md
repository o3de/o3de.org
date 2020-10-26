# Disabling and Enabling Components on Entities<a name="enabling-disabling-components"></a>

After you add components to entities, you can choose to disable and enable them as needed\. This can help you see how different components interact with the entity\. For example, if you create an entity and add the **Area Light**, **Environment Probe**, and **Point Light** components to it, you can see how the different light components interact with the entity\. 

You can disable the components that you don't want and reenable them later\. Disabled components are read only and don't activate, generate warnings, or export with game data\.

**To disable and enable components**

1. In the **Entity Outliner**, select the entity that you want\.

1. In the **Entity Inspector**, under **Add Component**, right\-click the component that is associated with the entity\.

1. Choose **Disable component** to disable the component\.  
![\[You can disable a component on an entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-context-menu-disabling.png)

   Disabled components are dimmed with stripes\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-disabled.png)

1. To reenable a disabled component, right\-click the component and choose **Enable component**\.  
![\[You can re-enable a disabled component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-enabled.png)