# Working with Detail Maps<a name="mat-maps-detail-intro"></a>

Detail mapping is a simple technique to add macro surface detail at relatively low cost, memory and performance wise\. The following best practices should be taken into consideration:
+ Use as low a resolution as possible for best performance \(512x512 or lower\)\. 
+ Prevent artifacts by using a higher tiling scale\. 
+ Decrease contrast for the detail diffuse and gloss\. 

Unified detail mapping \(UDM\) is basically a reversed detail map\. Usually the detail map is used for finer details as you get closer\. UDM is the opposite\. It helps to define big shapes viewed from the distance\. Since close\-up detail is provided in tiled textures, larger details are needed to define shapes better when viewed from a distance\.

## Setting Up Detail Map Textures<a name="mat-maps-detail-textures"></a>

Detail map parameters are setup in the Material Editor\.

**To set Detail Map parameters**

1. In Lumberyard Editor, click **Tools**, **Material Editor**\.

1. In the left tree, select an applicable texture\.

1. In the right pane, under **Shader Generation Params**, click **the Detail Mapping** check box\.

1. Under **Shader Params**, set values for the following parameters\.

   1. **Detail bump scale**: Defines how much the normal map is visible\. The higher the value, the more the normal map will show through\.

   1. **Detail diffuse scale**: Defines how much the diffuse map \(or AO map\) visible\. The higher the value, the more the normal map will show through\.

   1. **Detail gloss scale**: Defines how much the gloss map is visible\. The higher the value, the more the gloss map will show through\.