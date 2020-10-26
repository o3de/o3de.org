# Raw File Access in Lumberyard<a name="file-access-direct"></a>

This topic describes how to directly access files in Lumberyard for special use cases\. However, it's recommended that you use the Lumberyard Asset system to work with asset files\. In most cases, raw file access is not required\. For more information see [Working with the Asset Pipeline and asset files](asset-pipeline-intro.md)\.

When you write an `AssetHandler`\-derived class to load assets in Lumberyard, runtime file handling is automatic\. However, some cases might require lower levels of file access at run time\. Scenarios that might require low\-level file access include:
+ Loading raw configuration files from the deployment root during startup before `.pak` files are mounted and available\.
+ Direct access to the files in a `.pak` file\.
+ Direct access to files at arbitrary locations on disk\.
+ Streaming file formats \(for example, audio or video\) that do not load the entire file but play it back\. This approach commonly uses middleware to play back or capture audio, video, or vertex data\. Most such systems require that you implement file hooks to perform operations like `read`, `seek`, `tell`, `open`, and `close`\. In these cases, direct file access might be easier than treating the files as assets and performing operations on them with `AZ::Data` systems\.
+ Other legacy systems or middleware that require direct file access for which `AZ::DataAsset` systems cannot be used\. However, note that it is possible to write a file access shim that describes how to access files for most middleware\.
+ Loading raw source files from locations other than the asset cache\. Loading source files from locations other than the asset cache is possible only for tools inside Lumberyard Editor\. Only the asset cache ships with your game, so loading raw source files from locations other than the asset cache at run time is not possible\.

The few cases where you need to work directly with files are covered by a small number of classes in the `AZ::IO` namespace such as `FileIOBase` and `FileIOStream.`

## The FileIOBase Virtual Class<a name="file-access-direct-fileiobase-virtual-class"></a>

The pure\-virtual base class `FileIOBase` \(located in `\dev\Code\Framework\AzCore\AzCore\IO AzCore\IO\FileIO.h`\) defines the API for accessing files\. It is a basic blocking low\-level file API, as the following code shows:

```
class FileIOBase
{
...
    static FileIOBase* GetInstance();  ///< Use this to get a concrete instance of the API that follows. 
...
    virtual Result Open(const char* filePath, OpenMode mode, HandleType& fileHandle) = 0;
    virtual Result Close(HandleType fileHandle) = 0;
    virtual Result Tell(HandleType fileHandle, AZ::u64& offset) = 0;
    virtual Result Seek(HandleType fileHandle, AZ::s64 offset, SeekType type) = 0;
    virtual Result Read(HandleType fileHandle, void* buffer, AZ::u64 size, bool failOnFewerThanSizeBytesRead = false, AZ::u64* bytesRead = nullptr) = 0;
    virtual Result Write(HandleType fileHandle, const void* buffer, AZ::u64 size, AZ::u64* bytesWritten = nullptr) = 0;
    virtual Result Flush(HandleType fileHandle) = 0;
    virtual bool Eof(HandleType fileHandle) = 0;
...
};
```

The `FileIOBase` class contains operations to find files, create or delete directories, and inspect attributes\. In addition, the class contains a directory aliasing system that is covered later in this document\.

### Getting an Instance of the I/O Interface<a name="file-access-direct-getting-an-instance-of-the-io-interface"></a>

For almost all file operations, you call the `GetInstance` function to retrieve an instance of the file I/O interface:

```
AZ::IO::FileIOBase::GetInstance()
```

