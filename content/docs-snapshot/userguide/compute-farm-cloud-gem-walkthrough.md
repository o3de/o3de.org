# Compute Farm Cloud Gem: Walkthrough<a name="compute-farm-cloud-gem-walkthrough"></a>

This tutorial is a step\-by\-step walkthrough of the Compute Farm cloud gem\. The tutorial uses the default word list sorting implementation that is included with the cloud gem\.

## Prerequisites<a name="compute-farm-cloud-gem-walkthrough-prerequisites"></a>

This tutorial assumes the following:
+ You enabled the **Cloud Gem Compute Farm** in the Project Configurator for your Lumberyard project\.
+ You used the Cloud Canvas Resource Manager or the [lmbr\_aws command line tool](cloud-canvas-command-line.md) to create the following:
  + A project stack for your project\.
  + A deployment for your project\.
+ You have an installation of Python 3\.6 or later\. Lumberyard Beta 1\.24 and later versions ship with a Python 3 interpreter located at `lumberyard_version/dev/Tools/Python/3.7.5/host_platform`\. If you use the interpreter bundled with Lumberyard, you may need to [install the pip package manager](https://pip.pypa.io/en/stable/installing/)\.
+ You have boto3 installed\. You can use the following command to install boto3 in most distributions from the `python_installation\Scripts` directory: 

  **pip install boto3**\.
+ Open the Cloud Gem Portal\. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\.

If you don't meet the prerequisites, follow the steps in [Enabling Gems](gems-system-using-project-configurator.md) to add **Cloud Gem Compute Farm** to your project\. Note that the CloudGemSamples project does not enable Cloud Gem Compute Farm by default\. For information on creating a project stack and a deployment stack, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

## 1\. Gather Configuration Information<a name="compute-farm-cloud-gem-walkthrough-gather-configuration-information"></a>

Some of the scripts in this walkthrough have parameters that require configuration information from your Compute Farm cloud gem installation\. You can gather most of this information from the AWS Management Console\.

**To gather configuration information for script parameters**

1. Sign in to the AWS Management Console and open the AWS CloudFormation console at [https://console\.aws\.amazon\.com/cloudformation](https://console.aws.amazon.com/cloudformation/)\.

1. On the CloudFormation **Stacks** page, locate the stack name for your Compute Farm resource group\. The stack name is in the following form:

   ```
   project_name-deployment_name-CloudGemComputeFarm-random_number
   ```

   For example, the following stack name is for a project named `cgsamples` and a project deployment named `testdeployment`\.

   ```
   cgsamples-testdeployment-CloudGemComputeFarm-1R4M5M1YH98Z9
   ```

1. Click the stack name to open the stack detail page\.

1. On the **Stack Detail** page, expand the **Resources** section\.

1. In the **Resources** section, copy the **Physical ID** values for the following items in the **Logical ID** column:
   + **InstanceRole**
   + **LogDB**
   + **Workflow**
   + **computefarm**

## 2\. Build the AMI<a name="compute-farm-cloud-gem-walkthrough-build-the-ami"></a>

To build a Windows AMI with your software and harness preinstalled on it, use the `ami_builder` script in the Compute Farm cloud gem's directory\. This works as follows:
+ The script uploads any third\-party software you've indicated in its configuration as being necessary to an Amazon S3 bucket\.
+ The script launches a new Amazon EC2 instance running a base Windows Server AMI\.
+ The Amazon EC2 instance runs a set of commands that the script provides to download and configure the software for the instance, and then shuts down\.
+ After the Amazon EC2 instance shuts down, the script resumes and requests an AMI to be made of the attached storage on the instance\.
+ After the AMI is completed, the script terminates the Amazon EC2 instance and cleans up its Amazon S3 storage\.

The build script uses a configuration file to determine the contents of the AMI\. The script can copy and rename files from your local machine, as well as include regular and PowerShell commands to run on the Windows instance to do things like install custom Python modules or move files that were downloaded\. The AMI can be used to create as many Amazon EC2 instances as needed to divide and conquer the computing problem\.

**To build an Amazon Machine Image**

1. Construct a command line for the `lumberyard_version\dev\Gems\CloudGemComputeFarm\vN\Harness\ami_build\ami_build.py` script\.

   You must specify the following parameters:
   + \-\-**ami** – Provide a name for your AMI\.
   + \-\-**role** – Use the value for **InstanceRole** that you gathered earlier\. This is the IAM instance role that was created as part of your deployment\.
   + \-\-**s3\-bucket** – Use the value that you gathered for **computefarm**\. This is name of the S3 bucket that was created in your gem's deployment\.

   The following parameters are optional:
   + **\-\-key\-pair\-name** – Provide a key pair name for debugging over RDP\. You can use a key pair to sign in to your Amazon EC2 instances through RDP to view their logs and debug them while they are running\. This parameter is optional, but highly recommended\. 

     For more information, see [Amazon EC2 Key Pairs and Windows Instances](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ec2-key-pairs.html) and [Connecting to Your Windows Instance](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/connecting_to_windows_instance.html) in the *Amazon EC2 User Guide for Windows Instances*\.
   + **\-\-subnet\-id, \-\-security\-group\-id** – Provide these values to prevent auto\-creation every time you run this script\.
   + **\-\-ami\-base** – Depending on the AWS region that you selected, you might have to specify an ID for the base AMI that you will use\.

**To obtain the ID for a base AMI**

     1. Sign in to the AWS Management Console and open the Amazon EC2 console at [https://console\.aws\.amazon\.com/ec2/](https://console.aws.amazon.com/ec2/)\.

     1. Choose **Launch Instance** to display the list of standard AMIs\.

     1. In the list of AMIs, find the AMI that you want to use as a base\. \(The sample included with the Compute Farm cloud gem runs on a Microsoft Windows Server 2016 base\.\)

     1. Copy the ID of the AMI\.

     1. Use the copied ID for the `--ami-base` parameter in the `ami_build.py` script\.

1. Run the `ami_build.py` script\. The following shows a sample execution of the script and its corresponding messages\.

   ```
   C:\LY\dev\Gems\CloudGemComputeFarm\v1\Harness\ami-build>ami-build.py --ami myami --role myproject-mydeployment-CloudGemComputeFarm-1R4-InstanceRole-ABCDEFGHIJKL --s3-bucket myproject-mydeployment-cloudgemcomputefarm-1r4-computefarm-abcdefghijkl
   Verifying the AMI name 'myami' is unused...
   Obtaining an instance profile for role 'myproject-mydeployment-CloudGemComputeFarm-1R4-InstanceRole-ABCDEFGHIJKL'
   Zipping and uploading C:\LY\dev\Gems\CloudGemComputeFarm\v1\Harness...
   Creating and configuring Amazon EC2 instance...
   Waiting for instance i-abcdefg1234567890 to initialize, configure, and shut down. This will take some time...
      Instance i-abcdefg1234567890 is now pending.
      Instance i-abcdefg1234567890 is now running.
      Instance i-abcdefg1234567890 is now stopping.
      Instance i-abcdefg1234567890 is now stopped.
   Building AMI from instance i-abcdefg1234567890...
   Waiting for AMI ami-64abcdef to become available...
     AMI ami-64abcdef is now pending.
     AMI ami-64abcdef is now available.
   AMI ami-64abcdef successfully generated! Beginning clean up.
   Terminating instance {}...
   Deleting temporary files from S3...
   Done!
   ```

## 3\. Create Data to Process<a name="compute-farm-cloud-gem-walkthrough-create-data-to-process"></a>

The Compute Farm cloud gem includes a compressed word list that is sorted\. In this step, you shuffle the word list to create a file to be processed by the compute farm\. The compute farm's task will be to put the list back in order\.

**To create a shuffled word list**
+ From the `lumberyard_version\dev\Gems\CloudGemComputeFarm\vN\Harness` directory, run `shuffle_words.py` to create the `shuffled_words.zip` file from `words.zip`\. 
**Note**  
This script requires Python 3\.6 or later\.

## 4\. Upload the Data to Process<a name="compute-farm-cloud-gem-walkthrough-upload-the-data-to-process"></a>

In this step, you upload the shuffled word list to AWS to prepare for processing\.

**To upload the data to process**

1. In the Cloud Gem Portal, click **Compute Farm**\.  
![\[Compute Farm cloud gem\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-1.png)

1. Click **Build Configuration**\.  
![\[Build configuration for the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-2.png)

1. On the **Build Configuration** tab, add parameters for the cloud application that you are running\.
   + \(Optional\) For **s3\_dir**, enter a directory name to use in Amazon S3\.
   + For **s3\_file**, enter the file name of the `.zip` file that you want to process \(for this example, `shuffled_words`\)\. Do not include the file name extension\.
   + For **max\_level**, enter the maximum depth of recursive division into which to divide the problem\. For testing purposes, `2` or `3` is good\.

1. Click **Upload Data**\.  
![\[Click Upload Data in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-3.png)

1. Browse to and select the `shuffled_words.zip` file\. The key name autopopulates with the file that you selected\. If you specified a directory for the **s3\_dir** field, add that directory to the beginning of your destination path in **Destination path/key**\.  
![\[File to upload selected in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-4.png)

1. Click **Upload** to upload the dictionary to Amazon S3\.

## 5\. Test Your Harness Locally<a name="compute-farm-cloud-gem-walkthrough-test-your-harness-locally"></a>

Because deploying to an AMI and then to Amazon EC2 instances can be expensive, it is recommended that you test your harness locally with sufficient AWS credentials\. This ensures that your harness works properly before you run it on a fleet of Amazon EC2 instances\.

**To test your harness locally**

1. In the Cloud Gem Portal, click the **Overview** tab\.

1. Click **Run Workflow**\.  
![\[Click Run Workflow in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-5.png)

1. \(Optional\) In the **Run Workflow** dialog box, enter a unique name for the execution\.  
![\[Enter an optional name for the workflow execution in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-6.png)

   If you don't specify an execution name \(recommended\), one is created for you automatically in the format `exec-YYYY-MM-DDThh.mm.ss`\.

1. Click **Run**\.

   At this point, the Cloud Gem Portal is ready for you to run your decider and worker tasks\.
**Note**  
To run the tasks, you will use the `main.py` script located in the `lumberyard_version\dev\Gems\CloudGemComputeFarm\vN\Harness\` directory\.
The "decider" and "worker" versions of `main.py` use the same set of parameters, but the decider version also adds the `-rd` option to mark it as a decider\.

1. Construct the command line for the scripts with the following parameters:
   + **\-\-domain** – For this parameter, specify the **Workflow** value that you copied earlier and add the suffix `-domain`\. This parameter is the `Custom::SWF` domain that was generated in your resource group\.
   + **\-\-role** – Specify the value that you gathered earlier for **InstanceRole**\.
**Note**  
You can use the `--role` parameter only if you are not running in your root account\. It is better to create an IAM user with permissions to assume your role\. Use the same role to run your tests both locally and with your Amazon EC2 instances\.
   + **\-\-log\-db** – Specify the value that you gathered earlier for **LogDB**\. This parameter represents the LogDB DynamoDB table that was generated in your resource group\.
   + **\-\-config\-bucket** – Specify the value that you gathered earlier for **computefarm**\. This parameter represents the name of the Amazon S3 bucket in your resource group\.
   + \-\-**task\-list** – This is the `TaskList.name` for the workflow that is specified in the `lumberyard_version\dev\Gems\CloudGemComputeFarm\vN\AWS\resource-template.json` file\. For the test, you can use the default value of `dev-task-list` for this parameter\.
   + **\-\-div\-task, \-\-merge\-task, \-\-build\-task** – These values are also from the part of your `resource-template.json` file that specifies the `ActivityTypes` for your workflow\. For the test, you can use the default values of `task-divide`, `task-merge`, and `task-build` for these parameters\.

1. Open a command line window and run the decider task\. Ensure that you include the `-rd` option in the syntax\.

1. Open one or more command line windows and run the worker tasks\.
**Note**  
You must run at least one decider task and worker task\. 
You can run multiple worker tasks to process tasks in parallel, but only one decider task is active at any given time\.
You must run each decider and worker task in a separate command line window\.
Control does not automatically return to each command prompt\. Each window is suspended while execution proceeds\.

1. In the Cloud Gem Portal, confirm that the test execution has completed\.  
![\[Confirm completion of the test execution in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-7.png)

1. In each command window, press **Ctrl\+Break** to return each window to its command prompt\.

## 6\. Create a Fleet of Amazon EC2 Instances<a name="compute-farm-cloud-gem-walkthrough-create-a-fleet-of-ec2-instances"></a>

Now you are ready to test your harness with a fleet of Amazon EC2 instances\.

**To create a fleet of Amazon EC2 instances**

1. In the Cloud Gem Portal, on the **Fleet Management** tab, click **New Fleet**\.  
![\[Click New Fleet in the Cloud Gem Portal for the Computer Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-8.png)
**Note**  
You can have only one fleet at a time\. If you already have a fleet and create a new fleet, the preexisting fleet will be deleted\.

1. In the **Create launch configuration** dialog box, enter the required information\.  
![\[Create launch configuration for a fleet in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-9.png)
   + For **Configuration name**, enter a unique name\.
   + For **Amazon Machine Images \(AMI\)**, select the name of the AMI that you created earlier\. This is the machine image that you will deploy to your fleet\.
   + \(Optional\) For **Key Pair**, select the value that you specified for `--key-pair-name` when you built your AMI\.
   + For **Instance Type**, select an instance type to use for your fleet\. For information about Amazon EC2 instance types, see [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)\.

1. Click **Continue**\.

1. In the **Create fleet** dialog box, enter the required information\.  
![\[Enter a group name for the fleet in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-10.png)
   + For **group name**, enter a unique group name for the fleet\. A variant of your configuration name is recommended\.
   + For **instance number**, enter the number of instances that you want to launch\. If you do not want to launch any instances yet, specify 0\.
   + Select the **Auto\-Terminate** option if you want your fleet to automatically terminate \(that is, go to 0 instances\) after it finishes processing a workflow\.

1. Click **Create**\. The **Fleet Management** tab shows the new group under **Current fleet**\.  
![\[New fleet appears in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-11.png)
**Note**  
It takes time to spin instances up or down to match the number that you request\. You are subject to the limits on your AWS account\. To request limit increases, see the [AWS Support Center](https://console.aws.amazon.com/support/home#/)\.

1. To change the number of active instances at any time, edit the **Number of Instances** field and click **Save Changes**\.  
![\[Changing the number of active instances in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-12.png)

## 7\. Run a Workflow<a name="compute-farm-cloud-gem-walkthrough-run-a-workflow"></a>

To run and view the progress of a workflow, you use the **Overview** tab just as you did with the local test harness\. The **Overview** tab provides graphs of the workflow execution progress\.

**To run a workflow**

1. In the Cloud Gem Portal, click the **Overview** tab\.

1. Click **Run Workflow**\.  
![\[Click Run Workflow in the Compute Farm cloud gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-13.png)

1. \(Optional\) In the **Run Workflow** dialog box, enter a unique name for the execution\.  
![\[Enter a name for the workflow execution in the Compute Farm cloud gem\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-14.png)

   If you choose not to provide an execution name \(recommended\), one is created for you in the format `exec-YYYY-MM-DDThh.mm.ss`\.

1. Click **Run**\.

1. Under **Progress Visualization**, you can switch between **Activity View** and **Progress View**\.  
![\[Switch between Activity View and Progress View.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-15.png)

   When the execution finishes, the graph is complete\.  
![\[Progress graph in the Compute Farm Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-16.png)

## 8\. Download the Results<a name="compute-farm-cloud-gem-walkthrough-download-the-results"></a>

After the workflow is finished, you can download the build result on the **Build Configuration** tab\.

**To download the build result**

1. In the Cloud Gem Portal, click the **Build Configuration**\.

1. Click **Download Build Result**\.  
![\[Click Download Build Result\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-17.png)

1. Select the `shuffled_words_sorted.zip` file\.  
![\[Choose the processed file\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-18.png)

   You can also download any of the intermediate files that were generated\.

1. Click **Download**\. After the result file is downloaded, you can view the contents to confirm that the shuffled word list has been sorted again\.

## 9\. View Previous Builds<a name="compute-farm-cloud-gem-walkthrough-view-previous-builds"></a>

After you have run a number of workflows, you can view the results of previous builds on the **Overview** tab\.

**To view a previous build**

1. On the **Overview** tab, click **View Previous Builds**\.  
![\[Click View Previous Builds\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-19.png)

1. Choose the build that you want to view from the list\. If you want to clear the list instead, click **Clear Logs**\.  
![\[Choose a previous build to view in the Compute Farm Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-20.png)

1. Click **View**\. On the **Overview** tab, the build that you chose appears\.  
![\[Previous build showing on the Overview tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/compute-farm-cloud-gem-walkthrough-21.png)

## 10\. Customize the Harness for Your Application<a name="compute-farm-cloud-gem-walkthrough-customize-the-harness-for-your-application"></a>

You can customize the harness to perform tasks like the following:
+ Downloading and unzipping data from Amazon S3\.
+ Running third\-party software in a shell\.
+ Performing the business logic to understand and distribute a problem\.
+ Running algorithms to build or merge data if you are not using third\-party software for all phases\.
+ Reporting back to the rest of the harness on the results of a divide, build or merge task\.
+ Zipping and uploading results to Amazon S3\.

The harness itself handles the interpretation of Amazon SWF events and recursively tracks the dependencies of your various tasks\.

To customize the harness that is included with the Compute Farm cloud gem for your own computing application, modify the following files:
+ You can modify the `divide.py`, `build.py` and `merge.py` scripts to implement tasks that solve other distributed problems\.
+ You can modify the `lumberyard_version\dev\Gems\CloudGemComputeFarm\vN\AWS\cgp-resource-code\src\workflow-config.ts` file to make parameters that your script uses available for configuration in the Cloud Gem Portal\.
+ Use the `lumberyard_version\dev\Gems\CloudGemComputeFarm\vN\Harness\ami_build\manifest.json` file to specify the software that is installed on your AMI\. Run PowerShell commands as needed to configure it\.

### Configuring Permissions<a name="compute-farm-cloud-gem-walkthrough-configuring-permissions"></a>

You might need to customize the default IAM role used for Amazon EC2 instances with additional permissions beyond those for Amazon SWF and Amazon S3 that are required by the harness and included by default\. You can edit these permissions in the gem's `resource-template.json` file\.