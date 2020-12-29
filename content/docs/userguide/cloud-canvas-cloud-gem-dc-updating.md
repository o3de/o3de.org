# Updating Dynamic Content<a name="cloud-canvas-cloud-gem-dc-updating"></a>

To update dynamic content you can use either the Dynamic Content Manager user interface or the `lmbr_aws` CLI to upload new manifest content\. We recommend that you enable dynamic content versioning to pre\-stage and schedule the release of new versions so that players can still download previous versions while new content is uploaded\. Dynamic content versioning also enables rollback to previous versions without having to re\-upload the previous content\.

## Updating Dynamic Content with lmbr\_aws<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-updating"></a>

To perform dynamic content updates, enter the following command\.

```
lmbr_aws dynamic-content upload-manifest-content --manifest-path <manifest name> --staging-status <PUBLIC|PRIVATE|WINDOW>
```
+ *<manifest name>* – Specifies the filename of the manifest in the `manifests` directory \(for example, `DynamicContentTest.json`\)\.
+ *<PUBLIC\|PRIVATE\|WINDOW>* – \(Optional\) Use PUBLIC to release the content immediately\. Use WINDOW with `--start-date` and `--end-date` to specify a range during which the content will be publicly available\. Defaults to PRIVATE\.

**Note**  
For information on using the Lumberyard user interface to upload content, see [Using Dynamic Content Manager](cloud-canvas-cloud-gem-dc-manager.md) and [Managing Dynamic Content Packages](cloud-canvas-cloud-gem-dc-managing-packages.md)\.

## Dynamic Content Versioning<a name="cloud-canvas-cloud-gem-dc-versioning"></a>

Using dynamic content versioning, you can pre\-stage and schedule the release of new dynamic content versions\. Versioning your content is not required, but when enabled, provides the following advantages:
+ Players can still download previous versions of your dynamic content while new content is uploaded, with no impact to availability\. Without versioning enabled, clients will receive errors when packages in the S3 bucket are in the process of being updated, until the update completes\.
+ Developers have the ability to quickly rollback dynamic content to a previous version\. Without versioning enabled, developers are required to re\-upload previous content, which impacts availability and mitigation speed\.

**Important**  
When planning your versioning strategy, remember to take into consideration that normal S3 pricing applies to each version of an object\.

**Note**  
Cloud Gem Portal \(CGP\) does not currently support dynamic content versioning\. Once you've enabled the feature, you will need to use CLI commands to manage the staging status of each version\. However, Dynamic Content Manager will still be functional, and you will still be able to use this GUI tool to manage your local manifests or upload content\.

Periodically, you might want to clear deprecated versions using the provided CLI commands, or define custom lifecycle management rules on the content bucket\. However, please note that you will not be able to roll back to a version that has been cleared\.

For more information on lifecycle management rules, see [Object lifecycle management](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html) in the Amazon S3 Developer Guide\.

### Enabling dynamic content versioning<a name="dynamic-content-versioning-enable"></a>

Dynamic content versioning is an optional feature\. To use it, you must enable it by adding a tag to the deployment\.

**To enable versioning on a new deployment**  
Create the deployment with versioning enabled, as shown in the following CLI command:

```
lmbr_aws deployment create --deployment <deployment_name> --tags content-versioning
```

**To enable versioning on an existing deployment**

1. Add the `content-versioning` tag to the deployment\.

   ```
   lmbr_aws deployment tags --add content-versioning --deployment <deployment_name>
   ```

1. Update the deployment stack\.

   ```
   lmbr_aws deployment update --deployment <deployment_name>
   ```

Existing dynamic content table entries will also be migrated to the new **VersionedStagingSettingsTable** DynamoDB table after object versions are enabled\.

Note that the dynamic content gem enables you to upload content with or without using manifests\. When manifests are adopted, these files will also be versioned, and you have the option to update the staging status of all manifest content versions\. However, if you skip manifests and upload a folder directly to the content bucket, you will have to manage the staging status of each `.pak` version separately\.

### Suspending versioning<a name="dynamic-content-versioning-suspend"></a>

To suspend dynamic content versioning, use the `suspend-versioning` CLI command\. For details on the arguments available to this command, see [dynamic\-content suspend\-versioning](cloud-canvas-cloud-gem-dc-lmbr-aws.md#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-suspend-versioning)\.

Note that suspending versioning will not revert the versioned S3 bucket to an unversioned state\. Existing objects do not change after the suspension, but the S3 bucket will stop accruing new versions of the same object\.

To resume versioning, follow the instructions to [Enabling dynamic content versioning](#dynamic-content-versioning-enable) on an existing deployment\.