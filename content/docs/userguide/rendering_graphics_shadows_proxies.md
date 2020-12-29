# Shadow Proxies<a name="rendering_graphics_shadows_proxies"></a>

Shadow proxies are a method of significantly reducing shadow performance costs by creating dedicated low\-polygon count geometry to cast an object's shadow with minimal visual differences\. You can also use shadow proxies to minimize shadow artifacts by controlling which geometry can cast shadows\.

Keep in mind that if the shadow proxy mesh aligns closely with the RenderMesh, you may notice self\-shadow artifacts\.

No material setup is required in your DCC tool\. Instead you use the Material Editor to set up shadow proxies in the material using Material Editor\. Place the shadow proxy on its own submaterial, setting **Opacity** to 0 and ensuring that **No Shadow** is not selected \(the default\)\.

The shadow proxy must also be linked as a child node of the RenderMesh, and it must be on its own material ID\.

For the RenderMesh material, set as you normally would, except under the **Advanced** properties, select the **No Shadow** option\. This instructs Lumberyard to use the shadow proxy instead of the RenderMesh to render the shadows\.