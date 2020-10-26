# Adding Qt 5 Content to Waf<a name="waf-qt-content"></a>

You can add Qt 5 content into the Waf build system\. Typically you use an IDE \(integrated development environment\) tool such as Qt Designer to create and edit the Qt source file\. As with all files that are processed through the Waf build system, the Qt source file must be included in the corresponding `*.waf_files` file for each project\.

Intermediate files that need additional compilation such as the `.rcc` file from the `.qrc` compiler do not need to be specified explicitly in these files or any other source file\. In addition, intermediate `.rcc` files are never included in any uber files \(if the uber file option is enabled\) since they are not compatible with uber files in general\.

To enable Qt for a particular module, you must define it as a feature\. Each module's configuration is in a `wscript` file that is in each module's directory\. For example, the `EditorUI_QT` module has a `wscript` file located at `dev\Code\Sandbox\Plugins\EditorUI_QT\`\. To enable Qt, edit this file and add `['qt5']` to the `features` line, as shown in the following example\. 

```
bld.CryEditorUiQt(
        # Settings
        target              = 'EditorUI_QT',
        vs_filter           = 'Sandbox/Plugins',
        file_list           = 'editorui_qt.waf_files',
        platforms           = ['win'],
        configurations      = ['debug', 'debug_test', 'profile', 'profile_test'],
        features            = ['qt5'],
```

## MOC \(Meta\-Object Compiler\) Files<a name="waf-qt-content-moc"></a>

When header files need to be processed by the Meta\-Object Compiler \(MOC\) as part of the build process, the build system identifies them by including their MOC output file inside the source `.cpp` file\. For example, if `foo.h` is a file that is to be processed by MOC, then the source `foo.cpp` file also needs to include the corresponding `#include` for the `.moc` file that is generated\. 

For example:

```
...
#include "foo.h"
 
..
..
 
#include <foo.moc>
```

The `#include` for the `.moc` file requires angled brackets because the generated `.moc` file does not reside in the local project directory but rather is located in an intermediate directory\. Also, the include path that is added to the project is based on the mirrored project base in the intermediate directory\. If the header file exists in a relative subdirectory, that subdirectory needs to be included in the `#include` for the `.moc`, regardless of where the `.cpp` file is located\.

For example, if `foo.h` and `foo.cpp` are moved into the `\test` subdirectory, the result looks like the following:

```
...
#include "foo.h"   // This can still be relative to the current source file
 
...
..
 
#incude <test/foo.cpp>  // This needs to be relative to the base path for the project in the intermediate directory.
```

## QRC \(QT Resource Collection\) files<a name="waf-qt-content-qrc"></a>

Qt resource collection \(`.qrc`\) files are processed by the Qt `.qrc` compiler\. The output file has the same source name but with an `.rcc` extension\. The resulting `.rcc` file is stored in the projects intermediate directory relative to any subdirectory that it exists in\.

For example, if the file `foo.qrc` is located in the `\test` subdirectory, the generated `.rcc` file is stored in the `\test` subdirectory under the project's intermediate directory structure\. There is no need to explicitly include the generated `.rcc` file into any source file as it is added as a build task for the project\.

The following is an example of the contents in an `ObjectPanel.qrc` file:

```
<RCC>
    <qresource prefix="/Panels/ObjectPanel">
        <file alias="icon_layers.png">res/icon_layers.png</file>
    </qresource>
</RCC>
```

For more information, see [The Qt Resource System](http://doc.qt.io/qt-5/resources.html) documentation\.

## UI Files<a name="waf-qt-content-ui"></a>

Designer UI files are processed by the Qt UIC \(user interface compiler\)\. The output file has an `.h` header extension to it, and `ui_` is also added to the name of the source\. The resulting header file is created in the project's intermediate directory relative to its location in the project\.

For example, if the file `foo.ui` is located in a `\test` subfolder, the generated `ui_test.h` file will be located in the `\test` subfolder under the project's intermediate folder structure\. 

When including the generated header file, using the same rule as the moc include applies as follows:

```
...
#include "foo.h"
...
#include <test/ui_foo.h>  // Path is relative to the project root
```

## Qt Linguist \(TS\) files<a name="waf-qt-content-ts"></a>

Qt Linguist files \(`.ts`\) are processed by Qt and output as `.qm` files\. The `.qm` files are automatically included into a single `.qrc` file specified by the `langname` attribute in the wscript file\. The `.qrc` file is automatically added as a build task like other `.qrc` files for the project\.

The following example demonstrates adding the required `langname` attribute to a wscript file:

```
...
def build(bld):
    bld.CryPlugin(
       ...
        langname = 'en-us',
        ...
```

The `.qm` files are loaded using the QTranslator module, and the Qt resource directory is the same relative to the source directory\. For example, if there a `foo_en-us.ts` file in a `\test` subdirectory, then that is the same directory that you use when loading the resource, as shown in the following example:

```
...
#include <QTranslator>
...
 
...
void main() {
 
...
    QTranslator* translator = new QTranslator();
    translator->load("foo_en-us.qm",":/test");
...
 
}
```