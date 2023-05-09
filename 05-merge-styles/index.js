const fs = require("fs");
const pathModule = require("path");

const sourceDirPath = pathModule.join(__dirname, "styles");
const targetDirPath = pathModule.join(__dirname, "project-dist");

const outputFilePath = pathModule.join(targetDirPath, "bundle.css");

fs.readdir(sourceDirPath, (error, files) => {
  if (error) throw error;
  const cssFiles = files.filter((file) => pathModule.extname(file) === ".css");

  Promise.all(
    cssFiles.map((file) => {
      const filePath = pathModule.join(sourceDirPath, file);
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    })
  )
    .then((data) => {
      const cssContent = data.join("\n");
      return new Promise((resolve, reject) => {
        fs.writeFile(outputFilePath, cssContent, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    })
    .then(() => {
      console.log("Styles successfully bundled!");
    })
    .catch((error) => {
      console.error(error);
    });
});
