# Adding Vegetation Bending Effects<a name="vegetation-bending-intro"></a>

Lumberyard provides three methods for adding realistic bending motions to vegetation:
+ **Touch \(Collision\) Bending** – bending effects for larger vegetation caused by players brushing against or colliding with branches 
+ **Detail \(Wind\) Bending** – physically accurate wind effects for larger vegetation defined by using vertex colors and environment wind parameters
+ **Automerged \(Wind\) Bending** – physically accurate wind effects for grass defined by vegetation and environment wind parameters

You can use touch and detail bending effects together\. For example, a player can brush against a branch that is also swaying in the breeze\. Use automerged bending by itself for objects like grass\.

From a performance standpoint, detail bending is the least expensive, touch bending is more expensive, and automerged bending is the most expensive\.

**Topics**
+ [Adding Touch \(Collision\) Bending Effects](vegetation-bending-touch-intro.md)
+ [Adding Detail Bending Effects](vegetation-bending-detail-intro.md)
+ [Using AutoMerged Wind Bending Effects](vegetation-bending-automerged-intro.md)