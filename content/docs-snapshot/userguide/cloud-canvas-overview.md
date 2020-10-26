# Cloud Canvas Overview<a name="cloud-canvas-overview"></a>

Cloud Canvas helps you manage cloud resources and connect your game with the AWS cloud\. Understanding its concepts will benefit anyone on your team who interacts with the cloud\-connected components of your game, including designers, programmers, and testers\.

This section covers the following:
+ What Cloud Canvas is and how it relates to your AWS account
+ The Amazon Web Services that Cloud Canvas supports
+ How Cloud Canvas helps you manage your resources
+ How your game can communicate with the cloud through cloud gems

## Prerequisites<a name="cloud-canvas-core-concepts-prerequisites"></a>

Before reading this topic, you should have a basic understanding of the [Lumberyard engine](lumberyard-intro.md)\.

## AWS, Cloud Canvas, and Lumberyard<a name="cloud-canvas-core-concepts-aws-cc-ly"></a>

Amazon Web Services \(AWS\) is an extensive and powerful collection of cloud\-based services\. You can use these services to upload or download files, access databases, execute code in the cloud, and perform many other operations\. A cloud service saves you the trouble of maintaining the infrastructure that it relies on\.

### Cloud\-Based Resources<a name="cloud-canvas-core-concepts-cc-ly-resources"></a>

When you want to use an AWS cloud service, you do so through a resource, a cloud\-based entity that is available for your use, help, or support\. Resources include a database, a location for storing files, the code that a service runs, and more\.

When you create a resource, it exists in the cloud, but you can use it and manage its content\. You also specify the permissions that individuals or groups have to access or use the resource\. For example, you might allow anyone in the public to read from your database but not write to it or modify it\.

### Resource Groups<a name="cloud-canvas-core-concepts-resource-groups"></a>

In order to create a connected game feature such as a high score table, you create a resource group in Cloud Canvas\. The resource group defines the AWS resources that your feature requires\. Each connected game feature therefore is implemented as a resource group in Cloud Canvas\.

### AWS Accounts<a name="cloud-canvas-core-concepts-cc-ly-aws-accounts"></a>

Your resources are owned by an AWS account\. The AWS account allows you and your team to share access to the same resources\. For example, your team’s AWS account might own a database resource so that you and your teammate can both work with the same database\.

You, or someone on your team, is an administrator\. The administrator creates the AWS account for your team and gives individuals on the team access to the account's resources\.

### Lumberyard, Cloud Canvas, and Cloud Gems<a name="cloud-canvas-core-concepts-cc-ly-fg"></a>

Cloud Canvas is a Lumberyard Gem \(extension\) that enables your Lumberyard games to communicate with AWS resources\. To integrate the communication with Amazon Web Services directly into your game logic, you can use [cloud gems](cloud-canvas-cloud-gems-intro.md)\.

For example, you can use cloud gems to create leaderboards, messages of the day, in\-game surveys, and speech recognition and text\-to\-speech capabilities for your game\.

## Amazon Web Services Supported by Cloud Canvas<a name="cloud-canvas-core-concepts-aws-supported-svcs"></a>

Several AWS offerings are available through Cloud Canvas that can enhance your game\.

### File Storage in the Cloud<a name="cloud-canvas-core-concepts-supported-svcs-file-storage"></a>

For storing files in the cloud, Cloud Canvas supports Amazon Simple Storage Service \(Amazon S3\)\. Amazon S3 offers a storage resource called a bucket, which you can think of as a large folder\. You can build a directory structure in an Amazon S3 bucket just like a directory on a local computer\. Amazon S3 buckets have a number of uses in games, including the following:
+ Storing files that your game can download\. These files can be levels, characters, or other extensions for your game\. You can add new files after your game has shipped\. Because your game uses Cloud Canvas to download and integrate this content, your customers do not need to download a new client\.
+ Your game can upload player\-generated content\. For example, your game might take a screenshot whenever a player beats the last boss\. Cloud Canvas uploads the screenshot to your bucket, and your game makes the screenshot available on a website or to other players of the game\.

### Databases<a name="cloud-canvas-core-concepts-supported-svcs-databases"></a>

For storing data like a person’s name, phone number, and address in the cloud, Cloud Canvas supports the Amazon DynamoDB database service\. Amazon DynamoDB operates on resources called tables\. These tables grow and adapt as you build and iterate your game\.

Here are some ways in which you can use Amazon DynamoDB table resources in your game:
+ Track account details and statistics for a player\. Give each player a unique ID so that you can look up a player's hit points, inventory, gold, and friends\.
+ Add or remove fields to accommodate new resource groups in your game\.
+ Perform data analyses\. For example, you can run complex queries to find out how many players have unlocked a particular achievement\.
+ Manage game\-wide resource groups or events such as a querying a high score table or retrieving a message of the day\.

### Executing Cloud\-Based Logic<a name="cloud-canvas-core-concepts-supported-svcs-lambda"></a>

For executing code in the cloud, Cloud Canvas supports the AWS Lambda service\. AWS Lambda executes resources called functions\. You provide the code for a Lambda function, and your game calls the Lambda service through Cloud Canvas to run the function\. The Lambda service returns the data from the function to the game\.

Your Lambda functions can even call other Amazon Web Services like Amazon DynamoDB and perform operations on their resources\. Following are some examples:
+ **Submit a high score** – A Lambda function can accept a player's ID and new score, look up the player ID in the database, compare the score with existing scores, and update the highest score if necessary\.
+ **Sanitize your data** – A Lambda function can check for malicious or unusual input\. For example, if a player tries to upload a new high score of 999,999,999 when the best players can't reach 1,000, your Lambda function can intercept the submission and either reject it or flag it for review\.
+ **Perform server\-side authoritative actions** – Cloud Canvas can call your Lambda functions to control in\-game economies\. For example, when a player tries to purchase an item, your Lambda function can check a database to verify that the player has enough money to pay for the item\. The function can then deduct the amount from the player's account, and add the item to the player’s inventory\.

### Identity and Permissions<a name="cloud-canvas-core-concepts-supported-svcs-cognito"></a>

For managing the identity of the player and controlling access to AWS resources in the cloud, Cloud Canvas supports the Amazon Cognito service\.

Amazon Cognito can create unique anonymous identities for your players that are tied to a particular device\. It can also authenticate identities from identity providers like Login with Amazon, Facebook, or Google\. This provides your game with a consistent player IDs that can seamlessly transition from anonymous use on a single device to authenticated use across multiple devices\. Consider these examples:
+ Players start playing your game anonymously and store their progress locally on their device\. Later, to "upgrade" their experience, you ask them to be authenticated through one of the login providers mentioned\. After players provide an authenticated ID, you can store their progress in the cloud, and they can access their progress across multiple devices\.
+ You can specify which AWS resources players are allowed to access\. For example, you can enable the "Get the Latest High Scores" Lambda function to be called not only by your game, but by anyone, including external websites\. But you could specify that the "Submit High Scores" function only be called by players of your game so that your high score table remains secure\. You can use Cloud Canvas to manage these permissions\.