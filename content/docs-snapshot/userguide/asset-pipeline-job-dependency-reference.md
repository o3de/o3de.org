# Job Dependency for Asset Pipeline<a name="asset-pipeline-job-dependency-reference"></a>

Manage dependencies for assets so that Asset Pipeline processes them in the correct order\.

In Asset Pipeline, you create asset builders using the Asset Builder SDK\. The Asset Builder SDK processes your custom asset\-type source files into game\-ready files\. The Asset Builder SDK is a separate executable from Asset Processor\. For more information about the Asset Builder SDK, see [Creating a Custom Asset Builder](asset-builder-custom.md)\.

For each asset builder that registered a particular source asset type:

1. The `CreateJobs` operation is invoked, which is where you can declare job dependencies\.

1. The `ProcessJob` operation is invoked, which is where your source files are processed into game\-ready assets\. 

A job is uniquely identified by a tuple that contains the following:
+ **Job key** – The key that the builder emits for that kind of job in its own `CreateJobs` function\.
+ **Platform** – The platform identifier of the job\. This is generally set to the same platform as the job that runs\.
+ **Source file** – The source file that the job operates on\.

Use the job dependency feature to specify dependencies on jobs, and tell Asset Processor to process jobs for the following conditions:

1. When the fingerprint of another job changes\. This is called a *fingerprint job dependency*\.

1. When another job completes the processing\. This is called *order job dependency*\.

**Example 1: Fingerprint Job Dependency**  
A fingerprint job dependency means that Asset Processor must process the job if the fingerprint of another job changes\. You can specify any number of fingerprint job dependencies\.  
For **Job A**, specify a fingerprint on **Job B**\. So if the fingerprint of **Job B** changes, Asset Processor must reprocess **Job A**\.

**Example 2: Order Job Dependency**  
An order job dependency means that Asset Processor must process the job only when all other order dependency jobs specified by this job are processed\. You can specify any number of order job dependencies\.   
**Job A** has a specified order job dependency on **Job B**\. This means that Asset Processor must process **Job B** first and then **Job A**\.

**Example**  
You might want a builder that operates on the output of the image compilation set of `example.tif` on the platform `pc`\. If so, find the job key of that job \(for example, "RC Image"\) and declare a dependency, like the following: `("RC Image," "pc", "example.tif")`  

```
enum class JobDependencyType : AZ::u32
    {
        //!  Asset Processor should process the dependent job, if there is a change to the fingerprint of the job that it depends on.
        Fingerprint,
 
        //! The dependent job should only run after Asset Processor processes the job it depends on.
        Order,
    };
 
//! Job dependency information that the builder will send to Asset Processor.
    struct JobDependency
    {
        AZ_CLASS_ALLOCATOR(JobDependency, AZ::SystemAllocator, 0);
        AZ_TYPE_INFO(JobDependency, "{93A9D915-8C9E-4588-8D86-578C01EEA388}");
 
        SourceFileDependency m_sourceFile;
        AZStd::string m_jobKey;
        AZStd::string m_platformIdentifier;
        JobDependencyType m_type;
 
        JobDependency() = default;
 
        JobDependency(const AZStd::string& jobKey, const AZStd::string& platformIdentifier, const JobDependencyType& type, const SourceFileDependency& sourceFile);
 
        static void Reflect(AZ::ReflectContext* context);
    };
```

For example code, see the CustomAssetExample gem\. For source files related to builders, see the `lumberyard_version\dev\Gems\CustomAssetExample\Code\Source\CustomAssetExample\Builder\CustomAssetExampleBuilderWorker.cpp` file\.

**Example**  
To declare a job dependency inside a builder, see the following code example\.  

```
for (const AssetBuilderSDK::PlatformInfo& platformInfo : request.m_enabledPlatforms)
 {
 AssetBuilderSDK::JobDescriptor descriptor;
 descriptor.m_jobKey = "Compile Example";
 descriptor.SetPlatformIdentifier(platformInfo.m_identifier.c_str());
 AssetBuilderSDK::SourceFileDependency sourceFile;
 sourceFile.m_sourceFileDependencyPath = "test.examplesource";
 // We are declaring a fingerprint job dependency for this job on any job of "test.examplesource" which has job key "Compile Example " for every enabled platforms
 AssetBuilderSDK::JobDependency jobDependency("Compile Example", platformInfo.m_identifier.c_str(), AssetBuilderSDK::JobDependencyType::Fingerprint, sourceFile);
 descriptor.m_jobDependencyList.push_back(jobDependency);
 response.m_createJobOutputs.push_back(descriptor);
 }
```

**Note**  
If Asset Processor detects a cyclic job dependency, it displays a warning message and then processes the first job to unblock the remaining jobs\.