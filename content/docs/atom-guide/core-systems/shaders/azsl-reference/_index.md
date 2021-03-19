---
linktitle: Atom Shader Language Reference
title: Atom Shader Language (AZSL) Reference
description: A reference for the AZSL shader language used by the O3DE Atom renderer.
weight: 200
---

{{< preview-new >}}

This section covers notable features in the AZSL language. It does not cover the AZSL language to its full extent because AZSL is an extension of HLSL. (For the full HLSL language, read the [Microsoft DirectX HLSL documentation](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl).) Generally, the rules that apply to HLSL are the same for AZSL. The main exception to this is AZSL's Shader Resource Group (SRG), which encapsulates shader resource data. Other differences between the AZSL and HLSL language, including details about SRGs, are listed in the following pages. 

<!-- 
- Show how to do it in HLSL (very basic, don't teach hlsl, juts do this for spotting the difference)
- Then show how to do it in AZSL
   -->
| AZSL features                        |  |
|--------------------------------------|---------|
| [Shader Resource Groups (SRG)](shader-resource-groups.md) |  |
| [SRG Constant Declarations](srg-constants-declaration.md) |  |
| [SRG Data Views](srg-data-views.md) |  |
| [Shader Options](shader-options.md) |  |
| [Root Constants](./root-constant.md) |  |  <!-- [todo] Root Constants should link to RHI root constants page. -->  
| [Types](./data-types.md) |  |
| [Functions](./functions.md) |  |
| [Structs](./structs.md) |  |
| [Classes](./classes.md) |  |
| [Interfaces](./interfaces.md) |  |
| [Platform-Specific Shader Code](platform-specific.md) |  |
| [Symbol Encoding](symbol-encoding.md) |  | <!-- - [Partial SRGs](./partial-srgs.md) Scopes of partial SRG -->