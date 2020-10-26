# Useful Console Commands<a name="network-console-commands"></a>

Use the following commands in Lumberyard when working with a network server\.

**`gm_debugdraw debug_draw_level`**  
Sets the debug draw level\. Accepts as a parameter a number whos bits represent the flags for the debug data to draw\. For example, when set to 1, displays an overlay with GridMate network statistics and information\.   
The available bit flags come from the enum `DebugDrawBits` and are as follows:  

```
enum DebugDrawBits
        {
            Basic           = BIT(0),
            Trace           = BIT(1),
            Stats           = BIT(2),
            Replicas        = BIT(3),
            Actors          = BIT(4),
            EntityDetail    = BIT(5),

            Full            = Basic | Trace | Stats | Replicas | Actors,
            All             = 0xffffffff,
        };
```

**`gm_disconnectDetection`**  
When set to 0, disables disconnect detection\. This is useful when you are debugging a server or client and don’t want to be disconnected when stepping through code\. The default value is 1\.

**`gm_dumpstats`**  
Write GridMate network profiling stats to file\.

**`gm_dumpstats_file`**  
 The file to which GridMate profiling stats are written\. The default is `net_profile.log`\.

**`gm_net_simulator`**  
Activate GridMate network simulator to simulate latency, packet loss, bandwidth restrictions, and other conditions\. For available options, enter `gm_net_simulator help` \.

**`gm_setdebugdraw`**  
Display an overlay with detailed GridMate networking statistics and information\. A user\-friendly helper command for **`gm_debugdraw debug_draw_level`**\. Possible parameters are `Basic`, `Trace`, `Stats`, `Replicas`, and `Actors`\.

**`gm_stats_interval_msec`**  
Set the interval, in milliseconds, for gathering network profiling statistics\. The default is 1000\.

**`gm_tracelevel trace_level`**  
Set the GridMate debugging trace verbosity level\. The default is 0\. The higher the value, the greater the verbosity\. Typical values range from 1 to 3\.

**`mpstart [<local_port>]`**  
Starts a LAN session by initializing the network system and optionally setting the local UDP port that initializes the socket\. The default port is 64090\. To use the ephemeral port, set the port to 0\. This is useful if you want to connect to a server on the same computer as the client\.

**`mphost`**  
Create a session as host\. The server listens for incoming connections on the port specified in `mpstart`\.

**`mpjoin [<server_addr>] [<server_port>]`**  
Connect to a server at the optionally specified `<server_addr>` and `<server_port>`\. The defaults are `localhost` and `64090`, respectively\.

**`map <map_name>`**  
Loads the level with the specified map name\. Replace `<map_name>` with the name of the map you want to use\. To view a list of available levels, enter **map**, and then press the tab key\.

**`mpdisconnect`**  
Terminate the current game instance session\.

**`sv_port` *local\_port***  
Sets the local UDP port that initializes the socket\. The default port is 30090\. To use the ephemeral port, set the port to 0\. This is useful if you want to connect to a server on the same computer as the client\.