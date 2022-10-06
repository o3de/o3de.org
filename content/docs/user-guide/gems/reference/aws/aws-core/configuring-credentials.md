---
title: Configuring AWS Credentials
description: Learn how to configure AWS credentials in Open 3D Engine for AWS cloud-connected features.
weight: 150
toc: true
---

These instructions assume that you have (or will have) administrative access to an AWS account. For more information, see the [AWS home page](https://aws.amazon.com/) for instructions on creating an account, the [AWS account root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html) guide and [Creating your first IAM admin user and user group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html). If you already have an AWS account, but you do not have administrative access to it, see your AWS account administrator. 

The expectation is that, by the end of this guide and its linked resources, you will:
* Understand how to set up AWS credentials for O3DE.
* Understand how to control permissions for AWS users via policies and groups.
* Understand steps to take around team setup.
* Have a sense about how to manage credentials during the development and release/distribution phases of your project.

To set up an [individual user](#setting-up-aws-credentials-as-an-individual), you will need to:
* Create the required IAM user.
* Add any AWS permissions required.
* Export the credentials to the local environment.

To [set up credentials for a team](#setting-up-credentials-for-a-team), you will need to:
* Set up users and IAM credentials.
* Create user groups.
* Add AWS IAM users to the appropriate user group.
* Add AWS permissions to the user groups.

Once the preceding tasks are complete, users can export their credentials to their local environment.


## Working with AWS credentials

You will need to provide AWS credentials for users. You can choose between short-term and long-term credentials. Long-term credentials are convenient during the development process. They're easier to configure, but you need to be careful they are kept secure. Short-term credentials are generally recommended when you distribute your builds to external users because they have a finite lifetime. For more information, refer to the AWS guide on [Best practices for managing AWS access keys](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html).

* To provision long-term credentials, create an AWS Identity and Access Management (IAM) user with programmatic credentials and follow the section of this guide covering [setting up AWS credentials as an individual](#setting-up-aws-credentials-as-an-individual) that user for O3DE. See the general AWS guide on [Programmatic access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for more information. 

* To provide short-term credentials, use [Amazon Cognito](https://aws.amazon.com/cognito/) or [AWS Security Token Service](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) to generate [temporary security credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html). The [AWSClientAuth Gem](/docs/user-guide/gems/reference/aws/aws-client-auth) provides configuration points for using Amazon Cognito in O3DE.

* To provide access via IAM roles, see the [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) documentation for more information and follow [Using an IAM role in the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) for setup information.

It is strongly recommend to not use your AWS account root user for day-to-day tasks. Instead, create users or roles in IAM with the required permissions for your use cases. Best practice is to change users' access keys regularly and follow the practice of least-privileges. For more information on managing access keys, see [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) in the AWS IAM User Guide.


## Setting up AWS credentials as an individual

This section assumes you have an [AWS IAM Administrator user](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) set up in your AWS account.

The steps in this guide cover how to use an IAM user with long term programmatic credentials to use in O3DE. If you don't have IAM access keys configured, use the AWS Console to generate and download new access keys for an existing or new IAM user using the steps shown in the AWS reference guide for [Programmatic access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).

If you want to use short-term credentials for working with AWS, please see setup information in the [AWSClientAuth Gem](/docs/user-guide/gems/reference/aws/aws-client-auth).

Choose from the following options to set up a user's AWS credentials for use in O3DE. If you are using [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) remember to set the profile in the project settings.

### Option 1: Create a named profile using the AWS CLI
O3DE recommends using the [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) (CLI) (version 2) to manage the import and configuration of AWS credentials. If you have not configured credentials or a region on your computer, the easiest way to satisfy this requirement is to use the AWS `configure` command:

```cmd
aws configure
```

Using this command you can provide your AWS access key ID, secret access key, and default region manually when prompted. 

Alternatively, when you create new access keys for a user, you are given the option to download the keys as a CSV. You can then automatically import them using the AWS `import` CLI command (requires AWS CLI version 2):

```cmd
aws configure import --csv file://credentials.csv
```

This will create a named profile based on the name of the IAM user in your `credentials` file. 

You can control which profile is used by default in the AWS CLI either by setting a ```[default]``` or through the use of the [AWS_PROFILE](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html#using-profiles) environment variable.

For more information on using AWS CLI configure commands, see [Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) in the AWS CLI User Guide. 

You can also utilize IAM roles by defining role based profiles. Refer to [Using an IAM role in the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) for information.

### Option 2: Configure local credentials using config files
If you have an automated process or other provisioning mechanism, you can place pre-configured user credentials in the standard AWS config files.

Manually create or edit the `~/.aws/config` and `~/.aws/credentials` files (on macOS or Linux) or `%USERPROFILE%\.aws\config` and `%USERPROFILE%\.aws\credentials` files (on Windows) to include the credentials and a default region. 

First, in `~/.aws/config` or `%USERPROFILE%\.aws\config` set your default region:

```
[default]
region=us-west-2
```

Second, in `~/.aws/credentials` or `%USERPROFILE%\.aws\credentials` set up [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) as needed. You can configure a ```default``` profile that is used when no profile is explicitly referenced in commands. 

```
[default]
aws_access_key_id=AKXXXXXXXXXXX
aws_secret_access_key=xxXXXXXXBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

### Option 3: Use environment variables to provide credentials
You can also provide AWS credentials using environmental variables:

| Variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The AWS access key id to use. |
| `AWS_SECRET_ACCESS_KEY` | The AWS secret key id to use. |
| `AWS_SESSION_TOKEN` | The AWS session token to use (optional). If you are working with short-term credentials you will need to include the session token. |
| `AWS_DEFAULT_REGION` | The default AWS region. |

For more information on using environment variables for credentials, see [Environment variables to configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) in the AWS CLI User Guide.

### Option 4: Use O3DE console variables to provide credentials
This method will only work when using an O3DE runtime binary (Launcher and Editor). Credentials can be provided directly by setting the `cl_awsAccessKey` and `cl_awsSecretKey` Console Variables (CVARs), as follows:

```cmd
Editor.exe +cl_awsAccessKey AKXXXXXXXXXXX +cl_awsSecretKey xxXXXXXXBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

Note: Because of a console variable string size limitation, providing a session token is not currently supported.

| CVar | Description |
| --- | --- |
| `cl_awsAccessKey` | The AWS access key id to use. |
| `cl_awsSecretKey` | The AWS secret key id to use. |


## Setting a default profile to use in O3DE
If your development machine is configured with named profiles in your local AWS credentials file, you can set a profile to be automatically used with O3DE on a per-project basis. This profile should be set in the AWS Core [configuration settings](./getting-started/#project-settings) file and will then be used by default each time the O3DE Editor starts.

You can use the following commands to list your defaults and all named profiles (requires AWS CLI version 2):

```cmd
// Show the current defaults.
aws configure list

// Show all the named profiles.
aws configure list-profiles
```

## Controlling user permissions
All AWS IAM users are given permissions through the attachment of managed or inline IAM polices. See [Changing permissions for an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html).

We recommend that you adhere to the following guidelines:
* Only use an admin user when absolutely necessary, such as when deploying and provisioning AWS resources. An _admin user_ is defined here as a user with full permissions on an AWS account.
* Grant [least privileges](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege) on your AWS users, so they only have the minimum set of permissions on specific resources they require. This is controlled through setting of managed IAM policies and other mechanisms.
* Update managed policies to grant or revoke the appropriate permissions as you add and remove AWS resources.

### Creating IAM user groups
To make managing permissions easier, we recommend that you create [IAM user groups](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html). User groups let you specify permissions for multiple users at a time, which can make it easier to manage the permissions for groups of users.

Create user groups using the AWS Console, the AWS CLI, AWS CloudFormation templates or using the AWS Cloud Development Kit (AWS CDK). We recommend you create at least two user groups to work with AWS in O3DE:
* **Admins** - These are the administrators who own and manage AWS resources. Typically, they will perform updates and manage key resources.
* **Users** - These are the users who can take action on the resources, as part of normal gameplay or a simulation.

#### To create a user group using the AWS Console
1. Open the IAM console from [https://console.aws.amazon.com/iamv2](https://console.aws.amazon.com/iamv2).
2. In the IAM console's navigation pane, choose **Groups**.
3. Choose **Create New Group**.
4. On the **Set Group Name** page, for Group Name, enter a name for the new group. 
5. Choose **Next Step**.
6. On the **Attach Policy** page, either choose **Next Step** without attaching any policies, or attach any current policies that are relevant to the group.
7. Choose **Create Group**. 

#### To create a user group using the AWS CLI
1. Install and configure the AWS CLI as above, see [Installing or updating the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
2. Generate a user group.
```cmd
aws iam create-group --group-name MyUserGroup
```

#### To create user groups using the AWS CDK examples
The AWS CDK stacks defined in the AWS Core Gem will autogenerate sample `Admins` and `Users` user groups for you. By default, these groups are named ```O3DE-AWS-PROJECT-Admins``` and ```O3DE-AWS-PROJECT-Users```.

See the [AWS CDK setup instructions](cdk-application) for more details.

### Adding users to a user group
You can add users to IAM User Groups using either the AWS Console or the AWS CLI. See [Adding and removing users in an IAM user group ](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_manage_add-remove-users.html) for full details.

You can quickly add users via the CLI as follows:

```
aws iam add-user-to-group --group-name MyGroup --user-name MyNewUser
```

### Attaching permissions to a user group
You can attach IAM policies to a user group to control the permissions they have access to. This can be done using either the AWS Console, the AWS CLI, AWS CloudFormation template or with the AWS CDK. See [Attaching a policy to an IAM user group ](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_manage_attach-policy.html) to attach permissions using the AWS Console or AWS CLI.

#### Working with O3DE AWS CDK examples
If you deploy both the Core and example stack from the AWS Core Gem you can see examples of user permissions that were automatically generated by the ```generate_user_policy``` and ```generate_admin_policy``` functions. The user permissions are automatically attached to the user groups by a call to ```__grant_access```.

See the AWS CDK [Permissions](https://docs.aws.amazon.com/cdk/v2/guide/permissions.html) documentation for more details.

The AWS feature gems, such as AWS Metrics Gem, during deployment automatically create managed policies for users and admins that can then be attached manually to the appropriate user group. 

#### To attach managed policies to user groups using the AWS Console
1. Open the AWS Console at [https://console.aws.amazon.com/cloudformation](https://console.aws.amazon.com/cloudformation).
2. Navigate to the desired stack in a region.
3. Choose the **Resources** tab.
4. Look for resources with the type ```AWS::IAM::ManagedPolicy``` in the stack and record the policy name.
5. Open the IAM console at [https://console.aws.amazon.com/iam](https://console.aws.amazon.com/iam).
6. Select **user groups**.
7. Choose a user group.
8. Select **permissions**, then choose **add permissions**, then select **attach polices**.
9. Filter for policy to attach and select it.
10. Choose **Attach Policies**.

#### To attach managed policies to user groups using the AWS CLI
1. [Describe and list your stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-describing-stacks.html) in your AWS account.
2. [List required stack resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-listing-stack-resources.html) in a specific stack.
3. Search for the ```AWS::IAM::ManagedPolicy``` resources and record the physical ID of the resource, which will be in the form of the policy ARN.
4. [Attach the relevant policy](https://docs.aws.amazon.com/cli/latest/reference/iam/attach-group-policy.html) to the user groups as desired.

Example CLI commands:
```cmd
aws cloudformation describe-stacks --region <region>
aws cloudformation list-stack-resources --stack-name <feature stack> --region <region>
aws iam  attach-group-policy --group-name <group name> --policy-arn <policy arn>
```

## Setting up credentials for a team

{{< note >}}
You can use [AWS Single Sign-On (SSO)](https://aws.amazon.com/single-sign-on/) instead of IAM to enable multiple users within a single AWS account to work with O3DE. In this usage pattern, the single AWS account serves as the management account for an organization in AWS Organizations, and that organization has no member accounts. To use AWS SSO, follow the [Getting Started](https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html) guide and the instructions in [Integrating AWS CLI with AWS SSO](https://docs.aws.amazon.com/singlesignon/latest/userguide/integrating-aws-cli.html). For related information, see the [What is AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) and [What is AWS Single Sign-On](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html) guides.
{{< /note >}}

To set up a team, repeat the instructions for individual users above to:
1. Create relevant IAM user groups. See the [Creating IAM user groups](#creating-iam-user-groups) instructions in this topic.
2. Provide any [permissions required](#attaching-permissions-to-a-user-group) to access AWS resources to those user groups. 
3. Create any IAM users and distribute credentials using the instructions above for [individual users](#setting-up-aws-credentials-as-an-individual) as a guide.
4. [Add users](#adding-users-to-a-user-group) to the relevant user groups to grant them permissions they require.

Please read [Working with AWS credentials](#working-with-aws-credentials) to decide the right method for providing AWS IAM credentials for your O3DE project.

## Running your O3DE project on Amazon EC2

If you are running your project on Amazon EC2, you have the additional option of using the underlying [instance profile](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#ec2-instance-profile) to authenticate calls made to AWS. Using the EC2 instance role lets you avoid needing to separately configure AWS credentials on the machine through less secure methods like setting the AWS environment variables through user data at deploy time or manually remoting into the machine to set up a profile.

To use EC2 instance role credentials with your project:
1. Create an EC2 [instance profile](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html) through the Amazon web console or AWS CLI. An instance profile is essentially a container for an IAM role that your EC2 instance can assume to make calls to AWS.
1. Provide the associated IAM role any [permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html) required to access the AWS resources your O3DE project needs.
1. Attach the instance profile to the EC2 instance(s) running your O3DE project. You can attach it to a new instance [at launch time](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/LaunchingAndUsingInstances.html) or you can [attach it to a running instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role). 

The AWS Core Gem also requires that the `AllowAWSMetadataCredentials` setting be set to `true` before it will query the [EC2 instance metadata service (IMDS)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) for credentials. This is to avoid uselessly calling this endpoint when running your O3DE project locally or on untrusted client machines. 

To turn on `AllowAWSMetadataCredentials` in AWSCore:

1. Add it to your `awscoreconfiguration.setreg` [project settings file](./getting-started/#project-settings) at the following path:
```json
{
    "Amazon":
    {
        "AWSCore": {
            "ProfileName": "testprofile",
            "ResourceMappingConfigFileName": "default_aws_resource_mappings.json",
            "AllowAWSMetadataCredentials": true, // example of value set to "true"
        }
    }
}
```
2. **OR** set it to true via the command line when directly invoking the launcher:
```
./MyGame.ServerLauncher.exe --regset="/Amazon/AWSCore/AllowAWSMetadataCredentials=true"
```


## Additional resources

* For general help with AWS CLI configuration commands, see [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).
* For help with configuring credentials for the **AWS C++ SDK**, see [Providing AWS credentials](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/credentials.html).
* For help with managing permissions for AWS resources, see [Policies and permissions in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).
* See the IAM documentation for help with [IAM Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) and [Using IAM Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html).
