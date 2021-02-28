const util = require("util");
const express = require("express");

const router = express.Router();

router.use(function (req, res, next) {
  res.dump = function (...args) {
    let output = "<pre>\n";
    for (let val of args) {
      output += util.inspect(val) + "\n";
    }
    output += "</pre>";
    res.send(output);
  };
  next();
});
router.get("/", function (req, res) {
  res.json({
    message: "HI. Wellcome to express server.."
  });
});
router.get("/dump", function (req, res) {
  res.dump(global);
});

module.exports = router;
