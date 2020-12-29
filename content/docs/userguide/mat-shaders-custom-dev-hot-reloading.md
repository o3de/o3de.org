# Hot Reloading of Shaders<a name="mat-shaders-custom-dev-hot-reloading"></a>

Lumberyard supports hot reloading of shaders, so whenever you modify and save a shader file, it will get reloaded automatically and the results can be viewed directly in a test level\.

For hot reloading to work, shader files must be copied to the appropriate locations, and the following requirements must also be met:
+ Add the following code to the dev\\system\.cfg file:

  ```
   sys_PakPriority=0 <!--ensures the shader files get loaded from the file system instead of from pak files>
  r_ShadersEditing=1 <!--ensures that shader code can be recompiled at runtime-->
  ```
+ In the Console, enter `r_reloadshaders 1.` This is only required in the game executable\. In Lumberyard Editor, it will automatically reload a shader when you modify it\. 
+ For Lumberyard, copy the shader files to the `dev\Lumberyard\Shaders` directory\. 