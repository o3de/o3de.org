# Using lmbr\_aws for Dynamic Content<a name="cloud-canvas-cloud-gem-dc-lmbr-aws"></a>

When you enable the Dynamic Content Cloud Gem, associated commands become available in the `lmbr_aws` CLI\. You can use these commands to update dynamic content and perform operations on manifest files and buckets\.

## Updating Dynamic Content with lmbr\_aws<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-updating"></a>

To perform dynamic content updates, enter the following command\.

```
lmbr_aws dynamic-content upload-manifest-content --manifest-path <manifest name> --staging-status <PUBLIC|PRIVATE>
```
+ *<manifest name>* – specifies the name of the manifest in the `manifests` directory \(for example, `DynamicContentTest.json`\)\.
+ *<PUBLIC\|PRIVATE>* – \(Optional\) Specify PUBLIC to release the content immediately\. The default is PRIVATE\.

**Note**  
For information on using the Lumberyard user interface to upload content, see [Using Dynamic Content Manager](cloud-canvas-cloud-gem-dc-manager.md) and [Managing Dynamic Content Packages](cloud-canvas-cloud-gem-dc-managing-packages.md)\.

## lmbr\_aws Extensions<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions"></a>

The following `lmbr_aws` CLI commands are enabled by the Dynamic Content Cloud Gem\.

### add\-file\-to\-pak<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-add-file-to-pak"></a>

Add a given file to the specified `.pak` file\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <file_name>` – File entry to add\.
+ `--manifest-path <manifest_path>` – Path to the manifest file to use\.
+ `--pak-file <pak_file>` – Pak file to add the file to\.
+ `--platform-type <OS_type>` – Operating system of the file entry to add\.

### add\-manifest\-file<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-add-manifest-file"></a>

Adds a file to the content manifest for the project\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <filename>` – \(Required\) The name of the file, including the local directory \(for example, `staticdata/csv/gameproperties.csv`, where local directory is `staticdata/csv/`\.
+ `--cache-root <cache directory>` – The reference for the local cache directory \(for example, `@assets@`\)\. The default is `@assets@`\.
+ `--bucket-prefix <prefix>` – The bucket prefix under which to store the file in the content bucket\.
+ `--manifest-path <path>` – The path of a manifest file other than the default\.
+ `--output-root <default directory path>` – The path of the default directory to which to write\. The default is `@user@`\.
+ `--platform-type <OS_type>` – The type of operating system to which the asset belongs\. The value defaults to the current operating system\.

### add\-pak<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-add-pak"></a>

Add a new pak entry to the manifest\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--manifest-path <manifest_path>` – Path to the manifest file to use\.
+ `--pak-name <pak_name>` – Name of the pak \(the final filename will be *<pak\-name>*\.*<OS>*\.pak\)\.
+ `--platform-type <OS_type>` – The operating system type for the `.pak` file\.

### build\-new\-paks<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-build-new-paks"></a>

Create `.pak` files based on manifest files which have changed\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--all` – Upload all `.pak` files regardless of the results of the file check\.
+ `--manifest-path <manifest_path> ` – The path of the manifest file to use\.

### clear\-dynamic\-content<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-clear-dynamic-content"></a>

Empty the bucket and table content\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--manifest-path <manifest_path>` – Path to the manifest file to use\.

### compare\-bucket\-content<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-compare-bucket-content"></a>

Compares manifest content to the bucket contents\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--manifest-path <path>` – The path of a manifest file other than the default\.

### create\-new\-manifest<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-create-new-manifest"></a>

Create a new manifest\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--manifest-name <manifest_name>` – Name of the new manifest\.
+ `--manifest-path <manifest_path> ` – Path to the new manifest\.
+ `--target-platforms <target_OS> [<target_OS> ...]` – Target operating systems for this new manifest \(the default is all supported operating systems and devices\)\.

### empty\-content\-bucket<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-empty-content-bucket"></a>

Empties the content bucket contents\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--manifest-path <path>` – The path of a manifest file other than the default\.

### generate\-keys<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-generate-keys"></a>

Generate a new public/private key pair for use by the dynamic content system\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--key-name <key_name>` – The name of the key file to use\.

### list\-bucket\-content<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-list-bucket-content"></a>

Lists the manifest files in the content bucket\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--manifest-path <path>` – The path of a manifest file other than the default\.

### remove\-manifest\-file<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-remove-manifest-file"></a>

Removes a file from the content manifest for the project\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <filename>` – \(Required\) Removes a file from the content manifest for the project\. The file removed matches the value for `--file-name` that is specified in the `add-manifest-file` command\.
+ `--manifest-path <path>` – The path of a manifest file other than the default\.

### request\-url<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-request-url"></a>

Requests a URL for the specified file\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--file-path <file_path>` – The file in the bucket\.

### set\-staging\-status<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-set-staging-status"></a>

Sets the staging status of the specified file\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-path <file_path>` – The file in the bucket\.
+ `--staging-status <staging_status>` – Staging status \(specify PUBLIC for availability now or WINDOW for availability within a specified start and end date\)\.
+ `--start-date <start_date>` – Start date value for windowed staging \(specify NOW or UTC date/time in the format `January 15 2018 14:30`\)\.
+ `--end-date <end_date>` – End date value for windowed staging \(specify NEVER or UTC date/time in the format `January 15 2018 14:30`\)\.

### show\-manifest<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-show-manifest"></a>

List all entries in the content manifest\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <filename>` – The file entry \(local directory \+ key\) to show\.
+ `--manifest-path <manifest_path>` – Path to the manifest file to use\.
+ `--platform-type <OS_type>` – The operating system type of the file to list\.
+ `--section <section>` – Section to show \(`Paks` or `Files`\)\.

### show\-signature<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-show-signature"></a>

Show the signature which would be created for a specified file\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--file-name <file_name>` – The filename for which to show the signature\.

### test\-signature<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-test-signature"></a>

Tests whether a base64 signature is valid for the specified string\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--signature <signature>` – Base64 encoded signature\.
+ `--to-sign <string_to_sign>` – The string to sign\.

### update\-manifest<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-update-manifest"></a>

Updates the manifest with current file hashes\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--manifest-path <path>` – The path of a manifest file other than the default\.

### update\-target\-platforms<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-update-target-platforms"></a>

Update the target operating system of a manifest file\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--manifest-path <manifest_path>` – Path to the manifest file to use\.
+ `--target-platforms <target_OS> [<target_OS> ...]` – Updated target operating systems for this new manifest \(the default is all supported operating systems and devices\)\.

### upload\-manifest\-content<a name="cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-upload-manifest-content"></a>

Updates the manifest and uploads changed manifest content to the content bucket\.

In addition to the [Common Arguments](cloud-canvas-command-line.md#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--manifest-path <path>` – The path of a manifest file other than the default\.
+ `--staging-status <PUBLIC|PRIVATE>` – \(Optional\) Specify PUBLIC to make the new content public immediately\. The default is PRIVATE\.
+ `--all` – \(Optional\) Updates all content in the manifest regardless of whether it appears to have been updated already\.