---
description: ' Learn about the Dynamic Cloud Gem manifest files, EBus events, and
  service API in &ALYlong;. '
slug: cloud-canvas-cloud-gem-dc-engineering
title: Dynamic Content Engineering Details
---
# Dynamic Content Engineering Details<a name="cloud-canvas-cloud-gem-dc-engineering"></a>

This topic provides programmatic details about the dynamic content update process\. This includes manifest file information, Dynamic Content Cloud Gem EBus events, and Dynamic Content Cloud Gem service API\. For information about the `lmbr_aws` CLI extensions enabled by the Dynamic Content Cloud Gem, see [Using the Dynamic Content Command Line](/docs/userguide/gems/cloud-canvas/dc-lmbr-aws.md)\.

## Manifest File<a name="cloud-canvas-cloud-gem-dc-engineering-manifest-file"></a>

In your Lumberyard installation, the default location of the manifest file is `<GameFolder>/AWS/DynamicContent/DynamicContentManifest.json`\.

The following is a simple example manifest for the `SamplesProject` `DontDie` sample\.

```
"Files": [
{
"hash": "3bebdb5bdb8cff74642e5f7f3dc4e900", 
"outputRoot": "@user@", 
"bucketPrefix": "static-data", 
"keyName": "gameproperties.csv", 
"cacheRoot": "@assets@", 
"platformType": "", 
"localFolder": "staticdata/csv"
}
]
```

The following table describes the properties in the manifest file\.


****  

| Property | Description | 
| --- | --- | 
| hash | MD5 hash of the file\. | 
| outputRoot | Base output directory\. | 
| bucketPrefix | Prefix inside the bucket for the file | 
| keyName | Name of the file key in the bucket, which will be appended to the beginning of the hash\. The final key name has the format bucketPrefix/keyName\. | 
| cacheRoot | Root directory to search for copies of the outdated file asset\. | 
| platformType | Windows \(pc\), macOS \(osx\_gl\), or Linux \(linux\)\. An empty value specifies all operating systems\. | 
| localFolder | Directory to write locally within the outputRoot\. The full output has the format outputRoot/localFolder/keyName\. | 

## EBus Events<a name="cloud-canvas-cloud-gem-dc-engineering-ebus-events"></a>

The Dynamic Content Cloud Gem provides an EBus API and includes calls exposed to Lua\. The basic top\-level update request looks like this:

```
CloudCanvas::DynamicContent::DynamicContentRequestBus::BroadcastResult(
      requestSuccess,
      &CloudCanvas::DynamicContent::DynamicContentRequestBus::Events::RequestManifest, 
      manifestName)
```

`requestSuccess (bool)` – Specifies whether the request was successfully sent\.

`manifestName (char*)` – Name of the manifest file \(for example, `DynamicContentTest.json`\)\. The system handles `.pak` file and operating system naming conventions \(for example, `DynamicContentTest.shared.pak`\)\.

**Requesting pak files without using manifest**  
Use the following API calls to request pak files without using a manifest:

```
CloudCanvas::DynamicContent::DynamicContentRequestBus::BroadcastResult(
      requestSuccess, 
      &CloudCanvas::DynamicContent::DynamicContentRequestBus::Events::UpdateFileStatusList, 
      uploadRequests, 
      autoDownload);
```

`requestSuccess (bool)` – Specifies whether the request was successfully sent\.

`uploadRequests (AZStd::vector<AZStd::string>)` – List of bucket keys\.

`autoDownload (bool)` – Specify `true` to download files automatically\.

```
CloudCanvas::DynamicContent::DynamicContentRequestBus::BroadcastResult(
      requestSuccess, 
      &CloudCanvas::DynamicContent::DynamicContentRequestBus::Events::UpdateFileStatus, 
      fileName, 
      autoDownload);
```

`requestSuccess (bool)` – Specifies whether the request was successfully sent\.

`fileName (char*)` – Name of the pak file to request\.

`autoDownload (bool)` – Specify `true` to download files automatically\.

### Versioning Support<a name="cloud-canvas-cloud-gem-dc-engineering-ebus-events-versioning"></a>

