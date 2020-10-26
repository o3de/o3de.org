# Automating the Lumberyard Editor with the Python Editor Bindings gem<a name="editor-automation"></a>

 Some tasks in the Lumberyard Editor are tedious or could easily be automated, and to support that, Lumberyard has support for scripting the editor through Python bindings to the underlying editor implementation\. These bindings are enabled with the **PythonEditorBindings** gem, and interacted with through a Python 3 library embedded within the editor\. You can access a Python REPL through an in\-editor console, or launch the editor with an argument that loads and runs a Python script on boot\. 

## Enable editor automation<a name="editor-automation-enable"></a>

 Editor automation is enabled by selecting the **PythonEditorBindings** gem for your project, and then rebuilding the editor\. No specific configuration \(debug, profile, release\) is required to enable the Python bindings\. Because the bindings are enabled through a gem that you select for your project, you'll need to make sure that this gem is enabled for *all* projects that you intend to use automation with\. 

**Important**  
 In order to use the editor bindings, your Lumberyard installation needs to be configured to be able to build the editor and tools\. See [Running Lumberyard Setup Assistant](lumberyard-launcher-using.md) for details\. 

## Use editor automation<a name="editor-automation-use"></a>

 The easiest way to get started with editor automation is to use the REPL that's available from within the Lumberyard Editor and try out some commands\. Open this REPL by selecting **Tools** > **Other** > **Python Console**\. The Python console opens in a new editor view, which gives you access to a console that displays output from Python, the REPL input, and a full reference of available commands\. To get access to the reference, select the **?** icon in the lower\-right corner of the console\. 

 You can also access a set of available scripts, including some samples for common tasks in the editor, by selecting **Tools** > **Other** > **Python Scripts**\. These scripts are stored in a directory depending on their scope\. Scripts only for your project are stored in the `lumberyard_install\dev\Editor\Scripts` directory, and scripts meant to be used along with a gem are stored at `lumberyard_install\dev\Gems\gem\gemname\Editor\Scripts`\. 

 Editor automation is driven primarily through the event bus \(EBus\) system\. Before working with the editor bindings, you should become familiar with the basics of EBus from [Working with the Event Bus \(EBus\) system](ebus-intro.md)\. To learn about some of the specific busses used by the editor automation system, take a look at the [Python Editor Bindings gem examples](editor-automation-examples.md)\. 