const fsPromises = require("fs").promises;
const path = require("path");

const sourceDirectoryPath = path.join(__dirname, "files");
const targetDirectoryPath = path.join(__dirname, "files-copy");

async function copyDirectory() {
  try {
    await fsPromises.access(targetDirectoryPath);
  } catch (error) {
    await fsPromises.mkdir(targetDirectoryPath);
  }
  const files = await fsPromises.readdir(sourceDirectoryPath);

  for (const file of files) {
    const sourcePath = path.join(sourceDirectoryPath, file);
    const targetPath = path.join(targetDirectoryPath, file);

    const stats = await fsPromises.stat(sourcePath);
    if (stats.isFile()) {
      await fsPromises.copyFile(sourcePath, targetPath);
    }
  }
}

copyDirectory();
