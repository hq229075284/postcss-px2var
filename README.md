# postcss-px2var

[PostCSS] plugin postcss-px2var.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
  /* Input example */
  width:10px;
}
```

```css
.foo {
  /* Output example */
  width:10px;
  width:calc(10px * var(--varName));
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-px2var
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-px2var')({varName:'unit'}),
    require('autoprefixer')
  ]
}
```
or
```diff
module.exports = {
  plugins: [
+   require('postcss-px2var')({varName:'unit',includes:[/regexp/]}),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
