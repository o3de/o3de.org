# Customizing a Lightning Arc Preset<a name="gems-system-gem-lightning-arc-presets"></a>

You can customize your lightning arc entity using the presets in the `lightningarceffects.xml` file\. You can also copy and modify existing presets to create your own customized lightning arc presets\.

**To use a lightning arc preset**

1. In Lumberyard Editor, use the **Select** tool to select the lightning arc entity you want to customize\.

1. In a text editor, open `\dev\Gems\LightningArc\Assets\libs\lightningarc\lightningarceffects.xml` in the Lumberyard root directory \(`lumberyard_version\dev`\)\.

1. Choose one of the existing presets from the `lightningarceffects.xml` file \(follows **Arc name** in the example\) and, in Lumberyard Editor, under **Entity Properties**, enter your chosen **Arc name** into the **ArcPreset** field \.

   For example, enter **ExtendedArc** or **KickSparks**, which are existing names of presets as shown in the following `lightningarceffects.xml` file\. This sample shows only the partial contents; open the file on your computer to view the full contents of the file\.

   ```
      <LightningArc>
   
   	<Arc name="Default">
   		<param name="lightningDeviation" value="0.2" />
   		<param name="lightningFuzzyness" value="0.1" />
   		<param name="branchMaxLevel" value="1" />
   		<param name="branchProbability" value="2.0" />
   		<param name="lightningVelocity" value="0.6" />
   		<param name="strikeTimeMin" value="0.35" />
   		<param name="strikeTimeMax" value="0.35" />
   		<param name="strikeFadeOut" value="0.6" />
   		<param name="strikeNumSegments" value="6" /> <!-- int max is 7 -->
   		<param name="strikeNumPoints" value="5" />
   		<param name="maxNumStrikes" value="6" />
   		<param name="beamSize" value="0.2" />
   		<param name="beamTexTiling" value="0.25" />
   		<param name="beamTexShift" value="0.05" />
   		<param name="beamTexFrames" value="4.0" />
   		<param name="beamTexFPS" value="15.0" />
   	</Arc>
   
   	<Arc name="ExtendedArc">
   		<param name="lightningDeviation" value="0.1" />
   		<param name="lightningFuzzyness" value="0.05" />
   		<param name="branchMaxLevel" value="1" />
   		<param name="branchProbability" value="10.0" />
   		<param name="lightningVelocity" value="0.25" />
   		<param name="strikeTimeMin" value="2.0" />
   		<param name="strikeTimeMax" value="2.0" />
   		<param name="strikeFadeOut" value="1.0" />
   		<param name="strikeNumSegments" value="6" /> <!-- int max is 7 -->
   		<param name="strikeNumPoints" value="6" />
   		<param name="maxNumStrikes" value="5" />
   		<param name="beamSize" value="0.18" />
   		<param name="beamTexTiling" value="0.25" />
   		<param name="beamTexShift" value="0.05" />
   		<param name="beamTexFrames" value="4.0" />
   		<param name="beamTexFPS" value="18.0" />
   	</Arc>
           
         <Arc name="KickSparks">
   		<param name="lightningDeviation" value="0.2" />
   		<param name="lightningFuzzyness" value="0.1" />
   		<param name="branchMaxLevel" value="1" />
   		<param name="branchProbability" value="3.0" />
   		<param name="lightningVelocity" value="16.0" />
   		<param name="strikeTimeMin" value="0.0" />
   		<param name="strikeTimeMax" value="0.05" />
   		<param name="strikeFadeOut" value="0.05" />
   		<param name="strikeNumSegments" value="6" /> <!-- int max is 7 -->
   		<param name="strikeNumPoints" value="5" />
   		<param name="maxNumStrikes" value="6" />
   		<param name="beamSize" value="0.1" />
   		<param name="beamTexTiling" value="0.75" />
   		<param name="beamTexShift" value="0.15" />
   		<param name="beamTexFrames" value="4.0" />
   		<param name="beamTexFPS" value="15.0" />
   	</Arc>
   ```

**To create a new lightning arc preset**

1. Open the `lightningarceffects.xml` file\.

1. Copy the text \(between and including `<Arc name="Name">` through `</Arc>`\) for an existing preset\.

1. Paste it at the end of the file before the `</LightningArc>` closing bracket\.

1. Replace the **Arc name** with your own custom preset name, then modify the following parameters to fit your needs\.

The following table lists definitions for the parameters in the `lightningarceffects.xml` file\.


**Lightning Arc Entity Properties**  

| Parameter | Description | 
| --- | --- | 
|  **lightningDeviation**  | The smoothness of the effect in meters\. | 
|  **lightningFuzzyness**  | The noisiness of the effect in meters\. | 
|  **branchMaxLevel**  | Allows child branches to strike out of the main beam and child branches to strike out from other child beams if this value is 2 or higher\. A setting of 0 or 1 is recommended\. | 
|  **branchProbability**  |  Probability that child branch will strike out from another beam segment\. Consider these examples: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-gem-lightning-arc-presets.html)  | 
|  **lightningVelocity**  | Rate at which a branch shifts upward from its original position after being triggered\. | 
|  **strikeTimeMin**  | Minimum time a branch remains visible\. | 
|  **strikeTimeMax**  | Maximum time a branch remains visible\. | 
|  **strikeFadeOut**  | Time to fade out after a branch disappears\. This setting decreases the branch beamSize to 0 instead of actually fading with transparency\. | 
|  **strikeNumSegments**  | Number of snaking segments generated\. | 
|  **strikeNumPoints**  |  Number of points per segment generated to create the noisy effect\. The number of actual segments generated is defined by `strikeNumSegments * strikeNumPoints`\. When the code generates the geometry, it creates a camera\-aligned beam with exactly two triangles\. This means the number of triangles per strike is `strikeNumSegments*strikeNumPoint*2.` Since `maxNumStrikes` is the hard limit of potential number of sparks active at any time, the potential number polygons of a given lightning effect is `strikeNumSegments*strikeNumPoint*2*maxNumStrike.` Note that with the **LightningArc** entity, each lightning strike triggers a new lightning strike\. Therefore the total poly count of a given effect can be much higher\. The game has internal limits for the total amount of lightning effects, lightning strikes, and polygons that cannot be surpassed\.  | 
|  **maxNumStrikes**  | Hard limit on the number of beam segments that can be generated\. | 
|  **beamSize**  | Width of the beam generated\. Child beams have half the width\. | 
|  beamTexTiling | Texture tiling depends on the world size\. A value of 2\.0 means the texture wraps around twice every meter\. A value of 0\.25 means the texture will wrap around every 4 meters\. | 
|  **beamTexShift**  | Rate at which the U coordinate moves in a given direction\. While beamTexTiling affects only the U coordinate, the V coordinate is automatically calculated to select one of the texture's frames\. | 
|  **beamTexFrames**  | Number of frames in the animation\. | 
|  **beamTexFPS**  | Frames per second of the multiframe animation\. | 