---
description: ' Use the lmbr_aws CLI to manage dynamic content for your &ALYlong; game. '
title: Using the Dynamic Content Command Line
---
# Using the Dynamic Content Command Line {#cloud-canvas-cloud-gem-dc-lmbr-aws}

When you enable the Dynamic Content Cloud Gem, associated commands become available in the `lmbr_aws` CLI\. You can use these commands to update dynamic content and perform operations on manifest files and buckets\.

## lmbr\_aws Extensions {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions}

The following `lmbr_aws` CLI commands are enabled by the Dynamic Content Cloud Gem\.

### dynamic\-content add\-file\-to\-pak {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-add-file-to-pak}

Add a given file to the specified `.pak` file\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <file_name>`

  File entry to add\.
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--pak-file <pak_file>`

  Pak file to add the file to\.
+ `--platform-type <OS_type>`

  \(Optional\) Operating system of the file entry to add\.

### dynamic\-content add\-manifest\-file {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-add-manifest-file}

Adds a file to the content manifest for the project\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <filename>`

  The name of the file, including the local directory \(for example, `staticdata/csv/gameproperties.csv`, where local directory is `staticdata/csv/`\.
+ `--cache-root <cache directory>`

  \(Optional\) The reference for the local cache directory \(for example, `@assets@`\)\. The default is `@assets@`\.
+ `--bucket-prefix <prefix>`

  The bucket prefix under which to store the file in the content bucket\.
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--output-root <default directory path>` 

  \(Optional\) The path of the default directory to which to write\. The default is `@user@`\.
+ `--platform-type <OS_type>`

  \(Optional\) The type of operating system to which the asset belongs\. The value defaults to the current operating system\.

### dynamic\-content add\-pak {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-add-pak}

Add a new pak entry to the manifest\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--pak-name <pak_name>`

  Name of the pak \(the final filename will be *<pak\-name>*\.*<OS>*\.pak\)\.
+ `--platform-type <OS_type>`

  \(Optional\) The operating system type for the `.pak` file\.

### dynamic\-content build\-new\-paks {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-build-new-paks}

Create `.pak` files based on manifest files which have changed\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--all`

  \(Optional\) Upload all `.pak` files regardless of the results of the file check\.
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.

### dynamic\-content clear\-dynamic\-content {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-clear-dynamic-content}

Empty the bucket and table content\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--all-versions`

  \(Optional\) Remove all versions of the manifest and pak files\.
+ `--noncurrent-versions`

  \(Optional\) Remove all the noncurrent versions of dynamic content\. Requires confirmation on the command line following the use of this command, unless `--confirm-deleting-noncurrent-versions` is also used\.
+ `--confirm-deleting-noncurrent-versions`

  \(Optional\) Confirm that you know this command will delete all the noncurrent versions of files in the content bucket, and that you will not be able to roll back any previous version after this operation\. Useful for automation\.

### dynamic\-content compare\-bucket\-content {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-compare-bucket-content}

Compares manifest content to the bucket by checking HEAD metadata\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--manifest-version-id <manifest version ID>`

  \(Optional\) Version of the standalone manifest pak\. You can retrieve the available version ID's by using the `list-file-versions` command\.

  Defaults to the latest version\.

### dynamic\-content create\-new\-manifest {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-create-new-manifest}

Create a new manifest\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--manifest-name <manifest_name>` 

  Name of the new manifest\.
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--target-platforms <target_OS> [<target_OS> ...]`

  \(Optional\) Target operating systems for this new manifest \(the default is all supported operating systems and devices\)\.

### dynamic\-content generate\-keys {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-generate-keys}

Generate a new public/private key pair for use by the dynamic content system\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--key-name <key_name>`

  The name of the key file to use\.

### dynamic\-content list\-bucket\-content {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-list-bucket-content}

Lists the manifest files in the content bucket\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--manifest-version-id <manifest version ID>`

  \(Optional\) Version of the standalone manifest pak\. You can retrieve the available version ID's by using the `list-file-versions` command\.

  Defaults to the latest version\.

### dynamic\-content list\-file\-versions {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-list-file-versions}

List all versions of a manifest or pak file found in the content bucket\. Returns newest to oldest version based on uploaded date\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <filename>`

  \(Optional\) Name of the manifest or pak file\.

### dynamic\-content migrate\-staging\-settings {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-migrate-staging-settings}

Migrate existing staging settings when content versioning is enabled or suspended\. Existing data should be migrated automatically during the deployment update, so you will only need this command if the deployment fails to update\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--deployment-name <deployment name>`

  \(Optional\) Name of the deployment for which staging settings should be migrated\.

  Defaults to the current active deployment\.

### dynamic\-content remove\-manifest\-file {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-remove-manifest-file}

Removes a file from the content manifest for the project\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <filename>`

   Removes a file from the content manifest for the project\. The file removed matches the value for `--file-name` that is specified in the `add-manifest-file` command\.
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.

### dynamic\-content request\-url {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-request-url}

Requests a URL for the specified file\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--file-path <file_path>`

  The file in the bucket\.

### dynamic\-content set\-staging\-status {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-set-staging-status}

