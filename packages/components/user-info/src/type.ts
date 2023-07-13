/**
 * 用户中心信息
 */
export interface UserCenterInfo {
  age: string
  avatar: string
  createTime?: number
  education?: string
  extraInfo?: {
    dictCode: string | null
    dictType: string | null
    eid: number
    field: string
    type: string
    value: string
  }[]
  id: number
  name: string
  password?: string | null
  permissions?: PermissionType[] | never[]
  phone: string
  telePhone?: string
  unionId?: string
  updateTime?: number
  userAlias?: string
  userId?: number
  userSex?: number
  userStatus?: number
  wechatName?: string
  zfbOauth?: {
    id: number
    userId: number
    zfbUnionid: string
    zfbAvatar: string
    zfbNickname: string
    createTime: number
    updateTime: number
  } | null
}
/**
 * 用户权限类型
 */
export type PermissionType = {
  name: string
  sysId: number
  front: boolean
  code: string
  type: number
  position: number
  parentId: number
  id: number
  children: PermissionType[]
}
/**
 * 系统全局配置
 * 全局引入 https://img.juexiaotime.com/userAdmin/login/login-logo.js
 */
export interface SysConfig {
  /** 项目名字 */
  appName: string
  /** 项目简称 */
  typeName: string
  /** 项目logo */
  logoUrl: string
  /** 项目标题图片 */
  titleUrl: string
  /** 项目主题色 */
  themeColor: string
  /** 项目主题字体色 */
  fontColor: string
  /** 项目埋点id */
  bp: {
    /** 正式环境id */
    pro: string
    /** 测试环境id */
    dev: string
    /** 埋点上报正式环境地址 */
    serveUrl: string
    /** 埋点上报测试环境地址 */
    testServeUrl: string
    /**
     * 埋点上报注册page时的project_id
     *
     *  1 法考 2 法硕 3 cpa
     */
    projectId: number
  }
  /** 用户协议链接 */
  userAgreementUrl: string
  /** 用户协议名称 */
  userAgreementName: string
  /** 隐私协议链接 */
  privacyUrl: string
  /** 隐私协议名称 */
  privacyName: string
  /** logo宽高 */
  logoSize: {
    width: string
    height: string
  }
  /** title宽高 */
  titleSize: {
    width: string
    height: string
  }
  /** 项目下载链接 */
  downloadLink: string
}

export type JxUserInfoUpdateSuccess = UserCenterInfo
