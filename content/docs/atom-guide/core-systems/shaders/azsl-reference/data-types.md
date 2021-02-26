# Types
This document covers the differences between AZSL and HLSL regarding types. Any content not covered assumes the same rules as in HLSL. For more information on HLSL see the [Direct3D HLSL](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl) documentation. 

## Arrays
Arrays are commonly used in shaders to hold buffers or textures. Arrays inside Shader Resource Groups (SRGs) must have an array dimension of an expression that can be resolved at build time. It must be a direct integer literal, or an identifier with a literal initializer, or an identifier that is initialized as a copy to another identifier with a literal initializer. This limitation only applies to fields within SRGs. In other cases, AZSLc will preserve array specifiers verbatim when outputting HLSL. As long as DXC supports a particular array specifier expression, it will work in AZSL too. 

Currently, AZSLc does not support constant folding, or the process of interpreting math expressions in array specifiers. 

The following code sample demonstrates the ways to initialize an array dimension.
```cpp
static const int two = 2;
static const int three = 3;
static const int six = two * three;
static const int copyOfTwo = two;
...
ShaderResourceGroup MaterialSrg : SRG_PerMaterial
{
    float a[two];       // ok
    float b[copyOfTwo]; // ok
    float c[six];       // Semantic error #14: array dimensions must be an easy-to-fold build time constant ( [?] ) in external resource declaration
}
```

AZSLc can compile dynamic expressions in arrays that are not reflected. For example, an array defined within a function can contain a complex dimension. As long as DXC validates it, it will pass through AZSLc. However, for external bound resources, AZSLc needs to reflect the layout. 

<!-- [WRITER NOTE: Need help understanding this -- asked in wiki] -->

## Matrix Type
Matrix types in AZSL are used in the same way as in HLSL, with an exception to matrix ordering. 
### Matrix Ordering
Similar to HLSL, AZSL assumes the column-major as a default matrix packing order, meaning each column of the matrix is packed into a single constant register. However, Atom explicitly set the default matrix packing order to be the row major, meaning each row of the matrix is packed into a single constant register. If you want to be explicit, use either `row_major` or `column_major` keyword in front of uniform matrices. 

AZSL does not support the [`pack_matrix pragma` directive](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-pragma-pack-matrix). All preprocessing is handled by clang. 

## Typeof
AZSL contains the keyword `typeof` which is similar to the keyword `decltype` in C++. Currently, there is limited support. 
It works within a `__azslc_print_symbol` debug intrinsic or at a declaration scope. However, it does not get resolved when used within a function's body in imperative code. Another limitation occurs when the expression within the parenthesis is too complex for AZSLc to decipher. In that case, the AZSLc provides a warning indicating a type-collapse failure and `<fail>` is emitted in the HLSL product. 

The following code sample demonstrates the ways `typeof` can be used. 
```cpp
static int g_i = 2;
static typeof(g_i) g_j;  // Ok - will result in `static int g_j;` in HLSL
 
struct S
{
    float4 light;
    typeof(light) antilight;  // Ok - will result in `float4` in HLSL
};
 
void Func()
{
    float g;
    typeof(g) h;  // Not ok - as of now, those tokens will just be replayed as is
}
```

## Typedef AND Typealias
The keyword `typedef` was introduced in HLSL6 and is supported in AZSL. It follows the same syntax rules as in C. AZSL also contains the keyword `typealias`, which behaves similarly to `using` in C++11. 

To demonstrate `typedef` and `typealias`, Consider the following AZSL code sample.
```cpp
typealias UVType = float2;
 
float4 MainPS(UVType uv) : SV_Target0
{
    return (float4)0;
}
```

In the context above, the reference to the typealias’s name `UVType`, appears in declarative code (the signature of MainPS definition). AZLSc translates it fully for the HLSL side. 

This results in the following HLSL code.

```cpp
typedef float2 UVType;
float4 MainPS(float2 uv) : SV_Target0
{
    return (float4) 0 ;
}
```

It is possible to immediately alias types that are declared inline to the type expression. 
```cpp
typealias NewStruct = struct S {};
typedef struct S2 {} NewS2;
```

This results in the following HLSL code. 

```cpp
struct S
{
};
 
typedef ::S NewStruct;
struct S2
{
};
 
typedef ::S2 NewS2;
```

## User-Defined Type Definition and Immediate Usage

User-defined types can be declared and immediately used 
In AZSL, it is valid to declare variables and define the variable's type as shown in the code sample below. However, this is not possible to within function argument. 
```cpp
// Ok - Declaring a variable (var) while defining its type (struct S)
struct S { int i; } var;   

// Not ok - Semantic error #40: introducing new type (S) within function arguments
void func(struct S { int i; } param)   
```