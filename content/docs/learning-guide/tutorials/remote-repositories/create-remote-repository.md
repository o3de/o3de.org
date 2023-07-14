---
linktitle: Remote Repositories
title: Create Your Remote Repository
description: Learn how to use remote repository templates in Open 3D Engine (O3DE) to package and share your project remotely with GitHub or other version control platforms.
---
In this tutorial you will build upon the foundation of O3DE and use the remote repository template to manage and distribute projects effortlessly. You will learn how to package and share your projects remotely with GitHub or other version control platforms, promoting collaboration and accelerating project development.

Show a list Open 3D Engine (O3DE) commands.
```
o3de.bat --help
```
**NOTE:** All engine commands have their abbreviations. Use the `--help` menu for list of details.

## Create a repository
Create a new repository for your remote project and clone this repo to your local machine.
This version control repository link is where you upload your project `repo-uri`.

Here is an example of a Github repo URI:

```
"https://github.com/<YourGitAccount>/<RemoteProjectName>.git"
```

## Create a remote repository `repo.json` configuration file
Navigate to scripts folder from the root of your **Open 3D Engine (O3DE)**.
```
cd scripts
```
To create a remote repository configuration, you will need to provide the following information:
- `repo-path` - the local path of your remote repository, this is where you cloned your repo.
- `repo-uri` - the URI of your repo.

{{< tabs name="O3DE CLI command" >}}
{{% tab name="Windows" %}}
```cmd
o3de.bat create-repo --repo-path "C:\remote-repo" --repo-uri "https://github.com/<YourGitAccount>/<RemoteRepoName>.git"
```
{{< note >}} Use ./o3de.bat if you are using powershell.{{< /note >}}

{{% /tab %}}
{{% tab name="Linux" %}}
```
./o3de.sh create-repo --repo-path "~/remote-repo" --repo-uri "https://github.com/<YourGitAccount>/<RemoteRepoName>.git"
```
{{% /tab %}}
{{< /tabs >}}

The `create-repo` command performs the following actions:
1. Creates a directory with the remote repository name specified in the `repo-path`, and creates a `repo.json` file in the root of that directory.
2. Creates three folders in your remote repository folder: Gems, Projects, and Templates. Make sure to place all associated objects in their correct folder type to avoid confusion later.
This is what your remote repository folder will look like after this step:

    {{<image-width src="/images/learning-guide/tutorials/remote-repositories/init.png" width="300">}}

- For example: Gems should go inside the Gems folder, projects should be placed into the Projects folder, and templates should go inside the Templates folder.

{{< note >}}
Remember to push your local changes to your remote version control repository.
{{< /note >}}

## (Optional) Create a gem release archive to add to your remote repository
To test your remote repo creation, you can create a Gem of your own and make it public to allow other users to download it. Skip this step if you already have a gem in your remote repository.

To create a Gem, you will need to provide the following information:

