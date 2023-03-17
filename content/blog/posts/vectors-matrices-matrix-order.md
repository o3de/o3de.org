---
title: "Vectors, Matrices & Matrix Order"
date: 2023-03-01
slug: vectors-matrices-matrix-order
author: John Coimbra Walsh
blog_img: "/images/blog/dev-series.JPG"
full_img: ""
---

_In this blog post, AWS engineer John Coimbra Walsh covers the basics of using vectors, matrices, and matrix order. This is a complicated topic for novice graphics programmers, and hopefully this breakdown can help you!_

## Matrices & vectors

An \\(n \cdot m\\) matrix consists of \\(n\\) rows and \\(m\\) columns. The product of two matrices \\(\mathbf{A}\\) and \\(\mathbf{B}\\) is well defined when the number of columns in \\(\mathbf{A}\\) matches the number of rows in \\(\mathbf{B}\\). Their product is a matrix with the number of rows of \\(\mathbf{A}\\) and the number of columns of \\(\mathbf{B}\\). Thus, for a given \\(2×3\\) matrix \\(\mathbf{A}\\) to be multiplied with a given \\(3×2\\) matrix \\(\mathbf{B}\\), the product is calculated as follows to produce the resulting \\(2×2\\) matrix:

$$
\begin{array}{l@{}l}
\mathbf{A} \cdot \mathbf{B} 
    &{}= \begin{bmatrix} a_{11} & a_{12} & a_{13} \\\ a_{21} & a_{22} & a_{23} \end{bmatrix} \cdot \begin{bmatrix} b_{11} & b_{12} \\\ b_{21} & b_{22} \\\ b_{31} & b_{32} \end{bmatrix} \\\ \\\
    &{}= \begin{bmatrix} a_{11}b_{11} + a_{12}b_{21} + a_{13}b_{31} & a_{11}b_{12} + a_{12}b_{22} + a_{13}b_{32} \\\ 
a_{21}b_{11} + a_{22}b_{21} + a_{23}b_{31} & a_{21}b_{12} + a_{22}b_{22} + a_{23}b_{32} \end{bmatrix}
\end{array}
$$

Vectors can be written as either rows:

$$\vec{r} = \begin{bmatrix} r_{1} & r_{2} & r_{3} & ... & r_{m}  \end{bmatrix}$$

Or columns:

$$\vec{c} = \begin{bmatrix} c_{1} \\\ c_{2} \\\ c_{3} \\\ ... \\\ c_{m}  \end{bmatrix}$$

The vector-matrix product follows the same rules as the matrix product, albeit treating row vectors as \\(1×m\\) matrices and column vectors as \\(m×1\\) matrices. Thus, for a given \\(2×2\\) matrix \\(\mathbf{M}\\) to be multiplied with a given \\(1×2\\) row vector \\(\vec{r}\\), we must ensure that the number of columns of the matrix on the left hand side matches the number of rows of the matrix on the right hand side. We achieve this by post-multiplying the vector \\(\vec{r}\\) by \\(\mathbf{M}\\), resulting in a \\(1×2\\) matrix:

$$
\begin{array}{l@{}l}
\vec{r} \cdot \mathbf{M} 
    &{}= \begin{bmatrix} r_{1} & r_{2} \end{bmatrix} \cdot \begin{bmatrix} m_{11} & m_{12} \\\ m_{21} & m_{22}  \end{bmatrix} \\\ \\\
    &{}= \begin{bmatrix} 
r_{1}m_{11} + r_{2}m_{21} & 
r_{1}m_{12} + r_{2}m_{22} \end{bmatrix}
\end{array}
$$

In order to multiply a column vector, we must ensure that the number of columns of the matrix on the left hand side matches the number of rows of the matrix on the right hand side. We achieve this by pre-multiplying the vector \\(\vec{c}\\) by \\(\mathbf{M}\\), resulting in a \\(2×1\\) matrix:

$$
\begin{array}{l@{}l}
\mathbf{M} \cdot \vec{c} 
    &{}= \begin{bmatrix} m_{11} & m_{12} \\\ m_{21} & m_{22}  \end{bmatrix} \cdot \begin{bmatrix} c_{1} \\\ c_{2} \end{bmatrix} \\\ \\\
