const fs = require("fs").promises;
const path = require("path");

async function printFilesInfo() {
  const folderPath = path.join(__dirname, "secret-folder");

  try {
    const files = await fs.readdir(folderPath);

    for (const fileName of files) {
      const filePath = path.join(folderPath, fileName);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024.0;
        const { name, ext } = path.parse(fileName);
        console.log(
          `${name}-${ext.replace(".", "")}-${fileSizeInKilobytes.toFixed(3)}kb`
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}

printFilesInfo();
