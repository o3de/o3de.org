# Console Variable Tutorial<a name="system-cvar-tutorial"></a>

This tutorial shows you how to modify existing and create console variables \(CVARs\)\. CVARs can be used to control many configurable behaviors in Lumberyard\. You can also use them in your game\.

**Note**  
 This brief tutorial is intended for programmers\. Most of the content uses code\.

## Creating CVars<a name="system-cvar-tutorial-creating"></a>

**To create a console variable**

1. In your code editor, open the `Code\GameSDK\GameDll\GameCVars.h` file, which declares all game\-specific CVars\.

1. Locate the `SCVars` struct\. Inside the struct, declare a new variable, as in the following example\.

   ```
   struct SCVars
   { 
   	int g_tutorialVar; //add this line
    
   	//... pre-existing code ...
   };
   ```

   The variable you added will be used to store the current value of the variable\. If you need to store fractional numbers, you can also add a variable of the type `float`\.

   Next, you will register the CVar with the game engine so that its value can be changed by using the console\.

1. In the same `Code\GameSDK\GameDll\GameCVars.cpp` file, locate the `InitCVars` function\.

   ```
   void SCVars::InitCVars(IConsole *pConsole)
   {
   	m_releaseConstants.Init( pConsole );
    
   	REGISTER_CVAR(g_tutorialVar, 42, VF_NULL, "This CVar was added using the tutorial on CVars"); //add this line
    
       //... pre-existing code ...
   }
   ```

1. Specify a default value and help text for the variable\. You can initialize the variable with any value that is valid for the type with which the variable was declared in the header file\. The preceeding example specifies 42 as the default value and some help text that will be shown to users\.

1. When your game unloads, be sure to un\-register the variable\. In the `Code\GameSDK\GameDll\GameCVars.cpp` file, locate and use the `ReleaseCVars` function, as shown in the following example\.

   ```
   void SCVars::ReleaseCVars()
   {
   	IConsole* pConsole = gEnv->pConsole;
    
   	pConsole->UnregisterVariable("g_tutorialVar", true); //add this line
    
   	//... pre-existing code ...
   }
   ```

1. After you finish making changes, don't forget to compile your code\.

## Using the CVar<a name="system-cvar-tutorial-using"></a>

You can now change the value of the CVar that you created by using code, the console, and `.cfg` files\.

**From code**  
To access the value of the variable in your game code, use the `g_pGameCVars` pointer, as shown in the following example\.

```
int myTutorialVar = g_pGameCVars->g_tutorialVar;
```

**From the console**  
To change the value of the cvar from the console, use the syntax `cvar_name=cvar_value`\. The following example sets the value of the `g_tutorialVar` console variable to 1337\.

```
g_tutorialVar = 1337
```

**From \.cfg files**  
It's also possible to change the default CVar value from one of the `.cfg` files\. Whenever a CVar is assigned a value, its previous value is discarded\. Therefore, the last assignment is the one that is current\.

The following list shows the order of initialization for console variables\.

1. The value specified in the `GameCVars.cpp` file when `REGISTER_CVAR` is used\. \(A change here requires compiling\.\)

1. The value specified in the `system.cfg` file\.

1. The value specified in the user's `user.cfg` file\.

1. Any value assigned at game runtime\.

**Tip**  
To change the default value of an existing CVar without having to compile, add a line to `system.cfg` file to override the default\. 