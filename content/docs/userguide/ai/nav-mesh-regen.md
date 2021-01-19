---
description: ' Regenerate the entire mesh or a portion of it in &ALYlong;. '
title: Regenerating the Navigation Mesh
---
# Regenerating the Navigation Mesh {#ai-nav-mesh-regen}


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

There are situations where the navigation mesh must be dynamically updated in real time in order for an AI agent to make sense of its environment\. For example, when an object is destroyed the AI agent can now navigate through the space\. 

Dynamically generating a navigation mesh could also place an AI agent outside of the mesh, leading to stuck or inconsistent behavior\.

You can regenerate the entire mesh or a portion of it\.

## Complete Mesh Regeneration {#ai-nav-mesh-regen-complete}

If you want to regenerate the entire navigation mesh, do the following:

**To completely regenerate the navigation mesh**
+ In Lumberyard Editor, select the mesh and then click **AI, Request a Full MNM rebuild**\.

## Partial Mesh Regeneration {#ai-nav-mesh-regen-partial}

There are two methods for regenerating a portion of a navigation mesh\. Both methods only regenerate the relevant portion of the mesh\. By not regenerating the entire mesh, performance is kept high\.

The following method is a non\-runtime generation of the mesh\.

**To partially regenerate the navigation mesh**
+ In Lumberyard Editor, click **AI** and enable **Continuous Update**\.

**Entity:GetBounds ** – Obtains the bounding box size, in local or world\-space coordinates, for any entity in the mesh\. This gives information about the location inside the mesh that requires updating, such as where an object moved to and how big it is\.

**AI:RegenerateMNM ** – Specifies the minimum and maximum world\-space coordinates of where the navigation mesh regenerates at runtime in response to geometry changes, such as a bridge collapsing or a path becoming blocked, for example\.