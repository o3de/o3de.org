# AZSL Grammar
The Amazon Shading Language (AZSL) is an extended version of HLSL. Everything valid in HLSL is also valid in AZSL. An exception is uniform data, which is handled by Shader Resource Groups (SRGs), an AZSL feature. AZSL is based off of the [ANTLR4 grammar for HLSL](https://gist.github.com/tgjones/d8df1d9a8e695b7d25ce) and uses [Antlr4](https://github.com/antlr/antlr4) for parsing. The AZSL grammar uses [ABNF](http://matt.might.net/articles/grammars-bnf-ebnf/) form.

## Contents
- Shader Resource Groups (SRGs)
  - SRG Resource Decalrations
  - Shader Variants
- Best Practices and Limitations with AZSL
  - Arrays
  - Matrices
  - Constant Buffers
  - Root Constants
  - Keywords
  - Symbols
  - Functions
  - Classes
  - Structs
  - Interfaces
  - Partial SRGs
  - User-Type Definition (UDT)
  - Incomplete Validation
  - One Definition Rule (ODR)
  - Platform-Specific Shader Code


<!-- *[WRITER NOTE: Where does this section go?]*
## Data Views
- Shader Resource View (SRV)
- Unordered Access View (UAV)
- Texture View (SRV or UAV)
- Buffer View (SRV or UAV)
- Constant Buffer View (CBV) -->

## Class and Structs
### Methods in-class definition overqualification is tolerated, if pre-declared
<!-- [WRITER NOTE: Reword] -->
This is not a limitation, but it sits well in the chapter about classes.
In AZSL, you are allowed to redundantly qualify method definitions (not declarations)
Example:
```cpp
class A
{
    // declare
    void M();
    // define
    void A::M() {}  // overqualification is tolerated
};
```

But if you over-qualify the early declaration in line 4; then the compiler will complain with:

    /tmp/tmp-19052HwyLl3Bez6II(4,12) : Semantic error #6: voidA::M() is overly qualified. In-class declarations spawn new identifiers, and don't have to refer to existing symbols.

Likewise, if you collapse both declaration & definition into one statement, the compiler will complain with:
    /tmp/tmp-19052HwyLl3Bez6II(3,4) : Semantic error #4: class /A doesn't have a declaration for M()

That's the difference between the introduction of a new symbol, which requires a unqualified identifier; with the reference to an existing symbol, which may be qualified.

### Member initializers
<!-- [WRITER NOTE: Reword] -->
In C++11 struct/class members can bear their initializer expression immediately on the in-class declaration line. But in HLSL and AZSL since there are no constructors, this construct is ill-formed.
Example:
```cpp
class C
{
    int member = 3;  // #EC 43 default member init not supported
};
```

## Function overloading
<!-- [WRITER NOTE: Reword] -->
### Parameter default values
Overloading was introduced in version 1.3, but to limit costs of implementation of the symbol migration system (to erase SRG in HLSL), overloads are not combinable with default parameter values. If you want the full story, the whole implementation journal is available here.

### Overload resolution
A second limitation, more subtle, is that sometimes the compiler internals may not be able to determine what overload is called, on a given call site. This stems from the potential inability of the compiler to deduce the types used in the arguments. This can happen in expressions that implicates HLSL intrinsics, or expression with operators.
Example:

```cpp
struct A {};
struct B {};
 
A make(int);
B make(uint);
 
void main()
{
    float x = 0.5;
    A a = make(floor(x) + 1);   // line 10
}
```

After running the above code, AZSL outputs the error below. This is an error because functions belonging to this overload-set have heterogeneous return types. Consider using type-casts to help type resolution.
  
    /tmp/tmp-13891Ko0tSIPy5nhu(10,14) : Semantic error #41: unable to match arguments (<fail>) to a registered overload. candidates are:
    /make(?int)
    /make(?uint)

You can fix this by using a cast, the cast expression is simple to understand to AZSLc.
Change line 10 to: `A a = make((int)(floor(x) + 1));`

### Expression is not supported, but resolution is not important
There are 2 cases where resolution is not important and will not result in an error, and one case where resolution will happen even with unsupported expressions:

#### fundamental return types
If all your overloaded functions return fundamental types (float2, matrix3x3, bool, dword...) the compiler isn't required anymore to track what overload was selected because a fundamental type is a dead end for the symbol reference tracking system. Meaning there is no transpilation to be performed on such types or their members (like .rgb).

you may refer to Overhaul/tests/Semantic/overload-resolution-impossible-made-possible2.azsl test file in the code repository of AZSLc

#### homogeneous return types
If all your overloaded functions return the same type, maybe an UDT (user defined type), then resolution is not necessary because the symbol reference tracking system only needed to "pass through" the call of the function to evaluate it's return type. If the return type is invariant, it's trivial to do.

you may refer to Overhaul/tests/Semantic/overload-resolution-impossible-made-possible3.azsl test file in the code repository of AZSLc

#### discriminated arity
If your functions have different number of parameters, unsupported expressions are not a problem because resolution becomes trivial. (if and only if there are no possible default argument values! this is also why it's forbidden to mix them with overloading)

you may refer to Overhaul/tests/Semantic/overload-resolution-impossible-made-possible4.azsl test file in the code repository of AZSLc

### Other notes on function overloading
Note: that there is no ADL lookup in AZSL. Because there are no front-end available namespaces.
Note: It is not possible to overload by return type. Only parameters.


## Intrinsics
<!-- [WRITER NOTE: Reword] -->
Let's take for example:
```cpp
float4 MainPS(float2 uv) : SV_Target0
{
    float s, c;
    sincos(uv.x, s, c);
    return s.xxxx;
}
```

with --W3 this will cause

    /tmp/tmp-8761qOeVI0uo89CU(10,5) : warning: undeclared sub-symbol in idexpression: sincos

The reason is: no HLSL intrinsic function, or submembers of intrinsic types, are registered within AZSLc. It has no knowledge of all these symbols, so it can't track them, nor migrate or translate anything on them. It is deemed not a problem because there is usually nothing to translate on them (except for template Load on append buffer which returns a UDT, support for this should happen later).


## Scopes of partial SRG
<!-- [WRITER NOTE: Reword] -->
When dealing with partial SRGs, it is not possible to refer to intersticial symbols in the later blocks of the partial SRG. Example:
```cpp
struct Before
{
};
 
partial ShaderResourceGroup View : ViewSlot
{
    Before data;  // ok
}
 
struct Interstice
{
};
 
partial ShaderResourceGroup View
{
    Interstice extended;  // not ok
}
```

The reason is that partial does not work like namespace in C++. It works like a possibility to extend the definition of an SRG. Which should be thought of as a class scope.
Only symbols that were accessible at the first seen declaration of the SRG are accessible. SRG scopes are atomic.


## Combined UDT definition and immediate usage
<!-- [WRITER NOTE: Reword] -->
note: UDT = User Defined Type

Code of this form may be used and is valid:
```cpp
struct S { int i; } var;   // declare variable named var of type S, and also define a new type S of kind struct with a member i
```
Such new type definition may be introduced where a type is expected, it is ill-formed in function parameters however:
```cpp
void func(struct S { int i; } param)    // Semantic error #40: introducing new type (S) within function arguments is ill-f
```


## Incomplete validation philosophy
<!-- [WRITER NOTE: Reword] -->
AZSLc will do some validation, sometimes stricter than DXC, but it will certainly not enforce all of HLSL rules. This is by design to keep it flexible and tolerant of future changes in HLSL down the build chain. Also to limit the amount of responsibility we bear, and need to maintain.
Example:
```cpp
void f()
{
    if (false)
    {
        int i;
    }
    ++i;   // this is not an error in AZSL but it prints a warning of level 3 (undeclared sub-symbol in idexpression)
}
```


## Mangling Scheme
<!-- [WRITER NOTE: Reword] -->
We call it AZIR form. For AZSL Intermediate Representation. To encode symbol identities into unique strings, AZSLc's symbol table uses a mangling scheme with these rules:

1. a scope is separated by a forward slash. e.g Parent/member
2. the global scope is a root scope represented by a sole forward slash. i.e /
3. a fundamental type will be fully qualified with an interrogation mark. e.g ?float4
4. an anonymous block will be introduced by a dollar sign. e.g /Func()/$bk0
5. concrete functions will bear the canonical identities of their parameter lists within their identity, enclosed in parenthesis. e.g /Func(?int)
   
You can verify those schemes by using the --dumpsym option on AZSLc.