- `gem-path`: The path to the directory where you would want your Gem to be stored (We recommend you choose a path inside the remote repository's Gems folder)
- `gem-name`: Optional parameter that specifies a name for your Gem
   
```
o3de.bat create-gem --gem-path "C:\remote-repo\Gems\MyGem" --gem-name "MyGem"
```

The `create-gem` command performs the following actions:
1. Creates a Gem with the provided name at the specified path. If you didn't specify a name, O3DE will use the trailing directory name from the `gem-path`.
3. Registers your Gem to the O3DE engine. You can now find your new Gem with the Gem name under the Gems tab in Project Manager.

Next, use the `edit-repo-properties` command to add your Gem to your remote repository.

**Add your gem to your remote repository**

To add a Gem to your project, you will need to provide the following information:
- `--repo-path`: The path to your repo.json file
- `--add-gem`: The path to the directory of your Gem

    ```
    o3de.bat edit-repo-properties --repo-path "C:\remote-repo\repo.json" --add-gem "C:\remote-repo\Gems\MyGem"
    ```
    The `edit-repo-properties` command will register your gem with your remote repository's `repo.json` file under the `gems_data` field.

In the next step, you will create a downloadable release archive for your Gem in order to share it with the world. Make sure you push all your changes before moving to the next step.

### Create a release archive for your gem
The primary purpose of a _release archive_ is to provide a well-defined and stable version of the software that can be easily shared, installed, and distributed.

In O3DE we provide the option for users to create a release archive with .zip format.

For security, O3DE uses `sha-256` to hash files before creating the release archive. Every time you make a change to your Gem, including the `repo.json` file, the `sha-256` hash will change.

**Here is a Github example of how to create a release archive.**


- The `o3de.bat` tool expects a `download prefix` which is the URI for the folder your archive will be available in.  For a release in a Github repository, the `download prefix` looks like this:

    `https://github.com/<YourGitAccount>/<RemoteRepoName>/releases/download/<ReleaseTag>`

To create a release archive, you will need to provide the following information:
- `--repo-path`: the absolute path to your remote repository's `repo.json` file
- `--add-gem`: the path to the directory to where the actual gem you want to add is located
- `--release-archive-path`: the path to where you want to place your .zip archive, we recommend placing it in the Gems folder inside your remote repository folder. 
- `--download-prefix`: the URI where your gem archive can be download from, You must know where your zip will be avaliable to download before you actually create the release archive zip.

{{< note >}}
`--release-archive-path` command can only be used after you call the `--add-gem` command.See below example:
{{< /note >}}


```
o3de.bat edit-repo-properties --repo-path "C:\remote-repo\repo.json" --add-gem "C:\remote-repo\Gems\MyGem" --release-archive-path "C:\remote-repo\Gems" --download-prefix "https://github.com/<YourGitAccount>/<RemoteRepoName>/releases/download/<ReleaseTag>"
```

1. Here is an example of where you should upload your release to Github (you can find this on your version control URI):

    {{<image-width src="/images/learning-guide/tutorials/remote-repositories/add_release.png" width="500">}}

2. Here is where you would be setting your release tag (make sure this tag is the same as the last parameter you passed for the `--download-prefix` arg):

    {{<image-width src="/images/learning-guide/tutorials/remote-repositories/release_tag.png" width="500">}}

{{< important >}}
Make sure you know where your release will be available after uploading it to GitHub. Once uploaded, you won't be able to change the `download_source_uri` in your `repo.json` file. If you input the wrong download path, you will need to repeat this step and re-zip the file and upload the release to GitHub again.
{{< /important >}}

After you upload your Gem to the version control website, other users that have added your remote repository will be able to download it using the Project Manager and `o3de` CLI. Users can navigate to Remote Sources and use your remote project URL to download associated Gems based on the download path you provided in this step.


## Testing your remote repo locally
You can test your remote repo locally before uploading to your remote repository to make sure your remote repo works as expected by using a local file path.

You can test locally be creating another remote repository and Gem using the steps above and add the Gem to your new remote repository.  Next, create a release archive for the new Gem using a local path for the `download prefix`:
```cmd
o3de.bat edit-repo-properties --repo-path "C:\local-repo\repo.json" --add-gem "C:\local-repo\Gems\MyLocalGem" --release-archive-path "C:\local-repo\Gems" --download-prefix "C:\local-repo\Gems"
```

After performing the above steps you should be able to add the new remote repository using the local path `file://c/local-repo` and then be able to download `MyLocalGem` from the `Gems` tab in the Project Manager.


#### Use Python to host a `local server` for testing

1. Start a local Python server from the same folder that contains the `repo.json` file.
    ```
    cd c:\remote-repo
    ``` 

2. Start a local Python server on port 8080.
    ```
    python -m http.server 8080
    ```

3. Use this below format for your `--download-prefix`.
    ```
    http://localhost:8080/Gems
    ```

    Here is an example of where your download URI will be located:
    ```
    http://localhost:8080/Gems/camera-0.1.0-gem.zip
    ```


4. Open the Project Manager and add a remote repository from the Engine > Remote Sources page. When prompted, use the URL for your local server which should be "http://localhost:8080/"

**NOTE:** adding the repo may fail without the trailing slash, and the name should match the repo url in repo.json