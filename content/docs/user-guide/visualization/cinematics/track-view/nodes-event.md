---
description: ' Use the event node to trigger and send values to Script Canvas in
  Open 3D Engine. '
title: Event Node
---

You can add an **Event** node to your sequence to trigger and send values to Script Canvas. You create **Track Events** using the **Track View Events** window. You then assign the **Track Event** to an animation key that is added to the track for the **Event** node. When the key is played during the sequence, the event is triggered. Script Canvas then uses the **Track Event** to trigger additional script logic.

**To add an Event node**

1. In the Track View, select or create a sequence.

1. In the node browser, right-click and choose **Add Event Node**.

1. In the **Track Event Name** window, enter a name for the track and choose **OK**.

   This creates a **Track Event** node and a **Track Event** track is automatically added to that node.

   ![Creating track event nodes in a sequence.](/images/user-guide/cinematics/cinematics-track-view-editor-track-event-nodes.png)

**To create a Track Event**

1. In the node browser, right-click and choose **Edit Events**. This opens the **Track View Events** window.

    ![Creating a track event for a sequence.](/images/user-guide/cinematics/cinematics-track-view-editor-track-event-nodes-2.png)

1. In the **Track View Events** window, click **Add** to create an event.

1. Enter an event name and choose **OK**. Your track event appears in the window.

    ![Enter a name for a track event in your sequence.](/images/user-guide/cinematics/cinematics-track-view-editor-track-event-nodes-3.png)

1. When you are done, close the window. You can now specify this track event in Script Canvas.
