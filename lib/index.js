(function (global) {
  const exec = require("child_process").exec;
  const path = require("path");
  const fs = require("fs");
  const hasFonts = fs.existsSync(path.join(__dirname, "..", "fonts"));
  const hasDist = fs.existsSync(path.join(__dirname, "..", "dist"));
  if (!hasFonts) fs.mkdirSync(path.join(__dirname, "..", "fonts"));
  if (!hasDist) fs.mkdirSync(path.join(__dirname, "..", "dist"));
  const config = require(path.join(__dirname, "..", "tc.config.json"));
  const { ttfName, distName, textName } = config;
  const jarName = "sfnttool.jar";
  const texts = fs.readFileSync(path.join(__dirname, "..", textName), "utf-8");
  const setTexts = [...new Set(texts.split(""))]
    .join("")
    .replace(/[\r\n]/g, "");
  const cmd = `java -jar ${path.join(
    __dirname,
    "..",
    "lib",
    jarName
  )} -s '${setTexts}' ${path.join(
    __dirname,
    "..",
    "fonts",
    ttfName
  )} ${path.join(__dirname, "..", "dist", distName)}`;

  exec(
    cmd,
    {
      maxBuffer: 1024 * 2000,
    },
    function (err, stdout, stderr) {
      if (err) {
        console.log(err);
      } else if (stderr.length > 0) {
        console.error(stderr);
      } else {
        console.log(stdout);
      }
    }
  );
})(globalThis);
