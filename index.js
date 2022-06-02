/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: 'postcss-px2var',
    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */


    Declaration (decl, postcss) {
      // The faster way to find Declaration node
      if(/\d+px/.test(decl.value)){
        decl.value=decl.value.replace(/\d+px/g,`var('--base')`)
      }
    }


    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  }
}

module.exports.postcss = true
