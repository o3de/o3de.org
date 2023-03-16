---
linkTitle: Build Targets
title: Build Targets
description: Information about the TIAF build targets.
---

The build targets are a higher level abstraction of the [targets]() that treat the individual test and produciton target types as a single, generic build target. Each build target contains a [variant]() that holds either a test target or production target and contains the dependency graph of build targets for that build target. This dependency graph can be walked to discover the build targets that are linked to a given build target.

## Build Target

## Build Target List