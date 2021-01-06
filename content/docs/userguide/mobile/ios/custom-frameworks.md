---
description: ' Add iOS Framework libraries to your &ALYlong; Gems. '
title: Add iOS Frameworks to a &ALY; project
---
# Add iOS Frameworks to a Lumberyard project<a name="ios-custom-frameworks"></a>

 As part of making changes to your core application on iOS, you may need to include bundled libraries for Darwin platforms called [Frameworks](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Frameworks.html)\. Frameworks are versioned bundles of libraries and their headers packaged as a single redistributable, and more common to ship for Darwin\-based platforms rather than independent `.dyld` libraries and header files\. When building for iOS, these frameworks need to be included in your final application bundle and code\-signed like the rest of your binary\. Because headers ship as part of a Framework, you don't need to explicitly export them so that the build system or your code will see the headers\. 

## Include frameworks in the launcher's `wscript`<a name="ios-custom-frameworks-wscript"></a>

 This section of the guide walks you through configuring your project launcher's `wscript` to support linking and including Frameworks, as well as \. Before reading the rest of this topic, make sure that you're familiar with the general principles behind Waf build scripts in Lumberyard\. For more information, see [Waf Module Files \(wscript\)](/docs/userguide/waf/files-module-files-wscript.md)\. 

1. Open the file `lumberyard_install_dir/dev/Code/LauncherUnified/wscript` in a text editor\.

1.  Inside the function `package(pkg)`, add the **custom\_frameworks** argument when calling `pkg.package_game()`\. The value of this argument is an array of paths to the frameworks that you want to include\. Paths to frameworks can either be absolute or relative to `lumberyard_install_dir/dev`\. 

   ```
   pkg.package_game(
           target            = '{}Launcher'.format(pkg.project),
           task_gen_name     = '{}ClientLauncher'.format(pkg.project),
           platforms         = ['appletv', 'darwin', 'ios'],
           client_only       = True,
           exclude_test      = True,
           custom_frameworks = [ path-to-framework-1, path-to-framework-2, ... ],
       )
   ```

1. Save and close the file\.

1. Unless you need to also modify your `rpath` as described in the next section due to non\-default framework locations, build your project\.

 During the build process, frameworks are copied to the `@executable_path/Frameworks` directory within your application bundle\. 

## Add library search paths<a name="ios-custom-frameworks-rpath"></a>

 If you've placed Frameworks in a location other than `@executable_path/Frameworks`, you need to add this directory to your project's `rpath`\. iOS uses `rpath` information to find dynamic libraries to load at runtime, meaning that if your framework isn't included as a subdirectory of an `rpath` element, your application won't be able to load the framework library and may crash or experience other serious errors\. 

 To add an element to your project's `rpath`, follow these instructions\. 

1. Open the file `lumberyard_install_dir/dev/Code/LauncherUnified/wscript` in a text editor\.

1.  Inside the function `build(bld)`, add values to the `ios_rpath` argument when calling `bld.CryLauncher()`\. The value of this argument is an array of `rpath` values to be used at runtime\. `rpath` values should always start with `@executable_path`, which resolves to the root of the application bundle\. 

   ```
   bld.CryLauncher(
       # Common
       target              = 'ClientLauncher',
       file_list           = 'launcher.waf_files',
       pch                 = 'Launcher_precompiled.cpp',
       client_only         = True,
       exclude_test        = False,
       use                 = ['AzGameFramework'],
       includes            = [bld.Path('Code/CryEngine/CryCommon')],
       
       # Platform Specific
       platform_roots      = [{'root': 'Platform', 'export_includes': False}],
       ios_rpath           = ['@executable_path/Frameworks', my-framework-directory, ...],
       
       test_file_list      = ['launcher_test.waf_files'],
       test_use            = ['AzTest'],
       test_uselib         = ['GMOCK'],
       test_win_linkflags  = ['/SUBSYSTEM:CONSOLE']
   )
   ```
**Important**  
 Don't remove any values from this argument that you didn't add yourself\! Removing any of the default `rpath` values will cause your application to crash\. 

1. Save and close the file\.

1. Rebuild your project\.