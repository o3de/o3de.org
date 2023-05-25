---
linkTitle: Create an O3DE remote repository
title: Create an O3DE remote repository
description: Learn how to create an O3DE remote repository.
weight: 300
toc: true
---

You can create an O3DE remote repository with the O3DE CLI and 


## Using the `o3de` command line tool to create an O3DE remote repositories 

You can use the `o3de` command line tool to create an empty remote repository from a template, and then add content to it.

See the [CLI Reference](/docs/user-guide/project-config/cli-reference/) for the complete list of options.

### Create an empty O3DE remote repository with the `o3de` command line tool

You can use the `o3de` CLI tool to create an empty O3DE remote repositories with the following command:

{{< tabs name="Create an O3DE remote repository" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat create-repo --repo-name <repo name> --repo-path <local path where the repo.json file will go>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh create-repo --repo-name <repo name> --repo-path <local path where the repo.json file will go>
```

{{% /tab %}}
{{< /tabs >}}

After creating your repository, [add content to your remote repository](/docs/user-guide/remote-content/update-a-remote-repository#add-a-new-gem-or-new-gem-version-to-a-remote-repository) and [test it locally](/docs/user-guide/remote-content/update-a-remote-repository#testing-o3de-remote-repository-changes) before [uploading it to a public web server or GitHub](/docs/user-guide/remote-content/update-a-remote-repository#uploading-to-github).

See the [CLI Reference](/docs/user-guide/project-config/cli-reference/#repo) for the complete list of options.

{{< tip >}}
After creating a remote repository we recommend you [test it locally](/docs/user-guide/remote-content/update-a-remote-repository#testing-o3de-remote-repository-changes) before uploading it to a public web server or GitHub.
{{< /tip >}}

## Anatomy of an O3DE remote repository  

An O3DE remote repository contains a `repo.json` file which contains the metadata for the repository, including the JSON data for the Gems, Projects and Templates it provides.

### Folder structure

The recommended folder structure is to put the `repo.json` file at the root of your O3DE repository and the Gems, Projects and Templates in corresponding 'Gems', 'Projects', and 'Templates' subfolders
```
/
    repo.json
    Gems/
        ExampleGem1/
            gem.json
        ExampleGem2/
            gem.json
    Projects/
        ExampleProject1/
            project.json
    Templates/
        ExampleTemplate1/
            template.json
```

If you are confident you will only ever have one Gem, Project or Template in the repository, it's acceptable to put the `gem.json`,`project.json` or `template.json`  in the root folder.

### Format of a repo.json file
The `repo.json` file contains the metadata for the O3DE remote repository. See the [repo.json reference](repo-json-reference) for more details on the `repo.json` schema.

### JSON fields related to O3DE remote repositories

The `gem.json`, `project.json` and `template.json` files in an O3DE remote repository should include `version`, `repo_uri`, `last_updated`, `download_source_uri`, `source_control_uri` and `source_control_ref` fields.

| Field | Description |
| --- | --- |
| download_source_uri | The URI of the `.zip` file containing the Gem archive.  This is a direct download to the Gem's `.zip` archive: i.e. https://github.com/o3de/o3de-extras/releases/download/1.0/Example-2.0.zip  |
| last_updated | The date this file or Gem was last updated in `YYYY-MM-DD`, `YYYY-MM-DD HH:MM:SS`, or `YYYY-MM-DDTHH:MM:SS` format. |
| repo_uri | The URI for the O3DE remote repository. |
| sha256 | The SHA-256 digest of the `.zip` archive that the `download_source_uri` field points to.  You can omit this field for testing, but it should always be used in production. |
| source_control_ref | The source control reference for this Gem version.  This can be a tag, commit hash or branch: i.e. `release-1.0.0`, `0462139`, `development` etc.  |
| source_control_uri | The URI of the source repository for this Gem: i.e. https://github.com/o3de/o3de-extras.  |

{{< note >}}
For a full description of `gem.json` fields and examples see the [`gem.json` manifest documentation](/docs/user-guide/programming/gems/manifest/).
{{< /note >}}