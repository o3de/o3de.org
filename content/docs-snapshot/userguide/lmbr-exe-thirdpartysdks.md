# ThirdPartySDKs Commands<a name="lmbr-exe-thirdpartysdks"></a>

Before you can use `thirdpartysdks` commands, you must set up your workspace\. To do this, run Lumberyard Setup Assistant and perform each step of the setup process\.

The `thirdpartysdks` module manages the installation states of third party SDKs\. These are specified by default in the `\3rdParty\` directory\. If you have defined a different third party SDKs path in the `SetupAssistantUserPreferences.ini` configuration file, then this module manages the SDKs in that path\. 

The `thirdpartysdks` module has dependencies on the following:
+ `Engines` module
+ [`Capabilities`](lmbr-exe-capabilities.md) module – Downloads only the SDKs that are required based on the user\-enabled capabilities\.
+ [`Packages`](lmbr-exe-packages.md) module
+ `SetupAssistantUserPreferences.ini` – Path specified for the `SDKSearch3rdParty` property\.
+ `SetupAssistantConfig.json` – Parses the SDK required for the engine 

Use the following commands to manage Lumberyard third party SDKs\.

**list**  
Prints out a list of SDKs specified by `SetupAssistantConfig.json` and their available state\.  

```
lmbr thirdpartysdks list (-help)
```

**setup**  
Downloads and sets up all Lumberyard third party SDKs based on your current selected [capabilities](lmbr-exe-capabilities.md)\. Does not support software installation such as FBX or Android SDK\.  

```
lmbr thirdpartysdks setup (-only <sdk1,sdk2,sdk3>) (-3rdpartypath <path>) (-help)
  
- (-only) (list): Specify name(s) of specific SDKs to set up (comma separated).
- (-3rdpartypath) (string): Path to your third party folder. Defaults to path in SetupAssistantUserPreferences.ini.
- (-optionals) (flag): Flag to include optional sdks. Does not work if specifying specific sdks.
- (-help): Print help describing available commands/options.
```