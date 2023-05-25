/* eslint-disable no-unused-vars */
/**
 * @type {import('postcss').PluginCreator}
 */
let postcss = require('postcss')

module.exports = postcss.plugin('postcss-px2var', (opts = {}) => {
  const options = {
    varName: 'postcss-px2var-unit',
    fallback: true,
    ...opts
  }
  // Work with options here
  return (root, result) => {
    // 确定文件是否处理
    if (!options.includes || options.includes.some(include => include.test(root.source.input.file))) {
      // Transform CSS AST here
      let skip = false
      root.walkDecls((decl) => {
        const { selector } = decl.parent
        // 确定当前的选择器内的css属性是否需要处理
        if (options.selectorBlacklist && options.selectorBlacklist.some(item => item.test(selector))) return
        if (skip) {
          skip = false
          return
        }
        if (/\d+px/.test(decl.value)) {
          const val = { value: decl.value.replace(/(-?\d+(\.\d+)?)px/g, ($0) => `calc(${$0} * var(--${options.varName}, 1))`) }
          if (options.fallback) {
            decl.cloneAfter(val)
            skip = true// 跳过插入的行
          } else {
            if (typeof decl.assign === 'function') {
              decl.assign({ prop: decl.prop, value: val.value })
            } else {
              decl.value = val.value
            }
          }
        }
      })
    }
  }
})

