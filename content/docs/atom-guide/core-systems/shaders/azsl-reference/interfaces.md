# Interfaces
`interface` keyword is supported in AZSL since `class` is supported in the form of a contract imposition system. It works as an inheritance-like scheme on classes to force implementation of methods. Multiple interfaces can be inherited by using commas, like in C++. 

Example: 
```cpp
interface I
{
    void F();
};
 
class C : I
{
};
```

This example results in the compilation error
    (6,0) : Semantic error #18: class /C does not redefine /I/F()

*Note: `interface` may only bear method declarations. Definitions, variables, and properties are not allowed. *

## Ambiguity is not supported
Ambiguity is not tolerated. Unlike C++ and Java, where an equivalently named symbol is considered the "same" accross different parent. In AZSL this situation is forbidden.

Example: 
```cpp
interface I
{
    void F();
};
 
interface J
{
    void F();
};
 
class C : I, J
{
    void F();
};
```

Results in a compilation error.

    (,) : Semantic error #34: Found multiple symbols hidden by /C/F() in bases of /C. First was /J/F(), now also found in /I.

## Using keyword `override`
It is recommended to use the `override` keyword on concrete method declarations that are meant to override a base. 

Example: 
```cpp
interface Interf
{
    void f();
};
 
class C : Interf
{
    void f() override;
};
```

Unlike in C++, it is not mandatory to use the `override` keyword. However, using the `override` keyword allows clearer error reporting. If you add the line `void g() override;` in `class C`, AZSLc will generate the following error: 
    Semantic error #22: method /C/g() has override specifier but is not found in any base
