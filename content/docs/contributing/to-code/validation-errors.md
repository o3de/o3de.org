---
description: ' Details and instructions for using the validator tool. '
title: How to Use the Validation Tool for Open 3D Engine Submissions
linktitle: Validator Errors
---

The most likely reason you visited this page was to help work past a validation failure.  To find the relevant fix, first look at the standard output logs!

The Open 3d Engine Early Warning System is a tool for style checks and basic static analysis to find errors, rather than building the engine and performing tests. It runs before the pipeline starts a build, attempting to quickly reject invalid changes before spending machine resources to build and test, and before spending human effort on reviewing changes.

## What file is failing? What rule is failing?

Every validation failure will log a message to standard output.  Search for `FAILED` and find lines of the form:

```
<path_to_cpp_file>::ValidatorRuleName FAILED - <failure details>

# Example Output
VALIDATOR_FAILED: CopyrightHeaderValidator <file>::CopyrightHeaderValidator FAILED - Source file missing copyright headers.
```

## How do I submit a fix?

Modify your code to be compliant and resubmit to the [Automated Review](/docs/contributing/to-code/ar/) pipeline.  You can also run the validator locally, if you don't want to wait or want to debug a validator.

If the validator script contains a bug, it is recommended that a [GitHub Issues ticket](https://github.com/aws-lumberyard/o3de/issues/new/choose) is open.

## Local validation

Files can be checked locally by running scripts located in `scripts/commit_validation`.

### Git Commits

```cmd
python\python.cmd scripts\commit_validation\git_validate_branch.py --source <source branch> --target <target branch>
```

### Targeting any file or folder tree

The validator simulates that every file in the folder (or the one file you specify) is part of your proposed change and changes every line in the file. This causes all the validators to scan as appropriate. The validator does not accept wildcards. Specify a file name or a folder name and it will operate recursively.

```cmd
python\python.cmd scripts\commit_validation\validate_file_or_folder.py --path <path to validate>
```

## Pipeline validation

Connecting this tool into a Continuous Integration system is identical to local use!  Simply fail the pipeline when it exits with a non-zero code.

The Automated Review submission pipeline uses Jenkins to manage this tool.

## Create a new validator

Validators are created by adding a new class in `scripts/commit_validation/commit_validation/validators`.

Each validator requires the following:

1. Inherits from CommitValidator and implements run(self, commit).
2. Implements get_validator() and returns the new class.
