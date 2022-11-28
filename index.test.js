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
  await run(sourceCss, resultCss.replace(/postcss-px2var-unit/g,'unit'), { varName:'unit' })
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
  width: calc(10px * var(--postcss-px2var-unit, 1));
}

.black{
  width: 1.1px;
}
`
  await run(sourceCss, resultCss, { selectorBlacklist:[/black/] })
})


/* Write tests here

it('does something', async () => {
  await run('a{ }', 'a{ }', { })
})

*/
