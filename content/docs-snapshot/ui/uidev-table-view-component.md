# Lumberyard UI table view component<a name="uidev-table-view-component"></a>

Use the **table view** component to present multiple columns of structured data in a table format\. By default, this component employs sortable columns and "zebra striping" \- where the background color of rows alternate \- to help you create an easily readable, scannable, and sortable presentation of data\.

![\[component table view example\]](http://docs.aws.amazon.com/lumberyard/latest/ui/images/component-table-view-example.png)

**Note**  
 `AzQtComponents::TableView` actually derives from `QTreeView`, not `QTableView`, to provide more customization over the size of rows\.

## Basic table view<a name="table-view-basic"></a>

![\[component table view basic\]](http://docs.aws.amazon.com/lumberyard/latest/ui/images/component-table-view-basic.png)

Create a simple logging table view\.

For a more complex working example of a table view, view the sample tables on the **Table View** page in the [Lumberyard Qt control gallery tool](uidev-control-gallery.md), then examine the source code for that page found in your Lumberyard dev directory: `Code\Framework\AzQtComponents\AzQtComponents\Gallery\TableViewPage.cpp`\.

**Note**  
If a table view is combined with a [tree view](uidev-tree-view-component.md), you might need to turn off zebra striping in one of the widgets using the setAlternatingRowColors\(false\) function\.

 **Example** 

```
#include <AzQtComponents/Components/Widgets/TableView.h>
#include <AzToolsFramework/UI/Logging/LogTableModel.h>
#include <AzToolsFramework/UI/Logging/LogLine.h>
#include <QDateTime>

// Create a log table model for this example.
auto logModel = new AzToolsFramework::Logging::LogTableModel(this);

// Create the table view.
auto tableView = new AzQtComponents::TableView(parent);

// Set the model for the table.
tableView->setModel(logModel);

// Add a few lines of sample data.
logModel->AppendLine(
    AzToolsFramework::Logging::LogLine(
        "An informative message for debugging purposes.",
        "Window",
        AzToolsFramework::Logging::LogLine::TYPE_MESSAGE,
        QDateTime::currentMSecsSinceEpoch()));

logModel->AppendLine(
    AzToolsFramework::Logging::LogLine(
        "A warning message for things that may not have gone as expected.",
        "Window",
        AzToolsFramework::Logging::LogLine::TYPE_WARNING,
        QDateTime::currentMSecsSinceEpoch()));

logModel->AppendLine(
    AzToolsFramework::Logging::LogLine(
        "Critical error message, something went wrong.",
        "Window",
        AzToolsFramework::Logging::LogLine::TYPE_ERROR,
        QDateTime::currentMSecsSinceEpoch()));
```

## C\+\+ API reference<a name="table-view-api-ref"></a>

For details on the **table view** API, see the following topic in the [Lumberyard UI Extensions C\+\+ API Reference](https://d3bqhfbip4ze4a.cloudfront.net/api/ui/namespace_az_qt_components.html):
+  [AzQtComponents::TableView](https://d3bqhfbip4ze4a.cloudfront.net/api/ui/class_az_qt_components_1_1_table_view.html) 

Relevant Qt documentation includes the following topics:
+  [QTreeView Class](https://doc.qt.io/qt-5/qtreeview.html) 
+  [QAbstractListModel Class](https://doc.qt.io/qt-5/qabstractlistmodel.html) 