const postcss = require("postcss");

const plugin = require("./");

const fs = require("fs");

const input = fs.readFileSync("./style.css");

postcss([plugin()])
  .process(input, {
    from: "./style.css",
    to: "./dest.css",
    map:{
      absolute:true,
      inline:false
    } })
  .then((result) => {
    fs.writeFileSync("./dest.css", result.css);
    fs.writeFileSync("./dest.css.map", result.map.toString());
  });
