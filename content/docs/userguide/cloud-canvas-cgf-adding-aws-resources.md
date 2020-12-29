# Adding AWS Resources to a Cloud Gem<a name="cloud-canvas-cgf-adding-aws-resources"></a>

Cloud Canvas cloud gems can be used out of the box, without interacting with the code and the [Cloud Gem Framework](cloud-canvas-cloud-gem-framework-intro.md) that powers them\. However, you might be interested in modifying existing cloud gems and creating your own cloud gems, possibly for distribution to others\. If so, you might need to add support for additional AWS CloudFormation types beyond the ones natively supported by Cloud Canvas\. This topic provides information on how to do that\.

Cloud Canvas gems provide AWS CloudFormation templates that specify the AWS resources that the gem requires\. AWS CloudFormation templates support AWS resource types, which are prefixed with `AWS::`\. They also support `AWS::CloudFormation::CustomResource` custom resource types or any resource type prefixed with `Custom::`\.

The template file for a cloud gem is located at `lumberyard_version\dev\Gems\gem_name\AWS\resource_template.json`\. The `resource_template.json` file is a specialized version of a AWS CloudFormation template that provides metadata specific to Cloud Canvas\.

While AWS CloudFormation templates support a large catalog of AWS resource types, the templates for Cloud Canvas gems are more limited in scope\. When creating a Cloud Canvas gem, you have the following options:
+ Use one of the subset of types in the `AWS::` namespace that are directly supported by Cloud Canvas \(no additional work required\)\.
+ Add support for `AWS::` types not already supported by Cloud Canvas\. 
+ Add your own `Custom::*` resource types that execute custom Lambda function code when instances of that type are created, modified or deleted\. 

  Custom resources are a good way to integrate your in\-house services and access AWS services that are not directly supported\.

**Topics**
+ [Resource Type Specification](cloud-canvas-cgf-adding-aws-resources-resource-type-specification.md)
+ [Adding Support for New AWS:: and Custom:: Types](cloud-canvas-cgf-adding-aws-resources-adding-support-for-new-aws-and-custom-types.md)
+ [Versioning of Custom Resources](cloud-canvas-cgf-adding-aws-resources-versioning.md)