Sets the staging status of the specified file\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-path <file_path>`

  The file in the bucket\.
+ `--version-id <version_id>`

  \(Optional\) Version ID of the file\.

  Defaults to the latest version\.
+ `--staging-status <PUBLIC|PRIVATE|WINDOW>` 

  Use PUBLIC to make the file immediately public\. Use WINDOW with `start-date` and `end-date` to specify a range during which the file will be publicly available\.
+ `--start-date <start_date>`

  \(Optional\) Start date value for windowed staging\. Use NOW or UTC date/time in the format `"Jan 15 2021 14:30"`\.
+ `--end-date <end_date>`

  \(Optional\) End date value for windowed staging\. Use NEVER or UTC date/time in the format `"Jan 31 2021 14:30"`\.
+ `--include-children`

  \(Optional\) Set the staging status for all the children paks\.

  Defaults to false\.

**Warning**  
There is a risk of a race condition if the staging status of a file is updated while a new version of the same file with a different staging status is uploaded at the same time from a different machine\. The file could end up with an unexpected staging status in this case\. To avoid this issue, specify the version ID when using the `set-staging-status` command\.

### dynamic\-content show\-manifest {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-show-manifest}

List all entries in the content manifest\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--file-name <filename>`

  \(Optional\) The file entry \(local directory \+ key\) to show\.
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--manifest-version-id <manifest version ID>`

  \(Optional\) Version of the standalone manifest pak\. You can retrieve the available version ID's by using the `list-file-versions` command\.

  Defaults to the latest version\.
+ `--platform-type <OS_type>`

  \(Optional\) The operating system type of the file to list\.
+ `--section <section>`

  \(Optional\) Section to show \(`Paks` or `Files`\)\.

### dynamic\-content show\-signature {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-show-signature}

Show the signature which would be created for a specified file\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--file-name <file_name>`

  \(Optional\) The filename for which to show the signature\.

### dynamic\-content suspend\-versioning {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-suspend-versioning}

Suspend dynamic content versioning\.

Note that suspending versioning will not revert the versioned S3 bucket to an unversioned state\. Existing objects do not change after the suspension, but the S3 bucket will stop accruing new versions of the same object\.

To resume versioning, follow the instructions to [Enabling dynamic content versioning](/docs/userguide/gems/cloud-canvas/dc-updating#dynamic-content-versioning-enable) on an existing deployment\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--deployment-name <deployment name>`

  \(Optional\) Name of the deployment for which versioning should be suspended\.

  Defaults to the current active deployment\.
+ `--confirm-versioning-suspension`

  \(Optional\) Confirms that you know this command will suspend content versioning, and that you need to re\-enable and update the deployment to resume versioning\. Useful for automation\.

### dynamic\-content test\-signature {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-test-signature}

Tests whether a base64 signature is valid for the specified string\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--signature <signature>`

  Base64 encoded signature\.
+ `--to-sign <string_to_sign>`

  The string to sign\.

### dynamic\-content update\-manifest {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-update-manifest}

Updates the manifest with current file hashes\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following argument:
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.

### dynamic\-content update\-target\-platforms {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-update-target-platforms}

Update the target operating system of a manifest file\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--target-platforms <target_OS> [<target_OS> ...]`

  \(Optional\) Updated target operating systems for this new manifest \(the default is all supported operating systems and devices\)\.

### dynamic\-content upload\-manifest\-content {#cloud-canvas-cloud-gem-dc-lmbr-aws-extensions-upload-manifest-content}

Updates the manifest and uploads changed manifest content to the content bucket\.

In addition to the [Common Arguments](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-common-arguments), this command accepts the following arguments:
+ `--manifest-path <manifest_path>`

  \(Optional\) Path and filename of the manifest file to use\. You can specify either a full path or a filename that exists in the folder `game\DynamicContent\Manifests\`\.

  Defaults to `game\DynamicContent\Manifests\default.json`\.
+ `--deployment-name <deployment name>`

  \(Optional\) Which deployment to upload content to\.

  Defaults to the current active deployment\.
+ `--staging-status <PUBLIC|PRIVATE|WINDOW>`

  \(Optional\) Use PUBLIC to make the new content immediately public\. Use WINDOW with `start-date` and `end-date` to specify a range during which the content will be publicly available\.

  Defaults to PRIVATE\.
+ `--start-date <start_date>`

  \(Optional\) Start date value for windowed staging\. Use NOW or UTC date/time in the format `"Jan 15 2021 14:30"`\.
+ `--end-date <end_date>`

  \(Optional\) End date value for windowed staging\. Use NEVER or UTC date/time in the format `"Jan 31 2021 14:30"`\.
+ `--signing`

  \(Optional\) Add file signatures to the content table for client side verification\.

  Defaults to no signature\.
+ `--invalidate-existing-files`

  \(Optional\) Invalidate existing files with the same name in the CloudFront edge cache\. Only effective if dynamic content is delivered via CloudFront\. For details on using this service with dynamic content, see the topic on [Using Amazon CloudFront](/docs/userguide/gems/cloud-canvas/dc-engineering#cloud-canvas-cloud-gem-dc-engineering-cloudfront)\.

  Defaults to no invalidation\.
+ `--replace`

  \(Optional\) Removes older versions when a new version has been uploaded\.
+ `--all`

  \(Optional\) Updates all content in the manifest regardless of whether it appears to have been updated already\.