# Script Canvas Errors and Troubleshooting<a name="script-canvas-errors-and-troubleshooting"></a>

Script Canvas provides a mechanism to detect and report errors\. Errors in Script Canvas are generally caused by invalid conditions\.

In C\+\+ Script Canvas provides the following macros for error management:

```
#define SCRIPTCANVAS_NODE_DETECT_INFINITE_LOOP(node)
#define SCRIPTCANVAS_RETURN_IF_NOT_GRAPH_RECOVERABLE(graph)
#define SCRIPTCANVAS_HANDLE_ERROR(node)
#define SCRIPTCANVAS_REPORT_ERROR(node, ...)
#define SCRIPTCANVAS_RETURN_IF_ERROR_STATE(node)
```

You can use these macros during a graph's execution\. When triggered, they stop the execution of nodes that have an error\.

You can detect errors that occur in a graph at run time and provide an error handler to respond to the errors\. This helps users to gracefully handle graphs that encounter an invalid condition\.

Runtime execution errors are reported to the **Event Handler** node\. You can use this node to perform custom logging or take appropriate action when an error occurs\.

You can also raise and handle errors within a graph's execution\. The following simple example shows how you could use **Error** and **Error Handler** nodes to provide notification of an error in data validation\. This helps to rectify the solution to ensure that the graph remains stable\.

![\[Example that notifies users of errors in data validation\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-errors-and-troubleshooting-1.png)