&{}= \begin{bmatrix} 
m_{11}c_{1} + m_{12}c_{2} \\\
m_{21}c_{1} + m_{22}c_{2} \end{bmatrix}
\end{array}
$$

Since \\(\vec{c}\\) is the transpose of \\(\vec{r}\\), and transpose multiplication follows the identity \\((\mathbf{A}\mathbf{B})^\mathbf{T} = \mathbf{B^T}\mathbf{A^T}\\), we need to transpose \\(\mathbf{M}\\) and reverse the order in the multiplication to get the equivalent product as a column vector. If we didn't reverse the order and take the transpose, we would get a different result:

$$
 \begin{bmatrix} 1 & 0 & 1 \end{bmatrix} \cdot \begin{bmatrix} 1 & 0 & 1 \\\ 0 & 2 & 0 \\\ 3 & 0 & 3 \end{bmatrix}     \neq \begin{bmatrix} 1 & 0 & 1 \\\ 0 & 2 & 0 \\\ 3 & 0 & 3 \end{bmatrix} \cdot \begin{bmatrix} 1 \\\ 0 \\\ 1 \end{bmatrix}
$$

 The row vector product is as follows:

$$
\begin{bmatrix} 1 & 0 & 1 \end{bmatrix} \cdot \begin{bmatrix} 1 & 0 & 1 \\\ 0 & 2 & 0 \\\ 3 & 0 & 3 \end{bmatrix} = \begin{bmatrix} 4 & 0 & 4 \end{bmatrix}
$$

Whereas the column vector product is as follows:

$$
\begin{bmatrix} 1 & 0 & 1 \\\ 0 & 2 & 0 \\\ 3 & 0 & 3 \end{bmatrix} \cdot \begin{bmatrix} 1 \\\ 0 \\\ 1 \end{bmatrix} =  \begin{bmatrix} 2 \\\ 0 \\\ 6 \end{bmatrix}
$$

Another way of thinking about this is that in order to have a well-defined product, the row vector has to appear first in the product, and since we have transposed the vector, we also need to transpose the matrix so for \\(\vec{c}\\) we would have:

$$
\begin{array}{l@{}l}
\mathbf{M^T} \cdot \vec{c} 
    &{}= \begin{bmatrix} m_{11} & m_{21} \\\ m_{12} & m_{22}  \end{bmatrix} \cdot \begin{bmatrix} c_{1} \\\ c_{2} \end{bmatrix} \\\ \\\
&{}= \begin{bmatrix} 
m_{11}c_{1} + m_{12}c_{1} \\\ 
m_{21}c_{2} + m_{22}c_{2} \end{bmatrix}
\end{array}
$$

With this in mind, the column vector product between the transpose of the matrix used in the vector product is now equal to that of the vector product as follows:

$$
\begin{bmatrix} 1 & 0 & 3 \\\ 0 & 2 & 0 \\\ 1 & 0 & 3 \end{bmatrix} \cdot \begin{bmatrix} 1 \\\ 0 \\\ 1 \end{bmatrix} =  \begin{bmatrix} 4 \\\ 0 \\\ 4 \end{bmatrix}
$$

The matrices themselves have no concept of “row vectors” or “column vectors”, from the perspective of matrix products there’s only matrices with the same well defined rules applied. The only difference is that one is a \\(1x3\\) matrix and the other is \\(3x1\\) matrix.

## Arrays

One dimensional arrays in C++ are collections of elements laid out contiguously in memory:

```c++
const std::size_t n = 4;
const int array[n] = {1, 2, 3, 4};
```

The elements in the array are accessed by an index in the range \\([0,n)\\) (square bracket are including, parentheses are excluding), where \\(n\\) is the number of elements in the array. Incrementing the index \\(i\\) in the range \\([0,n)\\) will access each element in the array sequentially:

```c++
// prints
// 1 2 3 4
for(std::size_t i = 0; i < n; i++)
{
   std::cout << array[i] << " ";
}
```

