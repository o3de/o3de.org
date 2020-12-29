# Metastream Gem<a name="gems-system-gem-metastream"></a>

Twitch Metastream is a feature that allows broadcasters to customize their streams with overlays of statistics and events from their game session\. Using any web authoring tool, such as Dreamweaver or CoffeeCup, broadcasters can create custom HTML5 pages to control the information, graphics, layout, and behavior of each unique overlay\. With Metastream, broadcasters can create more polished, interactive viewing experiences on any of their favorite streaming services, similar to what you see in professional Esports and TV broadcasts\.

Examples of information displayed in an overlay include:
+ Character art
+ Character strengths and weaknesses
+ Player standings
+ Stats for two leaders in a match
+ Gold collected
+ Kills, deaths, and assists
+ Damage dealt

Broadcasters can switch between different graphic overlays that are timed to game events\. They can also use a picture\-in\-picture style to display complementary information such as a minimap and live team stats\.

To enable broadcasters to use Twitch Metastream, you must do the following:

1. Enable the Metastream gem in your project\.

1. Add a single line of code for each event you want broadcasters to access\.

**Note**  
Twitch Metastream is supported on Windows only\.

## Adding the Metastream Gem<a name="gems-system-add-metastream-gem"></a>

Enable the Metastream gem in your project to turn on the local HTTP Metastream server that is included with Lumberyard\.

To enable the Metastream gem, see [Enabling Gems](gems-system-using-project-configurator.md)\.

## Setting Options for the HTTP Server<a name="gems-system-metastream-http-server-options"></a>

After you enable Metastream, an HTTP server is embedded into the game client and serves as the access point for exposed data\. You can set the following options for the HTTP server\. 

**`metastream_enabled`**  
Read\-only console variable \(CVAR\) that describes the current state of the embedded HTTP server\. `0` = disabled\. `1` = enabled\.

