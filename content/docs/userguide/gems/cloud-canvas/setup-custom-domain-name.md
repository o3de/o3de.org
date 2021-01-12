---
description: ' Learn how to create a custom domain name and establish TLS handshakes
  to improve security in &ALY; when you connect to the &cloud; APIs. '
title: Improve Security with a Custom Domain Name
---
# Improve Security with a Custom Domain Name<a name="cloud-canvas-setup-custom-domain-name"></a>

To improve security when connecting to the Cloud Canvas APIs, you can enforce a minimum Transport Layer Security \(TLS\) version and cipher suites\. This can be achieved by creating a custom domain name through Amazon API Gateway and establishing TLS handshakes to Cloud Canvas APIs via service URLs that are generated with this custom domain\.

## Create a Custom Domain Name<a name="cloud-canvas-create-custom-domain-name"></a>

For a video tutorial of these steps, see [How do I define a custom domain name for my Amazon API Gateway API?](https://aws.amazon.com/premiumsupport/knowledge-center/custom-domain-name-amazon-api-gateway/)

**To create a custom domain name in API Gateway**

1. Register an internet domain name\.

   You can register an internet domain using [Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide) or using a third\-party domain registrar of your choice\. An API's custom domain name can be the name of a subdomain or the root domain of a registered internet domain\.

1. Request or import an SSL/TLS certificate\.

   Request an SSL/TLS certificate from AWS Certificate Manager \(ACM\), or import an SSL/TLS certificate into ACM\. For more information, see [Get Certificates Ready in AWS Certificate Manager](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains-prerequisites.html)\.

1. Use the API Gateway console to create an edge\-optimized custom domain name\.

   Select **Edge\-optimized** for the endpoint type, and choose the appropriate TLS version\. Then choose the ACM certificate you just requested\. For more information, see [How to Create an Edge\-Optimized Custom Domain Name](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-edge-optimized-custom-domain-name.html)\.  
![\[Choose edge-optimized when creating a custom domain name using the API Gateway console\]](/images/userguide/cloud_canvas/cloud-canvas-create-domain-name.png)

1. Create or update your DNS provider's resource record\.

   After creating a custom domain name, you can check its details by choosing the domain name in the API Gateway console\. Take note of the API Gateway domain name field, which is the default API endpoint\. It has a format of *name*\.cloudfront\.net\. Then create or update your DNS provider's resource record to map your custom domain name to the default API endpoint\. Without such a mapping, API requests bound for the custom domain name cannot reach API Gateway\.

## Create New Cloud Canvas Stacks Using the Custom Domain Name<a name="cloud-canvas-create-stacks"></a>

Use the following steps to create new project and deployment stacks using your custom domain name\.

**To create new project and deployment stacks**

1. To use the custom domain name for all service URLs in your Cloud Canvas project, specify the `custom-domain-name` argument when you create a new project stack using CLI commands\.

   The following command is an example\.

   ```
   lmbr_aws project create --stack-name SampleProject --region us-east-1 --custom-domain-name example.com
   ```

   When the new project stack is created, you can create multiple deployments using normal CLI commands, without any additional change\. All `ServiceApi` resources created within the project and deployment stacks generate a unique base path under the custom domain name, which is mapped to the actual API stage\. Base paths have the format of \{region\}\.\{stage\}\.\{rest\_api\_id\}\. You can find all these mappings in the API Gateway console\.  
![\[Find API mappings in the API Gateway console\]](/images/userguide/cloud_canvas/cloud-canvas-api-mappings.png)

1. Verify local mappings files\.

   Service URLs generated from your project and deployment stacks have the format of `https://{custom_domain_name}/{region}.{stage}.{rest-api-id}`, which is also reflected in your local mappings files \(`deploymentName.server.awsLogicalMappings.json`, `deploymentName.player.awsLogicalMappings.json`, and `user-settings.json`\)\.

   To verify the correctness of the local mapping files, look for the URL for your service API\. If the feature is enabled successfully, the service API URL should contain the custom domain name\.

   Clients can then use these custom service URLs to make their requests\.

## Update Existing Cloud Canvas Stacks Using the Custom Domain Name<a name="cloud-canvas-update-stacks"></a>

Updating your old project and deployment stacks to use the custom domain name requires manual inputs and exposes the stacks to risk of rollback failure\. New versions of custom resource handlers are created when you update the custom domain name, but they are not be used to process events because custom resources are locked by default to the version of the code that you used to create the resources\. For more information, see [Versioning of Custom Resources](/docs/userguide/gems/cloud-canvas/cgf-adding-aws-resources-versioning.md)\.

If necessary, you can override the locking of a custom resource to the version of the code with which it was created using the following steps\.

**To update your existing project and deployment stacks**

1. Update your existing project stack using the `project update` command and the `custom-domain-name` argument\.

   ```
   lmbr_aws project update --custom-domain-name example.com
   ```

1. Set the `CustomResourceVersion` in your project template\.

   1. Open the AWS Lambda console and find the custom resource handler for `ServiceApi` resources, which has a name like `SampleProject-CRH-CoreResourceTypes-Custom_ServiceApi`\. Make a note of the new Lambda version number after the update\.  
![\[Find the latest version number of the custom resource\]](/images/userguide/cloud_canvas/cloud-canvas-custom-service-api-versions.png)

   1. Edit the definition of `ServiceApi` resource in `dev\Gems\CloudGemFramework\v1\ResourceManager\resource_manager\templates\project-template.json`\. Add the metadata field and specify the custom resource version number\.

      ```
      "ServiceApi": {
          "Metadata": {
              "CloudCanvas": {
                  "CustomResourceVersion": "2"
              }
          },
          "Properties": {
              ...
          },
          "Type": "Custom::ServiceApi",
          "DependsOn": [
              "CoreResourceTypes"
          ]
      }
      ```

1. Update your project stack again using the same CLI command that you used in step 1, with the `custom-domain-name` argument specified\. The specified version of the Lambda functions processes the resources this time and the custom domain name is used to generate service URLs\.

   Alternatively, you could have set `CustomResourceVersion` in the template to `$LATEST` before the first update to your project stack and only updated the project stack once\. This practice is **not recommended** for environments where failed stack updates cannot be tolerated\. Using `$LATEST` replicates the unsafe behavior in previous versions of Lumberyard where the most recent Lambda code version is used to process custom resource instance events\. 

1. Update your deployment stacks using the normal CLI commands without any additional change\.

1. Update the resource templates defined in each enabled cloud gem\. `ServiceApi` resources might be defined in each of these gems\. Check the definition in `resource-template.json` under each gem and specify the same custom resource version number as you did for the project `ServiceApi` resource\. You need to do something similar for any custom resource defined in your project or deployment stacks that uses service URLs directly, such as `CrossGemCommunicationInterfaceResolver` \(defined in `dev\Gems\CloudGemFramework\v1\ResourceManager\resource_manager\config.py`\)\. Find the custom resource handlers in the AWS Lambda console and update the resource definitions with `CustomResourceVersion`\.

1. Update your deployment stacks again after the template updates\. To do this, re\-process the resources with the specified version of Lambda functions\.

   You can set `CustomResourceVersion` to `$LATEST` in the templates before updating the deployment stacks to avoid updating them twice as well, but this practice is **not recommended** for environments where failed stack updates cannot be tolerated\.

1. Verify local mappings files\.

   Service URLs generated from your project and deployment stacks have the format of `https://{custom_domain_name}/{region}.{stage}.{rest-api-id}`, which is also be reflected in your local mappings files \(`deploymentName.server.awsLogicalMappings.json`, `deploymentName.player.awsLogicalMappings.json`, and `user-settings.json`\)\.

   To verify the correctness of the local mapping files, look for the URL for your service API\. If the feature is enabled successfully, the service API URL should contain the custom domain name\.

   Clients can then take advantage of these custom service URLs to make their requests\.