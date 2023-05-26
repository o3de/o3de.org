---
linkTitle: Update an O3DE remote repository
title: Update an O3DE remote repository
description: Learn how to update an O3DE remote repository's contents or meta data.
weight: 400
toc: true
---

You can update the properties for an O3DE remote repository, add and manage Gems, Projects and Templates with the O3DE CLI.


## Use the `o3de` command line tool to update an O3DE remote repository

The `o3de edit-repo-properties` command lets you update remote repository properties, add new content and manage existing content.

See the [`o3de edit-repo-properties` CLI Reference](/docs/user-guide/project-config/cli-reference/#edit-repo-properties) for the complete list of options.

### Update remote repository properties

You can use the `o3de` CLI tool to modify properties stored in the `repo.json` file of an O3DE remote repository with the following command:

{{< tabs name="Modify O3DE remote repository properties" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat edit-repo-properties --repo-path <local path to repo.json> --repo-name <new repo name> --repo-uri <new repo uri>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh edit-repo-properties \
    --repo-path <local path to repo.json> \
    --repo-name <new repo name> \
    --repo-uri <new repo uri>
```

{{% /tab %}}
{{< /tabs >}}


### Add a new Gem or new Gem version to a remote repository

You can use the `o3de` CLI tool to add information from a `gem.json` file to a `repo.json` file and make an archive that you can upload with the following command:

{{< tabs name="Add information about a gem to `repo.json`" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat edit-repo-properties --repo-path <path to repo.json> --add-gems <local gem paths> --archive-path <path where the gem archive files will go>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh edit-repo-properties \
    --repo-path <path to repo.json> \
    --add-gems <local gem paths> \
    --archive-path <path where the gem archive files will go>
```

{{% /tab %}}
{{< /tabs >}}

After running this command, the `repo.json` file will be modified so the information inside each `gem.json` file is included and the `sha256` archive file hash is correct.

If a gem with the same name already exists in the `repo.json` but the version is different, the `gem.json` data from the new version will be added to the [`versions_data`](/docs/user-guide/programming/gems/manifest/#gemjson-manifest-contents) field.  If a gem with the same name and version already exists an error will be printed and no changes will be made.  Use the [`--update-gems` command](#updating-gem-information-in-a-remote-repository) to update existing `gem.json` information.


{{< tip >}}
After modifying remote repository contents, we recommend you [test the changes locally](#testing-o3de-remote-repository-changes) before uploading them to a public web server or GitHub.
{{< /tip >}}

### Updating Gem information in a remote repository

You can use the `o3de` CLI tool to update `gem.json` information for gem data already in a `repo.json` file with the following command:

{{< tabs name="Update information about a gem in `repo.json`" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat edit-repo-properties --repo-path <path to repo.json> --update-gems <local gem paths> --archive-path <path where archives will go>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh edit-repo-properties \
   --repo-path <path to repo.json> \
   --update-gems <local gem paths> \
   --archive-path <path where archives will go>
```

{{% /tab %}}
{{< /tabs >}}

After running this command, the `repo.json` file will be modified so the information from each `gem.json` file is updated, updated archives are created and each `sha256` file hash is updated.

See the [`o3de edit-repo-properties` CLI Reference](/docs/user-guide/project-config/cli-reference/#edit-repo-properties) for the complete list of options.

{{< tip >}}
After modifying remote repository contents, we recommend you [test the changes locally](#testing-o3de-remote-repository-changes) before uploading them to a public web server or GitHub.
{{< /tip >}}


## Testing O3DE remote repository changes

We recommend that you use the Project Manager and O3DE CLI to test your remote repository before you upload the changes to GitHub, a web server or other source control.

### Test with Project Manager

You can add local remote repositories in the Project Manager and verify the contents appear as expected and downloads succeed.
1. Add your local remote repository in Project Manager on the **Remote Sources** page on the **Engine** tab, by pressing the **Add Repository** button and then use the browse button to select the folder containing your `repo.json` file and then press the **Add** button.
1. Select the remote repository in the list and verify the expected contents are listed in the right pane.
1. Verify any added gems appear correctly in the **Gem Catalog**.
1. Verify any added projects appear correctly on the **Projects** page.
1. Verify any added templates appear correctly on the **Create a New Project** page.

### Test with the O3DE CLI 

You can add local remote repositories with the O3DE CLI and verify downloads succeed.

{{< tabs name="Register a local repository and download a gem" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat register -ru <local path to repo.json>
<engine>\scripts\o3de.bat download --gem-name <name of gem> --dest-path <download path>
<engine>\scripts\o3de.bat download --project-name <name of project> --dest-path <download path>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh register -ru <local path to repo.json>
<engine>/scripts/o3de.sh download --gem-name <name of gem> --dest-path <download path>
<engine>/scripts/o3de.sh download --project-name <name of project> --dest-path <download path>
```

{{% /tab %}}
{{< /tabs >}}

After downloading the Gem, Project or Template, you should be able to inspect the contents at the download path are correct and you can use the content as expected. 

## Uploading to GitHub

We recommend that you use the Project Manager and O3DE CLI to test your updated remote repository before you upload the changes to GitHub, a web server or other source control provider.
