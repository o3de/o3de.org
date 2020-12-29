# Using Windows Registered I/O with GridMate<a name="network-carrier-rio"></a>

Starting in Lumberyard version 1\.16, GridMate carrier supports Microsoft’s [registered I/O \(RIO\) socket interface](https://docs.microsoft.com/en-us/windows/desktop/WinSock/winsock-functions)\. RIO is a network traffic processing interface that provides lower latency and higher throughput to the Windows operating system kernel\. Lumberyard implements RIO support in the `GridMate::RIOPlatformSocketDriver` class, which is fully contained in the carrier `SocketDriver` class\.

For the Lumberyard source code, see the `SocketDriver.*` and `SecureSocketDriver.*` files in the `lumberyard_version\dev\Code\Framework\GridMate\GridMate\Carrier\` directory\.

## Prerequisites<a name="network-carrier-rio-prerequisites"></a>

The `SocketDriver` class uses the `RIOPlatformSocketDriver` class seamlessly if the following three requirements are met:

1. RIO is supported on the build computer\.

1. RIO is supported at runtime on the computer that runs it\.

1. RIO has been enabled by passing `true` to the `isHighPerformance` parameter in the `SocketDriver` class or `SecureSocketDriver` class\.

## Using the RIO Platform Socket Driver<a name="network-carrier-rio-using-the-rio-platform-socket-driver"></a>

To use the `RIOPlatformSocketDriver` class, initialize a custom `SocketDriver` or `SecureSocketDriver` class and assign it to the `CarrierDesc::m_driver` field, as shown in the following example\.

**Example**  

```
class MyClass : public GridMate::SessionEventBus::Handler
{  
public:
  void OnSessionDelete(GridMate::GridSession* session) override;
 
private:
  GridMate::SocketDriver* m_driver;
};
 
void MyClass::JoinSession() {
  // ...

  // Create an instance of SocketDriver that disables "full" (oversized) packets, enables cross-platform support, and 
  // enables high performance socket interfaces.
  m_driver = new GridMate::SocketDriver(false, true, true);

  // Before hosting or joining a GridMate session, set the CarrierDesc::m_driver 
  // property to the instance of SocketDriver.
  GridMate::SocketDesc carrierDesc
  carrierDesc.m_driver = m_driver;
 
  // ...
}

  // At the end of the GridMate session, delete the SocketDriver instance.
void MyClass::OnSessionDelete(GridMate::GridSession* session) {
  // ...
 
  delete m_driver;
  m_driver = nullptr;
 
  // ...
}
```

### Caveats<a name="network-carrier-rio-caveats"></a>

When using the RIO platform socket driver, note the following:
+ **RIO bypasses conventional socket buffers** – Because programs cannot depend on operating system buffering, your game should enable `m_threadInstantResponse` when it uses RIO\.
+ **RIO buffer sizes must be large enough to handle all buffering** – RIO requires code to preallocate fixed size buffers\. This preallocation is handled in the `RIOPlatformSocketDriver`\. The `RIOPlatformSocketDriver` converts the [carrier descriptor](network-carrier.md#network-carrier-carrierdesc) send and receive buffer sizes into a full packet buffer count\.
+ **The RIO platform driver is not compatible with the GridMate `m_driverIsFullPackets` setting** – GridMate "full" packets are oversized packets that are usable only for certain LAN networking applications\. Such packets are not routable or compatible with the RIO platform driver\. For this reason, set `m_driverIsFullPackets` to `false` when you use the RIO platform driver\.