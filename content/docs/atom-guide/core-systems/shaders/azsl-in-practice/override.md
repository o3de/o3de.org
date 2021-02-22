# Override

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
