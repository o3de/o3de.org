# Using Uber Files<a name="waf-uber-files"></a>

Uber files combine multiple C and CPP files into a single compilation unit, which is intended to reduce input/output impact on compilation time and help accelerate build time\.

The code in uber files must meet the following coding standards:
+ No global statics in the global namespace
+ No global 'using namespace' declarations

Waf compile jobs include files from the \*\.waf\_files lists\. These files have the following format:

```
{
  "<uber_file>": {
    "<source_filter_name>": [
      "file1.h",
      "file1.cpp"
    ]
  }
}
```

Valid values for `<uber_file>` are:
+ **none** – Files in this list are banned from uber files\. If you want your module to use precompiled headers, you must include them in this list\.
+ **auto** – Files in this list are combined into modules that are optimized for compile time by Waf\. Files that are automatically combined are sorted by absolute path and then combined until the file size path is reached\. The combination must be deterministic given the same input files and file size limit\.

  File size limits vary depending on the compilation:
  + 200K – Suggested for compiling remotely using Incredibuild
  + 300K – Default setting and suggested for compiling locally using an SSD
  + 400\-500K – Suggested for compiling using an HDD

  You can specify the file size by updating the **uber\_file\_size** value in the `user_settings` file or by running the following command: `--uber-file-size`
+ **somefilename\.cpp** – Files in this list are combined into `somefilename.cpp`\. This action is useful when certain files can only be combined together or when you want to combine platform\-specific code\.

Most waf\_files lists should include one `none` section with the precompiled header and an `auto` section with everything else\.

## Configuring Waf<a name="uber-files-configuring-waf"></a>

To help obtain the most optimal compile times, use the following:
+ **use\_uber\_files** = `True`
+ **max\_parallel\_link** = `4`
+ **use\_incredibuild** = `True`
+ **incredibuild\_max\_cores** = `128`