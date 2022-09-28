/* eslint-disable no-unused-vars */
/**
 * @type {import('postcss').PluginCreator}
 */
let postcss = require('postcss')

module.exports = postcss.plugin('postcss-px2var', (opts = { }) => {
  const options={
    varName:'postcss-px2var-unit',
    ...opts
  }
  // Work with options here
  return (root, result) => {
    if(!options.includes || options.includes.some(include=>include.test(root.source.input.file))){
      // Transform CSS AST here
      let skip=false
      root.walkDecls((decl)=>{
        if(skip) {
          skip=false
          return
        }
        if(/\d+px/.test(decl.value)){
          const val={value:decl.value.replace(/(-?\d+)px/g,($0)=>`calc(${$0} * var(--${options.varName}))`)}
          decl.cloneAfter(val)
          skip=true// 跳过插入的行
        }
      })
    }
  }
})

