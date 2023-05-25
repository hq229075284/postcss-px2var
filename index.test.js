const postcss = require('postcss')
const fs=require('fs')
const plugin = require('./')

async function run (input, output, opts = { }, from) {
  let result = await postcss([plugin(opts)]).process(input, { from })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

test('transform', async () => {
  const sourceCss=fs.readFileSync('./source.css',{encoding:'utf8'})
  const resultCss=fs.readFileSync('./result.css',{encoding:'utf8'})
  await run(sourceCss, resultCss, { })
})

test('varName', async () => {
  const sourceCss=fs.readFileSync('./source.css',{encoding:'utf8'})
  const resultCss=fs.readFileSync('./result.css',{encoding:'utf8'})
  await run(sourceCss, resultCss.replace(/postcss-px2var-scale/g,'unit'), { varName:'unit' })
})

test('includes', async () => {
  const sourceCss=fs.readFileSync('./source.css',{encoding:'utf8'})
  // const resultCss=fs.readFileSync('./result.css')
  await run(sourceCss, sourceCss, { includes:[] })
})

test('selectorBlacklist', async () => {
  const sourceCss=fs.readFileSync('./source.css',{encoding:'utf8'})
  const resultCss=`body{
  width: 10px;
  width: calc(10px * var(--postcss-px2var-scale, 1));
}

.black{
  width: 1.1px;
}
`
  await run(sourceCss, resultCss, { selectorBlacklist:[/black/] })
})

test('不创建备份，直接替换源数据', async () => {
  const sourceCss=fs.readFileSync('./source.css',{encoding:'utf8'})
  const resultCss=`body{
  width: calc(10px * var(--postcss-px2var-scale, 1));
}

.black{
  width: calc(1.1px * var(--postcss-px2var-scale, 1));
}
`
  await run(sourceCss, resultCss, { fallback:false })
})


/* Write tests here

it('does something', async () => {
  await run('a{ }', 'a{ }', { })
})

*/
