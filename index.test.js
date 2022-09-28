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
  await run(sourceCss, resultCss.replace('postcss-px2var-unit','unit'), { varName:'unit' })
})

test('includes', async () => {
  const sourceCss=fs.readFileSync('./source.css',{encoding:'utf8'})
  // const resultCss=fs.readFileSync('./result.css')
  await run(sourceCss, sourceCss, { includes:[] })
})


/* Write tests here

it('does something', async () => {
  await run('a{ }', 'a{ }', { })
})

*/
