# Lambda Language Support in the Cloud Gem Framework<a name="cloud-canvas-cgf-lambda-languages"></a>

Lumberyard has support for Lambda deployment packages that include Lambda functions written in Node\.js, Python 3\.7 or later, Java, Go, or the \.NET framework\.

**To add a non\-Python Lambda function to a cloud gem**

1. Add a new Lambda function and Lambda configuration to the `Resources` block of your `resource_template.json` file\.

   The following example shows the entries for the \.NET Lambda function in the `resource_template.json` file of the AWS Lambda Language Demo cloud gem\.

   ```
   [ … ]
       "Resources": {
           "AccessControl": {
               "DependsOn": [
                   "PythonLambda",
                   "JavaJarLambda",
                   "DotnetLambda",
                   "GoLambda",
                   "NodeLambda"
               ], 
               "Properties": {
                   "ConfigurationBucket": {
                       "Ref": "ConfigurationBucket"
                   }, 
                   "ConfigurationKey": {
                       "Ref": "ConfigurationKey"
                   }, 
                   "ServiceToken": {
                       "Ref": "ProjectResourceHandler"
                   }
               }, 
               "Type": "Custom::AccessControl"
           },
   [ … ]
   "DotnetLambda": {
       "Properties": {
           "Code": {
               "S3Bucket": {
                   "Fn::GetAtt": [
                       "DotnetLambdaConfiguration",
                       "ConfigurationBucket"
                   ]
               },
               "S3Key": {
                   "Fn::GetAtt": [
                       "DotnetLambdaConfiguration",
                       "ConfigurationKey"
                   ]
               }
           },
           "Handler": "DotnetLambda::DotnetLambda.Function::FunctionHandler",
           "Role": {
               "Fn::GetAtt": [
                   "DotnetLambdaConfiguration",
                   "Role"
               ]
           },
           "Environment": {
               "Variables": {
                   "Fn::GetAtt": [
                       "DotnetLambdaConfiguration",
                       "CCSettings"
                   ]
               }
           },
           "Runtime": {
               "Fn::GetAtt": [
                   "DotnetLambdaConfiguration",
                   "Runtime"
               ]
           }
       },
       "Type": "AWS::Lambda::Function"
   },
   "DotnetLambdaConfiguration": {
       "Properties": {
           "ConfigurationBucket": {
               "Ref": "ConfigurationBucket"
           },
           "ConfigurationKey": {
               "Ref": "ConfigurationKey"
           },
           "FunctionName": "DotnetLambda",
           "Runtime": "dotnetcore1.0",
           "ServiceToken": {
               "Ref": "ProjectResourceHandler"
           }
       },
       "Type": "Custom::LambdaConfiguration"
   },
   [ … ]
   ```

1. Follow the instructions in [Creating a Deployment Package](https://docs.aws.amazon.com/lambda/latest/dg/deployment-package-v2.html) to create a Lambda function deployment package for the runtime that you are using\.

1. Use the `FunctionName` property of the function's `LambdaConfiguration` section to name the packaged `.zip` or `.jar` file\.

1. Put the package file \(for example, `DotnetLambda.zip`\) in the `lumberyard_version\dev\Gems\gem_directory\vN\AWS\lambda-code\` directory\.

## Notes<a name="cloud-canvas-cgf-lambda-languages-notes"></a>

When you create non\-Python Lambda functions for use with Cloud Canvas, note the following:
+ The Visual Studio tools for \.NET Lambda functions do not generate a Lambda function deployment package automatically\. For steps, see [\.NET Core CLI](https://docs.aws.amazon.com/lambda/latest/dg/lambda-dotnet-coreclr-deployment-package.html) in the *AWS Lambda Developer Guide*\.
+ When you use the [Eclipse IDE](https://en.wikipedia.org/wiki/Eclipse_(software)) and [Apache Maven](https://en.wikipedia.org/wiki/Apache_Maven) to build a Java `.jar` package, Maven generates a `.jar` file named `project-SNAPSHOT.jar`\. The Cloud Canvas uploader supports this naming convention and the `project.jar` file\.
+ Each runtime has its own format for the `Handler` property\. See the following table\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-cgf-lambda-languages.html)

## Examples and Sample Level<a name="cloud-canvas-cgf-lambda-languages-examples-and-sample-level"></a>

The AWS Lambda Language Demo cloud gem included with Lumberyard contains skeleton "Hello World" Lambda function examples in Python, Java, \.NET, Go, and node\.js\. You can find the relevant files in the `lumberyard_version\dev\Gems\AWSLambdaLanguageDemo\v1\AWS\lambda-code` directory\.

### Running the Sample Level<a name="cloud-canvas-cgf-lambda-languages-running-the-sample-level"></a>

The CloudGemSamples project cloud gem includes a sample level named LambdaLanguage that shows Cloud Canvas support for Lambda languages\.

#### Prerequisites<a name="cloud-canvas-cgf-lambda-languages-sample-level-prerequisites"></a>

Running the sample requires the following prerequisites:
+ You are using Lumberyard version 1\.16 or later\.
+ Your Lumberyard project has the CloudGemSamples project enabled \(in the [Project Configurator](configurator-intro.md), choose **CloudGemSamples**\)\.
+ You used the [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md) or the [lmbr\_aws command line tool](cloud-canvas-command-line.md) to create the following:
  + A [project stack](cloud-canvas-ui-rm-project-stack.md) for your project\.
  + A [deployment](cloud-canvas-ui-rm-deployments.md) for your project that includes the **AWSLambdaLanguageDemo** resource group\.

**To run the LambdaLanguage sample level**

1. In Lumberyard Editor, choose **File**, **Open** or press **Ctrl\+O**\.

1. In the **Open a Level** dialog box, expand **Levels**\.

1. Choose **LambdaLanguage**, and then click **Open**\.

1. Click **Play Game** or press **Ctrl\+G** to switch to gameplay mode\. After a short pause, a message reports success, as seen in the following image\.  
![\[Lambda functions in different languages report success in the LambdaLanguage sample level\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-lambda-languages-1.png)

### Additional Resources<a name="cloud-canvas-cgf-lambda-languages-additional-resources"></a>

For information on how the sample applications were built, see the following topics in the [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/)\.


****  

| Sample Application | Resource Page | 
| --- | --- | 
| DotNetLambda | [AWS Toolkit for Visual Studio](https://docs.aws.amazon.com/lambda/latest/dg/lambda-dotnet-create-deployment-package-toolkit.html) and [\.NET Core CLI](https://docs.aws.amazon.com/lambda/latest/dg/lambda-dotnet-coreclr-deployment-package.html) | 
| GoLambda | [Creating a Deployment Package \(Go\)](https://docs.aws.amazon.com/lambda/latest/dg/lambda-go-how-to-create-deployment-package.html) | 
| JavajarLambda | [Creating a \.jar Deployment Package Using Maven and Eclipse IDE \(Java\)](https://docs.aws.amazon.com/lambda/latest/dg/java-create-jar-pkg-maven-and-eclipse.html) | 
| NodeLambda | [Creating a Deployment Package \(Node\.js\)](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html) | 