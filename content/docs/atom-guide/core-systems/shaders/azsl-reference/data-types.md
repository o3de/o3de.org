---
title: AZSL Types
description: The full reference for built-in types unique to the AZSL shader language.
---

{{< preview-new >}}

This document covers the differences between AZSL and HLSL regarding types. Any content not covered assumes the same rules as in HLSL. For HLSL type reference, see the [Microsoft DirectX HLSL documentation](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-data-types). 

## Arrays
Arrays are commonly used in shaders to hold buffers or textures. Arrays inside Shader Resource Groups (SRGs) must have an array dimension of an expression that can be resolved at build time. Array bounds must be an integer literal, an identifier with a literal initializer, or an identifier that is initialized as a copy to another identifier with a literal initializer. This limitation only applies to fields within SRGs. In other cases, AZSLc will preserve array specifiers verbatim when outputting HLSL. As long as DXC supports a particular array specifier expression, it will work in AZSL too. 

Currently, AZSLc doesn't have support for interpreting expressions in array specifiers.

The following code sample demonstrates how to initialize an array dimension:
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
    float c[six];       // Error: Value is the result of an expression
}
```

## Matrix Ordering
It's important to note that the default matrix ordering for the AZSL language, and the matrix ordering for Atom are opposite. Read the following details carefully.

Similar to HLSL, AZSL assumes the column-major as a default matrix packing order, meaning each column of the matrix is packed into a single constant register. However, Atom explicitly set the default matrix packing order to be the row major, meaning each row of the matrix is packed into a single constant register. If you want to be explicit, use either `row_major` or `column_major` keyword in front of uniform matrices. 

AZSL does not support the [Microsoft DirectX HLSL's `pack_matrix pragma` directive](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-pragma-pack-matrix). All preprocessing is handled by clang. 

## `typeof`
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

## `typedef` and `typealias`
AZSL supports the keyword `typedef` and it follows the same syntax rules as in C. AZSL also contains the keyword `typealias`, which behaves similarly to `using` in C++11. 

To demonstrate `typedef` and `typealias`, consider the following AZSL code sample.
```cpp
typealias UVType = float2;
 
float4 MainPS(UVType uv) : SV_Target0
{
    return (float4)0;
}
```

In the context above, the reference to the name `UVType` for the `typealias`, appears in declarative code (the signature of MainPS definition). AZLSc translates it fully for the HLSL side. 

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

User-defined types can be declared and immediately used. In AZSL, it is valid to declare variables and define the variable's type as shown in the code sample below. However, this is not possible within the function argument. 
```cpp
// Ok - Declaring a variable (var) while defining its type (struct S)
struct S { int i; } var;   

// Not ok - Semantic error #40: introducing new type (S) within function arguments
void func(struct S { int i; } param)   
```