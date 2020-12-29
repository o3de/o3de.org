# Packages Commands<a name="lmbr-exe-packages"></a>

Before you can use `packages` commands, you must set up your workspace\. To do this, run Lumberyard Setup Assistant and perform each step of the setup process\.

The `packages` module downloads third party packages from S3\.

The `packages` module has dependencies on the `Engines` module\.

Use the following command to download a resource packages from S3\.

**download**  

```
lmbr packages download [name] [version] [platform] [uri] [destination] (-help)
  
- [name] (positional argument): The name of the package you want to download.
- [version] (positional argument): the version of the package you want to download.
- [platform] (positional argument): The platform of the package you want to download.
- [uri] (positional argument): Where to look for package on remote file system.
- [destination] (positional argument): Where to unpack the package.
- (-help): Print help describing available commands/options.
```