Two dimensional arrays are collections of equally sized one dimensional arrays laid out contiguously in memory:

```c++
const std::size_t m = 2;
const std::size_t n = 4;
const int array[m][n] = { {1, 2, 3, 4}, {5, 6, 7, 8} };
```

The elements in the array are accessed by a pair of indices where the first, or *major*, index is in the range \\([0,m)\\) (where \\(m\\) is the number of one dimensional arrays in the array). It accesses the one dimensional arrays in the collection. The second, or *minor*, index in the range \\([0,n)\\) (where \\(n\\) is the number of elements in each one dimensional array) accesses the elements in the one dimensional array specified by \\(m\\). Incrementing the major index \\(j\\) in the range \\([0,m)\\) in an outer loop and the minor index \\(i\\) in the range \\([0,n)\\) in an inner loop will access each element in each one dimensional array sequentially:

```c++
// prints 
// 1 2 3 4
// 5 6 7 8
for(std::size_t j = 0; j < m; j++)
{
   for(std::size_t i = 0; i < n; i++)
   {
      std::cout << array[j][i] << " ";
   }
   
   std::cout << "\n";
}
```

As two dimensional arrays are effectively one dimensional arrays under the hood with syntax sugar for indexing them in two dimensions, we can also declare a flat one dimensional array of size \\(m \cdot n\\), where \\(m\\) is the number of equally sized one dimensional arrays and \\(n\\) is the number of elements in each one dimensional array. We can then access the elements as if it were a two dimensional array using the function \\(f(j,i) = j \cdot n + i\\):

```c++
const std::size_t m = 2;
const std::size_t n = 4;
const int array[m * n] = {1, 2, 3, 4, 5, 6, 7, 8};

// prints 
// 1 2 3 4
// 5 6 7 8
for(std::size_t j = 0; j < m; j++)
{
   for(std::size_t i = 0; i < n; i++)
   {
      std::cout << array[j * n + i] << " ";
   }
   
   std::cout << "\n";
}
```

## Arrays as matrices

The matrix below is a \\(3×4\\) matrix of \\(12\\) elements. We can read a given element in the matrix by specifying which row and column it is located at. For example, element \\(g\\) is located in the 2<sup>nd</sup> row and 3<sup>rd</sup> column. Accessing the elements of a mathematical matrix by specifying the row and column in which the element resides is an unambiguous operation.

$$
\begin{bmatrix} a & b & c & d \\\ e & f & g & h \\\ i & j & k & l \end{bmatrix}
$$

We can interpret two dimensional arrays (or flat one dimensional arrays of size \\(m \cdot n\\), the distinction isn’t important) as tabular data consisting of a number of rows and columns. This lends itself well to the implementation of matrices in C++ as we can then use our major and minor indices to access the specific elements of our matrix. However, without any context, accessing the elements in the array representation of a matrix using the major and minor indices is ambiguous. Consider the matrix above as represented by a two dimensional array. What will the output of the code snippet below be?

```c++
for(std::size_t j = 0; j < m; j++)
{
   for(std::size_t i = 0; i < n; i++)
   {
      std::cout << matrix[j][i] << " ";
   }
   
   std::cout << "\n";
}
```

There are two possible answers, depending on whether we treat each one dimensional array (accessed by the major index) as a *row* or as a *column* within the matrix:

<table>
<tr>
<th> Major index as rows </th> <th> Major index as columns </th>
</tr>
<tr>
<td>
<pre lang="c++">
a b c d
e f g h
i j k l
</pre>
</td>
<td>
<pre lang="c++">
a e i
b f j
c g k
d h l
</pre>
</td>
</tr>
</table>

When we treat each one dimensional array as a row in the matrix, we are storing our data in *row-major* order, where we use the major index to access each row of the matrix. Likewise, when we treat each one dimensional array as a column in the matrix, we are storing our data in *column-major* order, using the major index to access each column. It is of the utmost importance to understand that these storage conventions are a byproduct of how we map our mathematical matrix to memory in our given programming language. Furthermore, the convention of row or column matrix order is independent of the convention of row or column vectors. That is to say, there is nothing stopping you picking the convention of column vectors and row major arrays for your matrices (or any combination of these conventions, for that matter). Whichever conventions you choose, be sure to document them and be consistent in their usage.

