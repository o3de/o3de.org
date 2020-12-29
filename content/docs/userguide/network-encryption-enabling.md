# Enabling Encryption<a name="network-encryption-enabling"></a>

To enable encryption with OpenSSL in a GridMate session, perform the following steps\.

**To enable encryption in a GridMate session**

1. To set the encryption parameters, create an instance of `SecureSocketDesc`\. The parameters are described in [SecureSocketDesc](#network-encryption-enabling-securesocketdesc)\. 

1. Create an instance of `SecureSocketDriver` that passes in the instance of `SecureSocketDesc`\. The instance of `SecureSocketDesc` must be available for the duration of the GridMate session\. 

1. Before hosting or joining a GridMate session, define `CarrierDesc` by setting the `CarrierDesc::m_driver` property to the instance of `SecureSocketDriver`\. If no instance of `SecureSocketDriver` is provided, an unencrypted driver is used that provides plaintext communication\. 

1. You can delete the `SecureSocketDriver` instance at the end of the GridMate session, ideally in the `OnSessionDelete` event on the `SessionEventBus`\. 

The [GridMate Session Encryption Example](#network-encryption-enabling-example) at the end of this topic has sample code for these steps\.

## SecureSocketDesc<a name="network-encryption-enabling-securesocketdesc"></a>

The constructor for `SecureSocketDriver` requires a `SecureSocketDesc` object that provides all encryption configuration required for the secure connection\. The configuration parameters are described in the following table\.


**SecureSocketDesc Configuration Parameters**  

|  **Parameter**  |  **Description**  | 
| --- | --- | 
| m\_privateKeyPEM  |  Base\-64 encoded string PEM private key\.  | 
| m\_certificatePEM  |  Base\-64 encoded string PEM public certificate\.  | 
| m\_certificateAuthorityPEM  |  Base\-64 encoded string PEM certificate authority\.  | 
| m\_authenticateClient  |  If set to 1, the client is expected to provide a signed certificate for authentication\. To implement this, m\_certificatePEM must be set on the client, and the server needs to set up m\_certificateAuthorityPEM\. The default setting is 0\.  | 

### Server Authentication Only<a name="network-encryption-enabling-server-authentication"></a>

You can use the server authentication only configuration when the client needs to verify the authenticity of the server to which it connects\. The server has a secret private key and a public certificate signed by a certificate authority\. This is the most common configuration\. 


**Server Authentication Only Configuration**  

|  Role  |  Parameters  | 
| --- | --- | 
| Client  | m\_certificateAuthorityPEM  | 
| Server  | m\_privateKeyPEM, m\_certificatePEM, m\_certificateAuthorityPEM  | 

### Client and Server Authentication<a name="network-encryption-enabling-client-and-server-authentication"></a>

Use this configuration when the client must verify authenticity of the server and the server must verify authenticity of the client\. The client has its own unique private key and corresponding signed public certificate\. The server has its own unique private key and corresponding signed public certificate\. 

 It's possible to share or use the same certificate authority for both, but keys and certificates must be unique to each peer\. 


**Client and Server Authentication Configuration**  

|  Role  |  Parameters  | 
| --- | --- | 
| Client  | m\_privateKeyPEM, m\_certificatePEM, m\_certificateAuthorityPEM  | 
| Server  | m\_privateKeyPEM, m\_certificatePEM, m\_certificateAuthorityPEM  | 

### Self\-signed Certificates<a name="network-encryption-enabling-self-signed-certificates"></a>

You can use self\-signed certificates for development purposes\.

**Warning**  
 Do not use self\-signed certificates for production environments\. 

When you use self\-signed certificates, there is no certificate authority to sign the public certificates\. To permit the absence of a certificate authority, set `m_certificateAuthorityPEM` to the same value as `m_certificatePEM`\. 

## GridMate Session Encryption Example<a name="network-encryption-enabling-example"></a>

The following code snippet enables encryption in a GridMate session\.

```
class MyClass : public GridMate::SessionEventBus::Handler
{  
public:
  void OnSessionDelete(GridMate::GridSession* session) override;
 
private:
  GridMate::SecureSocketDriver* m_secureDriver;
};
 
void MyClass::JoinSession() {
  // ...
 
  // Create an instance of SecureSocketDesc and set its encryption parameters.
  GridMate::SecureSocketDesc secureDesc;
  secureDesc.m_privateKeyPEM = "..."
  secureDesc.m_certificatePEM = "..."
  secureDesc.m_certificateAuthorityPEM = "..."

  // Create an instance of SecureSocketDriver that passes in the instance of 
  // SecureSocketDesc.
  m_secureDriver = new GridMate::SecureSocketDriver(secureDesc);

  // Before hosting or joining a GridMate session, set the CarrierDesc::m_driver 
  // property to the instance of SecureSocketDriver.
  carrierDesc.m_driver = m_secureDriver;
 
  // ...
}

  // At the end of the GridMate session, delete the SecureSocketDriver instance in
  // the OnSessionDelete event. 
void MyClass::OnSessionDelete(GridMate::GridSession* session) {
  // ...
 
  delete m_secureDriver;
  m_secureDriver = nullptr;
 
  // ...
}
```

## How To Generate a Private Key and Public Certificate<a name="network-encryption-enabling-generate-key-and-certificate"></a>

You can use the `openssl req` command to generate a self\-signed certificate from OpenSSL, as in the following example\.

```
dev/Code/SDKs/OpenSSL/bin/openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
```

The arguments are as follows\.
+ `-x509` – The certificate format\.
+ `-newkey` – The type of key\. This example generates an RSA key with 2048 bits\.
+ `-keyout` – The name of the key PEM file that will be generated
+ `-out` – The name of the cert PEM file that will be generated\.

Upon execution, the command prompts for additional user input required to generate the certificate\.