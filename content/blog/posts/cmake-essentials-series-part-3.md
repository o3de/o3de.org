---
title: "CMake Essentials Series - Part 3"
date: 2022-11-02
slug: cmake-essentials-series-part-3
author: Tom Hulton-Harrop
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: ""
---

How to integrate larger third-party dependencies into your CMake projects and reuse them across multiple projects.

## Motivation

While `FetchContent` is great for some things, it’s not always the right tool. When a larger dependency like a full framework or package needs to be integrated, instead of making it part of the same build, the dependency can be built and installed separately and then integrated into the main build with `find_package`.

## Example

Many C++ libraries support a concept called installing. Installing is simply the operation of copying all the relevant build artifacts to a particular location (e.g. the .h files, .lib/.dll/.a/.so files and CMake config files) so that another application or library can use them. By default, installing copies the files to a default system location but this can be freely configured.

Suppose we would like to download, build and install Google Test for a little prototype. The commands are as follows:

```bash
> git clone https://github.com/google/googletest.git #1
> cd googletest #2
> cmake -S . -B build -DCMAKE_INSTALL_PREFIX=../gtest-install -Dgtest_force_shared_crt=ON #3
> cmake --build build --target install #4
```

First, we simply clone the Google Test repo and then navigate to that folder (`#1` and `#2`). 

We then run the CMake configure command (`#3`) and provide an install folder with `-DCMAKE_INSTALL_PREFIX` (otherwise it’d end up in `C:\Program Files` on Windows or `usr/local/lib` and `usr/local/include` on Linux/macOS). 

On Windows, we also need to provide `-Dgtest_force_shared_crt` when building Google Test to ensure it links to the C runtime dynamically, otherwise you’ll get lots of link errors (this is just a Google Test quirk). 

Finally, we build and then install the library (`#4`) which will copy the relevant files to the `gtest-install` folder.

If we want to then use Google Test in a sample app, we can bring it in using `find_package` in our `CMakeLists.txt`. We’ll make a new folder at the same level as `googletest/` called `testing` and add this file:

```bash
# CMakeLists.txt
cmake_minimum_required(VERSION 3.15)
project(testing)
find_package(GTest CONFIG REQUIRED) #1
add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} PRIVATE GTest::gtest) #2
```

`find_package` (`#1`) will attempt to bring in the Google Test library as an imported target. `CONFIG` lets CMake know we’re using a config file (as opposed to a module file in the form `FindXXX.cmake`) and the `REQUIRED` keyword will terminate the configure step early if Google Test cannot be found. 

We use the `GTest` namespace when linking (`#2`) to indicate Google Test is an imported target. Our `main.cpp` is as follows:

```c++
#include "gtest/gtest.h"

// lots of tests...

int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```

When configuring our project, all we need to do is tell CMake where to find the installed Google Test library. We do this with `-DCMAKE_PREFIX_PATH` (`#1`). We can then simply build (`#2`) and run (`#3`) the application.

```bash
> cmake -S . -B build -DCMAKE_PREFIX_PATH=../gtest-install #1
> cmake --build build #2
> ./build/Debug/testing.exe #3
```

## Deliberation

The great benefit of installing libraries and using `find_package` is that first, we can share that library across multiple projects and second, we do not need to rebuild our dependencies each time we rebuild our code. For a library like Google Test we’re rarely going to be making changes to it, so installing it and keeping it separate can have a huge benefit in terms of iteration time. This whole process can be automated through the use of `ExternalProject_Add` which removes some of the manual steps like cloning and building, though it’s doing the exact same thing under the hood.

## Further Reading

I got super into CMake a little while ago and wanted to better understand topics such as installing. So I created a little GitHub repo with a number of simple projects to help people better learn and understand CMake. It might help some people who are just getting to grips with CMake.

* [CMake Examples](https://github.com/pr0g/cmake-examples)

There's also this little demo application which uses `ExternalProject_Add` to download and configure SDL, bgfx, and Dear ImGui (see the `third-party/` folder):

* [SDL-bgfx-ImGui Starter](https://github.com/pr0g/sdl-bgfx-imgui-starter)

## To be continued

We’ll wrap up the final entry in this series with what it takes to actually write a library that can be installed.

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._

### Check out the other parts of the series:

* [CMake Essentials Series - Part 1](/blog/posts/cmake-essentials-series-part-1/)
* [CMake Essentials Series - Part 2](/blog/posts/cmake-essentials-series-part-2/)
* [CMake Essentials Series - Part 3](/blog/posts/cmake-essentials-series-part-3/)
* [CMake Essentials Series - Part 4](/blog/posts/cmake-essentials-series-part-4/)