# Using the File Tagging System to Include or Exclude Assets<a name="asset-bundler-file-tagging"></a>

Lumberyard v1\.22 and later use a file tagging system to include or exclude files at various stages of processing\. This system employs file tag rules to select files that match specified patterns\. File tags are associated with each rule to use as keys in file tag queries\. This is done by using the Lumberyard FileTag API\. You can create your own custom file tag rules using the Lumberyard Asset Editor\. This is useful whenever you need additional control over which files should be included or excluded during a processing step\. For example, as part of asset bundling, it is useful to eliminate "false positives" found after using the **Missing Dependency Scanner**\.

**Topics**
+ [Creating File Tag Rules](#creating-file-tag-rules)
+ [Using the FileTag API](#using-the-filetag-api)

## Creating File Tag Rules<a name="creating-file-tag-rules"></a>

Use the Lumberyard Asset Editor to add custom file tag rules to either `exclude.filetag` or `include.filetag`, depending on whether you are excluding or including asset files\. Both of these `.filetag` files are located in the `dev\Engine` directory\. File tag rules consist of two required parts:
+ A **File Pattern** that defines the files to match this rule\. Supported patterns include:
  + **Exact** \(for example, `readme.txt`\)
  + **Wildcard** \(for example, `*.cfxb`\)
  + **Regex** \(for example, `.*/gems?/?.*/gem.json`\)
+ One or more **File Tags** that are used by either Lumberyard or your own code as keys to refer to the file pattern matching defined by this rule\.

You can use the **Comment** field to add more information about a file tag rule, for example to document its usage\.

**Note**  
Some file tags have designated uses within Lumberyard\. Various tools may require that you use specific tags, such as `editoronly` and `shader`\. You can find the full list of commonly used tags in the `FileTagsIndex` enum in `dev\Code\Framework\AzFramework\AzFramework\FileTag\FileTag.h`\.

**How to Create a File Tag Rule**

1. In Lumberyard Editor, choose **Tools**, **Asset Editor**\.

1. Choose **File**, **Open**, and select either `exclude.filetag` or `include.filetag` from the `Engine` directory\.

1. Open **Definition**, find the line labeled **File Tag Map**, and click on the '**\+**' button to add a new child element\.  
![\[Start a new file tag rule by adding a new element to the File Tag Map.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assetbundler/asset-bundler-filetag-new-element.png)

1. Enter the desired file matching pattern in the **New Key** field\.  
![\[Specify the desired file matching pattern.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assetbundler/asset-bundler-filetag-new-key.png)

1. Open your new file pattern key from the list and select the appropriate **File Pattern** type\.

1. Add one or more **File Tags** to associate with your new file pattern\.  
![\[Complete the new file tag rule by selecting a File Pattern type and entering one or more File Tags.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assetbundler/asset-bundler-filetag-example.png)

1. Select **File**, **Save** to save your new file tag rule\.

## Using the FileTag API<a name="using-the-filetag-api"></a>

You can use the C\+\+ FileTag API to write your own logic for determining whether to include or exclude files\. The following example uses the file tagging system to ignore files that match patterns associated with the `ignore` and `shader` tags\.

```
   bool IsIgnored(const char* szPath)
   {
       using namespace AzFramework::FileTag;
       AZStd::vector<AZStd::string> tags{ "ignore", "shader" };
       
       bool shouldIgnore = false;
       QueryFileTagsEventBus::EventResult(shouldIgnore, FileTagType::exclude, &QueryFileTagsEventBus::Events::Match, szPath, tags);
       
       return shouldIgnore;
   }
```

**Note**  
In the previous example, it shows querying the `QueryFileTagsEventBus` on the ID `FileTagType::exclude`\. This implies that this query is using the file tagging rules specified in the `exclude.filetag` file\.

You can find the FileTag API in the `dev\Code\Framework\AzFramework\AzFramework\FileTag` directory\. In that directory, `FileTag.h` declares the `Match` method that was used in the previous example\. There are other methods there, such as `GetTags`, which you can use to write more complex logic\. You may find it useful to work with the `excludeFileComponent` helper class, found in `FileTagComponent.h`\. This component class automatically loads the default exclusion file for you, sets the file tag type to `FileTagType::exclude`, and connects to the `QueryFileTagsEventBus` upon activation\.