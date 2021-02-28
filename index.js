const path = require("path");
const express = require("express");

const app = express();
const srcPath = "./src";

if (process.env.NODE_ENV !== "production") {
  app.use(function (req, res, next) {
    require(srcPath)(req, res, next);
  });
  const watch = require("chokidar").watch(srcPath);
  watch.on("ready", function () {
    console.log("> Watching " + srcPath);
    watch.on("all", function () {
      for (let id in require.cache) {
        if (id.startsWith(path.join(__dirname, srcPath))) {
          console.log("> Cleaning up module "+id);
          delete require.cache[id];
        }
      }
    });
  });
} else {
  app.use(require(srcPath));
}
app.listen(3000, function () {
  console.log("> Express server is now listen at port 3000");
});
