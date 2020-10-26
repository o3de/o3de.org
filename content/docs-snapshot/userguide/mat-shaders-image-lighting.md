# Image\-Based Lighting<a name="mat-shaders-image-lighting"></a>

Image\-based lighting is a rendering technique where complex lighting is stored in an environment map that is projected onto a scene\. In simple words, a light probe or environment map is just an image on a sphere\.

If the range of the image colors is within some small defined range \(0\-255 for monitor displays\), the image is LDR \(low dynamic range\)\. With HDR \(high dynamic range\) some rendering effects become more apparent and correct \(DOF, motion blur, bloom, dark materials, global illumination\)\. Depending on the image and compression requirements, various texture formats can be useful\.

Diffuse lighting can be approximated very well by diffuse\-convolving an environment map, which can be stored as a cube map again\. Because of bilinear filtering, the texture can be quite low resolution\. Mip maps are not required and the result with mip maps can actually look worse as ordinary mip mapping on the GPU is computed for each 2x2 pixel block and 2x2 block artifacts can become noticeable\.