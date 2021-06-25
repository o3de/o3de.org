---
linkTitle: Navigation splines
title: 3D navigation splines tool
description: Guide to the 3d navigation splines tool in the Kythera AI Gem
weight: 600
---
[Kythera AI Gem](index.md)

# 3D Navigation Splines tool

Introduction
------------

Kythera Navigation Splines allow designers precise control of ship movement in flight. As well as specifying the desired path, splines can specify speeds and orientation at every point along the path and give feedback on how the ship should look.

Unlike other approaches, the ship's own movement and physics is still used, maintaining consistent, realistic appearance rather than a forced animation. It also allows other aspects of its AI to override or interact with the spline, so a ship may choose to join or break from a spline based on circumstance, or retain partial control of its movement. The spline forms a complex "hint" from designers to agent behavior rather than a hard-scripted sequence.

Alongside the designer tool, there is also the underlying feature with Kythera to follow and join splines, and various ways to make use of them.

Kythera Navigation Splines have a similar look and feel to engine-based native splines, but with additional data (e.g. speeds and orientation) and additional functionality to manage it and to form a fast and natural workflow for precision ship control.

Applications
------------

Typical Navigation Splines uses that are currently supported include:

*   Landing, take-off, fly-by sequences
*   Providing interesting idle behavior ahead of combat
*   Entering a player area with clear intention
*   An alternative to standard navigation though complex geometry
*   Fast creation of in-game cut-scenes or video creation, utilising the systemic physics and graphical effects

While splines can be used as a pure animation tool, the agent behavior has many options to choose, ignore or interpret splines, allowing splines to be combined with systemic behavior. For instance, ships may leave a spline because they have detected a hostile, rotate to attack a target while following a spline, or depart from the spline temporarily to steer around another moving ship.

Note that by default, ships will still only move where there are valid octree volumes and will still try to avoid dynamic obstacles in their path. If a ship stops while following a spline, this may be the reason.

Some advanced features are not yet supported in O3DE including:

*   Maneuvers - short splines describing e.g. a barrel roll or a spin which can be invoked anywhere and at any time
*   Stunt splines - splines chosen systemically by behavior, e.g. to evade or flee
*   Targeting / bombing runs - allowing targets and other actions to be directly specified on splines
*   Moving splines - following a spline attached to another slowly moving object

Basic Setup
-----------

Create a new NavSpline by adding a new entity and choosing **Kythera / Navigation Spline** from the **Add Component** drop-down menu:

![](/images/user-guide/gems/kythera-ai/spline-tool-create-navspline.png)

This will create a new spline with (by default) 4 control points. Note that splines always contain at least two control points.

![](/images/user-guide/gems/kythera-ai/spline-tool-new-spline.png)

**Ensure "Display Helpers" is enabled to be able to see the spline:**

![](/images/user-guide/gems/kythera-ai/spline-tool-display-helpers.png)

Editing the Path
----------------

Editing of splines is done through O3DE's Component Mode.

### Move or Rotate the entire spline

You can Move or Rotate the entire spline by selecting the spline (not an individual control point) and using the standard O3DE Move/Rotate controls.  
Note that scaling the spline is not currently supported (this will appear to work in the editor but is not supported by the underlying Kythera representation).

### Move or Rotate a specific control point

In the viewport, double-click the spline or, in the **Entity Inspector**, click **Edit**.

In the viewport, left-click on the control point you wish to manipulate.

Change edit modes using **Edit > Toggle Current Mode** or by pressing the **M key.**

You can change between **Translate**, **Rotate** and **Rotate Vehicle** modes. The Translate and Rotate modes are self-explanatory. See the Vehicle Orientation section for more details on the Rotate Vehicle mode.

![](/images/user-guide/gems/kythera-ai/spline-tool-selected-control-point.png)

### Add a control point

To add a new Control Point to the spline, **Ctrl + click** anywhere on the spline:

![](/images/user-guide/gems/kythera-ai/spline-tool-new-point.png)![](/images/user-guide/gems/kythera-ai/spline-tool-new-point-2.png)

Note that existing points further down the spline are renumbered.

### Remove a control point

Similarly, **Alt + click** on a Control Point will remove that point from the spline.

Control point editing
---------------------

When a point is selected, the **Selected Control Point** part of the Navigation Spline panel can be used. We can specify the speed at which the ship should be travelling at this point. Speeds are interpolated linearly between control points.

![](/images/user-guide/gems/kythera-ai/spline-tool-spline-dialogue.png)

  

