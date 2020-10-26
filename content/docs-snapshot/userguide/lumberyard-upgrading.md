# Upgrading Lumberyard<a name="lumberyard-upgrading"></a>

If you have an existing version of Lumberyard installed on your computer, you have several options for upgrading: 
+ Upgrade Lumberyard with an existing version in source control
+ Upgrade Lumberyard without an existing version in source control
+ Upgrade Lumberyard without source control

We recommend using source control, which allows relationships to be created between the installed versions of Lumberyard and the changes you make to your projects, among other benefits like revision history\.

**Note**  
When choosing a source control solution, keep in mind that Lumberyard provides plugins and tools for working with Perforce\.

**Topics**
+ [Upgrading Lumberyard with an Existing Version in Source Control](#lumberyard-upgrading-version-source-control)
+ [Upgrading Lumberyard without an Existing Version in Source Control](#lumberyard-upgrading-version-no-source-control)
+ [Upgrading Lumberyard without Source Control](#lumberyard-upgrading-new-no-source-control)
+ [Upgrading Your Game Projects](#lumberyard-upgrading-game-projects)
+ [Files to Exclude When Upgrading Lumberyard](lumberyard-upgrading-excluded-files.md)

**To set up Lumberyard in source control**

1. Download and install Lumberyard\. For information, see [Downloading Lumberyard](setting-up-downloading-lumberyard.md)\.

1. Check into source control a pristine, unmodified version of Lumberyard\. For information about file types to ignore, see [Files to Exclude When Upgrading Lumberyard](lumberyard-upgrading-excluded-files.md)\. For information about the Lumberyard directory structure, see [Downloading Lumberyard](setting-up-downloading-lumberyard.md)\.

1. In source control, create a new branch off the pristine Lumberyard branch to use for development\.

1. Make changes to the new development branch only\.

## Upgrading Lumberyard with an Existing Version in Source Control<a name="lumberyard-upgrading-version-source-control"></a>

Before you begin upgrading, check into source control the previous pristine version of Lumberyard\.

**To upgrade Lumberyard with an existing version in source control**

1. In Windows Explorer, locate the directory where you installed the previous pristine version of Lumberyard\. Delete the contents of this directory to remove the files from source control\.

1. Download and install the new version of Lumberyard to the empty directory\. Ensure the directory structure is identical to the previous version\.

1. Using source control, reconcile the files in the directory with the files in the pristine Lumberyard branch\. For example, if you use Perforce, click **Actions**, **Reconcile Offline Work**\.

1. Build and test the reconciled version locally to ensure it works\.

1. Submit the reconciled version to the pristine Lumberyard branch as the new version of Lumberyard\.

1. Integrate the updated, pristine Lumberyard branch into your development branch\.

## Upgrading Lumberyard without an Existing Version in Source Control<a name="lumberyard-upgrading-version-no-source-control"></a>

Follow these steps to prepare your source control to upgrade Lumberyard\.

**To upgrade Lumberyard without an existing version in source control**

1. Check into source control the pristine version of Lumberyard that you used to create your game project\.

1. Create a new branch off the pristine Lumberyard branch to use for development\.

1. In Windows Explorer, locate the directory for the new development branch and delete the contents\.

1. Copy the files from your existing game project to the empty directory\.

1. Using source control, reconcile the files in the development branch directory with the files in source control\. Accept your changes\.

1. Follow the steps in [Upgrading Lumberyard with an Existing Version in Source Control](#lumberyard-upgrading-version-source-control)\.

## Upgrading Lumberyard without Source Control<a name="lumberyard-upgrading-new-no-source-control"></a>

You can upgrade Lumberyard without using source control; however, we do not recommend this method\.

**To upgrade Lumberyard without source control**

1. Download and install the latest version of Lumberyard to a location that will not overwrite any previous versions\. For information, see [Downloading Lumberyard](setting-up-downloading-lumberyard.md)\.

1. Use Lumberyard Setup Assistant to install the third\-party software and SDKs required to run Lumberyard\. For information, see [Running Lumberyard Setup Assistant](lumberyard-launcher-using.md)\.

1. Configure and compile the Samples Project to test your build environment\.

## Upgrading Your Game Projects<a name="lumberyard-upgrading-game-projects"></a>

Once you have upgraded Lumberyard, you can upgrade each of your game projects\.

**To upgrade your game project**

1. Copy your project's code \(located in the `lumberyard_version\dev\Code\project_name` directory\) and game folder \(located in the `lumberyard_version\dev\project_name` directory\) to the new Lumberyard directory\.

1. Create a `project.json` file for your project with the following: 

   ```
   {
       "project_name": "project_name",
       "product_name": "project_name",
       "executable_name": "project_nameLauncher",
       "code_folder": "Code/project_name",
       "modules" : ["project_name"]
   }
   ```

   Replace all instances of *project\_name* with your project's name\.

   For example, if your project was called MyProject, the `project.json` file would include the following: 

   ```
   {
       "project_name": "MyProject",
       "product_name": "MyProject",
       "executable_name": "MyProjectLauncher",
       "code_folder": "Code/MyProject",
       "modules" : ["MyProject"]
   }
   ```

1. Save the `project.json` file in the `lumberyard_version\dev\project_name` directory\.

1. Run the Project Configurator \(located in the `lumberyard_version\dev\Bin64` directory\) and set your game project as the default project\. When finished, close the Project Configurator\.

1. Edit the `wscript` file \(located in the `lumberyard_version\dev\Code\project_name\Game` directory\) to ensure the includes under `#Common` appear as follows:

   ```
   #==============================
   # Common
   #==============================
           includes    = [ '.' ,
                           bld.Path('Code/CryEngine/CryCommon'),
                           bld.Path('Code/CryEngine/CryAction')],
   ```

1. In a command line window, locate the new `dev` directory and enter the following build command for your version of Visual Studio: 

   ```
   lmbr_waf build_win_x64_vs2017_profile -p all
   ```