**`metastream_serverOptions`**  
Sets the options for the embedded HTTP server\. Options are a set of semicolon separated `key=value` pairs\.   
If a key value requires a semi\-colon character ';' or the equal character '=' you may use the `$semi` macro or `$equ`\.  
The embedded HTTP server is based on CivetWeb\. You can find the full list of options that can be set at:  
[https://github\.com/civetweb/civetweb/blob/master/docs/UserManual\.md](https://github.com/civetweb/civetweb/blob/master/docs/UserManual.md)  
For security reasons, the following CivetWeb options are ignored:  
+ `enable_directory_listing`
+ `cgi_interpreter`
+ `run_as_user`
+ `put_delete_auth_file`

Files that you place inside the document root will be served by the HTTP server\. See [Accessing Data through the HTTP API](#gems-system-metastream-data-http-api)\.

You can also use the following console commands:

`metastream_start`  
Starts the embedded HTTP server

`metastream_stop`  
Stops the embedded HTTP server

## Exposing Data through Metastream<a name="gems-system-metastream-expose-data"></a>

Metastream exposes data through the C\+\+ API\.

### C\+\+ API<a name="gems-system-metastream-expose-data-cplusplus-api"></a>

#### Controlling the HTTP Server<a name="gems-system-metastream-controlling-server"></a>

The Metastream Gem uses the following API to start the HTTP server:

```
bool result; // True when the server is successfully started, false when an error occurs.
Metastream::MetastreamRequestBus::BroadcastResult(result,&Metastream::MetastreamRequests::StartHTTPServer);
```

Attempting to start the HTTP server when it is already running has no effect, and the call returns true\.

The Metastream Gem uses the following API to stop the HTTP server:

```
Metastream::MetastreamRequestBus::Broadcast(&Metastream::MetastreamRequests::StopHTTPServer);
```

If the server is not running, attempting to stop the server has no effect\. 

#### Exposing Data<a name="gems-system-metastream-exposing-data"></a>

The Metastream Gem uses a simple API to expose in\-game data using the EBus system\. See [Accessing Data through the HTTP API](#gems-system-metastream-data-http-api) for these values\. Currently, the Metastream API supports UTF8 strings, bools, Vec3, doubles, signed and unsigned 64\-bit values\. The EBus system requires these calls to be discrete\. This API allows you to add values to objects and/or arrays and the cache\. This allows for a fully flexible system in exposing data to a Web client\.

#### Add to Cache<a name="metastream-add-to-cache"></a>

To add an object to the root cache, use the following syntax:

```
void MetastreamRequests::AddStringToCache(const char* table, const char* key, const char* value)
void MetastreamRequests::AddBoolToCache(const char* table, const char* key, bool value)
void MetastreamRequests::AddVec3ToCache(const char* table, const char* key, const Vec3 & value)
void MetastreamRequests::AddDoubleToCache(const char* table, const char* key, double value)
void MetastreamRequests::AddUnsigned64ToCache(const char* table, const char* key, AZ::u64 value)
void MetastreamRequests::AddSigned64ToCache(const char* table, const char* key, AZ::s64 value)
void MetastreamRequests::AddArrayToCache(const char* table, const char* key, const char* arrayName)
void MetastreamRequests::AddObjectToCache(const char* table, const char* key, const char* objectName)
```

Definitions for the parameters listed:

`table`  
Name of the table\.

`key`  
Name of the key\.

`value`  
The value to add\. If the value exists, it is updated\. If the value type is bool, it is represented in the `JSON` doc as `true` or `false`\. Signed, unsigned, and double types are represented as JSON numbers; strings are UTF8 and will be escaped, if necessary\.

`arrayName`  
The name of the array to add\. If no array exists, then empty array is added\. The array is deleted after it is added to the cache\.

`objectName`  
The name of the object to add\. If no object exists, then a NULL object is added\. The object is deleted after it is added to the cache\.

None of the above returns any values\.

#### Add to Array<a name="metastream-add-to-array"></a>

To add an object to an array, use the following syntax:

```
void MetastreamRequests::AddStringToArray(const char* table, const char* arrayName, const char* value)
void MetastreamRequests::AddBoolToArray(const char* table, const char* arrayName, bool value)
void MetastreamRequests::AddVec3ToArray(const char* table, const char* arrayName, const Vec3 & value)
void MetastreamRequests::AddDoubleToArray(const char* table, const char* arrayName, double value)
void MetastreamRequests::AddUnsigned64ToArray(const char* table, const char* arrayName, AZ::u64 value)
void MetastreamRequests::AddSigned64ToArray(const char* table, const char* arrayName, AZ::s64 value)
void MetastreamRequests::AddObjectToArray(const char* table, const char* destArrayName, const char* sourceObjectName)
```

Definitions for the parameters listed:

`table`  
Name of the table\.

`arrayName`  
The name of the array to add\. If no array exists, then an empty array is added\. The array is deleted after it is added to the cache\.

`value`  
The value to add to the array\. If value type is bool, it is represented in the JSON doc as `true` or `false`\. Signed, unsigned, and double types are represented as JSON numbers; strings are UTF8 and will be escaped, if necessary\.

`arrayName`  
The name of the array to add to\. If no array exists, one is created\.

`destArrayName`  
The name of destination array to add to\. If no array exists, one is created\.

`sourceObjectName`  
The name of the object to add to the array\. If no object exists, then a NULL object is added\. The object is deleted after it is added to the cache\.

None of the above returns any values\.

#### Add to Object<a name="metastream-add-to-object"></a>

To add an object to an object, use the following syntax:

```
void MetastreamRequests::AddArrayToObject(const char* table, const char* destObjectName, const char* key, const char* srcArrayName)
void MetastreamRequests::AddObjectToObject(const char* table, const char* destObjectName, const char* key, const char* sourceObjectName)
void MetastreamRequests::AddStringToObject(const char* table, const char* objectName, const char* key, const char* value)
void MetastreamRequests::AddBoolToObject(const char* table, const char* objectName, const char* key, bool value)
void MetastreamRequests::AddVec3ToObject(const char* table, const char* objectName, const char* key, const Vec3 & value)
void MetastreamRequests::AddDoubleToObject(const char* table, const char* objectName, const char* key, double value)
void MetastreamRequests::AddUnsigned64ToObject(const char* table, const char* objectName, const char* key, AZ::u64 value)
void MetastreamRequests::AddSigned64ToObject(const char* table, const char* objectName, const char* key, AZ::s64 value)
```

Definitions for the parameters listed:

`table`  
Name of the table\.

`key`  
Name of the key\.

`objectName`  
The name of the object to add\. If no object exists, then one is created\.

`value`  
The value to add\. If the value exists, it is updated\. If value type is bool, it is represented in the JSON doc as `true` or `false`\. Signed, unsigned, and double types are represented as JSON numbers; strings are UTF8 and will be escaped, if necessary\.

`srcArrayName`  
The name of the array to add to\. If no array exists, one is created\. The array is deleted after it is added to the object\.

`sourceObjectName`  
The name of the object to add\. If no object exists, then a NULL object is added\. The object is deleted after it is added to the cache\.

None of the above returns any values\.

#### Examples<a name="metastream-cplusplus-examples"></a>

The following example shows how to use the Metastream C\+\+ API in a project: 

```
Metastream::MetastreamRequestBus::Broadcast(&Metastream::MetastreamRequestBus::Events::AddToCache, table, key, value);
```

**Note**  
Any value that is added to the cache should be JSON compliant\. For information, see the [JSON RFC](https://tools.ietf.org/html/rfc7159)\.

The following example shows how to reflect the system information\. Basically all of the info is added to a object name, `sysInfo`, and this object is then added to the cache as `systeminfo`\.

Compound object:

```
Metastream::MetastreamRequestBus::Broadcast(
    &Metastream::MetastreamRequestBus::Events::AddUnsigned64ToObject,
    kDataBaseName.c_str(), "sysInfo",  "drivespace", GetFreeDriveSpace());
    
Metastream::MetastreamRequestBus::Broadcast(
    &Metastream::MetastreamRequestBus::Events::AddUnsigned64ToObject,
    kDataBaseName.c_str(),  "sysInfo",  "memoryload", GetMemoryLoad());
    
Metastream::MetastreamRequestBus::Broadcast(
    &Metastream::MetastreamRequestBus::Events::AddDoubleToObject,
    kDataBaseName.c_str(),  "sysInfo",  "cpuloadsystem", GetCPULoadSystem());
    
Metastream::MetastreamRequestBus::Broadcast(
    &Metastream::MetastreamRequestBus::Events::AddDoubleToObject,
    kDataBaseName.c_str(),  "sysInfo",  "cpuloadprocess", GetCPULoadProcess());
    
Metastream::MetastreamRequestBus::Broadcast(
    &Metastream::MetastreamRequestBus::Events::AddUnsigned64ToObject,
    kDataBaseName.c_str(),  "sysInfo",  "tickcount", GetTickCount64());
    
Metastream::MetastreamRequestBus::Broadcast(
    &Metastream::MetastreamRequestBus::Events::AddObjectToCache,
    kDataBaseName.c_str(),  "systeminfo",  "sysInfo");
```

#### Metastream Lua Bindings<a name="metastream-lua-bindings"></a>

As of Lumberyard 1\.10, Twitch Metastream reflects using the behavior context, which enables you to use Metastream through Script Canvas and Lua\.

The following methods can be invoked from Lua:

```
-- Controlling the HTTP server:
MetastreamRequestBus.Broadcast.StartHTTPServer();
MetastreamRequestBus.Broadcast.StopHTTPServer();

-- Adding to the root cache directly:
MetastreamRequestBus.Broadcast.AddStringToCache(table, key, value);      -- where value is a string
MetastreamRequestBus.Broadcast.AddBoolToCache(table, key, value);        -- where value is a bool
MetastreamRequestBus.Broadcast.AddDoubleToCache(table, key, value);      -- where value is a double
MetastreamRequestBus.Broadcast.AddUnsigned64ToCache(table, key, value);  -- where value is an unsigned 64-bit number
MetastreamRequestBus.Broadcast.AddSigned64ToCache(table, key, value);    -- where value is a signed 64-bit number
  
MetastreamRequestBus.Broadcast.AddArrayToCache(table, key, arrayName);   -- where arrayName is the name of a temporary array (see below)
MetastreamRequestBus.Broadcast.AddObjectToCache(table, key, objectName); -- where objectName is the name of a temporary object (see below)
  
-- Adding to a temporary Array:
MetastreamRequestBus.Broadcast.AddStringToArray(table, arrayName, value);
MetastreamRequestBus.Broadcast.AddBoolToArray(table, arrayName, value);
MetastreamRequestBus.Broadcast.AddDoubleToArray(table, arrayName, value);
MetastreamRequestBus.Broadcast.AddUnsigned64ToArray(table, arrayName, value);
MetastreamRequestBus.Broadcast.AddSigned64ToArray(table, arrayName, value);
MetastreamRequestBus.Broadcast.AddObjectToArray(table, arrayName, objectName);
  
-- Adding to a temporary Object:
MetastreamRequestBus.Broadcast.AddStringToObject(table, objectName, key, value);
MetastreamRequestBus.Broadcast.AddBoolToObject(table, objectName, key, value);
MetastreamRequestBus.Broadcast.AddDoubleToObject(table, objectName, key, value);
MetastreamRequestBus.Broadcast.AddUnsigned64ToObject(table, objectName, key, value);
MetastreamRequestBus.Broadcast.AddSigned64ToObject(table, objectName, key, value);
MetastreamRequestBus.Broadcast.AddArrayToObject(table, objectName, key, arrayName);
MetastreamRequestBus.Broadcast.AddObjectToObject(table, objectName, key, objectName);
```

## Accessing Data through the HTTP API<a name="gems-system-metastream-data-http-api"></a>

You can access game data that has been exposed through Metastream by using the HTTP API Get requests\. You can then use JavaScript to work with the data\.

**`http://localhost:port/pathToFile`**  
Serves a file from the document root\. File types include HTML, JS, CSS, images, sounds, resources, or assets\.  
The data path is reserved for Metastream data\. Files that are saved to the `document_root/data/` directory will not be accessible\.

**`http://localhost:port/data`**  
Returns a list of available Metastream tables that contain `key=value` pairs\.

**`http://localhost:port/data?table=table_name`**  
Returns a list of all Metastream keys in the specified table\.  
You can retrieve multiple key\-value pairs in a single request by listing the keys in a comma\-separated list\. For example, `http://localhost:8082/data?table=sample&key=key1,key2,key3`

**`http://localhost:port/data?table=table_name&key=key_name`**  
Returns the value for the specified key in the specified table\.  
Multiple `key=value` pairs can be retrieved in a single request by listing the desired keys separated by commas\. For example, http://localhost:*8082*/data?table=*sample*&key=*key1,key2,key3*\.  
To list all keys and their values for a table: http://localhost:*8082*/data?table=*sample*&key=\*

Data requests are returned in the following format:


****  

| Request | Return | 
| --- | --- | 
| /data | \{ "tables": \[ "table1", "table2", \.\.\. \] \} | 
| /data?table=table\_name | \{ "keys": \[ "key1", "key2", \.\.\. \] \} | 
| /data?table=table\_name&key=key\_name | \{ "key\_name": value \} | 
| /data?table=table\_name&key=keys\_list | <pre>{<br />  "key1": value1,<br />  "key2": value2,<br />  ...<br />}</pre> | 