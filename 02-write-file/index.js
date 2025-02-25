const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = __dirname + "/output.txt";

fs.truncate(filePath, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File output.txt cleared!");
    rl.prompt();
  }
});

rl.question("Enter your text: ", (input) => {
  fs.appendFile(filePath, input + "\n", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`You entered: ${input}`);
      rl.prompt();
    }
  });
});

rl.on("line", (input) => {
  if (input.toLowerCase() === "exit") {
    console.log("Goodbye!");
    rl.close();
  } else {
    fs.appendFile(filePath, input + "\n", (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`You entered: ${input}`);
        rl.prompt();
      }
    });
  }
});

rl.on("SIGINT", () => {
  console.log("Goodbye!");
  rl.close();
});
