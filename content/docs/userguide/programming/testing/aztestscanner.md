---
description: ' Use the AZ test scanner tool to run unit tests that are built into
  &ALY; libraries and executables. '
title: Using AZ Test Scanner
---
# Using AZ Test Scanner<a name="testing-aztestscanner"></a>

The AZ test scanner is a tool for running unit tests that are built into Lumberyard libraries and executables\. This tool simplifies testing by automatically finding libraries and executables to test\. It also provides flexibility for programmers to focus on testing the parts of Lumberyard that they care about\.

The AZ test scanner has two components:
+ An AZ test runner executable that loads libraries to test and capture the test results
+ An AZ test Python module that performs the scanning and reporting functions

## Creating Unit and Integration Test Builds<a name="testing-aztestscanner-building"></a>

Unit and integration tests are not included in Lumberyard builds by default as they increase the overall size of a game project\. Test code can also have unexpected effects on performance\. To build components with tests included, you can use a special test variant that works with each configuration\.

To create test builds, use the [Waf build system](/docs/userguide/waf/intro.md) in the same way that you create regular builds\. The only difference is that you add `test` to the platform\. You can create a test build on Windows using one of the following examples:

```
// Build with tests using debug configuration. Outputs to the \Bin64vc141.Debug.Test folder.
lmbr_waf.bat build_win_x64_vs2017_debug_test -p all

// Build with tests using profile configuration. Outputs to the \Bin64vc141.Test folder.
lmbr_waf.bat build_win_x64_vs2017_profile_test -p all

// Build with tests using debug configuration. Outputs to the \Bin64vc142.Debug.Test folder.
lmbr_waf.bat build_win_x64_vs2019_debug_test -p all

// Build with tests using profile configuration. Outputs to the \Bin64vc142.Test folder.
lmbr_waf.bat build_win_x64_vs2019_profile_test -p all
```

**Note**  
Only Windows debug and profile builds are supported for testing\. Other platforms are not supported\. Release builds are not supported either\.

For more information on writing tests, see [Writing Tests for AzTest](/docs/userguide/programming/testing/aztest-writing-tests.md)\.

## Running Unit and Integration Test Builds<a name="testing-aztestscanner-running"></a>

A completed test build includes the file `AzTestRunner.exe` in the `\Bin64vc141.Test` folder\. Although you can use this to run tests, we recommend that you use the test scanner that uses `AzTestRunner.exe` in an automated manner\.

You have two ways to use the scanner:
+ Include the AZ test module in your Python path: `python -m aztest`\. 
+ Use the `lmbr_test.cmd` script located in the Lumberyard `\dev` folder\. This automatically includes the AZ test module in your Python path and sends all script parameters to the module\.

The following example uses the `lmbr_test.cmd` scripts\. The scanner has several options but only requires one parameter to operate: the build directory to scan\. You can use the following command to scan your entire test build:

```
// Scan entire test build and run all found tests
lmbr_test.cmd scan --dir Bin64vc141.Debug.Test
```

**Note**  
The default scan tests libraries only\. It does not attempt to test any executables it finds\. This is because executables that are not set up to run tests interrupt the scanner until you close the application\.

The scanner produces three types of files\. All files are created in the current working directory from which the scanner is called:
+ The `aztest.log` file that contains a log of all test output
+ Several `.xml` files that contain the test results of each library and executable that has tests, time stamped by default
+ An `.html` file that contains a summary of the test results from the entire scan, time stamped by default

The full list of options is shown as follows:

The scanner runs only unit tests by default\. This is because unit tests are designed to be fast and do not rely on engine resources\. To run integration tests instead, use the `--integ` flag when calling the scanner:

```
// Scan test build and run integration tests on CrySystem.dll
lmbr_test.cmd scan --dir Bin64vc141.Debug.Test --only CrySystem.dll --integ
```

**Note**  
For best results, run integration tests on a single library or use an allow list \. Scanning the full build might take hours to complete\.

 


****  

