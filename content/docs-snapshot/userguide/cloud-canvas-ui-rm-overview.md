# Understanding Cloud Canvas Resource Manager<a name="cloud-canvas-ui-rm-overview"></a>

Game development is an inherently local activity\. You have a local copy of your game code, assets, and other resources\. You build, test, and tweak over and over on your local computer\. 

 The cloud is different\. It is an alien environment\. You put resources "out there" that the game depends on\. But those resources don’t live on your computer system\. The process of using and modifying the resources in the cloud isn’t the same as for resources that are local\. 

 **Cloud Canvas Resource Manager** bridges this gap\. It lets you have local *descriptions* of the AWS resources in the cloud that your game needs and provides ways to create and interact with the actual instances of those resources in AWS\. Your resource could be a database table, a file storage bucket, or code that runs in response to an event\. 

![\[Resource Manager\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-overview-resource-manager-and-cloud.jpg)

 For team projects, the source code and assets that you are using likely come from a source control system\. The changes you make are shared with other people who work on the project through that source control system\. Different people can be working at the same time with different versions \(“branches”\) of the code and with different versions of assets without interfering with each other\. 

When you develop a game that uses cloud resources in AWS, those resources may be shared by different people who work on the game at the same time\. Sometimes you need different versions of those resources to exist in the cloud\. You also want to ensure that the people developing the game use the version of the resources in the cloud that matches the version of the code and assets they are working with\. 

![\[Resource Manager in a team environment\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-overview-resource-manager-multiple-deployments.png)

 After the game is released, the players will use a production copy while your team uses another, private copy to work on bug fixes and new content\. 

 You'll also want to do the following: 
+ Be sure that players cannot access the development versions of game resources 
+ Prevent the development team from making changes that could break the released game 
+ Protect player information like e\-mail addresses from unauthorized access by team members 

 The **Cloud Canvas Resource Manager** provides the tools you need to do the following: 
+ Maintain descriptions of the AWS resources that your game depends on 
+ Create as many copies of the AWS resources as needed for your releases and development teams 
+ Help you secure access to those resources 

## The Role of AWS CloudFormation<a name="cloud-canvas-ui-rm-overview-cfn"></a>

 The **Cloud Canvas Resource Manager** integrates the use of [AWS CloudFormation](https://aws.amazon.com/cloudformation/) into the Lumberyard game development environment\. With AWS CloudFormation you can maintain descriptions of the AWS resources you need in text file templates that you can check into your source control system\. These descriptions can be branched and merged along with the rest of your game code and assets\. When you need actual instances of the resources to be created in AWS, **Cloud Canvas ****Resource Manager** passes the descriptions to AWS CloudFormation, which uses the template files to create, update, or delete resources in AWS to match the descriptions\. 

![\[Resource Manager uses AWS CloudFormation to create resources in AWS\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-overview-cfn-upload-all-resources.jpg)

You can use resource manager to organize your descriptions into any number of ***resource groups***\. Each group can describe all the resources needed by a game feature, such as a high score tracking system\. For details, see [Resource Definitions](cloud-canvas-resource-definitions.md)\.

With resource manager you can create as many ***deployments*** of the resources as you need\. You could have a deployment for the dev team, another for the QA team, and another for the released game, or any other arrangement that suits your needs\. Each deployment contains a complete and independent instance of all of the project's resources\. Deployments are implemented using AWS CloudFormation ***stack*** resources\. For details, see [Resource Deployments](cloud-canvas-resource-deployments.md)\.

You can choose the deployment that you want to work with in Lumberyard Editor\. For example, if you create a "QA" deployment and use it to test your game, Lumberyard Editor automatically maps the references to resources in your game code to the "QA" instance of those resources\. 

![\[Choosing your deployment\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-overview-current-deployment.png)

 Similarly, you can also specify the deployment to be used for release builds of the game\. For details, see [Resource Mappings](cloud-canvas-resource-mappings.md)\.

Each deployment comes with an AWS managed policy and an AWS role that you can use to grant specific AWS users and groups access to that deployment\. For example, players are granted access to specific resources within a deployment\. For details, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\. 

### A Closer Look at AWS CloudFormation Stacks<a name="cloud-canvas-overview-rm-cfn-stacks"></a>

A Cloud Canvas Resource manager project consists of one or more AWS CloudFormation stacks\. All stack templates are stored as files in the project's source control system\.
+ A single *project stack* that contains the resources that support Cloud Canvas Resource Manager itself\. The project stack template is stored as a file in the project's source control system\.
+ Any number of *deployment stacks*\. A deployment represents a complete and independent set of all the resources needed by the game\. Each deployment stack contains a child stack for each resource group\. All deployment stacks are defined using a single AWS CloudFormation stack template\.
+ One *deployment access stack* per deployment stack\. A deployment's access stack defines the resources used to grant access to a deployment, including IAM Roles and Amazon Cognito Identity Pools\. They are distinct from deployment stacks because game developers need to be able to update deployment stacks but not change the permissions associated with the deployment\.
+ Any number of *resource group stacks*\. Each resource group represents a set of resources related to an arbitrary game feature\. Resource group stacks exists only as children of deployment stacks\. Each resource group has its own stack template, which defines the resource group's stack for each deployment\.

So, if there are 3 deployments and 4 resource groups, you have a total of 12 resource group stacks, 3 deployment stacks, 3 deployment access stacks, and 1 project stack \(19 stacks total\)\. You'll also have a total of 7 stack templates, one for the project stack, one for all the deployment stacks, one for all the deployment access stacks, and one each for each resource group\. The following image illustrates this scenario\.

![\[A sample set of deployment and resource group stacks\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cfn-stacks.png)

## Cloud Canvas Resource Management<a name="cloud-canvas-core-concepts-resource-mgmt"></a>

In addition to communicating with Amazon Web Services, Cloud Canvas can also help you manage your resources\. Amazon Web Services can help create and manage any cloud resources that a game resource group needs\. Once you implement the resource group you can use Cloud Canvas deployments to manage the resources for development, test, and live versions of your game\. 

### Defining the Resources<a name="cloud-canvas-core-concepts-resource-mgmt-defining"></a>

You can create cloud resources by using AWS CloudFormation templates\. [AWS CloudFormation](https://aws.amazon.com/cloudformation/) is an Amazon Web Service with which you can define, create, and manage AWS resources predictably and repeatedly by using templates\. The templates are JSON\-formatted text files that you use to specify the collection of resources that you want to create together as a single unit \(a stack\)\.

In a template, each resource gets its own AWS CloudFormation definition in which you specify the parameters that govern the resource\. AWS CloudFormation templates are beyond the scope of this topic, but for now it’s enough to understand that you can define \(for example\) a template with an Amazon DynamoDB table and two AWS Lambda functions\. For an example AWS CloudFormation template that creates an Amazon DynamoDB table, see the [AWS CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/sample-templates-services-us-east-1.html#d0e121894)\.

### Deployments<a name="cloud-canvas-core-concepts-resource-mgmt-deployments"></a>

While you are working on a new resource group, your quality assurance team might have to test it\. You want to provide a version of your resource group that the test team can use while you continue to work on your own version\. To keep the corresponding resources of the different versions distinct, Cloud Canvas gives you the ability to create separate deployments\. Deployments are distinct instances of your product’s features\.

In a scenario like the one described, you might create three deployments: one for the development team, one for the test team, and one for live players\. Each deployment's resources are independent of each other and can contain different data because \(for example\) you don’t want the data entered by the test team to be visible to players\.

With Cloud Canvas you can manage each of these deployments independently of one another, and you can switch between deployments at will\. After making changes, you can use Cloud Canvas to update your feature or deployment and update the corresponding AWS resources\.

### Team Workflow Using Deployments<a name="cloud-canvas-core-concepts-resource-mgmt-team-workflow"></a>

The following workflow example illustrates how Cloud Canvas deployments work:

1. The test team finds a bug\. You fix the bug in your Lambda code\.

1. You switch to the dev deployment and upload the new version of the Lambda function\. The Lambda code in the test and live deployments remain untouched for now, and they continue working as is\.

1. After you are satisfied that the bug has been fixed, you update the Lambda code in the test deployment\. The test team can now test your fix\. The live deployment continues unchanged\.

1. After the test team approves the fix, you update the live deployment, propagating the fix to your live players without requiring them to download a new version of the game\.

### Managing Permissions Using Cloud Canvas<a name="cloud-canvas-core-concepts-managing-permissions"></a>

Managing permissions is an important part of building a secure cloud\-connected game\. Maintaining separate and distinct permissions is important in the phases of development, testing, and production\. You can apply permissions to your development and test teams, to the AWS resources that your game uses, and to the players of your game\. A key objective is to secure your game’s AWS resources against hackers and other forms of abuse\.

You can use permissions to specify exactly who is allowed to do what to the AWS resources that are part of your game\. For example, if you have a game feature that uploads screenshots, you can create an Amazon S3 bucket to store the screenshots\. You can set permissions for the game to be able to write \(send files\) to the bucket, but not read from the bucket\. This prevents inquisitive users from examining the files that have been uploaded\. On the other hand, you can give your team members permissions to read files from the bucket so that they can review and approve them\. With Cloud Canvas you can also set the permissions for individual deployments\. For example, live and test deployments can have different permission sets\.

Like features, you can define permissions through AWS CloudFormation templates\. The permissions are applied any time that you update your cloud resources using the Cloud Canvas resource management tools\.

For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.