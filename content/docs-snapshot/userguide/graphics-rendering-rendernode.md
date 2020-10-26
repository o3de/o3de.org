# Render Nodes<a name="graphics-rendering-rendernode"></a>

To visualize objects in a world, Lumberyard defines the concepts of the render node and render element\. Render nodes represent general objects in the 3D engine\. Among other things, they are used to build a hierarchy for visibility culling, allow physics interactions \(optional\), and rendering\.

For actual rendering, render nodes add themselves to the renderer, passing an appropriate render element that implements the actual drawing of the object\. This process happens with the help of render objects, as shown in the sample code below

## Creating a New Render Node<a name="graphics-rendering-rendernode-new"></a>

The following example creates a render node called **PrismObject**\. It is derived from `IRenderNode`, defined in `Code/CryEngine/CryCommon/IEntityRenderState.h`\.

1. Add the interface for `IPrismObjectRenderNode` to `CryEngine/CryCommon/IEntityRenderState.h` to make it publicly available\. 

   ```
   struct IPrismRenderNode : public IRenderNode
   {
   	 ...
   };
   ```

1. Add a new enum to the list of already defined render nodes in `CryEngine/CryCommon/IEntityRenderState.h`\. 

   ```
   enum EERType
   {
   	 ...
   	 eERType_PrismObject,
   	 ...
   };
   ```

1. Add PrismObjectRenderNode\.h to Cry3DEngine\. 

   ```
   #ifndef _PRISM_RENDERNODE_
   #define _PRISM_RENDERNODE_
   
   #pragma once
   
   class CPrismRenderNode : public IPrismRenderNode, public Cry3DEngineBase
   {
   public:
   	 // interface IPrismRenderNode
   	 ...
   
   	 // interface IRenderNode
   	 virtual void SetMatrix(const Matrix34& mat);
   	 virtual EERType GetRenderNodeType();
   	 virtual const char* GetEntityClassName() const { return "PrismObject"; }
   	 virtual const char* GetName() const;
   	 virtual Vec3 GetPos(bool bWorldOnly = true) const;
   	 virtual bool Render(const SRendParams &rParam);
   	 virtual IPhysicalEntity* GetPhysics() const { return 0; }
   	 virtual void SetPhysics(IPhysicalEntity*) {}
   	 virtual void SetMaterial(IMaterial* pMat) { m_pMaterial = pMat; }
   	 virtual IMaterial* GetMaterial(Vec3* pHitPos = 0) { return m_pMaterial; }
   	 virtual float GetMaxViewDist();
   	 virtual void GetMemoryUsage(ICrySizer* pSizer);
   	 virtual const AABB GetBBox() const { return m_WSBBox; }
   	 virtual void SetBBox( const AABB& WSBBox ) { m_WSBBox = WSBBox; }
   
   private:
   	 CPrismRenderNode();
   
   private:
   	 ~CPrismRenderNode();
   
   	 AABB m_WSBBox;
   	 Matrix34 m_mat;
   	 _smart_ptr< IMaterial > m_pMaterial;
   	 CREPrismObject* m_pRE;
   };
   
   #endif // #ifndef _PRISM_RENDERNODE_
   ```

1.  Add PrismObjectRenderNode\.cpp to Cry3DEngine\. 

   ```
   #include "StdAfx.h"
   #include "PrismRenderNode.h"
   
   CPrismRenderNode::CPrismRenderNode() :m_pMaterial(0)
   {
                   m_mat.SetIdentity();
                   m_WSBBox = AABB(Vec3(-1, -1, -1), Vec3(1, 1, 1));
                   m_pRE = (CREPrismObject*) GetRenderer()->EF_CreateRE(eDATA_PrismObject);
                   m_dwRndFlags |= ERF_CASTSHADOWMAPS | ERF_HAS_CASTSHADOWMAPS;
   }
   
   CPrismRenderNode::~CPrismRenderNode()
   {
                   if (m_pRE)
                                   m_pRE->Release(false);
                   
                   Get3DEngine()->FreeRenderNodeState(this);
   }
   
   void CPrismRenderNode::SetMatrix(const Matrix34& mat)
   {
                   m_mat = mat;
                   m_WSBBox.SetTransformedAABB(mat, AABB(Vec3(-1, -1, -1), Vec3(1, 1, 1)));
                   Get3DEngine()->RegisterEntity(this);
   }
   
   
   const char* CPrismRenderNode::GetName() const
   {
                   return "PrismObject";
   }
   
   void CPrismRenderNode::Render(const SRendParams& rParam, const SRenderingPassInfo &passInfo)
   {
     FUNCTION_PROFILER_3DENGINE;
   
                   if(!m_pMaterial)
                                   return;
   
                   // create temp render node to submit this prism object to the renderer
                   CRenderObject *pRO = GetRenderer()->EF_GetObject_Temp(passInfo.ThreadID());                     // pointer could be cached
   
                   if(pRO)
                   {
                                   // set basic render object properties
                                   pRO->m_II.m_Matrix = m_mat;
                                   pRO->m_ObjFlags |= FOB_TRANS_MASK;
                                   pRO->m_fSort = 0;
                                   pRO->m_fDistance = rParam.fDistance;
   
                                   // transform camera into object space
                                   const CCamera& cam(passInfo.GetCamera());
                                   Vec3 viewerPosWS(cam.GetPosition());
   
                                   // set render object properties
                                   m_pRE->m_center = m_mat.GetTranslation();
   
                                   SShaderItem& shaderItem(m_pMaterial->GetShaderItem(0));
   
                                   GetRenderer()->EF_AddEf(m_pRE, shaderItem, pRO, passInfo, EFSLIST_GENERAL, 0, SRendItemSorter(rParam.rendItemSorter));
                   }
   }
   
   void CPrismRenderNode::GetMemoryUsage(ICrySizer* pSizer) const
   {
                   SIZER_COMPONENT_NAME(pSizer, "PrismRenderNode");
                   pSizer->AddObject(this, sizeof(*this));
   }
   
   void CPrismRenderNode::OffsetPosition(const Vec3& delta)
   {
                   if (m_pRNTmpData) m_pRNTmpData->OffsetPosition(delta);
                   m_WSBBox.Move(delta);
                   m_mat.SetTranslation(m_mat.GetTranslation() + delta);
                   if (m_pRE) m_pRE->m_center += delta;
   }
   
   void CPrismRenderNode::FillBBox(AABB & aabb)
   {
                   aabb = CPrismRenderNode::GetBBox();
   }
   
   EERType CPrismRenderNode::GetRenderNodeType()
   {
                   return eERType_PrismObject;
   }
   
   float CPrismRenderNode::GetMaxViewDist()
   {
                   return 1000.0f;
   }
   
   Vec3 CPrismRenderNode::GetPos(bool bWorldOnly) const
   {
                   return m_mat.GetTranslation();
   }
   
   IMaterial* CPrismRenderNode::GetMaterial(Vec3* pHitPos) 
   { 
                   return m_pMaterial; 
   }
   ```

1.  To allow client code to create an instance of the new render node, extend the following function in `/Code/CryEngine/Cry3DEngine/3DEngine.cpp` 

   ```
   ...
   #include "PrismRenderNode.h"
   ...
   IRenderNode * C3DEngine::CreateRenderNode(EERType type)
   {
   	 switch (type)
   	 {
   	 ...
   	 case eERType_PrismObject:
   	 {
   		  IPrismRenderNode* pRenderNode = new CPrismRenderNode();
   		  return pRenderNode;
   	 }
   	 ...
   ```