| Option | Required? | Description | 
| --- | --- | --- | 
| \-\-dir, \-d | Yes | The directory to scan for tests\. | 
| \-\-runner\-path | No | Path to the AZ test runner executable \(the default is to look in the directory specified by \-\-dir\)\. | 
| \-\-add\-path | No | Adds path to system path before running tests; used for resolving library or executable dependencies\. | 
| \-\-output\-path | No | Sets the path for output folder prefix \(the default is \\dev\\TestResults \)\. | 
| \-\-integ, \-i | No | If set, runs integration tests instead of unit tests\. | 
| \-\-no\-timestamp | No | If set, removes the time stamp from output files\. | 
| \-\-wait\-for\-debugger | No | If set, tells the AZ test runner executable to wait for a debugger to be attached before running tests\. | 
| \-\-bootstrap\-config | No | Path to a JSON configuration file for bootstrapping applications required by libraries\. | 
| \-\-limit, \-n | No | Sets a limit for the maximum number of modules to scan\. | 
| \-\-only, \-o | No | Sets a filter to run tests on only the specified library or executable name\. | 
| \-\-whitelist\-file | No | Path to a new line\-delimited file used as an inclusion list\. The new line\-delimited file allows for regular expressions when matching\. | 
| \-\-blacklist\-file | No | Path to a new line\-delimited file used as an exclusion list\. The exclusion list takes precedence over the inclusion list\. The new line\-delimited file allows for regular expressions when matching\. | 
| \-\-exe | No | If set, causes the scanner to call executables for testing\. \(The default is to test only libraries\.\) | 

The scanner also accepts additional parameters that are passed to the testing framework\. For Lumberyard, GoogleTest, and GoogleMock for C\+\+ are used for unit testing\. You can enter parameters in the scanner command line as shown in the following example:

```
// Scan CrySystem.dll and shuffle the test order before running
lmbr_test.cmd scan --dir Bin64vc141.Test --only CrySystem.dll --gtest_shuffle
```

The scanner can also be called as a chained command using Waf\. This means that you can build tests and run them using a single command line\. The Waf command `run_tests` calls the scanner on the most recent build folder\. For example:

```
// Build a debug test build and then run tests in it
lmbr_waf.bat build_win_x64_vs2017_debug_test -p all run_tests
```

The `run_tests` command automatically points to the `\Bin64vc141.Debug.Test` folder to scan\. It also uses the `all` option for inclusion\. The build step does not require the use of `run_tests`; it always matches the last build\. You can also send all of the scanner parameters through using `--test-params`:

```
// Run tests on the last build with additional parameters (use quotes to capture as string)
lmbr_waf.bat run_tests --test-params="--no-timestamp"
```

You can also use the `--target` flag to build and test just one module:

```
lmbr_waf.bat build_win_x64_vs2017_debug_test -p all --target CrySystem run_tests
```

### Including and excluding to filter tests<a name="testing-aztestscanner-include-exclude"></a>

The test scanner includes the ability to use include and exclude files to filter out libraries and executables that you do not want to test\. By default, all found tests are run\. In all cases, modules that are excluded are never tested even if they are part of the inclusion list\. 

Both include and exclude lists use a new line\-delimited text file for defining what modules to scan\. Each line is treated as a regular expression for matching, allowing for easy filtering by modules with similar names or in the same directory\. Here is an example file:

```
# List files directly (remember to escape backslashes in regex)
CrySystem.dll
rc\\ResourceCompilerPC.dll

# Match similar modules using regex (include all gem libraries)
Gem\..*\.dll

# Match all in a subdirectory using regex
EditorPlugins\\.*
```

To run the scanner using text files, use the following example:

```
lmbr_test.cmd scan --dir Bin64vc141.Test --whitelist-file my_include_list.txt --blacklist-file my_exclude_list.txt
```

You can specify as many inclusion and exclusion lists as you need\. The patterns in each file are combined into one set\. For example:

```
lmbr_test.cmd scan --dir Bin64vc141.Test --whitelist-file include1.txt --whitelist-file include2.txt
```

To set a default include list, create a text file called `lmbr_test_whitelist.txt`\. Place the text file in the root directory of the build \(where `lmbr_test.cmd` is\)\. The default exclude list is similarly called `lmbr_test_blacklist.txt`\. A default exclude list is provided with the build to capture known libraries that do not need to be scanned\.