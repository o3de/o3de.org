# Running AWS API Jobs Using the Cloud Gem Framework<a name="cloud-canvas-cgf-aws-api-jobs"></a>

****  
The Cloud Gem Framework and this documentation are in preview release and are subject to change\.

The Cloud Gem Framework Gem provides C\+\+ classes that can execute any C\+\+ AWS API call by using the Lumberyard job execution system\. This allows the operation to be performed on background threads that are managed by the job system\. 

**To use AWS API Jobs in your project**

1. In the [Creating Lumberyard projects](configurator-intro.md), enable the **Cloud Canvas Common** and **Cloud Gem Framework** gems for your project\.

1. We recommend that you put the code that uses AWS in a gem, but this is not required\. If you do use a gem, make the **Cloud Gem Framework** and **Cloud Canvas Common** gems dependencies of your gem by adding the following to your gem's `gem.json` file\.

   ```
   "Dependencies": [
       {
           "Uuid" : "6fc787a982184217a5a553ca24676cfa",
           "VersionConstraints": [ "~>0.1" ],
           "_comment": "CloudGemFramework"
       },
       {
           "Uuid" : "102e23cf4c4c4b748585edbce2bbdc65",
           "VersionConstraints": [
               "~>0.1"
           ],
           "_comment": "CloudCanvasCommon"
       }
   ],
   ```

1. Activate your gem for your project\.

1. In your gem or game project's `.wscript` file, make the following changes:

   1. To the list of includes, add:

      ```
      bld.Path('Code/SDKs/AWSNativeSDK/include')
      ```

   1. To the list of used static libraries, add `CloudGemFrameworkStaticLibrary`\.

   1. Add `AWS_CPP_SDK_CORE` and other AWS API dynamic libraries as required\. For a list of available aliases like `AWS_CPP_SDK_LAMBDA` and other library names, see the `dev\_WAF_\3rd_party\aws_native_sdk_shared.json` file\.

   1. Add the security libraries for operating systems other than Windows, as in the following `.wscript` file for a gem\.

      ```
      SUBFOLDERS = []
      
      def build(bld):
      
          import lumberyard_sdks
      
          bld.DefineGem(
              includes = [bld.Path('Code/SDKs/AWSNativeSDK/include')],
              file_list = ['cloudcanvassample.waf_files'],
              use = ['CloudGemFrameworkStaticLibrary'],
              uselib = ['AWS_CPP_SDK_CORE', 'AWS_CPP_SDK_LAMBDA'],
              darwin_lib = ['curl'],
              linux_lib = ['curl'],
              ios_lib = ['curl'],
              appletv_lib = ['curl'],
              
              ios_framework = [ 'security' ],
              appletv_framework = [ 'security' ]
          )
      
          bld.recurse(SUBFOLDERS)
      ```

1. Include the `CloudGemFramework\AwsApiJob.h` header and the AWS SDK header files that are required for calling an API, as in the following example:

   ```
   #include <CloudGemFramework/AwsApiRequestJob.h>
   
   #pragma warning(disable: 4355) // <future> includes ppltasks.h which throws a C4355 warning: 'this' used in base member initializer list
   #include <aws/lambda/LambdaClient.h>
   #include <aws/lambda/model/InvokeRequest.h>
   #include <aws/lambda/model/InvokeResult.h>
   #include <aws/core/utils/Outcome.h>
   #include <aws/core/utils/memory/stl/AWSStringStream.h>
   #pragma warning(default: 4355)
   ```

1. Using code similar to the following, run an AWS API job\. An alternative approach is to extend the job class \(like `LambdaInvokeRequestJob` in the example\) and provide overrides for the `OnSuccess` and `OnFailure` methods\.

   ```
   using LambdaInvokeRequestJob = AWS_API_REQUEST_JOB(Lambda, Invoke);
   
   auto job = LambdaInvokeRequestJob::Create(
       [](LambdaInvokeRequestJob* job) // OnSuccess handler - runs on job thread
       {
           Aws::IOStream& stream = job->result.GetPayload();
           std::istreambuf_iterator<AZStd::string::value_type> eos;
           AZStd::string content = AZStd::string{std::istreambuf_iterator<AZStd::string::value_type>(stream),eos};
           AZ_Printf("Example", "Got response %s", content.c_str());
       },
       [](LambdaInvokeRequestJob* job) // OnError handler (optional) - runs on job thread
       {
           AZ_Printf("Example", "Was error %s", job->error.GetMessageA().c_str());
       }
   );
   
   AZStd::string content = "...";
   
   std::shared_ptr<Aws::StringStream> stream = std::make_shared<Aws::StringStream>();
   *stream << content.c_str();
   
   job->request.SetFunctionName("...");
   job->request.SetBody(stream);
   job->Start();
   ```

1. If your project uses the **Cloud Canvas Resource Manager**, get the physical resource ID and the logical resource ID of the AWS resource for each resource group\. These IDs cause your AWS API call to use the correct resource for the active deployment\. This ensures that your development, test, and released versions of a game don't interfere with each other\.

   ```
   #include <CloudCanvasCommon/CloudCanvasCommonBus.h>
    
   AZStd::string functionName;
   EBUS_EVENT_RESULT(functionName, CloudCanvasCommon::CloudCanvasCommonRequestBus, GetLogicalToPhysicalResourceMapping, "RESOURCE-GROUP.RESOURCE");
   
   job->request.SetFunctionName(functionName.c_str());
   ```

1. If your project uses the **Cloud Canvas Resource Manager**, the AWS API is called using the player's AWS credentials\. These credentials are provided by the anonymous Amazon Cognito Identitypool that Cloud Canvas creates for your project\. If you do not use **Cloud Canvas Resource Manager** or want to use other credentials, you can use code like the following to override the default configuration\.

   ```
   #include <aws/core/auth/AWSCredentialsProvider.h>
   
   LambdaInvokeRequestJob::Config config(LambdaInvokeRequestJob::GetDefaultConfig());
   const char* accessKey = "...";
   const char* secretKey = "...";
   config.credentialsProvider = std::make_shared<Aws::Auth::SimpleAWSCredentialsProvider>(accessKey, secretKey);
   config.requestTimeoutMs = 20000;
   
   auto job = LambdaInvokeRequestJob::Create(
       ..., // OnSuccess handler
       ..., // OnError handler
       &config
   );
   ```