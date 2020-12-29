# Parallax Mapping<a name="mat-maps-parallax-intro"></a>

Parallax occlusion mapping \(POM\) is an enhancement of the traditional parallax mapping technique that creates detail in a texture to add the illusion of depth\. This depth perception changes based on perspective\.

Parallax occlusion mapping \(POM\) and offset bump mapping \(OBM\) are similar to displacement mapping and tessellation, but their computational requirements are not as demanding\. However, POM is not suitable in every situation\. Use POM only for high\-performance computers and OBM for devices such as consoles\. When you use POM, you must enable both shader generation parameters\. Lumberyard automatically defaults to OBM for setups that cannot run POM\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-parallax-example.gif)

**Topics**
+ [Parallax Mapping Best Practices](mat-maps-parallax-best-practices.md)
+ [Applying Parallax Occlusion Mapping \(POM\)](mat-maps-parallax-pom.md)
+ [Applying Silhouette Parallax Occlusion Mapping \(SPOM\)](mat-maps-parallax-spom.md)
+ [Using Blend Layers for Parallax Mapping](mat-maps-parallax-blending.md)