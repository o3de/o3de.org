# GPU cloth simulation with NVIDIA CUDA<a name="nv-physx-cloth-gpu"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

NVIDIA Cloth Gem has support for **NVIDIA CUDA** on PC\. With CUDA enabled for cloth, the simulation is computed on the GPU instead of the CPU\. This allows you to use all the computational power of the GPU to run more complex cloth instances, inlarger numbers\. This also leaves the CPU free to do other tasks\. 

For more information about NVIDIA CUDA, visit the [ NVIDIA CUDA](https://developer.nvidia.com/cuda-zone) portal\.

## Requirements for GPU cloth simulation in Lumberyard<a name="lumberyard-cuda-requirements"></a>
+ Microsoft Windows 10 
+ NVIDIA CUDA Toolkit 10\.1\.168 or newer 
+ NVIDIA graphics card with CUDA support\. Visit the [ NVIDIA CUDA GPU](https://developer.nvidia.com/cuda-gpus) support portal for information\. 
+ NVIDIA driver version 418\.96 or newer\. The latest driver version is recommended\. 

## Installing NVIDIA CUDA with Setup Assistant<a name="lumberyard-cuda-setup"></a>

NVIDIA CUDA Toolkit can be installed through Setup Assistant\. The install link is located on the **Install Software** page, in the **Optional software** group\. 

**To install NVIDIA CUDA**

1. Run Setup Assistant\.

1. Choose **Install Software** and scroll down to the **Optional software** group\.

1. Choose **Get it** to the right of **NVIDIA CUDA Toolkit**\.  
![\[NVIDIA Cloth Gem in Amazon Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/ui-cloth-cuda-toolkit-1.25.png)

1. A browser opens on the NVIDIA CUDA Toolkit Download page\. Use the prompts on the page to download the correct version of the toolkit for your system\. 

1. Run the NVIDIA CUDA Toolkit installer and follow its prompts for Express installation\. 
**Note**  
If NVIDIA CUDA Express installation fails, try these remedies:   
Run the installation again and choose a Custom Installation this time, only selecting the following elements: **CUDA Development Compiler** and **CUDA Runtime Libraries**\. 
Update the graphics card driver to the latest version and retry installation\. 
If you are using a laptop, the manufacturer's drivers for the graphics card might not be compatible with CUDA\. Check the manufacturer's website for the latest drivers\. 

1. Click the **refresh** button at the top\-right corner of **Lumberyard Setup Assistant**\. If the NVIDIA CUDA Toolkit is detected, it appears as **Installed**\. 

## Enable NVIDIA CUDA for cloth simulation<a name="lumberyard-cuda-enable"></a>

To use NVIDIA CUDA for cloth simulation on the GPU, you must configure and rebuild your project, and enable CUDA in your PC configuration file\. 

**To enable CUDA**

1. Use Project Configurator to add the **NVIDIA Cloth Gem** to your project\. 

1. Configure your project\. Use the following command\.
**Note**  
Open a new command prompt and navigate to `lumberyard_version\dev\` to run the commands below\. Do not use an existing command prompt\. 

   ```
   lmbr_waf configure 
   ```

1. Check in the output that it has detected NVIDIA CUDA\.

    ` [INFO] Detected NVIDIA CUDA SDK at: C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1 ` 

1. Build your project\. Use the following command\.

   ```
   lmbr_waf build_win_x64_vs2019_profile -p all --progress 
   ```

1. Add the following line to the `system_windows_pc.cfg` file located in `lumberyard_version\dev\`\. 

    `cloth_EnableCUDA = 1` 

1. Run Lumberyard Editor\. This also runs the Asset Processor in the background\. 

1. Verify that the NVIDIA Cloth Gem is running cloth simulation on the GPU by looking for the following line in the game log or in the editor console output: 

    `NVIDIA NvCloth Gem using GPU (CUDA) for cloth simulation` 

## Releasing your project with NVIDIA CUDA<a name="lumberyard-cuda-release"></a>

End users do not require the NVIDIA CUDA Toolkit to be installed on their PC in order to run your release builds\. 

Cloth simulations automatically run on the GPU, if a GPU that is compatible with CUDA is present\. If an NVIDIA CUDA compatible GPU is not available, the simulation defaults to running on the CPU\. 

For more information about release builds, see [Building Lumberyard projects](game-build-intro.md)\. 