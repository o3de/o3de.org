# Symbols
## Mangling Scheme
<!-- [WRITER NOTE: Reword] -->
We call it AZIR form. For AZSL Intermediate Representation. To encode symbol identities into unique strings, AZSLc's symbol table uses a mangling scheme with these rules:

1. a scope is separated by a forward slash. e.g Parent/member
2. the global scope is a root scope represented by a sole forward slash. i.e /
3. a fundamental type will be fully qualified with an interrogation mark. e.g ?float4
4. an anonymous block will be introduced by a dollar sign. e.g /Func()/$bk0
5. concrete functions will bear the canonical identities of their parameter lists within their identity, enclosed in parenthesis. e.g /Func(?int)
   
You can verify those schemes by using the --dumpsym option on AZSLc.