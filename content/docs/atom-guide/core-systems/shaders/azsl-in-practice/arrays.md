# Arrays
An array of resources, such as buffers or textures, must have an array dimension of an expression that can be resolved at build time. Such expressions include: 
- A direct integer literal.
    ```cpp
    int myarray[2]; 
    ```

- An identifier name with a literal initializer.
    ```cpp
    static const int two = 2;
    int myarray[two];
    ```
- An identifier that is initialized as a copy of an identifier that is initialized immediately to a literal.  
    ```cpp
    static const int two = 2;
    static const int size = two;
    int myarray[size];
    ```  
<!-- [NOTE TO DEVS: Are the above code samples for valid expressions correct?] -->

## Limitations
- In AZSLc, constant folding only works on chains of identifiers that are all `static const`. The original initialization of a value must be from a simple positive literal. Math expressions are not supported. 
    ```cpp
    static const int h = 2;
    static const int w = 4;
    int myarray[h * w]; // not ok
    ```
- For arrays that are not reflected, AZSLc has no problem compiling non-foldable expressions. For example, a function-local variable can be an array with a complex dimension. As long as DXC validates it, it will pass through AZSLc. However, for external bound resources, AZSLc needs to reflect the layout. 