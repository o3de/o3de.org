# The AZ Bootstrapping Process<a name="az-module-bootstrap"></a>

An AZ framework application initializes modules based on the dynamic libraries listed in the [application descriptor file](az-module-system-entities-configuring.md#az-module-system-entities-configuring-app-descriptor-files), and the static libraries referenced from the `CreateStaticModules()` function\. 

 When an `AzFramework::Application` starts, the following order of events takes place: 

1.  The executable starts\. 

1.  The `AzFramework::Application` class is initialized\. It takes a path to an application descriptor file and a pointer to a function that will create the `AZ::Modules` from static libraries\. 

1.  The application bootstraps itself just enough to read the application descriptor file\. 

1.  The application descriptor file is read to get memory allocator settings and the list of dynamic libraries to load\. Lumberyard is not yet able to read the system entity from the file\. 

1.  Lumberyard shuts down the bootstrapped systems, configures them according to the settings it just loaded, and starts these systems back up\. 

1.  Each dynamic library is loaded\. 

1.  Each dynamic library’s `InitializeDynamicModule()` function is run, which attaches the DLL to the global `AZ::Environment`\. 

1.  Each static library’s `AZ::Module` instance is created using the function pointer passed in during step 2\. 

1.  Each dynamic library’s `AZ::Module` instance is created by its `CreateModuleClass()` function\. 

1.  Each AZ module's `RegisterComponentDescriptors()` function is called\. Now the application knows how to serialize any components defined within a library\. 

1.  The application descriptor file is read again to extract the system entity along with its components and their settings\. 

1.  Each AZ module's `GetRequiredSystemComponents()` function is called\. If any components are missing from the system entity, they are added\. 

1.  The system entity is activated, and all of its system components are activated in the proper order\. 

 At this point, initialization has been completed and the game is running\. 