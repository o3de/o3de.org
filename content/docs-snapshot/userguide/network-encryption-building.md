# Building with Encryption<a name="network-encryption-building"></a>

When you include the GridMate library in your project, encryption support is automatically provided\. However, because the GridMate library is statically linked, you must first make some modifications to the [WAF build script](waf-using-module.md) \(wscript\) that uses GridMate\. 

## Building Your Project with Encryption<a name="network-encryption-building-project"></a>

To use encryption with GridMate, you must modify your `.wscript` file to add a dependency on GridMate, link the OpenSSL library, and specify OpenSSL library paths\.

**To modify your \.wscript file to use OpenSSL with GridMate**

1. Add the following line to create a dependency on GridMate: 

   ```
   use = ['GridMate']
   ```

1.  Add the following line to link the OpenSSL library:

   ```
   win_lib = ['ssleay32', 'libeay32']
   ```

1. Add the OpenSSL library paths, as in the following example\. Within the Lumberyard install directory, these paths are in the folder `dev\Code\SDKs\OpenSSL\lib\`: 

   ```
   win_x64_debug_libpath = [ bld.Path('Code/SDKs/OpenSSL/lib/vc120_x64_debug') ],
   win_x64_profile_libpath = [ bld.Path('Code/SDKs/OpenSSL/lib/vc120_x64_release') ],
   win_x64_release_libpath = [ bld.Path('Code/SDKs/OpenSSL/lib/vc120_x64_release') ],
   win_x64_debug_dedicated_libpath = [ bld.Path('Code/SDKs/OpenSSL/lib/vc120_x64_debug') ],
   win_x64_profile_dedicated_libpath = [ bld.Path('Code/SDKs/OpenSSL/lib/vc120_x64_release') ],
   win_x64_release_dedicated_libpath = [ bld.Path('Code/SDKs/OpenSSL/lib/vc120_x64_release') ]
   ```

## Building Without Encryption<a name="network-encryption-building-without"></a>

 If your project uses GridMate, but does not require support for encryption, ensure that the `GridMateForTools` line is in your `.wscript` file: 

```
use = ['GridMateForTools']
```