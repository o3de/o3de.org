# AZSL Intermediate Representation

The AZSL Intermediate Representation (AZIR) describes the data structure used internally by AZSLc. To encode symbol identities into unique strings, AZSLc's symbol table uses a mangling scheme with these rules. 

1. A scope is separated by a forward slash. (`Parent/member`)
2. The global scope is a root scope represented by a single forward slash. (`/`)
3. A fundamental type is fully qualified with an interrogation mark. (`?float4`)
4. An anonymous block is introduced by a dollar sign. (`/Func()/$bk0`)
5. Functions contain the canonical identities of their parameter lists within their identity, enclosed in parenthesis. (`/Func(?int)`)
   
You can verify those schemes by using the `--dumpsym` option in AZSLc.