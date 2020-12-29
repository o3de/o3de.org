# Step 6: Building Component Mode<a name="building-component-mode"></a>

In the following procedure, you must build the editor so that you can view your changes in Lumberyard Editor\.

**To build Component Mode**

1. Navigate to the `lumberyard_version\dev\Gems\LmbrCentral\Code` directory\.

1. In a text editor, open the `lmbrcentral_editor.waf_files.waf` file\.

1. Navigate to the `"Source/Rendering":` section and add the files that you created for a Component Mode\.  
**Example**  

   ```
   "Source/Rendering/EditorPointLightComponent.h",
   "Source/Rendering/EditorPointLightComponent.cpp",
   "Source/Rendering/EditorPointLightComponentMode.h",
   "Source/Rendering/EditorPointLightComponentMode.cpp",
   ```

1. Save the file\.

1. Navigate to the `lumberyard_version/dev` directory\.

1. In a command\-line window, enter the following commands to build the editor\.

   ```
   lmbr_waf configure
   ```

   ```
   lmbr_waf build_win_x64_vs2017_profile -p all
   ```

1. After your build succeeds, open Lumberyard Editor and choose or create a level\.

1. In the viewport, create an entity, attach the **Point Light** component, and do one of the following:
   + Double\-click the entity
   + In the **Entity Inspector**, choose **Edit**  
![\[Component Mode appears in the Entity Inspector in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/componentmode/programmers-guide-component-mode-2.png)

1. Make changes to your component in the viewport\. You can select the manipulator on the **Point Light** component to adjust the radius of the light area\.

1. When you've finished, choose **Done**\.