# Running the Shader Compiler on Amazon EC2<a name="ios-android-running-shader-compiler-amazon-EC2"></a>

Amazon Elastic Compute Cloud \(Amazon EC2\) provides a [GPU instance](https://aws.amazon.com/blogs/aws/build-3d-streaming-applications-with-ec2s-new-g2-instance-type/) that you can use to run the Lumberyard shader compiler for mobile \(Android and iOS\) and macOS development\. For example, you can use the AWS device farm to test a build rather than hosting a PC on a public IP address\. Amazon EC2 also provides a G2 instance type that supports advanced rendering features such as texturing, shadows, and anti\-aliasing\. For more information, see [Amazon EC2 Instances](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/Instances.html)\.

To run the Lumberyard shader compiler, you must do the following:

1. Set up the Amazon EC2 instance\.

1. Install virtual network computing \(VNC\) software\.

1. Connect to the shader compiler\.

**Topics**
+ [Prerequisites](#ios-android-shader-compiler-amazon-EC2-prerequisites)
+ [Setting Up the Amazon EC2 Instance](#ios-android-set-up-amazon-EC2-instance)
+ [Installing VNC Software](#ios-android-install-VNC-software)
+ [Connecting to the Shader Compiler](#ios-android-connect-shader-compiler)

## Prerequisites<a name="ios-android-shader-compiler-amazon-EC2-prerequisites"></a>

To run the Lumberyard shader compiler on Amazon EC2, you must have the following:
+ AWS account
+ Familiarity with the [AWS Management Console](https://console.aws.amazon.com/)
+ Understanding of [Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/Instances.html), [VNC](https://www.realvnc.com/docs/), security groups, and the Lumberyard tool chain

## Setting Up the Amazon EC2 Instance<a name="ios-android-set-up-amazon-EC2-instance"></a>

Before you can set up the Amazon EC2 instance, you must request a GPU instance using the [Request to Increase Amazon EC2 Instance Limit](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/accelerated-computing-instances.html#gpu-instance-current-limitations) link\. When you are done, follow the steps below\. For information about Windows GPU instances, see [Windows Accelerated Computing Instances](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/accelerated-computing-instances.html)\.

**To set up the Amazon EC2 instance**

1. Open the Amazon EC2 console at [https://console\.aws\.amazon\.com/ec2/](https://console.aws.amazon.com/ec2/)\.

1. From the console dashboard, choose **Launch Instance**\.

1. On the **Amazon Machine Image \(AMI\)** page, enter **GPU**\.

1. In the search results, select **Windows Server 2012 R2 with NVIDIA GRID GPU Driver**\.

1. On the **Choose an Instance Type** page, select the **g2\.2xlarge** type\.

1. Choose **Review and Launch** to let the wizard complete the other configuration settings for you\.

1. On the **Add Storage** page, add a drive with sufficient space \(512 GB minimum\)\.

1. On the **Add Tags** page, add a memorable tag for the computer\. For example, **ShaderCompilerMachine**\.

1. On the **Review Instance Launch** page, create a new security group or use an existing one\.

1. Open port number **61453** for the shader compiler\.

1. On the **Review Instance Launch** page, click **Launch**\.

1. When prompted for a key pair, select **Choose an existing key pair**, and then select the key pair that you created when getting set up\.

1. When you are ready, select the acknowledgement check box, and then click **Launch Instances**\.

1. A confirmation page lets you know that your instance is launching\. Click **View Instances** to close the confirmation page and return to the console\.

## Installing VNC Software<a name="ios-android-install-VNC-software"></a>

Once the Amazon EC2 instance is set up, you can install virtual network computing \(VNC\) software to run the shader compiler on the instance\.

**To install VNC software**

1. Using a remote desktop connection, log in to the Amazon EC2 instance\.
**Note**  
If you are using a Mac, you must download Remote Desktop App from the App Store\.

1. Download and install your preferred [VNC software](https://en.wikipedia.org/wiki/Virtual_Network_Computing)\.

1. On your Amazon EC2 instance, run the VNC server\.

1. Terminate the remote desktop session\.

1. On your local PC, install a VNC client\.

1. Using the VNC connection, run the shader compiler on the Amazon EC2 instance\.

1. Leave the VNC window open and then follow the steps in [Connecting to the Shader Compiler](#ios-android-connect-shader-compiler)\.

## Connecting to the Shader Compiler<a name="ios-android-connect-shader-compiler"></a>

Follow these steps to connect to the shader compiler\.

**To connect to the shader compiler**

1. On your computer, open the platform configuration file:
   + For Android, open the `system_android_es3.cfg` file \(located in the `lumberyard_version\dev` directory\)\.
   + For iOS, open the `system_ios_ios.cfg` file \(located in the `lumberyard_version\dev` directory\)\.

1. Edit the configuration file to set `r_ShaderCompilerServer` to the public IP address of your Amazon EC2 instance\. You can retrieve the IP address from the Amazon EC2 console\.

1. Run your game on your device to connect to the EC2 instance and compile the shaders\.