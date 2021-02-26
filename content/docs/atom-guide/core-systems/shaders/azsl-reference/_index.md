# AZSL Reference
This section covers notable features in the AZSL grammar. It does not cover the AZSL grammar to its full extent because AZSL is an extension of HLSL (see the [Direct3D HLSL](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl) documentation). As a rule of thumb, all rules that apply to HLSL are the same for AZSL. The main exception to this is AZSL's Shader Resource Group (SRG), which encapsulates shader resource data. Other differences between the AZSL and HLSL grammar, as well as grammar specific to SRGs are listed in the following pages. 

<!-- 
- Show how to do it in HLSL (very basic, don't teach hlsl, juts do this for spotting the difference)
- Then show how to do it in AZSL
   -->

- [Shader Resource Groups](shader-resource-groups.md)
  - [Constants Declaration in SRGs](constants-declaration.md)
  - [SRG Data Views](srg-data-views.md)
  - [Shader Variants](shader-variants.md)
- [Types](./data-types.md)
  -  Arrays
  -  Matrices
     -  Matrix Major
  - Typeof
  - Typedef and Typealias
  - User-Defined Type Definition and Immediate Usage
- [Root Constants](./root-constant.md)

- [AZSL Intermediate Representation (AZIR)](./azsl-intermediate-represntation.md)
- [Functions](./functions.md)
  - Function Declarations
  - Function Overloading
    - Parameter default values
    - Overload resolution
    - Resolutions
  -  Intrinsic Functions
- [Classes](./classes.md)
  - Late symbols in the class method scope
  - Deported Method Definition
  - Method Definition Overqualification
  - Member Initializers
- [Structs](./structs.md)
  - Nested structures
- [Interfaces](./interfaces.md)
  - Ambiguity is not supported
  - Using keyword `override`
- [Partial SRGs](./partial-srgs.md)
  - Scopes of partial SRG
- [Platform-Specific Shader Code](platform-specific.md)
- Other differences from HLSL
  - [Incomplete Validation](incomplete-validation.md)
  - [One Definition Rule (ODR)](./one-definition-rule.md)
    - ODR in Unnamed scopes