## Row & column major matrix representations

We can store the matrix above in row-major ordering as follows:

```c++
const std::size_t rows = 3;
const std::size_t cols = 4;

const char rowMajor[rows][cols] = 
{ 
    {'a', 'b', 'c', 'd'}, // row 0 
    {'e', 'f', 'g', 'h'}, // row 1
    {'i', 'j', 'k', 'l'}  // row 2
};

// prints the array representation of the matrix (which is also the actual matrix)
// a b c d
// e f g h
// i j k l
for(std::size_t r = 0; r < rows; r++)
{
   for(std::size_t c = 0; c < cols; c++)
   {
      std::cout << rowMajor[r][c] << " ";
   }
   
   std::cout << "\n";
}
```

Likewise, we can store our matrix in column-major ordering simply by swapping the dimensions and ordering of the data we initialize the array with:

```c++
const std::size_t rows = 3;
const std::size_t cols = 4;

const char colMajor[cols][rows] = 
{
    {'a', 'e', 'i'}, // column 0
    {'b', 'f', 'j'}, // column 1
    {'c', 'g', 'k'}, // column 2
    {'d', 'h', 'l'}  // column 3
};

// prints the array representation of the matrix (hence the transpose)
// a e i
// b f j
// c g k
// d h l
for(std::size_t c = 0; c < cols; c++)
{
   for(std::size_t r = 0; r < rows; r++)
   {
      std::cout << colMajor[c][r] << " ";
   }
   
   std::cout << "\n";
}
```

You’ll notice that the row-major and column-major arrays of the same matrix are the transpose of one another. Remember, this is *only* a byproduct of the conventions we choose to represent our matrix as a two dimensional array as in the mathematical sense, there is no such thing as a “row-major matrix” or a “column-major matrix”. That is to say, both array representations are abstractions of the same mathematical matrix, with the column-major array representation simply being the transpose of the row-major array representation of that same matrix.

## Putting the theory into practice

### Matrix products

As we’ve seen in the previous sections, there is no concept in the mathematical sense of a “row major matrix” or a “column major matrix” as this is purely a function of how we map our mathematical matrices to memory (and thus code). However, the implementation of matrix multiplication logic does differ depending on whether we are storing our matrices in row major or column major. 

Consider the following matrix product:

$$
\begin{bmatrix}     1 & 0 & 1 & 4 \\\     0 & 2 & 0 & 1 \\\     3 & 0 & 3 & 4 \end{bmatrix}  \cdot  \begin{bmatrix}     7 & 8 & 7 \\\     6 & 5 & 6 \\\     8 & 0 & 8 \\\    0 & 9 & 0 \\\ \end{bmatrix}  =  \begin{bmatrix}     15 & 44 & 15 \\\     12 & 19 & 12 \\\     45 & 60 & 45 \end{bmatrix}
$$

We can implement the matrix product with row major array storage as follows:

```c++
// 3x4 matrix in row-major order
const std::size_t lhsRows = 3;
const std::size_t lhsCols = 4;

const float lhsRowMajor[lhsRows][lhsCols] = 
{ 
    {1.f, 0.f, 1.f, 4.f}, // row 0 
    {0.f, 2.f, 0.f, 1.f}, // row 1
    {3.f, 0.f, 3.f, 4.f}  // row 2
};

// 4x3 matrix in row-major order
const std::size_t rhsRows = 4;
const std::size_t rhsCols = 3;

const float rhsRowMajor[rhsRows][rhsCols] = 
{ 
    {7.f, 8.f, 7.f}, // row 0 
    {6.f, 5.f, 6.f}, // row 1
    {8.f, 0.f, 8.f}, // row 2
    {0.f, 9.f, 0.f}  // row 3
};

// 3x3 matrix in row-major order
float resultRowMajor[lhsRows][rhsCols] = 
{ 
    {0.f, 0.f, 0.f}, // row 0 
    {0.f, 0.f, 0.f}, // row 1
    {0.f, 0.f, 0.f}, // row 2
};

for (std::size_t lr = 0; lr < lhsRows; lr++)
{
    for (std::size_t rc = 0; rc < rhsCols; rc++)
    {
        for (std::size_t lc = 0; lc < lhsCols; lc++)
        {
            resultRowMajor[lr][rc] += lhsRowMajor[lr][lc] * rhsRowMajor[lc][rc];
        }
    }
}

// prints 
// 15 44 15
// 12 19 12
// 45 60 45
for(std::size_t r = 0; r < lhsRows; r++)
{
   for(std::size_t c = 0; c < rhsCols; c++)
   {
      std::cout << resultRowMajor[r][c] << " ";
   }
   
   std::cout << "\n";
}
```

