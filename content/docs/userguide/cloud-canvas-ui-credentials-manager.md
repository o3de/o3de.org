# Managing Cloud Canvas Profiles<a name="cloud-canvas-ui-credentials-manager"></a>

Use the **Credentials Manager** in Lumberyard Editor or the command line to manage one or more AWS profiles that provide the credentials required to access your AWS account\.

The profile is saved locally on your machine in your AWS credentials file\. This file is normally located in your `C:\Users\<user name>\.aws\` directory\. The [AWS Command Line Interface](https://aws.amazon.com/cli/) and the [AWS Toolkit for Visual Studio](https://aws.amazon.com/visualstudio/) can access these credentials\.

**Important**  
Do not share these credentials with anyone, and do not check them into source control\. These grant control over your AWS account, and a malicious user could incur charges\.

 For more information, see [https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)\.

**To open Credentials Manager**
+  To open **Credentials Manager**, do one of the following:
  +  In Lumberyard Editor, click **AWS**, **Credentials manager**\.
  + In **Cloud Canvas Resource Manager**, click the name of the current profile in the Resource Manager toolbar:  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-current-profile.png)

 You can use the **Credentials Manager** to select an existing AWS profile, edit an AWS profile, or add a new AWS profile\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-credentials-manager.png)

To edit an existing AWS profile, click **Edited selected profile**\. To add an AWS profile, click **Add profile**\.

 When adding or editing a profile, Lumberyard prompts you for the following:

 **Profile name** – The name used for the profile\.

 **AWS Secret Key** – The AWS secret key needed to access the account\.

 **AWS Access Key** – The AWS access key needed to access the account\.

**To add your credentials by using the command line**

1. Open a command line window and change to the root Lumberyard directory, which is the `dev` subdirectory of your Lumberyard installation directory \(for example, `C:\lumberyard_version\dev`\)\.

1. Enter the following at the command prompt, and then press **Enter**\. Replace *<profile\-name>* with a name of your choice \(for example,* CloudCanvasAdminProfile*\)\. Replace *<secret\-key>* and *<access\-key>* with the secret key and access key of your AWS account\.

   ```
   lmbr_aws profile add --profile <profile-name> --make-default --aws-secret-key <secret-key> --aws-access-key <access-key>
   ```

The `--make-default` option establishes the profile as your default profile for Cloud Canvas\. The default profile eliminates the need to specify the profile each time you use Lumberyard Editor or run an `lmbr_aws command`\.