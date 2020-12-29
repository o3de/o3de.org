# Sharing Assets Between Windows and macOS<a name="ios-sharing-assets-between-mac-pc"></a>

You can build your assets on a Windows computer and then use them in an iOS build\. To do so, you must set up sharing between your Windows and macOS computers\.

**To set up your Windows computer for sharing assets**

1. On your Windows computer, navigate to the `lumberyard_version\dev\Cache\` directory\.

1. Right\-click the `Cache` directory and choose **Properties**\.

1. In the **Properties** window, on the **Sharing** tab, click **Advanced Sharing**\.

1. In the **Advanced Sharing** window, select the **Share this folder** check box\.

1. \(Optional\) Click **Permissions** to set permissions for specific groups or users\. Add users who will modify the files on a macOS computer\.

1. Click **OK**\.

**To set up your macOS computer for sharing assets**

1. On your macOS computer, rename any `Cache` directories\. For example, rename to `Cache.old`\.

1. In the Finder, choose **Go**, **Connect to Server**\.

1. For **Server Address**, type: `smb://<IP address or DNS name of Windows computer>/Cache`

1. Click **Connect**\.

1. \(Optional\) To enable your macOS computer to connect to this shared folder on startup, do the following:

   1. Launch **System Preferences** and then choose **Users & Groups**, **Login Items**\.

   1. Click the **\+** button to add a login item\.

   1. In the Finder, under **Shared**, select your Windows computer\.

   1. Select your shared `Cache` directory and then click **Add**\.

   1. In a Terminal window, navigate to the `lumberyard_version\dev\` directory\.

   1. To create a symbolic link to the shared `Cache` directory, type: `sudo ln -s /Volumes/Cache Cache`

   1. If prompted, type your macOS password\.