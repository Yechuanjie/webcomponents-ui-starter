import type { DirectiveBinding } from 'vue'

export interface HTMLElementPlus extends HTMLElement {
  value?: string
  $inp?: HTMLElementPlus
  handle?: (e) => void
}

const findEle = (parent: HTMLElementPlus, type: string): HTMLElementPlus => {
  return String(parent.tagName).toLowerCase() === type ? parent : parent.querySelector(type) || parent
}
const trigger = (el: HTMLElementPlus, type: string) => {
  const e = new Event(type, { bubbles: true, cancelable: false })
  el.dispatchEvent(e)
}
export const vEmoji = {
  mounted(el: HTMLElementPlus, binding: DirectiveBinding) {
    let $inp: HTMLElementPlus = findEle(el, 'input')
    $inp = $inp || findEle(el, 'textarea')
    el.$inp = $inp
    $inp.handle = e => {
      let val: string = $inp.value || ''
      if (typeof binding.value != 'object' && binding.value != 12) {
        val = val.trim()
      }
      $inp.value = filterInput(val, binding.value, e.tagName === 'INPUT')
      // 触发v-model的更新
      trigger($inp, 'input')
    }
    $inp.addEventListener('change', $inp.handle)
    $inp.addEventListener('compositionend', $inp.handle)
  }
}

// const fns: object = {
/**
 * 过滤输入框的表情等
 * @param val 要处理的字符串
 * @param type  限制的类型
 * @param isInput  是否是input输入框
 */
function filterInput(val: string, type: number, isInput: boolean) {
  const emoji =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|\uFE0F|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
  let regRule: RegExp
  switch (type) {
    case 0:
      regRule = emoji
      break
    case 1:
      regRule = /[^\u4E00-\u9FA5A-Za-z0-9\-_]/g //中英文、数字 中划线及下划线 _ -
      break
    case 2:
      regRule = /[^\u4E00-\u9FA5A-Za-z0-9]/g //中英文、数字
      break
    case 3:
      regRule = /\/|\\/g //中英文、数字
      break
    case 4:
      regRule = /[^a-zA-Z,]/g ///字母和,
      break
    case 5:
      regRule = /[^0-9]/g //只能数字
      break
    case 6:
      regRule = /[^a-zA-Z0-9\-_、，,\u4E00-\u9FA5]/g //中英文、数字 中划线及下划线 、，
      break
    case 7:
      regRule = /[^\d^.]+/g //只能数字.
      break
    case 8:
      regRule = /[^\d^:]+/g //只能数字 : 比值
      break
    case 9:
      regRule = /[^\d^,]+/g //只能数字,
      break
    case 10: // 把最后一个字符和第一个字符英文逗号,去掉 主观题结论地方使用
      regRule = /^,|,$/g
      break
    case 11:
      regRule = /[^A-Za-z0-9]/g // 数字字母
      break
    case 12:
      regRule = /(\s*$)/g // 右侧空白符
      break
    case 13:
      regRule = /[^0-9.]/g // 小数点数字
      break
    case 14:
      regRule = /\D|^0/g // 正整数
      break
    case 15:
      regRule = /^[^1]|[^0-9]*/g // 以1开头数字
      break
    case 16:
      regRule = /^[^1-9]|[^0-9]*/g // 不以0开头数字
      break
    case 17:
      regRule = /\D|^0.+/g // 输入非负整数
      break
    case 98:
      regRule = /\/|\\/g // 不能输入\ /
      break
    case 99:
      regRule = /\/|\\|%/g // 不能输入\ / %
      break
    default:
      regRule = emoji
      break
  }
  if (isInput) {
    return val.replace(emoji, '').replace(regRule, '').replace(/\/|\\/g, '')
  } else {
    return val.replace(emoji, '').replace(regRule, '')
  }
}
