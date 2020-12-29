# Implementing Connected Features with Cloud Canvas<a name="cloud-canvas-intro"></a>

**Topics**
+ [Features](#cloud-canvas-overview-features)
+ [Example Uses](#cloud-canvas-overview-example-uses)
+ [Tools](#cloud-canvas-overview-tools)
+ [Knowledge Prerequisites](#cloud-canvas-overview-prereq-knowledge)
+ [Cloud Canvas Overview](cloud-canvas-overview.md)
+ [Cloud Gems](cloud-canvas-cloud-gems-intro.md)
+ [Cloud Canvas Gameplay Design and Engineering Guide](cloud-canvas-game-play-design-guide-intro.md)
+ [Cloud Canvas Software Engineering Guide](cloud-canvas-soft-eng-intro.md)
+ [Administering Cloud Canvas](cloud-canvas-administering-intro.md)
+ [Using the Cloud Canvas Command Line](cloud-canvas-command-line.md)

Deeply integrated with AWS, Cloud Canvas is a suite of tools and solutions \(cloud gems, resource groups, script canvas nodes\) designed to achieve two main goals:

1. Make it easy for you to build cloud\-connected features, so you can focus on innovation rather than on undifferentiated backend infrastructure\.

1. Make it possible for you to create fantastic new experiences made possible by the availability of the on\-demand, global storage and compute provided by AWS\.

With Cloud Canvas, you can add a cloud\-connected feature to your game in as little as 30 minutes\. A single engineer can do this, freeing up the rest of your team to think about innovation and player experience\.

## Features<a name="cloud-canvas-overview-features"></a>

Cloud Canvas offers a wide range of helpful features:
+ [Cloud gems](cloud-canvas-cloud-gems-intro.md) that provide cloud\-connected features such as Message of the Day, Leaderboards, and Dynamic Content\. These cloud gems can be used in a few clicks as is, or as samples to fuel your custom developments and ideas\. 
+ The [Cloud Gem Framework](cloud-canvas-cloud-gem-framework-intro.md), on top of which cloud gems are built, allows you to add pre\-packaged, cloud\-connected features in a few clicks\. You can use the Cloud Gem Framework to [build your own cloud gems](cloud-canvas-cgf-getting-started-create-gem.md)\.
+ Tools to enable a team to build a game with cloud\-connected features\.
+ A [CloudGemAWSScriptBehaviors](cloud-canvas-cgf-aws-behavior-context-reflections.md) gem that exposes AWS services such as Amazon S3, Amazon Cognito, AWS Lambda, and HTTP utilities to script\. 
+ Tools to manage AWS resources and permissions that determine how game developers and players access them\.
+ Management of AWS deployments so that development, test, and live resources are maintained separately\.
+ Methods for players to be authenticated \(anonymous and authenticated\)\. Players can be authenticated from a variety of devices and access their game data by logging in with an Amazon, Facebook, or Google account\.

## Example Uses<a name="cloud-canvas-overview-example-uses"></a>

Consider the many ways you can use Amazon Web Services for connected games:
+ Store and query game data such as player state, high scores, or world dynamic content: [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/) and [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/)
+ Trigger events in real time and queue data for background processing: [Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/) and [Amazon SNS](https://docs.aws.amazon.com/sns/latest/dg/)
+ Execute custom game logic in the cloud without having to set up or manage servers: [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/)
+ Employ a daily gift system that tracks player visits and rewards frequent visits: [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html), [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/), [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/), [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/)
+ Present a message of the day or news ticker that provides updates on in\-game events: [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html), [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/), [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/) 

For tutorials on Cloud Canvas, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md) and [Lumberyard Tutorials](https://gamedev.amazon.com/forums/tutorials)\.

## Tools<a name="cloud-canvas-overview-tools"></a>

 You can access Cloud Canvas functionality by using any of the following:
+  **[Cloud Gem Portal](cloud-canvas-cloud-gem-portal.md)** – A web application that makes backend administration and management accessible to everyone\. 
+  **Cloud Canvas C\+\+ APIs** – For software development\.
+ **[Using the Cloud Canvas Command Line](cloud-canvas-command-line.md)** – For managing resource groups, mappings, deployments, and projects\. 
+  **[Cloud Canvas Tools in Lumberyard Editor](cloud-canvas-ui-intro.md)** – For managing AWS resources, deployments, and credentials, and for navigating directly to the AWS consoles supported by Cloud Canvas\. 

## Knowledge Prerequisites<a name="cloud-canvas-overview-prereq-knowledge"></a>

You need the following to take advantage of Cloud Canvas:
+ **An understanding of [AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-guide.html)** – Cloud Canvas uses the [AWS CloudFormation](https://aws.amazon.com/cloudformation/) service to create and manage AWS resources\. Our goal is for Cloud Canvas to minimize what you need to know about AWS CloudFormation and AWS in general\. 
+ **Familiarity with [JSON](http://www.json.org/)** – Cloud Canvas leverages JSON for storing configuration data, including AWS CloudFormation Templates\. Currently, you'll need to be familiar with this text format to work with the Cloud Canvas resource management system\. A JSON tutorial can be found [here](http://www.w3resource.com/JSON/introduction.php)\. 