Alternatively, can implement the matrix product with column major array storage as follows:

```c++
// 3x4 matrix in column-major order
const std::size_t lhsRows = 3;
const std::size_t lhsCols = 4;

const float lhsColumnMajor[lhsCols][lhsRows] =
{
    {1.f, 0.f, 3.f}, // column 0 
    {0.f, 2.f, 0.f}, // column 1
    {1.f, 0.f, 3.f}, // column 2
    {4.f, 1.f, 4.f}  // column 3
};

// 4x3 matrix in column-major order
const std::size_t rhsRows = 4;
const std::size_t rhsCols = 3;

const float rhsColumnMajor[rhsCols][rhsRows] =
{
    {7.f, 6.f, 8.f, 0.f}, // column 0 
    {8.f, 5.f, 0.f, 9.f}, // column 1
    {7.f, 6.f, 8.f, 0.f}, // column 2
};

// 3x3 matrix in column-major order
float resultColumnMajor[rhsCols][lhsRows] =
{
    {0.f, 0.f, 0.f}, // column 0 
    {0.f, 0.f, 0.f}, // column 1
    {0.f, 0.f, 0.f}, // column 2
};

for (std::size_t lr = 0; lr < lhsRows; lr++)
{
    for (std::size_t rc = 0; rc < rhsCols; rc++)
    {
        for (std::size_t lc = 0; lc < lhsCols; lc++)
        {
            // note the swapped indices
            resultColumnMajor[rc][lr] += 
              lhsColumnMajor[lc][lr] * rhsColumnMajor[rc][lc];
        }
    }
}

// prints 
// 15 12 45
// 44 19 60
// 15 12 45
for (std::size_t c = 0; c < rhsCols; c++)
{
    for (std::size_t r = 0; r < lhsRows; r++)
    {
        // note the swapped indices
        std::cout << resultColumnMajor[c][r] << " ";
    }

    std::cout << "\n";
}
```

### Vector-matrix products

Consider the following product between a row vector and a matrix:

$$
\begin{bmatrix} 1 & 0 & 1 \end{bmatrix} \cdot \begin{bmatrix} 1 & 0 & 1 & 4 \\\ 0 & 2 & 0 & 1 \\\ 3 & 0 & 3 & 4 \end{bmatrix} = \begin{bmatrix} 4 & 0 & 4 & 8 \end{bmatrix}
$$

We can implement the vector-matrix product with row major array storage as follows:

```c++
// 1x3 row vector
const float rowVector[3] = {1.f, 0.f, 1.f};

// 3x4 matrix in row-major order
const std::size_t rows = 3;
const std::size_t cols = 4;

const float rowMajor[rows][cols] = 
{ 
    {1.f, 0.f, 1.f, 4.f}, // row 0 
    {0.f, 2.f, 0.f, 1.f}, // row 1
    {3.f, 0.f, 3.f, 4.f}  // row 2
};

// 1x4 row vector to hold the result
float result[cols] = {0.f, 0.f, 0.f, 0.f};

for(std::size_t c = 0; c < cols; c++)
{
   for(std::size_t r = 0; r < rows; r++)
   {
      result[c] += rowMajor[r][c] * rowVector[r];
   }
}

// prints 4 0 4 8
for(std::size_t i = 0; i < cols; i++)
{
   std::cout << result[i] << " ";
}
```

