# Debugging Waf<a name="waf-debug"></a>

If you encounter issues that are not related to configuration, it is important to debug the internal Waf library\. For a Python callstack, you typically must debug in `\dev\Tools\Build\waf-version\waflib`\.

Using PyCharm, an IDE for Python development, you can browse to a file where you are having problems, set a breakpoint, and click the bug icon to start debugging\. Execution time may be slower when running PyCharm\. 

Opening the root directory creates file indexing\. You can use PyCharm to specify folders to exclude from the project structure, as shown in the example image\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/waf/waf-debug-pycharm.png)

You can also debug the way you would any native Visual Studio solution\-based project\. Right\-click the project you want to debug and select **Set as Startup Project**\. Continue the debugging process as you normally would\. If you receive a warning that the \_WAF\_ project is outdated but your project is already up\-to\-date, click **No** to build\.

## Troubleshooting<a name="waf-debug-troubleshooting"></a>

When using multiple jobs \(for example, `--jobs=12`\), Waf can be difficult to debug\. Try using `--jobs=1` to disable multi\-threading\.

When using IncrediBuild, the debugger won't properly execute all break points\. Try disabling IncrediBuild when debugging Waf\.