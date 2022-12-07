---
title: "CMake Essentials Series - Part 4"
date: 2022-11-16
slug: cmake-essentials-series-part-4
author: Tom Hulton-Harrop
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: ""
---

In this last installment we’ll cover the necessary commands to install a library for use in other projects.

## Motivation

Over the course of this series we’ve learnt how to use CMake and make use of existing libraries, but not what is involved in authoring new libraries that others can easily integrate. By following these best practices we can make our libraries easy to use and more likely to be adopted.

## Example

The various install commands provided by CMake are a little confusing to say the least. The primary source of confusion is that the `install` command itself (the one used in the `CMakeLists.txt` files) has many variants that each do something slightly different. We’ll walk through each one in turn and see what is required to install a static library for use in other applications.

The `CMakeLists.txt` file starts with some familiar commands.

```cmake
cmake_minimum_required(VERSION 3.15)
project(calculator)
add_library(${PROJECT_NAME}) #1
target_sources(${PROJECT_NAME} PRIVATE src/calculator.cpp) #2
```

Instead of creating an executable/application we create a library (`#1`) and add the relevant sources (`#2`).

```cmake
include(GNUInstallDirs) #3
```

We then have to bring in some standard install location paths to ensure installation is portable, these are made available by include `GNUInstallDirs` (`#3`).

```cmake
target_include_directories(
    ${PROJECT_NAME}
    PUBLIC $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include> #4
           $<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}>)      #5
```

Next we setup the include paths for the library (`#4`). Notice we use a generator expression (perhaps the topic of another blog post sometime in the future) to configure where to look for the includes. 

This is either as an imported target (`#5`) being used after install or part of the normal build (distinguished by `BUILD_INTERFACE` and `INSTALL_INTERFACE`).

```cmake
install( #6
    TARGETS ${PROJECT_NAME}
    EXPORT ${PROJECT_NAME}-config
    ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR})

install( #7
    EXPORT ${PROJECT_NAME}-config
    NAMESPACE ${PROJECT_NAME}::
    DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/${PROJECT_NAME})

install(
    DIRECTORY ${CMAKE_CURRENT_LIST_DIR}/include/${PROJECT_NAME}/ #8
    DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/${PROJECT_NAME})
```

The last three steps are the illusive `install` commands. We begin by specifying the target to install (`#6`). We set the export name (which does not need to match the target name but often does) which is the name CMake looks for when we use `find_package`. We also specify where the built library file should be installed (`${CMAKE_INSTALL_LIBDIR}` is provided by `GNUInstallDirs`). 

We next have to install (copy) the export file to the install location (`#7`). It’s good practice to set a namespace at this point so clients must use `calculator::calculator` to identify it as an imported target and we must also set the location of where the export file should be installed. 

The final invocation of `install` (`#8`) just copies the interface/header files to the expected location.

With that all setup, it’s possible to now configure and then run `cmake --build build --target install` to build and then install the library. To set a custom install location remember to provide `-DCMAKE_INSTALL_PREFIX=<path>` to the CMake configure command.

## Deliberation

Installing isn’t likely something you’ll use often but having an understanding of what the commands do can make reading existing `CMakeLists.txt` files much easier. There’s a lot we didn’t cover, there are more advanced topics around things like versioning and custom export/config files but this should have given you enough information to get started.

Hopefully this tour of CMake and some of its lesser known features has been useful. The content might not be useful today but will no doubt only become more relevant in future. If there are any questions or follow-ups about things that weren’t covered please get in touch on the O3DE Discord.

## Further Reading

To learn more about installing I recommend watching this excellent talk by Craig Scott:

* [Deep CMake for Library Authors](https://youtu.be/m0DwB4OvDXk)

There’s also a lot more information on the repo mentioned last week with plenty of examples:

* [CMake Examples](https://github.com/pr0g/cmake-examples)

There’s also a little set of CMake install helpers available here that take some of the boilerplate out of installing a new library:

* [CMake Helpers](https://github.com/pr0g/cmake-helpers)

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._

### Check out the other parts of the series:

* [CMake Essentials Series - Part 1](/blog/posts/cmake-essentials-series-part-1/)
* [CMake Essentials Series - Part 2](/blog/posts/cmake-essentials-series-part-2/)
* [CMake Essentials Series - Part 3](/blog/posts/cmake-essentials-series-part-3/)
* [CMake Essentials Series - Part 4](/blog/posts/cmake-essentials-series-part-4/)