Now consider the following product between the transpose of the above matrix and a column vector:

$$
\begin{bmatrix} 1 & 0 & 3 \\\ 0 & 2 & 0 \\\ 1 & 0 & 3 \\\ 4 & 1 & 4  \end{bmatrix} \cdot \begin{bmatrix} 1 \\\ 0 \\\ 1 \end{bmatrix} = \begin{bmatrix} 4 \\\ 0 \\\ 4 \\\ 8 \end{bmatrix}
$$

We can implement the matrix-vector product with column major array storage as follows:

```c++
// 3x1 column vector
const float columnVector[3] = {1.f, 0.f, 1.f};

// 4x3 matrix in column-major order
const std::size_t rows = 4;
const std::size_t cols = 3;

const float columnMajor[cols][rows] = 
{ 
    {1.f, 0.f, 1.f, 4.f}, // column 0 
    {0.f, 2.f, 0.f, 1.f}, // column 1
    {3.f, 0.f, 3.f, 4.f}  // column 2
};

// 4x1 column vector to hold the result
float result[rows] = {0.f, 0.f, 0.f, 0.f};

for(std::size_t r = 0; r < rows; r++)
{
   for(std::size_t c = 0; c < cols; c++)
   {
      result[r] += columnMajor[c][r] * columnVector[c];
   }
}

// prints 4 0 4 8
for(std::size_t i = 0; i < rows; i++)
{
   std::cout << result[i] << " ";
}
```

You may have noticed that the code for both snippets is identical, bar some flipping of variable names for clarity. Remember that the product of a row vector with a given matrix is the transpose of the product between a column vector and the transpose of that same matrix:

$$
\vec{r} \cdot \mathbf{M} = (\mathbf{M^T} \cdot \vec{c})^\mathbf{T}
$$

An interesting property of storing our matrices in the array matrix order convention of our vector convention (i.e. row vectors with matrices stored in row-major order and column vectors with matrices stored in column-major order) is that the actual array data for the matrices is identical regardless of which of the two convention combinations you choose. Consider the following 2d transform matrix for scaling, anti-clockwise rotating and translating a given row vector:

$$
\begin{bmatrix}      S_{x} \cdot \cos(\theta) & S_{y} \cdot \sin(\theta) & 0  \\\      -( S_{x} \cdot \sin(\theta)) & S_{y} \cdot \cos(\theta) & 0  \\\  T_{x} &  T_{y}  & 1  \end{bmatrix}
$$

When laid out in row-major in a two dimensional array, the array is initialized as follows:

```c++
// Scale to double and quadruple the x and y axis accordingly
const float Sx = 2.f;
const float Sy = 4.f

// Rotation of approx. 45 degrees (in radians)
const float theta = 0.785;

// Translation of -5 along x axis and 10 along y axis
const float Tx = -5.f;
const float Ty = 10.f;

// 3x3 matrix in row-major order
const std::size_t rows = 3;
const std::size_t cols = 3;

const float rowMajor[rows][cols] = 
{ 
    {Sx * cos(theta),    Sy * sin(theta), 0.f}, // row 0 
    {-(Sx * sin(theta)), Sy * cos(theta), 0.f}, // row 1
    {Tx,                 Ty,              1.f}  // row 2
};
```

Now consider the same transformation matrix transposed for translating a given column vector:

$$
\begin{bmatrix}      S_{x} \cdot \cos(\theta) & -(S_{x} \cdot \sin(\theta)) & T_{x} \\\      S_{y} \cdot \sin(\theta) & S_{y} \cdot \cos(\theta) & T_{y} \\\      0 & 0 & 1  \end{bmatrix}
$$

When laid out in column-major in a two dimensional array, the array is initialized as follows:

