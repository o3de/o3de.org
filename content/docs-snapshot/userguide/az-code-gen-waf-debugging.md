# Waf Debugging with AZ Code Generator<a name="az-code-gen-waf-debugging"></a>

****  
AZ Code Generator is in preview release and is subject to change\.

 You can debug the integration output of Waf's Python scripts by using PyCharm and a few key debugging entry points\. For more information about Waf integration itself, see [AZ Code Generator Integration with Waf ](az-code-gen-waf-integration.md)\. 

**Topics**
+ [Prerequisites ](#az-code-gen-waf-debugging-prerequisites)
+ [Identifying and Configuring Debug Output](#az-code-gen-waf-debugging-configuring-output)
+ [Setting Up PyCharm for Debugging Waf](az-code-gen-pycharm.md)

## Prerequisites <a name="az-code-gen-waf-debugging-prerequisites"></a>

 Before you start, follow the instructions for [Setting Up PyCharm for Debugging Waf ](az-code-gen-pycharm.md)\. The PyCharm debugger must be set up to debug `lmbr_waf` before you can continue\. 

## Identifying and Configuring Debug Output<a name="az-code-gen-waf-debugging-configuring-output"></a>

 All AZ Code Generator Waf integration output is prefixed with `az_code_gen`\. To see additional output from both task creation and task execution, add `--zones=az_code_gen` to the Waf command line\. This exposes the commands that invoke AZ Code Generator and are useful for debugging the AZ Code Generator utility itself\. For more information, see [Debugging the AZ Code Generator Utility](az-code-gen-utility-debugging.md)\. 

### Debugging Wscript Configuration<a name="az-code-gen-waf-debugging-wscript-configuration"></a>

 To debug most configuration problems, it is best to set a breakpoint in the `create_code_generator_tasks` method in `dev\Tools\Build\waf-<version>\lmbrwaflib\az_code_generator.py` \. This method is called for each `wscript` file that uses the `az_code_gen` feature\. It directly interprets the given passes and generates an `az_code_gen` task for each input file in each pass\.  

### Debugging `az_code_gen` Task Creation<a name="az-code-gen-waf-debugging-az-code-gen-task-creation"></a>

 The `create_az_code_generator_task` feature creates `az_code_gen` tasks\. It gathers most information and inserts it into the task\. Each task gets added to the `az_code_gen_group` Waf task to ensure it is executed prior to other tasks\. 

### Debugging az\_code\_gen Task Execution<a name="az-code-gen-waf-debugging-az-code-gen-task-execution"></a>

 The `run` and `handle_code_generator_output` commands are important points in task execution\.  

 The `run` command takes the available information and generates a Clang\-style arguments file prefixed with the `@` symbol\. The arguments file is passed on the command line to the AZ Code Generator utility\. 

 `handle_code_generator_output` \- The AZ Code Generator utility returns a JSON object with one or more entries that are parsed by `handle_code_generator_output`\. If the AZ Code Generator utility returns an invalid, non\-JSON response due to errors during execution, the Waf task returns the error message `No JSON-Object could be decoded`\. To discover the return value that could not be handled, run the command outside of Waf\. 