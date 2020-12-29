# Setting Material Opacity<a name="mat-opacity"></a>

An object's opacity refers to its transparency level\. Opacity is important when using an alpha channel for transparency\. 

**To set opacity for a material**

1. In Lumberyard Editor, choose **Tools**, **Material Editor**\. 

1. In the **Material Editor**, search for or browse to your asset and then select it\. 

1. Use the opacity settings to switch between alpha blend and alpha test modes\. With the alpha blend mode, you can enable soft and semi\-transparent opacity\. The alpha test mode is more performant and uses a black and white hard edge from the alpha map\.

   Under **Opacity Settings**, you can adjust the following parameters:
   + **Opacity** – Set the opacity mode and transparency amount of the material\. For the alpha blend mode, set the value between **0** to **99**\. For the alpha test mode, set the value to **100**\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/mat-opacity.html)
   + **Alpha Test** – Bias the edge of the alpha towards black or white\. Set the value below **50** to bias toward the white of the alpha map\. Set the value above **50** to bias toward the black of the alpha map\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/mat-opacity.html)
   + **Additive** – Enable to add the material color to the background color\. This results in a brighter color for the object\.