Detailed path adjustment
------------------------

The “Tangents” section allows more control over the shape of the spline between control points. Taking this point as an example...

![](/images/user-guide/gems/kythera-ai/spline-tool-tension-1.png)

…for example, we can alter the **Tension In** and **Tension Out** of the point, affecting how close the line is to the tangent as it passes through this point.

High tension:

![](/images/user-guide/gems/kythera-ai/spline-tool-tension-high-display.png)

![](/images/user-guide/gems/kythera-ai/spline-tool-tension-high-line.png)

  

Low tension:

![](/images/user-guide/gems/kythera-ai/spline-tool-tension-low-display.png)

![](/images/user-guide/gems/kythera-ai/spline-tool-tension-low-spline.png)

  

By default, the Tension In (approaching the Control Point) and Tension Out (leading away from it) are tied to the same value. They can be changed independently by unchecking the **Link Tangent Tension** checkbox:

![](/images/user-guide/gems/kythera-ai/spline-tool-tension-different-display.png)

![](/images/user-guide/gems/kythera-ai/spline-tool-tension-different-line.png)

Re-checking **Link Tangent Tension** will set Tension In and Tension Out to the same value, the average of their two previous values.

  

We can also edit the direction of the tangent through the Control Point. Usually, this is set to **Auto Tangent** to pick a natural tangent that best fits the curve. By unchecking **Auto Tangent**, we can set the tangent manually. It will remain fixed after that, even if we move the point around. 

  

![](/images/user-guide/gems/kythera-ai/spline-tool-manual-tangent-display.png)

  

![](/images/user-guide/gems/kythera-ai/spline-tool-rotate-spline.png)

Vehicle Orientation
-------------------

In Vehicle Rotation mode, you are not editing the shape of the spline itself, but the facing of the vehicle as it flies the spline.
[Kythera AI Gem](index.md)

# 3D Navigation Splines Tool

By default, a ship will point along the spline as it flies. You can override this by selecting and using the Vehicle Rotation mode from the Control Point Edit Mode drop-down. This allows the orientation of the ship to be set independent of the path so that, for instance, it can move sideways or spin around while taking off and landing. When you enter this mode, a dummy ship is drawn at the selected control point, allowing you to see their orientation. You can then rotate them with a gizmo. The ship’s orientation is interpolated between control points where this information is set.

![](/images/user-guide/gems/kythera-ai/spline-tool-rotate-vehicle.png)

There are two checkboxes that control how any orientation is applied. When the **Vehicle Up** box is set, the ship's normal movement up-vector will be overridden, causing it to fly on its side or upside down. When the **Vehicle Forward** box is set, its normal forward vector will be overridden, causing it to fly backwards or sideways.

![](/images/user-guide/gems/kythera-ai/spline-tool-veh-up-fwd.png)

Usually, it is best for a ship to respect both the Up and Forward vectors. However, you might leave the Up vector unset if the spline may move around or rotate and you’d prefer to use whatever Up is most natural at the time, or you might want to leave the ship some freedom to bank on the turns. Likewise, you might set the Up vector but leave the ship to best orientate itself for a turn.

These are both set to off until the Vehicle Rotation at a point is edited, at which point they will both default to on. If both are set off, orientation information for the point will be removed.

Ghost Vehicle
-------------

To see a representation of how a ship will move down the spline, select **Ghost Vehicle (Time)** in the **Visualisation** section of the Navigation Spline component in the Entity Inspector.

![](/images/user-guide/gems/kythera-ai/spline-tool-ghost-chx.png)

This will show dummy ships all along the spline, positioned at intervals of one second of the ship's movement. This allows you to visualize the speed and orientation of the ship:

![](/images/user-guide/gems/kythera-ai/spline-tool-flat-spline.png)

This can be particularly helpful when using Navigation Splines for complex movements with orientation changes:

![](/images/user-guide/gems/kythera-ai/spline-tool-complex-spline.png)

  

Inspector Debug Option
----------------------

A new Inspector option has been added for this feature. As before, the Inspector is accessed at [http://localhost:8081](http://localhost:8081/)

Ensure Debug Draw is enabled by setting Global > ConsoleVariables > DrawMaster to 1 in the Blackboards tab of the Kythera Inspector (or by the checkbox in the in-editor Kythera Toolbar).

Enable Spline debug by using the Splines checkbox in Global > DebugOptions - this will draw all splines in the level in orange, the speed values at control points and the planned path of any ships currently following splines.