**Requesting pak files using versioned manifest**  
Use the following API calls to request pak files using a manifest when versioning is enabled:

```
CloudCanvas::DynamicContent::DynamicContentRequestBus::BroadcastResult(
      requestSuccess, 
      &CloudCanvas::DynamicContent::DynamicContentRequestBus::Events::RequestVersionedManifest, 
      manifestName, 
      versionId);
```

`requestSuccess (bool)` – Specifies whether the request was successfully sent\.

`manifestName (char*)` – Name of the manifest file \(for example, `DynamicContentTest.json`\)\. The system handles `.pak` file and operating system naming conventions \(for example, `DynamicContentTest.shared.pak`\)\.

`versionId (char*)` – Version ID of the manifest\. Uses the current active \(public\) version if not specified\.

```
CloudCanvas::DynamicContent::DynamicContentRequestBus::BroadcastResult(
      requestSuccess, 
      &CloudCanvas::DynamicContent::DynamicContentRequestBus::Events::RequestVersionedFileStatus, 
      fileName, 
      outputFile, 
      versionId);
```

`requestSuccess (bool)` – Specifies whether the request was successfully sent\.

`fileName (char*)` – Name of the pak file to request\.

`outputFile (char*)` – Name of the output pak file\.

`versionId (char*)` – Version ID of the file\. Uses the current active \(public\) version if not specified\.

**Requesting pak files without using manifest**  
Use the following API calls to request files without using a manifest when versioning is enabled:

```
CloudCanvas::DynamicContent::DynamicContentRequestBus::BroadcastResult(
      requestSuccess, 
      &CloudCanvas::DynamicContent::DynamicContentRequestBus::Events::UpdateVersionedFileStatusList, 
      requestMap, 
      autoDownload);
```

`requestSuccess (bool)` – Specifies whether the request was successfully sent\.

`requestMap (AZStd::unordered_map<AZStd::string, AZStd::string>)` – Map of file names to file version IDs\.

`autoDownload (bool)` – Specify `true` to download files automatically\.

```
CloudCanvas::DynamicContent::DynamicContentRequestBus::BroadcastResult(
      requestSuccess, 
      &CloudCanvas::DynamicContent::DynamicContentRequestBus::Events::UpdateVersionedFileStatus, 
      fileName, 
      autoDownload, 
      versionId);
```

`requestSuccess (bool)` – Specifies whether the request was successfully sent\.

`fileName (char*)` – Name of the pak file to request\.

`autoDownload (bool)` – Specify `true` to download files automatically\.

`versionId (char*)` – Version ID of the file\. Uses the current active \(public\) version if not specified\.

### Manifest Received<a name="cloud-canvas-cloud-gem-dc-engineering-manifest-received"></a>

The following EBus events are triggered when a manifest has been received successfully or unsuccessfully\.

#### Success<a name="cloud-canvas-cloud-gem-dc-engineering-manifest-received-success"></a>

```
EBUS_EVENT(CloudCanvas::DynamicContent::DynamicContentRequestBus, ManifestUpdated, bucketName, bucketPrefix)
```

When all `.pak` files are complete, a `RequestCompleted` event is broadcast\.

#### Failure<a name="cloud-canvas-cloud-gem-dc-engineering-manifest-received-failure"></a>

```
EBUS_EVENT(CloudCanvas::DynamicContent::DynamicContentRequestBus, ManifestFailed, bucketName, bucketPrefix, errorStr)
```

## Service API<a name="cloud-canvas-cloud-gem-dc-engineering-serviceapi"></a>

The Dynamic Content Cloud Gem exposes API calls through Amazon API Gateway for both the Cloud Gem Portal and the game client\.

The following tables list the calls for the portal\.


****  

| Portal API Call | Description | 
| --- | --- | 
| /service/status GET  | Returns the service's status\. | 
| /portal/info/\{file\_name\} GET  | Return detailed information about a specific file\. This includes the file's name, staging status, staging start and end dates \(optional\), and parent \(optional\)\. | 
| /portal/info/\{file\_name\} DELETE  | Request deletion of an existing item from the bucket and table\. | 
| /portal/content GET  | Request the list of files to display in the web portal\. | 
| /portal/content DELETE  | Request to deletion of all content from the bucket and staging table\. | 
| /portal/content POST  | Request alteration of the staging settings on a provided list of files\. | 

