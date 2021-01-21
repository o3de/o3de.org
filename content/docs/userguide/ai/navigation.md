---
description: ' Learn more about FAQs for AI navigation in &ALYlong;. '
title: Navigation Q &amp; A
---
# Navigation Q & A {#ai-navigation}

## Big Triangles and Small Links Between Them {#ai-navigation-big-triangles}

**Q: I have created a big flat map, placed an AI agent on it, and generated AI navigation triangulation\. I noticed that the AI agent doesn't always take the shortest straight path from point A to point B\. Why?**
A: To illuminate the issue, use the following tools:
+ AI debug console variable `ai_DebugDraw` set to "74"\. This value draws the AI navigation graph\. \(Note: a value of 79 will run faster, but limits the result to the area close to the player \(with 15 m\)\.
+ AI debug console variable `ai_DrawPath` set to "all"\. This variable draws AI agent paths, including links \(the corridors between adjacent triangles\)\.
+ The **Ruler** tool in Editor, used to visualize paths\. You don't even need actual AI agents on the map to run experiments\. \(Note: this tool is located between **Snap Angle** and **Select Object\(s\)**\.\)
The AI navigation triangulation is intended to be fast and have a small memory footprint\. One of the decisions made in this regard was to use 16\-bit signed integers to store corridor \(or "link"\) radius measurements between two adjacent triangles\. Using centimeters as the uint of measure, this means that the maximum link radius is 32767 cm \(327\.67 m\)\. When an AI agent moves to another triangle, it can only go through this corridor, which is naturally very narrow if the triangles are still very large\. This problem does not exist for triangles with edges less than 2 \* 327\.67 = 655\.34 m\.
This problem can only appear in the very initial stages of map development\. Every forbidden area, tree or other map irregularity makes triangulation more developed, which results in more triangles that are smaller in size\. As a result, the problem goes away\.

## Path Following {#ai-navigation-paths}

**Q: How does path following actually work? Where to start?**
A: See the topic on [Path Following](/docs/userguide/ai/path-following.md)\.

## Auto\-Disabling {#ai-navigation-disabling}

**Q: How do you keep patrols always active, regardless of their distance from the player?**
A: See the topic on [Auto\-Disable](/docs/userguide/ai/auto-disable.md)\.