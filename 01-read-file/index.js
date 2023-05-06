const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "text.txt");

const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

readStream.on("data", (data) => {
  console.log(data);
});
readStream.on("error", (error) => {
  console.log(error);
});
