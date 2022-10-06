/**
 * @description 站点数据模型
 */
 export interface WebSiteDataModel {
  /**
   * @description 站点下的所有 path 表
   */
  [host: string]: {
    [path: string]: PageModelItem;
  }
}

export interface PageModelItem {
  /**
   * @description 最后修改时间
   */
  lastModified?: number;

  /**
   * @description 页面 id
   */
  pageId?: number;

  /**
   * @description 权限
   */
  permissions?: Array<() => (boolean | Promise<boolean>) | boolean>;
}
