---
title: AZSL Interfaces
description: Learn about inheritance and interfaces in the AZSL shader language.
---

{{< preview-new >}}

Similar to HLSL, AZSL supports interfaces, which function similarly to abstract base classes in C++. They are defined using the `interface` keyword and must contain only method declarations. Classes that inherit from an interface must define all inherited members. Just like in C++, a class can inherit multiple interfaces by using separating commas. 

The following code sample demonstrates how to define and use interfaces. 
```cpp
interface X
{
    void Foo();
};

interface Y
{
    void Bar();
};
 
class A : X     // class A inherits interface X
{
    Foo();
};

class B : X, Y  // class B inherits interface X and Y
{
    Foo();
    Bar();
};
```

In contrast, the following code sample leads to a compilation error because a class must define all the methods declared in its inherited interface. 
```cpp
interface X
{
    void Foo();
};

class A : X     // not ok - class A does not define Foo()
{    
};
```

AZSLc outputs the following compilation error.
```
(,) : Semantic error #34: Found multiple symbols hidden by /C/F() in bases of /C. First was /J/F(), now also found in /I.
```


## Ambiguity is not supported
In AZSL, ambiguity is not tolerated. Ambiguity occurs when a class inherits from multiple interfaces which define a function with the same name. This behavior is opposed to that in C++ and Java, where ambiguity can be resolved. 

The following code sample leads to a compilation error due to multiple inheritance ambiguity with interfaces.
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
    void F();   // not ok - multiple inheritance ambiguity
};
```

AZSLc outputs the following compilation error.
```
(,) : Semantic error #34: Found multiple symbols hidden by /C/F() in bases of /C. First was /J/F(), now also found in /I.
```


## Using keyword `override`
A class can declare a virtual function that overrides an inherited interface's virtual function. You can do this by using the `override` keyword, though it is not necessary to. This is unlike C++, where the `override` keyword is mandatory. However, it is recommended to use the `override` keyword to allow clearer error reporting. 

The following code sample leads to a compilation error because method `g` is declared as `override`, though there is no base method `g` to override. 
```cpp
interface Interf
{
    void f();
};
 
class C : Interf
{
    void f() override;
    void g() override;  // not ok - no base method g() exists
};
```
AZSLc outputs the following compilation error.
```
Semantic error #22: method /C/g() has override specifier but is not found in any base
```