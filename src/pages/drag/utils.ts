// 根据二级树构造出多级树
interface TreeDataNode {
  categoryName?: string
  categoryType?: string
  childrenCategories?: { [key: string]: any }[]
  contractCategoryUuid?: string
  ownedOrgType?: string
  parentCategoryUuid?: string
  projectId?: string
  rankNum?: number
  [property: string]: any
}
class GenarateTree {
  private generalContractCategories: Map<string, any> = new Map()
  private purchaseSaleCategories: Map<string, any> = new Map()
  private subcontractingCategories: Map<string, any> = new Map()
  constructor(data) {
    this.init(data)
  }

  init(data) {
    /**
     * generalContractCategories	总包合同分类树
     * purchaseSaleCategories	物资购销合同树
     * subcontractingCategories	分包合同分类树
     * */
    this.generalContractCategories = new Map()
    this.purchaseSaleCategories = new Map()
    this.subcontractingCategories = new Map()
    for (const key of Object.keys(data)) {
    }
  }

  generateChildNodes(data) {}
}
