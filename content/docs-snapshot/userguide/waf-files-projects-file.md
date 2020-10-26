# Waf Projects File \(project\.json\)<a name="waf-files-projects-file"></a>

The `project.json` file \(located in each game project directory\) is used to store game project\-specific data\. The **enabled\_game\_projects** settings \(`user_settings.options`\) and the **\-\-enable\-game\-projects** build parameter use the project names defined in this file\.

The `project.json` file is structured as follows:
+ **First level** – Represents the project based on its name
+ **Second level** – Presents attributes that you can set for each game project

The following is an example `project.json` file:

```
    "project_name"      : "SamplesProject",
    "product_name"      : "Samples Project",
    "executable_name"   : "SamplesProjectLauncher",
    "code_folder"       : "Code/SamplesProject",
    "modules"           : ["SamplesProject"],
    "project_id": "{D882E365-54D6-586E-BD78-2650F3057D49}",
```

You can configure the following settings in the `project.json` file:


**General settings**  

| Value | Description | 
| --- | --- | 
| executable\_name | Name of the built executable file:[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/waf-files-projects-file.html) | 
| modules | \(List\) Base modules for the game | 
| product\_name | Externally\-facing name of the product | 

The following values are only valid under the **android\_settings** key:


**Android settings**  

| Value | Description | 
| --- | --- | 
| package\_name |  Android application package identifier\. Used for generating the project\-specific Java activity class and in `AndroidManifest.xml`\. Must be in dot separated format\. Default: "com\.lumberyard\.sdk"  | 
| version\_number |  Internal application version number\. Used to set the `android:versionCode` tag in `AndroidManifest.xml`\. Default: 1  | 
| version\_name |  Human readable version number\. Used to set the `android: versionName` tag in the `AndroidManifest.xml`\. Example: "1\.2\.3\-beta" Default: "1\.0\.0\.0"  | 
| orientation |  Desired orientation of the Android application\. Used to set the `android:screenOrientation` tag in `AndroidManifest.xml`\. Expectable values can be found here: [http://developer\.android\.com/guide/topics/manifest/activity\-element\.html\#screen](http://developer.android.com/guide/topics/manifest/activity-element.html#screen) Default: "landscape"  | 
| icons |  A map of icon override path\(s\) for each screen DPI type\. All entries require a path that is either relative to <engine>\\Code\\<project>\\Resources or an absolute resource path to the PNG image\.  Available sub\-options: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/waf-files-projects-file.html)  For more information on Android screen DPI settings, consult the official Android documentation page [https://developer\.android\.com/guide/practices/screens\_support\.html](https://developer.android.com/guide/practices/screens_support.html)  Example: <pre>"icons" : <br />                        {<br />                        "default" : "AndroidLauncher/icon-xhdpi.png",<br />                        <br />                        "mdpi" : "AndroidLauncher/icon-mdpi.png",<br />                        "hdpi" : "AndroidLauncher/icon-hdpi.png",<br />                        "xhdpi" : "AndroidLauncher/icon-xhdpi.png",<br />                        "xxhdpi" : "AndroidLauncher/icon-xxhdpi.png",<br />                        "xxxhdpi" : "AndroidLauncher/icon-xxxhdpi.png"<br />                        }</pre>  Default: Empty  | 
| splash\_screen |  A map of splash screen override path\(s\) for each orientation and screen DPI type\. All entries require a path that is either relative to <engine>\\Code\\<project>\\Resources or an absolute resource path to the PNG image\. Available sub\-options \(orientation type\): [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/waf-files-projects-file.html)  Available sub\-options for each orientation type: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/waf-files-projects-file.html)  For more information on Android screen DPI settings, consult the official Android documentation page [https://developer\.android\.com/guide/practices/screens\_support\.html](https://developer.android.com/guide/practices/screens_support.html)  Example: <pre>"splash_screen" : <br />                        {<br />                        "land" :<br />                        {<br />                        "default" : "AndroidLauncher/splash-xhdpi.png",<br />                        <br />                        "mdpi" : "AndroidLauncher/icon-mdpi.png",<br />                        "hdpi" : "AndroidLauncher/icon-hdpi.png",<br />                        "xhdpi" : "AndroidLauncher/icon-xhdpi.png",<br />                        "xxhdpi" : "AndroidLauncher/icon-xxhdpi.png"<br />                        },<br />                        "port" : <br />                        {<br />                        "default" : "AndroidLauncher/icon-xhdpi.png",<br />                        <br />                        "mdpi" : "AndroidLauncher/icon-mdpi.png",<br />                        "hdpi" : "AndroidLauncher/icon-hdpi.png",<br />                        "xhdpi" : "AndroidLauncher/icon-xhdpi.png",<br />                        "xxhdpi" : "AndroidLauncher/icon-xxhdpi.png"<br />                        }<br />                        }</pre> Default: Empty  | 
| place\_assets\_in\_apk |  Forces the assets to be packed in the APK in non\-release builds\. Must be either a 1 \(Yes\) or 0 \(No\)\. Default: 0  | 
| app\_public\_key |  The application license key provided by Google Play\. Required for using APK Expansion files or other Google Play Services\.  Example:  <pre><br />                        "MIIBIjANBgkqhkiG9w0BALuMbErYaRdAMIIBCgKCAQEAjvkl+K7rVASNkLExAmPlEoWwsxCX1vx7<br />                        uV3IIH5CQIZBRGT8KeYr6ThWlIPhSMKMImj7KxjdYcil8J0rwrVL3cmAYdMM+02ntnBEemGvRVOKx<br />                        kDaFc5Fw6tJVv3SJ6UyjVtehB7tJupaYdfFe9SVhW0xJZu2YsZLuMbErYaRdrrgXU2Upr547mxuyE<br />                        HJ7jG7YFVrQgxou1W/71QnExAmPlExi6mlsUJBFN4xADikNWZDlI70iHF6ZYyOspZCbVZ9DScN+D5<br />                        oS3KeY/KKd5WOU6BB8NmTY5VZVdUOd4VPRXrYMnRY7FjZJMPujLNvlrAJs5H/G+0wUTR4SI61AiGJ<br />                        iQIDAQAB"</pre> Default: "NoKey"  | 
| app\_obfuscator\_salt |  Application specific salt value for \(un\)obfuscation when using APK Expansion files Example: "`8d87473f5b24852836d6512abbd9e9b9869c208`" Default: ""  | 
| enable\_obb\_in\_dev |  Forces APK Expansion file mode in non\-release builds\. Value must be either "true" or "false"\. Default: "false"  | 
| use\_main\_obb |  Specify if the "Main" APK Expansion file should be used\. This option toggles APK Expansion file mode in release builds\. Value must be either "true" or "false"\. Default: "false"  | 
| use\_patch\_obb |  Specify if the "Patch" APK Expansion file should be used\. This option toggles APK Expansion file mode in release builds\. Value must be either "true" or "false"\. Default: "false"  | 
| enable\_key\_screen\_on |  Enabled or disable the screen wake lock \(device won’t go to sleep while the application is running\)\. Value must be either "true" or "false"\. Default: "false"  | 
| rc\_pak\_job |  Path to the RC job XML file used to override the normal PAK files generation used in release builds\. Path must be relative to *<lumberyard\_version>*\\Bin64\\rc Default: "RcJob\_Generic\_MakePaks\.xml"  | 
| rc\_obb\_job |  Path to the RC job XML file used to override the normal APK Expansion file\(s\) generation used in release builds\. Path must be relative to *<lumberyard\_version>*\\Bin64\\rc Default: " RCJob\_Generic\_Android\_MakeObb\.xml"  | 