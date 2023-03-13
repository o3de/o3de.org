---
linkTitle: Test Impact Analysis Framework
title: Test Impact Analysis Framework Developer Documentation
description: Documentation for developers extending or contributing to the Test Impact Analysis Framework bundled as part of Open 3D Engine.
---

The **Test Impact Analysis Framework** (TIAF) is the implementation of change-based testing using a technique called [Fast Test Impact Analysis](https://www.youtube.com/watch?v=mMzL1UCr0OE) for optimizing lead time of Automated Review. The TIAF currently supports both native (C++) tests and Python tests.

## Development Sources

| Description | Link |
|-|-|
| Front End & Runtime | https://github.com/o3de/o3de/tree/development/Code/Tools/TestImpactFramework |
| CMake integration | https://github.com/o3de/o3de/tree/development/cmake/TestImpactFramework |
| AR integration | https://github.com/o3de/o3de/tree/development/scripts/build/TestImpactAnalysis |

## Topics

| Name | Description |
|-|-|
| [Architectural Overview](./architectural-overview) | Learn about the architecture of the TIAF and its various subsystems.|
| [Maintaining TIAF](./maintaining-tiaf) | This contains the information necessary for maintaining the TIAF.|
| [Extending TIAF](./extending-tiaf) | This contains the information for extending the TIAF.|

```mermaid
flowchart TD
    FrontEnd[Front End] -->|Test sequence to run| Runtime[Runtime]
    Runtime --> |Test sequence result| FrontEnd
    Runtime --> |Test targets to run| TestEngine[Test Engine]
    Runtime --> |Coverage updates| DDM[Dynamic Dependency Map]
    Runtime --> |Unresolved change lists| DDM
    BuildTargetList[Build Target List] --> |Production & test targets| TSAP[Test Selector & Prioritizor]
    DDM --> |Resolved change list| TSAP
    DDM --> |Covering test targets| TSAP
    TSAP --> |Selected test targets| Runtime
    TestEngine --> |Test targets to run| TestJobInfoGenerator[Test Job Info Generator]
    TestJobInfoGenerator --> |Job infos| TestRunner[Test Runner]
    TestEngine --> |Test sequence result & test engine jobs| Runtime
    TestRunner --> |Process scheduler result & jobs| TestEngine
    TestRunner --> |Job infos| JobRunner[Job Runner]
    JobRunner --> |Process scheduler result & jobs| TestRunner
    JobRunner --> |Process infos| ProcessScheduler[Process Scheduler]
    ProcessScheduler --> |Process scheduler result| JobRunner
    ProcessScheduler --> |Process invocations| OS[Operating System]
```