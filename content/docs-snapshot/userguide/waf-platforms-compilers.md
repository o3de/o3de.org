# Waf Supported Operating Systems and Compilers<a name="waf-platforms-compilers"></a>

This topic provides information about the operating systems and compilers that Waf supports\. For more information about supported configurations, see [Waf Commands and Options](waf-commands.md)\.


**Supported operating systems**  

| Operating system | Build environment | Waf short name | 
| --- | --- | --- | 
| 64\-bit Windows | MSBuild / Visual Studio 2017 | win\_x64\_vs2017 | 
| 64\-bit Windows | MSBuild / Visual Studio 2019 | win\_x64\_vs2019 | 

The following compilers are supported based on the build operating system\.


**Supported compilers**  

| Compiler | Windows 64\-Bit | 
| --- | --- | 
| MSVC 10\.0 \(Visual Studio 2010\) | Yes \(only for CryExport2014\) | 
| MSVC 11\.0 \(Visual Studio 2012\) | Yes \(only for CryExport2015\) | 
| MSVC 12\.0 \(Visual Studio 2013\) | Yes \(except for CryExport2014 and CryExport2015\) | 
| MSVC 14\.0 \(Visual Studio 2015\) | Yes \(except for CryExport2014 and CryExport2015\) | 
| MSVC 15\.0 \(Visual Studio 2017\) | Yes \(except for CryExport2014 and CryExport2015\) | 
| MSVC 16\.0 \(Visual Studio 2019\) | Yes \(except for CryExport2014 and CryExport2015\) | 
| Clang | No | 