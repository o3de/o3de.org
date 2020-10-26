# Compute Farm Cloud Gem<a name="cloud-canvas-cloud-gem-compute-farm"></a>

The Compute Farm cloud gem is a tool for large\-scale divide and conquer tasks that can be processed on a fleet of Amazon EC2 instances\. This cloud gem is particularly suited for heavy\-duty, computationally intensive Windows tasks like nav mesh generation, static lightmap baking, and terrain generation\. In general, the Compute Farm cloud gem is designed for tasks that can be highly parallelized with recursive subdivision\.

The Compute Farm cloud gem has the following three major aspects: 

1. **Harness** – The brain of the cloud gem that orchestrates the task\. The harness is a Python script that runs on every Amazon EC2 instance\. The script continuously polls the [Amazon Simple Workflow Service \(SWF\)](https://aws.amazon.com/swf/) for decisions that need to be made and activities that must be run\. You can customize the harness for your own purposes\.

1. **[Amazon Machine Image \(AMI\)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)** – An image of the machine to do the task\. The AMI must be prepared with all the necessary software to perform the task as well as a copy of the harness\. The Compute Farm cloud gem includes a script to build the AMI\.

1. **Launch Configuration and Auto Scaling Group** – After the AMI is created, you must create an [Amazon EC2 Launch Configuration](https://docs.aws.amazon.com/autoscaling/ec2/userguide/LaunchConfiguration.html) and an [Amazon EC2 Auto Scaling Group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html) to control the fleet of Amazon EC2 instances that will run the AMI\. This is done in the Compute Farm Cloud Gem Portal; you set the Auto Scaling Group to the desired number of Amazon EC2 instances\.

## Workflow Summary<a name="cloud-canvas-cloud-gem-compute-farm-workflow-summary"></a>

The harness receives and processes events from [Amazon SWF](https://aws.amazon.com/swf/), and runs three categories of task: **divide**, **build** and **merge**\.

The harness must be extended with Python scripts that perform these three tasks for the target\. In the dictionary sorting example that is included with the cloud gem, these tasks are the following:
+ **Divide** a dictionary of words into multiple parts\.
+ **Build** a subset of the dictionary by sorting it\.
+ **Merge** the two sorted subsets back into one sorted subset\.

See the following high\-level workflow for completing a computing task:

1. With the Cloud Gem Portal, upload the data to be processed to an [Amazon S3](https://aws.amazon.com/s3/) bucket\.

1. From the Cloud Gem Portal, start the execution of Amazon SWF\.

1. The Cloud Gem Portal monitors the progress of the work and notifies you when the task is done\.

1. From the Cloud Gem Portal, download the results of the work\.

For a high\-level explanation and demonstration of the Compute Farm cloud gem for large scale terrain generation, see the [2018 GDC classroom session](https://www.youtube.com/watch?v=STZLqIx13Ps) on YouTube\. Developers who are interested in this particular implementation can reach out to us at lumberyard\-feedback@amazon\.com\.

## Account Limits<a name="cloud-canvas-cloud-gem-compute-farm-account-limits"></a>

Your use of the Compute Farm cloud gem is subject to the limits on your AWS account\. The following are the most relevant limits that you are likely to encounter:
+ Limits on the number of on\-demand Amazon EC2 instances that you can run for a particular type\. For more information, see [Q: How many instances can I run in Amazon EC2?](https://aws.amazon.com/ec2/faqs/#How_many_instances_can_I_run_in_Amazon_EC2)
+ Limits on your EBS volume storage\. For more information, see [Amazon Elastic Block Store \(Amazon EBS\) Limits](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html#limits_ebs) in the *Amazon Web Services General Reference*\.
+ For large number of active instances, throttling limits on Amazon SWF\. For more information, see [Amazon SWF Limits](https://docs.aws.amazon.com/amazonswf/latest/developerguide/swf-dg-limits.html) in the *Amazon Simple Workflow Service Developer Guide*\.

To request limit increases, see the [AWS Support Center](https://console.aws.amazon.com/support/home#/)\.

**Topics**
+ [Workflow Summary](#cloud-canvas-cloud-gem-compute-farm-workflow-summary)
+ [Account Limits](#cloud-canvas-cloud-gem-compute-farm-account-limits)
+ [Compute Farm Cloud Gem: Walkthrough](compute-farm-cloud-gem-walkthrough.md)