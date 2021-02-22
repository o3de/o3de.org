# Typeof
`typeof` is a keyword of AZSL akin to `decltype` of C++. It is exposed as the artefact of an internal requirement. Since it is absent from the public feature list, it is not universally supported.
It will work within` __azslc_print_symbol` debug intrinsic, or at a declaration scope. It will not get resolved when used within function bodies within imperative code.

Example: 
```cpp
static int g_i = 2;
static typeof(g_i) g_j;  // ok! will result in `static int g_j;` in HLSL
 
struct S
{
    float4 light;
    typeof(light) antilight;  // ok! will result in `float4` in HLSL
};
 
void Func()
{
    float g;
    typeof(g) h;  // no! because as of now, those tokens will just be replayed as is.
}
```

A limitation may happen when the expression within the parenthesis is too hard for AZSLc to decipher. In that case, an indication of type-collapse failure will happen through a warning and the emission of a `<fail>` in the HLSL product. 

