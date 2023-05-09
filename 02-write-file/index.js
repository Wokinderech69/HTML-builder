const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = "output.txt";

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
  fs.writeFile(filePath, "", (err) => {
    if (err) {
      console.error(err);
    } else {
      process.exit();
    }
  });
});
