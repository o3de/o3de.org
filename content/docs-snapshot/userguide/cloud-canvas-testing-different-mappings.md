# Testing Different Mappings<a name="cloud-canvas-testing-different-mappings"></a>

To test your client with different Cloud Canvas resource deployments, you can export mappings by using Cloud Canvas Resource Manager or the `lmbr_aws` command line\. 

**Note**  
As of Lumberyard 1\.11, separate mappings are exported for the player game client and game server to differentiate the resources that are visible to each\. 

**To export mappings from Cloud Canvas Resource Manager**
+ In Resource Manager, do one of the following: 
  + Left click a deployment and click **Export Mapping** in the main window\.
  + Right click the name of a deployment name the list, and then select **Export Mapping** from the context menu\.

  The following image shows both options\.  
![\[Export Mapping\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-rm-export-mapping.png)

**To export a mapping from the command line**
+ Enter the following command, where *<name>* is the name of your deployment\.

  ```
  lmbr_aws mappings update --deployment <name>
  ```

 The mapping files for the specified deployment are created in the `\dev\<project_name\Config` directory and have the format `<deployment_name>.player.awsLogicalMappings.json` and `<deployment_name>.server.awsLogicalMappings.json`\.

**Tip**  
Using the command line to export mappings makes it easy for you to create scripts for testing or development\.

## Selecting a Deployment with a PC Launcher<a name="cloud-canvas-testing-different-mappings-selecting-a-deployment-pc-launcher"></a>

After you have exported one or more mappings, you can choose the mapping to use when you run a game launcher such as the one at `dev\Bin64vcNNN\CloudGemSamplesLauncher.exe`\.

To direct the launcher to use a specific deployment, use the command line option `cc_override_resource_map`, as in the following example\. 

```
CloudGemSamplesLauncher.exe -cc_override_resource_map Config\dev.player.awsLogicalMappings.json
```

The argument for the `cc_override_resource_map` parameter specifies the mapping file that you want to use\.

If you have exported a single mapping file to the launcher, the launcher uses that mapping file by default\. If you have exported multiple mapping files to the launcher, you must select a mapping by using the `cc_override_resource_map` parameter\. If you don't specify a mapping after multiple mappings have been exported, the launcher gives an error message, and no mapping is loaded\.