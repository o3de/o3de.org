# Generating Stars \.dat File<a name="graphics-rendering-stars"></a>

The Stars `.dat` file contains star data that is used in sky rendering\. This topic provides information you'll need if you want to modify the data in this file\. It assumes you have some familiarity with generating binary files\.

Star data is located in `Build\Engine\EngineAssets\Sky\stars.dat`\. This data is loaded in the function `CStars::LoadData`, implemented in the file `CRESky.cpp`\.

## File Format<a name="graphics-rendering-stars-file-format"></a>

The Stars `.dat` file uses a simple binary format; it can be easily modified using an editing tool\. The file starts with a header, followed by entries for each star\. The header specifies the number of entries in the file\. 

All types stored in little\-endian format, float32 in IEEE\-754 format\.

Star data provided in the SDK is based on real\-world information\. Typically, you can also use existing star catalogs to populate this information for you\.

The file elements are as follows:


**Header \(12 bytes\)**  

| Name | Offset | Type | Value | 
| --- | --- | --- | --- | 
| Tag | 0 | uint32 | 0x52415453 \(ASCII: STAR\) | 
| Version | 4 | uint32 | 0x00010001 | 
| NumStars | 8 | uint32 | Number of star entries in the file | 


**Entry \(12 bytes\)**  

| Name | Offset | Type | Value | 
| --- | --- | --- | --- | 
| RightAscension | 0 | float32 | in radians | 
| Declination | 4 | float32 | in radians | 
| Red | 8 | uint8 | star color, red channel | 
| Green | 9 | uint8 | star color, green channel | 
| Blue | 10 | uint8 | star color, blue channel | 
| Magnitude | 11 | uint8 | brightness, normalized range | 