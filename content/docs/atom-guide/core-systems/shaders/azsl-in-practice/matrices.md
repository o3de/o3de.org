# Matrices
## Matrix Major
AZSL by itself assumes the column major as a default matrix major. However, in Atom the row major is set as the default matrix major. If you want to be explicit, use either `row_major` or `column_major` keyword in front of uniform matrices. 

AZSL does not support the pack_matrix pragma directive. All preprocessing is handled by clang. 