### Notes<a name="file-access-direct-fileiobase-notes"></a>
+ All file operations in the `FileIOBase` class are blocking\.
+ `FileIOBase` file operations behave similarly to the C language API `fopen`, `fread`, and `fclose` operations, but are 64\-bit aware and work with very large files\.
+ Because the `FileIOBase` instance is created and initialized when the engine initializes, it is generally always available\. It can inspect `.pak` files and arbitrary files on disk\. For more information, see [The FileIO Stack](#file-access-direct-fileio-stack) later in this document\.

**Note**  
Because `.pak` files are initialized only after the application boots, attempting to access data inside `.pak` files before they are mounted will fail\.

For more information, see the code comments in the `FileIO.h` file\.

## The Aliasing System<a name="file-access-direct-aliasing-system"></a>

In addition to a set of file functions mentioned above, the `FileIOBase` class provides *directory aliases\.* Directory aliases are prefixes that you add to a file name\. An alias indicates a virtual directory for a `.pak` file or arbitrary location on disk\.

**Note**  
We recommend that you always use the aliasing system to refer to files that are in the cache\. Never use absolute paths\. Files in the cache might be inside `.pak` files or in unexpected locations on mobile devices\. In these cases, the use of absolute path names can fail\.

### Getting the Path of an Alias<a name="file-access-direct-getting-the-path-of-an-alias"></a>

To retrieve the path associated with an alias, use the `GetAlias` function\.

```
FileIOBase::GetAlias()
```

### List of Aliases<a name="file-access-direct-list-of-aliases"></a>

This section describes the use of directory aliases\.

**`@assets@`**  
Refers to the asset cache\. This is the default alias when no alias is specified\. Note the following:  
+ Because `@assets@` is the default alias, code can simply load files by name \(for example, `textures\MyTexture.dds`\) without using the asset system\. This makes it unnecessary to have the `@assets@` alias appear throughout the code\.
**Note**  
If you are loading files from the asset cache, do not prefix your file names with the `@assets@` alias\. The use of aliases is required only when you must alter the default behavior\. This best practice makes your code easier to read and enhances compatibility\.
+ During development on a PC, `@assets@` points to the `dev\Cache\<game_name>\pc\<game_name>` directory\. After release, it points to the directory where your `.pak` files are stored \(not the root of your cache where your configuration files are stored\)\.
+ Because the asset cache can be locked by asset processing operations, attempting to write to the asset cache can cause an assertion fail\. Do not attempt to write files to the asset cache\.

**`@root@`**  
Specifies the location of the root configuration files like `bootstrap.cfg`\. Note the following:  
+ The asset cache `@assets@` can be a child directory of `@root@`, but that is not always the case\. Therefore, do not make this assumption\. If you want to load a root file, use `@root@`\. If you want to load assets, either use no alias \(because `@assets@` is the default\), or use `@assets@`\.
+ During development, the `@root@` directory maps to your `dev\Cache\<game_name>\pc` directory\. In release, this directory is the root directory of your game distribution \(where the `bootstrap.cfg` file is stored\)\.
+ Attempting to write to the `@assets@` location causes an assertion fail\. You should change these files in your source `dev\` directory, not in the cache\.

**`@user@`**  
Specifies a writable directory that stores data between gaming sessions\. Note the following:  
+ It is not expected that the user will delete this directory\.
+ On a PC, `@user@` is the `dev\Cache\<game_name>\pc\user` directory\.
+ On other operating systems and devices, the `@user@` location can be different\. Some mobile operating systems have restrictions on where applications can write files\.

**`@cache@`**  
Specifies a writable directory for storing temporary data\. The user can delete this data at any time\.

**`@log@`**  
Specifies a writable directory for storing diagnostic logs\.

### Code Examples<a name="file-access-direct-code-examples"></a>

A\. The following code example opens a file in the assets directory\.

```
using namespace AZ::IO;
HandleType fileHandle = InvalidHandle;
// Because @assets@\config\myfile.xml is desired, an alias doesn't have to be specified.
// All files in the @assets@ alias are always lowercase. This removes concerns about 
// case sensitive environments.
if (FileIOBase::GetInstance()->Open("config/myfile.xml", OpenMode::ModeRead|OpenMode::ModeBinary, fileHandle))
{
    // Open succeeded. Use other API operations of FileIOBase to perform operations with the handle. Remember to close the file!
    FileIOBase::GetInstance()->Close(fileHandle);
}
```

Note that because aliases are used in the preceding example, the `config\myfile.xml` file would be found even if it is inside a `.pak` file\.

B\. The following code example opens a file in the log directory and appends log lines to it\.

```
using namespace AZ::IO;
HandleType fileHandle = InvalidHandle;
// In this rare case, you want to write to a file in the @log@ alias, 
// so the file name must be specified.
// Because you're writing a file to a non-@assets@ directory, it can contain case.
if (FileIOBase::GetInstance()->Open("@log@/gamelog.txt", AOpenMode::ModeAppend|ModeText, fileHandle))
{
    // Open succeeded. Use other API operations of FileIOBase to perform operations with the handle.
    FileIOBase::GetInstance()->Close(fileHandle);
}
```

The `FileIOStream` class in the `AZ::IO` namespace automatically closes a file when it goes out of scope and presents it as a `GenericStream` interface\. This provides compatibility for systems such as the streamer system and serialization system that expect generic streams\.

### Tools\-Only Aliases<a name="file-access-direct-tools-only-aliases"></a>

The following aliases are applicable only for editor tools\.

**`@devroot@`**  
Specifies the `\dev\` directory of your source tree where files like `bootstrap.cfg` are located\. These files are consumed by the Asset Processor and deployed into the cache specified by `@root@`\.

**`@devassets@`**  
Specifies the location of your game project's assets directory in the source tree\. This directory contains uncompiled source files like `.tif` or `.fbx` files\. It does not contain compressed `.dds` files or other assets that a game normally uses\. Note the following:  
+ `@devassets@` is a good starting point for a file open dialog that asks a user where to save a new file\.
+ Because existing files might be in a gem, do not save them in `@devassets@`\. Instead, when your editor opens a file, have your editor remember the file's location\. Then have the editor save the file to the file's original location\.
+ Because not all source files are located in `@devassets@` \(many are located in gems\), do not attempt to find all source files by searching its location\.

## The FileIO Stack<a name="file-access-direct-fileio-stack"></a>

To service the needs of the game client and tools, more than one `FileIO` instance is created\. These instances form a stack through which file requests flow, as the following diagram illustrates\.

![\[File access in local and remote scenarios\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/file-access-direct-1.png)

The behavior of the **Either/Or** branch depends on whether the virtual file system \(VFS\) feature \(`RemoteFileIO` in the diagram\) is enabled\. VFS reads assets remotely from non\-PC devices such as [Android](using-the-virtual-filing-system-vfs.md) and [iOS](ios-virtual-file-system.md)\. VFS is required for [live reloading of assets](asset-pipeline-live-reloading.md)\. Otherwise, assets would need to be deployed directly onto game devices\. VFS is disabled by default\. To enable VFS, edit the `remote_filesystem` entry of the `\dev\bootstrap.cfg` configuration file, as in the following example\.

```
-- remote_filesystem - enable Virtual File System (VFS)
remote_filesystem=1
```

Because the VFS feature is at a low level, file access operations are transmitted transparently over the network through the Asset Processor to the layers above\.

To send requests for files through other systems, you can implement your own version of `FileIOBase` \(or one of the derived classes such as `RemoteFileIO` or `LocalFileIO`\)\. If you replace the instance returned by either `GetInstance` or `GetDirectinstance` with your own instance, the `FileIO` system uses your layer instead\. You can form a stack of additional filters by replacing the instance with your own\. Then make your own instance call down into the previously installed instance\.

## Asynchronous Streaming<a name="file-access-direct-asynchronous-streaming"></a>

If you want to use asynchronous background streaming, consider using the `AZ::IO::Streamer` class instead of `FileIOBase`\. The `Streamer` class uses `FileIOBase` internally, but it uses asynchronous semantics\. To use the `Streamer` class, you pass data and a deadline to it\. The `Streamer` class puts the data into a buffer and does its best to fulfill the request before the specified deadline\.

For more information, see the code and comments in the `\dev\Code\Framework\AzCore\AzCore\IO\Streamer.h` file\.