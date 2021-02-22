# Interface
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