The following table lists the calls for the client\.


****  

| Client API Call | Description | 
| --- | --- | 
| /client/content POST | Request presigned URLs for a list of files, based on the provided version IDs\. The active version will be returned if no version ID is specified\. Returns the URLs or a failure message\. | 

## Using Amazon CloudFront<a name="cloud-canvas-cloud-gem-dc-engineering-cloudfront"></a>

Amazon CloudFront is a fast content delivery network \(CDN\) service that can extend S3 to securely deliver data to customers with low latency and high transfer speeds at an additional cost\. You can take advantage of it when using the DynamicContent gem\. To learn more about Amazon CloudFront, read [the Amazon CloudFront documentation](https://aws.amazon.com/cloudfront/)\.

### Enable the CloudFront extension<a name="cloud-canvas-cloud-gem-dc-engineering-cloudfront-enable"></a>

To enable the Amazon CloudFront feature, add deployment tag `content-distribution` when you create a deployment with **CloudGemDynamicContent** enabled:

lmbr\_aws deployment create \-\-deployment \{deployment\_name\} \-\-tags content\-distribution

To learn how to create a project stack and deployment stack using CloudCanvas command line, read [Using the Cloud Canvas Command Line](https://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-command-line.html)\.

Using this deployment tag will add a few more AWS resources to your deployment stack including a Amazon CloudFront distribution and an S3 bucket\. All of the signed URLs from the DynamicContent gem will be created using Amazon CloudFront automatically after the feature is enabled\.

### Create and upload CloudFront key pairs<a name="cloud-canvas-cloud-gem-dc-engineering-cloudfront-upload"></a>

Each AWS account that you use to create Amazon CloudFront signed URLs or signed cookies—your trusted signers—must have its own Amazon CloudFront key pair, and the key pair must be active\. This is required for using Amazon CloudFront with the DynamicContent gem\. Read the AWS document [Creating Amazon CloudFront Key Pairs for Your Trusted Signers](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-creating-cloudfront-key-pairs) to learn how to create your own key pairs\. 

**Note that IAM users can't create Amazon CloudFront key pairs\. You must log in using root credentials to create key pairs\. To learn more about the root credentials, read [The AWS Account Root User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html)\.**

After you have created and downloaded the key pairs, upload your private key using the following CLI command:

lmbr\_aws dynamic\-content upload\-cf\-key \-\-key\-path \{path\_to\_private\_key\} \-\-deployment\-name \{deployment\_to\_use\}

The expected name format for your private key is `pk-<accountkey>.pem`\. Your key will be securely stored in an S3 bucket called `AccessBucket`\.

### Invalidate files from CloudFront edge caches<a name="cloud-canvas-cloud-gem-dc-engineering-cloudfront-invalidate"></a>

By default, Amazon CloudFront caches a response from Amazon S3 for 24 hours\. If your request lands at an edge location that served the Amazon S3 response within 24 hours, Amazon CloudFront uses the cached response even if you updated the content in Amazon S3\. In this case, you may get outdated content after uploading the same named files\.

When updating your content you can invalidate the cache for files being update by adding the `--invalidate-existing-files` argument to your CLI command:

lmbr\_aws dynamic\-content upload\-manifest\-content \-\-manifest\-path \{path\_to\_manifest\} \-\-deployment\-name \{deployment\_to\_use\} \-\-staging\-status \{staging\_status\} \-\-invalidate\-existing\-files

You can also invalidate the cached response for a specific file using the following CLI command:

lmbr\_aws dynamic\-content invalidate\-file \-\-file\-path \{file\_name\_in\_s3\_bucket\} \-\-caller\-reference \{unique\_identity\}

`--caller-reference` requires a value that you specify to uniquely identify an invalidation request\. Amazon CloudFront uses the value to prevent you from accidentally resubmitting an identical request\. If you make a second invalidation request with the same value for caller reference, and if the rest of the request is the same, Amazon CloudFront doesn't create a new invalidation request\.