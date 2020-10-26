# Adding Navigation Seed Points<a name="ai-nav-seed-points"></a>

Navigation seed points are specific accessible locations within navigation meshes that are normally inaccessible due to terrain or other obstructions\. Seed points notify the Lumberyard pathfinding system that these locations are accessible for AI agent navigation\. For example, an AI agent located on an island could “teleport” to a seed point on an adjacent mountainous island\.

**To add a navigation seed point**

1. In Lumberyard Editor, click **AI, Add Navigation Seed**\.

1. In your level, click to position the seed\.

Navigation seed point are represented by a seed icon\. Areas of the mesh that are accessible by AI agents from navigation seed points are displayed in blue, all other areas are in red\. You can use the console variable **ai\_MNMCalculateAccessibility** to calculate accessibility\.