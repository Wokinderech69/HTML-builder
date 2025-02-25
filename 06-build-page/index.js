const fsPromises = require("fs").promises;
const path = require("path");

const stylesDirec = path.join(__dirname, "styles");
const assetsDirec = path.join(__dirname, "assets");
const componentsDirec = path.join(__dirname, "components");
const templateFile = path.join(__dirname, "template.html");
const projectDistDirec = path.join(__dirname, "project-dist");

const stylesFile = path.join(projectDistDirec, "style.css");
const indexFile = path.join(projectDistDirec, "index.html");
const assetsDistDirec = path.join(projectDistDirec, "assets");

const readDirecPromise = (dir) => {
  return fsPromises.readdir(dir, { withFileTypes: true });
};

const readFilePromise = (filename) => {
  return fsPromises.readFile(filename, "utf8");
};

const writeFilePromise = (filename, data) => {
  return fsPromises.writeFile(filename, data, "utf8");
};

const copyDirec = async (source, destination) => {
  try {
    const files = await readDirecPromise(source);
    await fsPromises.mkdir(destination, { recursive: true });

    for (const file of files) {
      const sourcePath = path.join(source, file.name);
      const destinationPath = path.join(destination, file.name);

      if (file.isDirectory()) {
        await copyDirec(sourcePath, destinationPath);
      } else {
        await fsPromises.copyFile(sourcePath, destinationPath);
      }
    }
  } catch (err) {
    console.error(`Error copying directory ${source} to ${destination}:`, err);
    throw err;
  }
};

const replaceTags = async (template, componentsDirec) => {
  const files = await readDirecPromise(componentsDirec);
  let newTemplate = template;

  for (const file of files) {
    const filename = file.name;
    const componentName = filename.replace(".html", "");
    const componentHTML = await readFilePromise(
      path.join(componentsDirec, filename)
    );
    const regex = new RegExp(`{{${componentName}}}`, "g");
    newTemplate = newTemplate.replace(regex, componentHTML);
  }
  return newTemplate;
};

const buildPage = async () => {
  try {
    await fsPromises.mkdir(projectDistDirec, { recursive: true });

    await copyDirec(assetsDirec, assetsDistDirec);

    const template = await readFilePromise(templateFile);

    const html = await replaceTags(template, componentsDirec);

    await writeFilePromise(indexFile, html);

    const stylesFiles = await readDirecPromise(stylesDirec);
    let stylesData = "";

    for (const file of stylesFiles) {
      if (path.extname(file.name) === ".css") {
        const filePath = path.join(stylesDirec, file.name);
        const fileData = await readFilePromise(filePath);
        stylesData += fileData;
      }
    }
    await writeFilePromise(stylesFile, stylesData);
    console.log("Build completed!");
  } catch (err) {
    console.error("Build failed:", err);
  }
};
buildPage();
