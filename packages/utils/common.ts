/**
 * 动态加载js
 *
 * @export
 * @param {string} url
 * @return {*}  {Promise<boolean>}
 */
export function loadScript(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.async = true
    head.appendChild(script)
    script.onload = () => resolve(true)
    script.onerror = err => reject(err)
  })
}

/**
 * 动态加载css
 *
 * @export
 * @param {string} url
 * @return {*}  {Promise<boolean>}
 */
export function loadCss(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0]
    const csslink = document.createElement('link')
    csslink.type = 'text/css'
    csslink.href = url
    csslink.rel = 'stylesheet'
    head.prepend(csslink)
    csslink.onload = () => resolve(true)
    csslink.onerror = err => reject(err)
  })
}

/**
 * 大驼峰组件名转短横线命名
 * @param {string} camelCaseStr
 * @eg 'CustomElementName' 转为 'custom-element-name'
 */
export function camelCaseToKebabCase(camelCaseStr: string) {
  return camelCaseStr
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace('-', '')
}
