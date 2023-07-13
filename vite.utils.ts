import { ProxyOptions } from 'vite'

/** 需要本地代理的api */
const targetProxy = {
  'https://devapi.juexiaotime.com': [
    '/jxuserapi',
    '/weworkapi',
    '/userapi',
    '/shopapi',
    '/courseapi',
    '/gameapi',
    '/centershopapi',
    '/operationapi'
  ],
  'https://livedevapi.juexiaotime.com': ['/liveapi']
}

/**
 *  设置本地接口服务代理
 *
 * @returns {(Record<string, string | ProxyOptions>)}
 */
export const getProxyConfig = (): Record<string, string | ProxyOptions> => {
  // 生成代理配置对象
  const proxyObj: Record<string, string | ProxyOptions> = {}
  Object.keys(targetProxy).forEach(target => {
    targetProxy[target].forEach((value: string) => {
      const obj: ProxyOptions = {
        ws: false,
        target: target,
        changeOrigin: true,
        rewrite: path => {
          const rewriteReg = new RegExp('^/' + value + '/')
          return path.replace(rewriteReg, '')
        }
      }
      proxyObj[value] = obj
    })
  })
  return proxyObj
}
