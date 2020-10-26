# Setting Up PyCharm for Debugging Waf<a name="az-code-gen-pycharm"></a>

****  
AZ Code Generator is in preview release and is subject to change\.

PyCharm is an integrated development environment for Python which includes a graphical debugger that is useful for debugging Waf\. 

**To set up PyCharm and Waf for debugging**

1. Download [PyCharm Community Edition](https://www.jetbrains.com/pycharm/download/)\. 

1. Start PyCharm\. 

1. At the welcome screen, choose **Open Directory**\.  

1. Navigate to the `lumberyard_version\dev` directory\. There should be a file called `wscript` and `waf_branch_spec.py` under this folder\. 

1. Configure the Python interpreter\.

   1. Choose **File**, **Settings**, **Project:dev**, **Project Interpreter** to open the project interpreter page\. 

   1. Click the gear ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared/cloud-canvas-cloud-gem-text-to-speech-cgp-4.png) icon on the right of the **Project Interpreter** and choose **Add\.\.\.**\.   
![\[Screenshot displaying the gear icon to select.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/codegen/az-code-gen-pycharm-1.png)

   1. Select the **Existing environment** radio button, and then click the ellipsis \(**\.\.\.**\) icon to the right of it\.  
![\[GUI display of the "Existing environment" radio button and the ellipsis button to the right of the "Interpreter" field.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/codegen/az-code-gen-select-interpreter.png)

   1. Navigate to the folder containing the `python` executable\. The executable will be contained under the path `lumberyard_version\dev\Tools\Python\3.7.5\platform`, with the exact path depending on your platform\. The Python executable file must be in the same folder as the project or you may have issues running Waf\.   
![\[Window displaying the full directory tree and location of python.exe on Windows.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/codegen/az-code-gen-pycharm-2.png)

1. Set up a debugging profile for Waf\. 

   1. To set up Waf for debugging, use the project explorer in the left pane\.  If you don't see the project explorer, press **Alt\+1**\)\.  Navigate to the `\dev\Tools\Build\waf-<version>` node and expand it\. You should see a file called `lmbr_waf` inside this node\.   
![\[The lmbr_waf file\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/codegen/az-code-gen-pycharm-3.png)

   1. Right\-click **lmbr\_waf** and choose **Create lmbr\_waf** 
**Note**  
The **Indexing\.\.\.** operation must finish before the option appears\. You can verify status in the bar at the bottom\.   
![\[Create lmbr_waf\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/codegen/az-code-gen-pycharm-4.png)

   1. In the **Create Run/Debug Configuration** dialog, ensure that the following values are configured correctly:
      + **Allow parallel run** should be unselected\. 
      + **Parameters** is the command to use to run Waf for the run/debug session\. 
      + **Python Interpreter** should be the interpreter that you specified earlier\. 
      + The **Working directory** must be the `dev` directory\.  
![\[Configure debugging\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/codegen/az-code-gen-pycharm-5.png)

1. Set up `wscript` files as debuggable Python files\. Waf uses files called `wscript` to define the build rules per project\.  These are dynamically loaded Python modules that can be debugged like any other Python module\.  

   1. Choose **File**, **Settings**, **Editor**, **File Types**\.

   1. Choose **Python** in **Recognized File Types**\. Select the **\+** icon to the right of the **Registered patterns** section to add a new file type\.   
![\[\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/codegen/az-code-gen-pycharm-6.png)

   1. Under **Registered Patterns**, click the green plus sign \(**\+**\)\. 

   1. In the **Add Wildcard** dialog box, enter **wscript**\.   
![\[Add wscript wildcard\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/codegen/az-code-gen-pycharm-7.png)

1. Turn off **IncrediBuild**\. 

   1. Open the `_WAF_/usersettings.options` file\.

   1. Verify that `use_incredibuild = False`

1. \(Optional\) Enable file outlining\. This feature makes it easier to navigate source files\.

   To enable file outlining, right\-click the **Project** tab and choose **Show Members**\. 