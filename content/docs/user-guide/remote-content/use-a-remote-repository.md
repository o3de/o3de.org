---
linkTitle: Using O3DE Remote Repositories 
title: Using O3DE Remote Repositories
description: O3DE remote repositories provide a way to share Gems, Projects and Templates in Open 3D Engine (O3DE).
weight: 100
toc: true
---

You can use the [Project Manager](#using-project-manager-to-access-o3de-remote-repositories#using-project-manager-to-access-o3de-remote-repositories) and [O3DE CLI](#using-the-o3de-command-line-tool-to-access-o3de-remote-repositories) to display,  download and register **Gems**, **Projects**, and **Templates** from **Remote Repositories**.

## Using Project Manager to access O3DE remote repositories
### Add a remote repository

You can add existing O3DE remote repositories using the **Remote Sources** page in Project Manager which you can access from the **Engine** tab, or from the **Gem Catalog** right panel menu.
1. Press the **Add Repository** button. In the dialog box that opens you can supply the URL or local path for a Gem repository. 

    ![Add Remote Source Dialog](/images/user-guide/remote-content/ProjectManagerAddRemoteSource.JPG)

1. If you have a URL for an online Gem repository, copy and paste it into the `Repository Path` field and press the **Add** button.
1. Alternatively, if you want to add an O3DE remote repository from your local hard drive, enter a local path on your computer or press the folder button on the right side of the Repository Path field to open the `Browse` dialog box, select the folder with the O3DE remote repository, press the **Select Folder** button, and finally press the **Add** button.


A new entry will be added to the list of remote sources, and the Gems, Projects and Templates provided by the O3DE remote repository will be available to download and use.

### Activate or deactivate a remote repository

You can toggle the visibility of remote content from a O3DE remote repository by pressing the visibility button on the same row as the O3DE remote repository on the **Remote Sources** page.  This is a useful way to hide content from that repository, without removing the remote repository.

![Visibility buttons on the Remote Sources page](/images/user-guide/remote-content/ProjectManagerRemoteSources.JPG)

### Remove a remote repository

You can remove an O3DE remote repository URI from the **Remote Sources** page in the Project Manager so the remote content in it is no longer listed and the meta data is no longer updated.

1. Select the O3DE remote repository you want to remove by clicking on the entry in the list of remote sources.
2. Press the **Remove** button in the right panel.  You will be asked to confirm if you want to remove the remote repository.

### Download Gems from a remote repository

You can download Gems from the **Gems** tab in the Project Manager by clicking on the row of the Gem you want to download and then pressing the **Download Gem** button in the right pane.  

![Visibility buttons on the Remote Sources page](/images/user-guide/remote-content/ProjectManagerDownloadGem.JPG)

Gems available in remote repositories will also be downloaded automatically when activated in a project from the **Gem Catalog** page which can be accessed by pressing the **Configure Gems** button on the Edit Project Settings page for a project, or from the **Configure Gems...** project menu option on the **Projects** tab.

### Download projects from a remote repository

You can download projects from the **Projects** tab in the Project Manager by pressing the **Download** button on the project you want to download.  

### Download templates from a remote repository

You can download templates from the **Create a New Project** page in the Project Manager by selecting the project template in the list of project templates and pressing the **Download Template** button in the right pane.  


## Using the `o3de` command line tool to access O3DE remote repositories 

You can use the `o3de` command line tool to register, refresh, activate and deactivate remote repositories and download remote content.
The examples below show some common commands used with remote repositories.  See the [`o3de repo` CLI Reference](/docs/user-guide/project-config/cli-reference/#repo) for the complete list of options.

### Add a remote repository with the `o3de` command line tool

You can use the `o3de` CLI tool to add O3DE remote repositories with the following command:

{{< tabs name="Add an O3DE remote repository" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat register -ru <O3DE remote repository URI>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh register -ru <O3DE remote repository URI>
```

{{% /tab %}}
{{< /tabs >}}

See the [`o3de register` CLI Reference](/docs/user-guide/project-config/cli-reference/#register) for the complete list of options.

### Activate or deactivate a remote repository with the `o3de` command line tool

You can use the `o3de` CLI tool to activate or deactivate O3DE remote repositories with the following command:

{{< tabs name="Activate an O3DE remote repository" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat repo --activate-repo <O3DE remote repository URI>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh repo --activate-repo <O3DE remote repository URI>
```

{{% /tab %}}
{{< /tabs >}}

When a remote repository is deactivated, you will no longer be able to see that remote repository's remote content which hasn't been downloaded in the Project Manager or download content from that remote repository until it is activated again.

See the [`o3de repo` CLI Reference](/docs/user-guide/project-config/cli-reference/#repo) for the complete list of options.

### Download content from remote repository with the `o3de` command line tool

You can use the `o3de` CLI tool to download content from O3DE remote repositories with the following command:

{{< tabs name="Download from an O3DE remote repository" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat download --gem-name <Gem name with optional version specifier>
```

Example which downloads a gem named `RemoteGem` version `1.0.0`:
```cmd
<engine>\scripts\o3de.bat download --gem-name RemoteGem==1.0.0
```

If no version specifier is given, the highest version available is downloaded.

Example which downloads the latest version of a project named `RemoteProject`:
```cmd
<engine>\scripts\o3de.bat download --project-name RemoteProject
```

Example which downloads the latest version of a template named `RemoteTemplate` into `c:\o3de-templates\RemoteTemplate`:
```cmd
<engine>/scripts/o3de.bat download --template-name RemoteTemplate  --dest-path c:/o3de-templates
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh download --gem-name <Gem name with optional version specifier>
```

Example which downloads a gem named `RemoteGem` version `1.0.0`:
```cmd
<engine>/scripts/o3de.sh download --gem-name RemoteGem==1.0.0
```

If no version specifier is given, the highest version available is downloaded.

Example which downloads the latest version of a project named `RemoteProject`:
```cmd
<engine>/scripts/o3de.sh download --project-name RemoteProject
```

Example which downloads the latest version of a template named `RemoteTemplate` into `~/o3de-templates/RemoteTemplate`:
```cmd
<engine>/scripts/o3de.sh download --template-name RemoteTemplate  --dest-path ~/o3de-templates
```

{{% /tab %}}
{{< /tabs >}}

See the [`o3de download` CLI Reference](/docs/user-guide/project-config/cli-reference/#download) for the complete list of options.

