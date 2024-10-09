---
linkTitle: Create an O3DE remote repository
title: Create an O3DE remote repository
description: Learn how to create an O3DE remote repository.
weight: 300
toc: true
---

You can create an O3DE remote repository with the O3DE CLI.


## Use the `o3de` command line tool to create an O3DE remote repository 

You can use the `o3de` CLI tool to create a remote repository with the following command:

{{< tabs name="Create an O3DE remote repository" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat create-repo --repo-name <repo name> --repo-path <local path>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh create-repo --repo-name <repo name> --repo-path <local path>
```

{{% /tab %}}
{{< /tabs >}}

The above command will create a `repo.json` file at the specified local path.

See the [`o3de create-repo` CLI Reference](/docs/user-guide/project-config/cli-reference/#create-repo) for the complete list of options.

After creating your repository, [add content to your remote repository](/docs/user-guide/remote-content/update-a-remote-repository#add-a-new-gem-or-new-gem-version-to-a-remote-repository) and [test it locally](/docs/user-guide/remote-content/update-a-remote-repository#testing-o3de-remote-repository-changes) before uploading it to a public web server or GitHub.
