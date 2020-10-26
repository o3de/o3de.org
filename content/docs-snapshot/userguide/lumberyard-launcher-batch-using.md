# Using Lumberyard Setup Assistant Batch<a name="lumberyard-launcher-batch-using"></a>

The command line version of Lumberyard Setup Assistant is useful for server and build administrators who want to create a batch file to run the same configuration on multiple machines\.

You can find the executable file `SetupAssistantBatch.exe` in the `lumberyard version\dev\Tools\LmbrSetup\Win` directory\. This executable uses the `SetupAssistantConfig.json` file to complete its tasks\. 

You can also use the batch file to create, enable, and disable capabilities, and to modify your projects and gems\. For more information, see [Lmbr\.exe](lmbr-exe.md)\.

**To use Lumberyard Setup Assistant Batch**

1. Open a command line window\.

1. Navigate to the `Win` directory for your Lumberyard installation\.

   ```
   cd lumberyard_version\dev\Tools\LmbrSetup\Win
   ```

1. Run the `SetupAssistantBatch.exe` and modify the commands as needed\. See the following list of commands\.

## Commands<a name="lumberyard-launcher-batch-commands"></a>


****  

| Command | Description | 
| --- | --- | 
| \-\-help | Lists all commands and descriptions\. | 
| \-\-3rdpartypath | Sets the third\-party directory to the specified parameter\. The default is the lumberyard\_version\\3rdParty directory\. If you change the third\-party directory, ensure that you also move the 3rdParty\.txt file\. | 
| \-\-sdkpath | Sets the location of the Lumberyard SDK to the specified parameter\. This command expects a root where `Lumberyardroot.txt` is located\.  | 
| \-\-disablecapability | Disables the specified capabilities \.[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/lumberyard-launcher-batch-using.html) | 
| \-\-enablecapability | Enables the specified capabilities:[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/lumberyard-launcher-batch-using.html) | 
| \-\-all | Enables all capabilities\. | 
| \-\-none | Disables all capabilities\. | 
| \-\-no\-modify\-environment | Prevents Lumberyard Setup Assistant from changing your environment variables\. | 

## Example Commands<a name="lumberyard-launcher-batch-examples"></a>

The following example sets the paths, clears all selected capabilities, and then enables the capability `rungame`\.

```
setupassistantbatch.exe --3rdpartypath "d:\lumberyard_version\3rdParty" --sdkpath "d:\lumberyard_version\dev" --none --enablecapability rungame
```

**Note**  
To examine the values for each capability, see the `SetupAssistantConfig.json` file in the `lumberyard_version\dev` directory\.

If the command runs correctly, this program returns the exit code `0`\.

The following example disables all capabilities and enables only the compilation tasks\. This command is commonly used for hosting a build server:

```
setupassistantbatch.exe --none --enablecapability compilegame --enablecapability compileLumberyard --enablecapability compilesandbox
```