```c++
// Scale to double and quadruple the x and y axis accordingly
const float Sx = 2.f;
const float Sy = 4.f

// Rotation of approx. 45 degrees (in radians)
const float theta = 0.785;

// Translation of -5 along x axis and 10 along y axis
const float Tx = -5.f;
const float Ty = 10.f;

// 3x3 matrix in column-major order
const std::size_t rows = 3;
const std::size_t cols = 3;

const float columnMajor[cols][rows] = 
{ 
    {Sx * cos(theta),    Sy * sin(theta), 0.f}, // column 0 
    {-(Sx * sin(theta)), Sy * cos(theta), 0.f}, // column 1
    {Tx,                 Ty,              1.f}  // column 2
};
```

This is convenient because if we wish to support both row vectors and column vectors, our utility functions to generate the various transformation matrices needed will be identical so long as we assume our matrix order conventions match our vector conventions. As to which combination of conventions is superior, it really is a matter of taste. Row vectors with row-major matrix storage have the slight advantage of the code layout mapping nicely to the row-by-row layout of matrix notation, whereas for column vectors with column-major matrix storage you need to mentally transpose the matrices when reading code. Ultimately, the only thing that is important is that the conventions you pick are documented and used consistently.

## Programming languages & matrix order

Programming languages themselves have assumptions about the matrix order of multidimensional arrays that is independent of the assumptions about the matrix order of our array layout when used to represent matrices. For example, the [C99 language specification §6.5.2.1p3](https://www.open-std.org/jtc1/sc22/WG14/www/docs/n1256.pdf) (thus, by extension, C++) states (emphasis added):

>Successive subscript operators designate an element of a multidimensional array object. If E is an n-dimensional array (n >= 2) with dimensions i x j x . . . x k, then E (used as other than an lvalue) is converted to a pointer to an (n - 1)-dimensional array with dimensions j x . . . x k. If the unary * operator is applied to this pointer explicitly, or implicitly as a result of subscripting, the result is the referenced (n - 1)-dimensional array, which itself is converted into a pointer if used as other than an lvalue. **It follows from this that arrays are stored in row-major order (last subscript varies fastest).**

If we were to store our matrices in the natural matrix order of C++ but access the elements in opposing matrix order, we would have element access patterns that are cache unfriendly as each element access will not be contiguous but instead separated by a stride equal to the number of columns in the matrix. Consider the following:

```c++
const std::size_t rows = 3;
const std::size_t cols = 
   std::hardware_destructive_interference_size / sizeof(std::size_t);

// initialized elsewhere...
const char rowMajor[rows][cols];

// column-major access (prints column by column)
for(std::size_t c = 0; c < cols; c++)
{
   for(std::size_t r = 0; r < rows; r++)
   {
      // non-contiguous element access
      std::cout << rowMajor[r][c] << " ";
   }
   
   std::cout << "\n";
}
```

In the extreme example above, each row is a L1 cache line in length, so accessing each element using column-major indexing is not only non-contiguous memory access but a worst case scenario where every element access results in a cache miss. However, this is only because we are implicitly using the language’s assumption to store the matrix data but using our own assumption about matrix order to access the data. 

As we have seen in the previous section, there is nothing stopping us from storing our matrices using a column-major layout if we wish to access our elements column-by-column rather than row-by-row so ideally we would pick conventions that match closest to our expected element access patterns. For transformation matrices, this question has a relatively straightforward answer: as our matrices will contain the basis vectors for our vector transformations, when we pick the matrix order convention that matches our vector convention, the basis vectors in our transformation matrices will be guaranteed to have contiguous components. On the flipside, if we don’t match our matrix order and vector conventions, our basis vector components will be separated in memory by a stride matching the matrix dimension of the matrix order  convention used to store the matrix. Consider the following example of retrieving the x-axis basis vector of a 2d rotation matrix for column-vectors stored in row-major:

```c++

// Rotation of approx. 45 degrees (in radians)
const float theta = 0.785;

// 2x2 matrix in row-major order
const std::size_t rows = 2;
const std::size_t cols = 2;
using row_type = std::array<float, cols>;
using col_type = std::array<float, rows>;
using mat2x2_type = std::array<row_type, rows>;

// 2d rotation matrix for column vectors
const mat2x2_type rowMajor = 
{
    {cos(theta), -sin(theta)}, // row 0 
    {sin(theta),  cos(theta)}  // row 1
};

// returns the x basis vector
col_type basisX()
{
     // x-axis basis vector components stored non-contiguously
    return col_type 
    {
        rowMajor[0][0],
        rowMajor[1][0]
    };
}
```

Notice that we have to construct an intermediary array and populate it with the basis vector components due to the fact that they’re not stored contiguously in the array representation of the matrix. Now compare that to the following example of retrieving the x-axis basis vector of the same matrix stored in column-major:

```c++
// Rotation of approx. 45 degrees (in radians)
const float theta = 0.785;

// 2x2 matrix in column-major order
const std::size_t rows = 2;
const std::size_t cols = 2;
using col_type = std::array<float, rows>;
using mat2x2_type = std::array<col_type, cols>;

// 2d rotation matrix for column vectors
const mat2x2_type columnMajor = 
{ 
    {cos(theta), sin(theta)}, // column 0 
    {-sin(theta),     cos(theta)}  // column 1
};

// returns the x basis vector
const col_type& basisX()
{
     // the x-axis basis vector components stored contiguously
    return columnMajor[0];
}
```

In the above example, rather than having to construct an intermediary array for our basis vector, we can simply return a reference to the first column in the matrix. When composing our vectors and matrices from more complex types, this becomes a useful property as it makes accessing the vectors that make up our transformation matrices a trivial operation without the need for constructing any intermediary types.

## Closing thoughts

When picking conventions for our vectors and matrices, we can choose any combination of row or column vectors with row- or column-major array representations of our matrices as these two conventions are independent of one another. However, not all choices are equal so I will present an (admittedly, subjective) summary of the pros and cons of each combination:


<table>
<tr>
<th>Convention</th> <th>Pros</th> <th>Cons</th>
</tr>

<tr>
<td>Row vectors with matrices stored in row-major order</td>
<td>
<ul>
<li>Uses the same vector convention (and thus ordering of vector and matrix products) as a lot of graphics literature.</li>
<li>Requires no reordering of array data for the matrices.</li>
<li>Initialization of matrix array elements in code maps naturally to the layout of the matrix.</li>
<li>Cache-friendly, trivial access to the basis vectors in transformation matrices.</li>
</ul>
</td>
<td>
<ul>
<li>Uses the opposite vector convention (and thus ordering of vector and matrix products) as mathematical literature.</li>
</ul>
</td>
</tr>

<tr>
<td>Column vectors with matrices stored in column-major order</td>
<td>
<ul>
<li>Uses the same vector convention (and thus ordering of vector and matrix products) as mathematical literature.</li>
<li>Cache-friendly, trivial access to the basis vectors in transformation matrices.</li>
</ul>
</td>
<td>
<ul>
<li>Requires reordering of array data for the matrices.</li>
<li>Initialization of matrix array elements in code requires mental transposing from the layout of the matrix.</li>
</ul>
</td>
</tr>

<tr>
<td>Row vectors with matrices stored in column-major order</td>
<td>
<ul>
<li><i>None that I can think of...</i></li>
</ul>
</td>
<td>
<ul>
<li>Cache-unfriendly, non-trivial access to the basis vectors in transformation matrices.</li>
<li>Requires reordering of array data for the matrices.</li>
<li>Initialization of matrix array elements in code requires mental transposing from the layout of the matrix.</li>
<li>Uses the opposite vector convention (and thus ordering of vector and matrix products) as mathematical literature.</li>
</ul>
</td>
</tr>

<tr>
<td>Column vectors with matrices stored in row-major order</td>
<td>
<ul>
<li>Uses the same vector convention (and thus ordering of vector and matrix products) as mathematical literature.</li>
<li>Initialization of matrix array elements in code maps naturally to the layout of the matrix.</li>
</ul>
</td>
<td>
<ul>
<li>Cache-unfriendly, non-trivial access to the basis vectors in transformation matrices.</li>
</ul>
</td>
</tr>

</table>

Ultimately, it bears repeating that no matter which conventions you pick, be sure to document them and be consistent in their usage!