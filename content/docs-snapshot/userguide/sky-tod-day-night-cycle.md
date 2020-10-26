# Setting a Day\-Night Cycle<a name="sky-tod-day-night-cycle"></a>

You can use the Time of Day Editor to configure changes to environment parameters over time to mimic a day\-night lighting cycle\. The Time of Day Editor uses a 24\-hour timeline graph and a recording function to store changing environment parameter values in an XML file\. 

Environment parameter values that you change in the **Parameters** panel of the **Time of Day Editor** are set for the currently selected time\. 

The Time of Day graph shows changes to the selected parameter over time\. When a parameter value is changed, the graph curve is updated for the currently selected time\. You can also directly change the curve by dragging it up or down between the keyframe points\. Keyframe points are displayed as yellow dots\. You can insert new keyframe points by double\-clicking the curve\. To remove existing keyframe points, double\-click the keyframes \(yellow dots\) themselves\. Lumberyard interpolates parameter values for times that lie between keyframe points\.

**Example**  
The following is an example graph in the **Time of Day Editor**\.  

![\[Use the Time of Day Editor to manage a day and night cycle for your game in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/sky/sky-tod-day-night-cycle.png)

**To configure a day\-night cycle**

1. In Lumberyard Editor, choose **Tools**, **Other**, **Time Of Day**\.

1. In the **Parameters** pane, adjust the parameter value for each cycle that you want to create, and then do the following:

   1. Click the red button to start recording\.

   1. In the **Time of Day Tasks** pane, under **Time**, set the **Current Time** to apply the parameter value\. The graph reflects the new value at the specified time\.

   1. Set a new parameter value and current time value pair\. Repeat as many times as needed to get a realistic change over time for the parameter\.

   1. Click the red button to stop recording\.

1. In the **Time of Day Tasks** pane, complete the following tasks as needed to export, import, and play a time\-of\-day \(day–night\) cycle\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/sky-tod-day-night-cycle.html)

1. Close the **Time of Day** editor\.