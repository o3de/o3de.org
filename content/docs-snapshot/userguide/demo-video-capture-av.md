# Capturing Video and Audio<a name="demo-video-capture-av"></a>

This tutorial explains how to set up Lumberyard editor \(or game\) to capture video\. Lumberyard outputs video as single frames\. If required, it can also output stereo or 5\.1 surround sound audio in `.wav` file format\. You can edit the output with commonly available video editing software\.

## Preparation<a name="demo-video-capture-av-preparation"></a>

Before you can start video and audio streams in preparation for capture, you must configure some settings that determine how the video will be captured\. You configure these settings by using console commands\. To save time, you can create configuration files that execute the necessary commands for you instead of entering the commands directly into the console\. Example configuration files are presented later in this topic\. 

The next sections describe the settings and the console commands that configure them\.

## Video Settings<a name="demo-video-capture-av-video-settings"></a>

### Frame Size and Resolution<a name="demo-video-capture-av-video-settings-framesize"></a>

The height and width of the captured frames in the editor is normally set to the exact view size of your rendered perspective window\. To resize the view size, re\-scale the perspective window, or right click in the top right of the perspective viewport where the frame size is displayed\.

You can also capture higher than rendered images from Lumberyard Editor and Launcher\.

The console variables that are now used in conjunction with Capture Frames are:
+ `r_CustomResHeight=N` \- Specifies the desired frame height in *N* pixels\.
+ `r_CustomResWidth=M` \- Specifies the desired frame width in *M* pixels\.
+ `r_CustomResMaxSize=P` \- Specifies the maximum resolution at which the engine will render the frames in *P* pixels\.
+ `r_CustomResPreview=R` \- Specifies whether or how the preview is displayed in the viewport\. Possible values for *R* are:  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/demo-video-capture-av.html)

### Frames Per Second<a name="demo-video-capture-av-video-settings-fps"></a>

When deciding the number of frames per second to specify, keep in mind the following:
+ NTSC standard video is approximately 30 frames per second, which is a good compromise between quality and file size\.
+ High quality video can have up to 60 frames per second, but the difference in quality of the increased number of frames is barely noticeable and can take up a lot of file space\. 
+ Video at less than 24 FPS \(a cinema standard\) will not look smooth\.

To specify a fixed frame rate, use the command: 

```
t_fixedstep N
```

*N* specifies the time step\. Time step is calculated by using the formula 

```
step = 1 second/<number of frames>
```

A table of common time step values follows\.


****  

| FPS | Time Step | 
| --- | --- | 
| 25 \(PAL\)  | 0\.04 | 
| 30 | 0\.033333333 | 
| 60 | 0\.0166666667 | 

### Video Capture File Format<a name="demo-video-capture-av-file-format-capture"></a>

You can capture pictures in several different file formats\. A good choice for average quality is the `.jpeg` file format\. The [https://en.wikipedia.org/wiki/Truevision_TGA](https://en.wikipedia.org/wiki/Truevision_TGA) or `.bmp` file formats are better for higher quality, and `.hdr` for pictures that use [high\-dynamic\-range imaging](https://en.wikipedia.org/wiki/High-dynamic-range_imaging)\.

To specify the capture file format, use the console command

```
capture_file_format N
```

*N* is `jpg`, `bmp`, `tga` or `hdr`\.

### Video Capture File Location<a name="demo-video-capture-av-file-format-location"></a>

By default, recorded frames are stored in the directory `<root>\CaptureOutput`\. To specify a custom directory, use the command: 

```
capture_folder N
```

*N* is the name of the custom directory\.

**Warning**  
When you start a recording, the captured frames are placed in the currently specified directory and will overwrite existing files with the same name\. To avoid losing work, create a directory for each recording, or move the existing files to another directory before you start\. 

## Starting and Ending the Video Recording<a name="demo-video-capture-av-file-format-start-end-rec"></a>

After you have specified the values mentioned in the previous sections, you can start the recording by using the command: 

```
capture_frames N
```

Setting *N* to **1** starts the recording, and setting *N* to **0** stops it\.

## Audio Settings<a name="demo-video-capture-av-audio"></a>

Before you begin, decide if you require audio in stereo or in 5\.1 surround format, and then change your audio settings accordingly in the Windows control panel\.

### Deactivating the Sound System<a name="demo-video-capture-av-audio-deactivating"></a>

After loading the level of your game that you want to capture, you must deactivate the sound system so that you can redirect the sound output to a file\. To deactivate the sound system, use the command: 

```
#Sound.DeactivateAudioDevice()
```

This redirects the sound output to a `.wav` file in the root directory of the game\. The sound will not run in realtime, but be linked precisely to the time step that you set previously\.

To write the sound capture, use the command: 

```
s_OutputConfig N
```

Setting *N* to `3` activates the non\-realtime writing of sound to the `.wav` file\. Setting *N* to `0` specifies auto\-detection \(the default\)\.

### Reactivating the Sound System<a name="demo-video-capture-av-audio-reactivating"></a>

To reset the sound system use the command: 

```
#Sound.ActivateAudioDevice()
```

This creates a `.wav` file in the root directory of the game\. The file will continue to be written to until you run the following combination of commands to deactivate the audio device:

```
#Sound.DeactivateAudioDevice()
```

```
s_OutputConfig 0
```

```
#Sound.ActivateAudioDevice()
```

**Tip**  
Although these commands reset the sound system, some sounds won't start until they are correctly triggered again\. This applies particularly to looped sounds\. To get looped sounds to play, start the recording of video and sound first, and then enter any area that triggers the looped sounds that you want to record\.

## Configuration Files<a name="demo-video-capture-av-cfg-files"></a>

### Creating Configuration Files<a name="demo-video-capture-av-cfg-files-create"></a>
+ To ensure that multiple recordings use exactly the same settings, create a configuration file that you can use for each of them\. This will ensure that all of your captured files have the same format\.

  An example configuration file:

  ```
  sys_spec = 4
  Fixed_time_step 0.0333333333
  Capture_file_format jpg
  Capture_folder myrecording
  r_width 1280
  r_height 800
  ```

  The command `sys_spec = 4` sets the game graphic settings to "very high" to generate the best appearance\.
+ To speed up the process of starting and stopping the recording, you can create two configuration files: one to start the video, and one to stop it\.
  + To start recording, use a config file like the following:

    ```
    #Sound.DeactivateAudioDevice()
    s_OutputConfig 3
    #Sound.ActivateAudioDevice()
    Capture_frames 1
    ```
  + To stop recording, use a config file like the following:

    ```
    Capture_frames 0
    #Sound.DeactivateAudioDevice()
    s_OutputConfig 0
    #Sound.ActivateAudioDevice()
    ```

#### Executing the Config Files<a name="demo-video-capture-av-cfg-files-execute"></a>

To run the config file, open the console and enter the following command:

```
Exec N
```

*N* is the name of the config file\.