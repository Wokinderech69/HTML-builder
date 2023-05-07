const fs = require("fs");
const pathModule = require("path");

const sourceDirPath = pathModule.join(__dirname, "styles");
const targetDirPath = pathModule.join(__dirname, "project-dist");

const outputFilePath = pathModule.join(targetDirPath, "bundle.css");

fs.readdir(sourceDirPath, (error, files) => {
  if (error) throw error;
  const cssFiles = files.filter((file) => pathModule.extname(file) === ".css");

  const cssContent = cssFiles
    .map((file) => {
      const filePath = pathModule.join(sourceDirPath, file);
      return fs.readFileSync(filePath, "utf-8");
    })
    .join("\n");

  fs.writeFile(outputFilePath, cssContent, (error) => {
    if (error) throw error;
    console.log("Styles successfully bundled!");
  });
});
