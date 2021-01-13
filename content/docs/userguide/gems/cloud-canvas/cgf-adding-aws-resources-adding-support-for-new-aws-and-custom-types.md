---
description: ' Add support for &AWS; and custom resource types in your cloud gem for
  &ALYlong;. '
title: 'Adding Support for New &AWS;:: and Custom:: Types'
---
# Adding Support for New AWS:: and Custom:: Types {#cloud-canvas-cgf-adding-aws-resources-adding-support-for-new-aws-and-custom-types}

The steps to create a `Custom::` type and an `AWS::` type are almost identical\. The main difference is that a custom type must execute a Lambda function when an instance of the type is created, updated or deleted\. A custom type must therefore supply values for `LambdaConfiguration` \(optionally for `LambdaTimeout`\) and for `HandlerFunction`\. An AWS type needs to call a Lambda function only if it cannot supply its ARN from simple string substitution of the values in the `ArnFormat` field\. Therefore, for most AWS types, you can omit the `LambdaConfiguration`, `LambdaTimeout`, and `HandlerFunction` fields from the template entirely\.

**To add an `AWS::` resource type**

1. If your gem does not have a `project-template.json` file in its `AWS` directory, create the file and give it the following structure:

   ```
   {
       "Resources": {
       }
   }
   ```

1. Create a new resource in your `project-template.json` file of the type `Custom::ResourceTypes`\. The type should have properties that correspond to the [Resource Type Specification](/docs/userguide/gems/cloud-canvas/cgf-adding-aws-resources-resource-type-specification.md)\. You can use a single `Custom::ResourceTypes` entry for multiple resource definitions\.

1. To add a resource definition with the `AWS::`\-prefixed typename to the resource, do one of the following:
   + If the ARN is easily computable from the region, account ID, and resource name fields, specify the corresponding formatting pattern in the `ArnFormat` field\.
   + If the ARN is not easily computable from the region, account ID, and resource name fields, perform the following steps:

   1. Create a uniquely named *lambda\-directory\-name* directory for your gem as follows:

      `AWS\project-code\lambda-code\lambda-directory-name\resource_types`

   1. In your `Resources` block, add a resource with a custom *<lambda\-resource\-name>* name as the key\. Create the *<lambda\-resource\-definition>* contents following the [Resource Type Specification](/docs/userguide/gems/cloud-canvas/cgf-adding-aws-resources-resource-type-specification.md)\.

   1. Replace the *lambda\-directory\-name* in the definition with the *lambda\-directory\-name* that you created\.

   1. Add the `LambdaConfiguration` field \(and optionally the `LambdaTimeout` field\) to the main `Properties` section of your resource definition\. Replace *<lambda\-resource\-name>* with your *<lambda\-resource\-name>* in the *<lambda\-configuration>* block\.

   1. Write a Lambda function that returns the ARN for a resource of your type\. Place the Lambda function in your gem's `AWS\project-code\lambda-code\lambda-directory-name\resource_types` directory\.

   1. Add an `ArnFunction` field to your resource definition as a dictionary\. In the dictionary, add the following items:
      + In the `Function` field, provide the name of the handler in the format `Module.Function`\.
      + If your function requires access to any AWS services, create a `PolicyStatement` field and add the necessary policy statements to it\.

1. Provide any relevant display information or links in the `DisplayInfo` field\.

1. Add a resource of your `AWS::`\-prefixed type to your `resource-template.json` file\.

**To add a `Custom::` resource type**

1. If your gem does not already have a `project-template.json` file in its AWS directory, create the file and give it the following structure:

   ```
   {
       "Resources": {
       }
   }
   ```

1. Create a new resource in your `project-template.json` file of the type `Custom::ResourceTypes`\. The type should have properties that correspond to the [Resource Type Specification](/docs/userguide/gems/cloud-canvas/cgf-adding-aws-resources-resource-type-specification.md)\. You can use a single `Custom::ResourceTypes` entry for multiple resource definitions\.

1. Create a uniquely named *lambda\-directory\-name* directory for your gem as follows:

   `AWS\project-code\lambda-code\lambda-directory-name\resource_types`

1. In your `Resources` block, add a resource with a custom *<lambda\-resource\-name>* name as the key\. Create the *<lambda\-resource\-definition>* contents following the [Resource Type Specification](/docs/userguide/gems/cloud-canvas/cgf-adding-aws-resources-resource-type-specification.md)\.

1. Replace the *lambda\-directory\-name* in the definition with the *lambda\-directory\-name* that you created\.

1. Add the `LambdaConfiguration` field \(and optionally the `LambdaTimeout` field\) to the main `Properties` section of your resource definition\. Replace *<lambda\-resource\-name>* with your *<lambda\-resource\-name>* in the *<lambda\-configuration>* block\.

1. To add a resource definition with your own the `Custom::` prefixed type name to the resource, perform the following steps:

   1. Specify any role metadata or restrictions for the type in the `PermissionMetadata` field\.

   1. Provide a reference to your service API in the `ServiceApi` field\.

   1. Write a Lambda function that processes `Create`, `Update` and `Delete` events for the custom resource\. Place the code in your `AWS\project-code\lambda-code\lambda-foldername\resource_types` directory\.

   1. Add a `HandlerFunction` field to your resource definition as a dictionary\. In the dictionary, add the following items:
      + In the `Function` field, provide the name of the handler in the format `Module.Function`\.
      + If your function requires access to any AWS services, create a `PolicyStatement` field and add the necessary policy statements to it\.

   1. If the ARN is easily computable from the region, account ID and resource name fields, specify the formatting pattern as the `ArnFormat` field\.

   1. If the ARN is not easily computable from the region, account ID, and resource name fields, perform the following steps:

      1. Write a Lambda function that returns the ARN for a resource of your type\. Place the Lambda function in your gem's `AWS\project-code\lambda-code\lambda-directory-name\resource_types` directory\. You can use the same file as you did for your main handler and just give the function a different name \(for example, `arn_handler`\.\)

      1. Add an `ArnFunction` field to your resource definition as a dictionary\. In the dictionary, add the following items:
         + In the `Function` field, provide the name of the handler in the format `Module.Function`\.
         + If your function requires access to any AWS services, create a `PolicyStatement` field and add the necessary policy statements to it\.

1. Provide any relevant display information or links in the `DisplayInfo` field\.

1. Add a resource of your `Custom::` prefixed type to your `resource-template.json` file\.