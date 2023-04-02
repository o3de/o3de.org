---
linkTitle: Storage Query Tool
title: Storage Query Tool
description: Overview of the storage query tool.
---

The Storage Query Tool (SQT) is a tool that can be used to perform CRUD (Create, Read, Update and Delete) operations on historic TIAF data within S3 buckets and local storage.

The user can provide a number of arguments to specify what action the tool should take (see table below). When working with S3 buckets, the tool assumes that credentials are handled by another service, such as the [AWS Command Line Interface](https://aws.amazon.com/cli/).

### Differences between S3 and Local Storage Mode

In S3 mode, all data is as a zipped up JSON file inside the bucket. Locally, data will be stored as a .json file. When downloading from the bucket, the SQT will decompress the files so they are readable.

In Local Mode, the `read` action will open up file explorer at the provided address if the file exists, whereas in S3 mode it will download the file and save it at the user specified location.

### Command Line Arguments

| Argument       | Summary                                                                                                                                                                                                                                                                                             | Example usage                                                           |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `--s3-bucket`    | Name of the S3 bucket to access. When not set, SQT will work in local mode.                                                                                                                                                                                                                         | `--s3-bucket "yourBucketName"`                                            |
| `--full-address` | Full address of the file you wish to execute CRUD operations on or verify the existence of. In S3 mode, this will be the full key of the file. In local mode, this will be full path to the file. Take care to ensure that when running locally, you have the required permissions to access files. | `--s3-bucket "yourBucketName" --full-address "full/address/to/file/here"` |
| `--search-in`    | Folder to search for files in. When in S3 mode, this can either be a root directory of the bucket or any path from a root directory. When in local mode, this must be the full path to the directory you wish to search in.                                                                         | `--search-in "yourRootDir" or --search-in "C:/Directory"`                 |
| `--action`       | Specify which action to take - `create`, `read`, `update`, `delete`. When not set, SQT assumes it is in display mode and will only display file paths or verify if a file exists.                                                                                                                   | `--action "read", --action "delete"`                                      |
| `--file-in`      | Specify which file should be used as the source of data when creating or updating data.                                                                                                                                                                                                             | `--file-in "Your/Full/Path/Here"`                                         |
| `--file-out`     | Specify which file data should be saved to when reading from a file.                                                                                                                                                                                                                                | `--file-out "Your/Full/Path/Here"`                                        |
| `--file-type`    | Specify which file type to use, either "json" or "zip" depending on if we are dealing with json files or zip files.                                                                                                                                                                                 | `--file-type "json"`                                                      |

### Example Usage

#### Searching for all objects in a bucket

This will display all objects in a bucket.
```
tiaf_tools.py --s3-bucket "yourbucket" 
```

### Search for all objects in a root folder of a bucket

This displays all objects in the specified directory.
```
tiaf_tools.py --s3-bucket "yourbucket" --search-in "your_root" 
```

### Search for a specific historic_data.json.zip file by specifying directory, branch, build and test suite

This will check whether the file exists.
```
tiaf_tools.py --s3-bucket "yourbucket" --full-address "RootDir/Branch/Build/TestSuite/historic_data.json.zip" 
```

### CRUD operations

{{< note >}}
The examples below use the json file type, but zip files can be used as well.
{{< /note >}}

#### Create

This will put the file at `--file-in` into the bucket at `--full-address` if there is not already a file at the desired location.

```
tiaf_tools.py --s3-bucket "tiaf" --action "create" --full-address "RootDir/Branch/Build/TestSuite/historic_data.json.zip" --file-in "C:/o3de/test.txt" --file-type="json" 
```

#### Read

This will download the file at the desired location and store it in the directory specified in `--file-out`.

```
tiaf_tools.py --s3-bucket "tiaf" --action "read" --full-address "RootDir/Branch/Build/TestSuite/historic_data.json.zip --file-out "C:/o3de/" --file-type="json"
```

#### Update

This will replace the file at the desired location with the file at `--file-in`. If no file is in bucket, do nothing.

```
tiaf_tools.py --s3-bucket "tiaf" --action "update" --full-address "RootDir/Branch/Build/TestSuite/historic_data.json.zip --file-in "C:/o3de/test.txt" --file-type="json" 
```

#### Delete

This will delete the file at the specified location if it exists.

```
tiaf_tools.py --s3-bucket "tiaf" --action "delete" --full-address "RootDir/Branch/Build/TestSuite/historic_data.json.zip" --file-type="json" 
```