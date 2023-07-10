---
linktitle: Your First Remote Repository
title: Your First Remote Repository
description: Welcome to the Create Remote Repository! Building upon the foundation of Open 3D Engine (O3DE), we have created a new remote repo template, a comprehensive solution for managing and distributing projects effortlessly. You can seamlessly create, package, and share your projects remotely with Github or other version control platforms, promoting collaboration and accelerating project development.

---
## Add a Remote Repository with the O3DE Command Line Tool
---
Navigate to scripts folder from the root of your **Open 3D Engine (O3DE)**.<br>

```
cd scripts
```
Show a list Open 3D Engine (O3DE) commands.
```
cd scripts -help
```
<strong>Note:</strong> All engine commands have their abbreviations. Use the `-help` menu for list of details.

<br>

## Start With A Github Repository Or Other Version Control Systems
---
<ul>

Create a new repository for your **Remote project** and clone this repo to your local 
machine.
<br>
This version control repository link is where you upload your project (`repo-uri`).<br>
Here is an example of a Github repo uri:

```
"https://github.com/<YourGitAccount>/<RemoteProjectName>.git"
```
</ul>
<br>

## Create Remote Repository Configuration
---
Provide the local path on your machine of your remote project `repo-path` this is where you cloned you online version control repo.<br>
Note: `--repo-path` and `--repo-uri` are required to create remote repo. 
<br>
Use ./o3de.bat if you are using powershell <br>
```
o3de.bat create-repo --repo-path "C:\o3de_Projects\<RemoteProjectName>" --repo-uri "https://github.com/<YourGitAccount>/<RemoteProjectName>.git"
```
<ul>

1. A directory with your specified remote project name will appear along with a `repo.json` file in the root of the directory
<br>

2. Three folders (Gems/Projects/Templates) will automatically be created in your project folder after you use `--create-repo CLI command`. Make sure to place all asscocated objects in their correct folder type to avoid later confusion.<br> 

<ul><li>For example: Gems should go inside Gems folder, projects should be placed into Projects folder, and project templates should go inside Templates folder.</ul><br>
Note: Remember to push your local changes to your version control remote repository
</ul>


<br>

## Create Your Own Gem For Your Project (Optional)
---
You can enjoy the freedom of creating your own gem and upload it with your remote repo.<br>
Please look at next section **Create release archive** if you want to make your gem avaliable to the world! <br>

Follow the below command to call the `--create-gem` and pass in the path to where you want your gem to be stored (If you don't specify a name for your gem, O3DE will use the folder name you passed in, which is the last parameter of your provided path).
<ul><ul><li>For example: "C:\o3de_Projects\RemoteProjectName\Gems\MyGem" Your gem name will be "MyGem" and its located in the Gems folder that was created during create-repo step</ul>
<br>
Note: Always put your gems in the Gems folder to avoid later confusion, Please follow the below template and pass your own gem in the path inside the Gems folder.

```
o3de.bat create-gem --gem-path "C:\o3de_Projects\<RemoteProjectName>\Gems\MyGem" --gem-name "SuperGem"
```
<ul>

This step registers your gem to the O3DE engine, you will be able to find your gem under the Gems tab in your project managaer. Be sure to use the `--edit-repo-properties` `--add-gem` in order to add your gem to your project in order to work with your gem.<br>
<ul> 
For example: Add your gem to your project when working locally:
<ul>

```
o3de.bat edit-repo-properties --repo-path "C:\o3de_Projects\<RemoteProjectName>\repo.json" --add-gem "C:\o3de_Projects\<RemoteProjectName>\Gems\MyGem"
```

</ul>
</ul>
<br>

However, pushing your changes to your version control repository would not allow other user to use your gem, move on to the next step if you want to create a downloadable `release archive` for your gem to be shared with the world. Make sure  you push all your changes before moving to the next step to share your gem with the world.
</ul>
</ul>

<br>

## Create Release Archive
---
The primary purpose of a **Release archive** is to provide a well-defined and stable version of the software that can be easily shared, installed, and distributed.<br> 

In O3DE we provide the option for users to create a release archive with .zip format.<br>

Due to user safty, we use `sha-256` to hash our files before creating the release archive. Thus, you won't be able to modify your `repo.json` file once your archive is created. Every time you make a change to your gem, including the repo.json file, the `sha-256` hash will change.<br>

<ul>

Note: You must know where your zip will be created online **download path** before you actually create the release archive zip.</ul>
<br>
<ul>

### Add A Gem To Your Remote Repository And Create A Release Archive
---
Here is a Github example of how to create a release archive. <br><br>
Note: `--release-archive-path` command can only be used after you call the `--add-gem` command.<br> See below example:

<ul>

<li>

To create a release archive `download prefix`, make sure you follow this pattern for any Github repositories:<br>
<ul>

 `https://github.com/YourGitAccount/RemoteProjectName/releases/download/YouReleaseTag`<br>

```
o3de.bat edit-repo-properties --repo-path "C:\o3de_Projects\<RemoteProjectName>\repo.json" --add-gem "C:\o3de_Projects\<RemoteProjectName>\Gems\MyGem" --release-archive-path "C:\o3de_Projects\<RemoteProjectName>\Gems" --download-prefix "https://github.com/<YourGitAccount>/<RemoteProjectName>/releases/download/<YouReleaseTag>"
```
<ul>

 Provide the following required information:
 <li> --repo-path: the absolute path to your remote project's repo.json file
 <li> --add-gem: the path to the directory to where the actual gem you want to add is located
 <li> --release-archive-path: the path to where you want to place your .zip archive, it should be placed in the Gems folder of your remote project folder
 <li> --download-prefix: the URI where your gem archive can be download from

<br>
1. Here is an example of where you should upload your release to Github (you can find this on your version control url):


![tag](Media/add_release.png)

2. Here is where you would be setting your release tag (make sure this tag is the same as the last parameter you passed for the `--download-prefix` arg)

![tag](Media/release_tag.png)

 </ul>
</ul>

WARNING: Make sure you know where your release will be available after uploading it to GitHub. Once uploaded, you won't be able to change the `download_source_uri` in your `repo.json` file. If you input the wrong download path, you will need to repeat this step and rezip the file and upload the release to Github again.
</ul>
After you upload your gem to the version control website, other users will be able to download it in their O3DE engine. It will be available in the Project Manager. Users can navigate to Remote Sources and use your remote project url to download associated gems based on the download path you provided in this step.<br><br>
</ul>

## Testing Your Remote Repo locally
---
You can test your remote repo locally before uploading to your remote repository to make sure your remote repo work as expected.
Use python to host a `local server` for testing

1. Start local python server, navigate to the root of your `repo.json` file.

<ul>

```
cd RemoteProject
``` 
</ul>

2. Start a local python server on 8080.

<ul>

```
python -m http.server 8080
```
</ul>

3. Use this below format for your `--download-prefix`.

<ul>

```
http://localhost:8080/Gems
```

Here is an example of where your download uri will be located:
```
http://localhost:8080/Gems/camera-0.1.0-gem.zip
```
</ul>

3. Open up the project manager and add a repo, when prompted use the URL for your local server which should be "http://localhost:8080/"

<ul>
    NOTE: adding the repo may fail without the trailing slash, and the name should match the repo url in repo.json
</ul>
