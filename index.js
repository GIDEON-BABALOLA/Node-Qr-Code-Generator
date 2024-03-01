const inquirer = require("inquirer");
const fs = require("fs")
const fsPromises = require("fs").promises;
const qr = require("qr-image");
const path = require("path");
inquirer
  .prompt([
    {
        type: "input",
        name: "url", // Provide a name for the question
        message: "Enter your url?",
      }
  ])
  .then((answers) => {
    const url = answers.url; // Access the user's input using the specified name
    createFile(url)
    createQrCode(url)
    console.log(`Hello, ${url}!`);
  })
  .catch((error) => {
    if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
    } else {
        console.error("Something else went wrong");
    }
  });
  const createQrCode = async (url) => {     
var qr_svg = qr.image(url, { type: 'png', margin : 2 });
const text = url.toString()
if (!fs.existsSync(path.join(__dirname,  'qrCodes'))) {
fs.mkdirSync(path.join(__dirname, "qrCodes"))
}
await qr_svg.pipe(fs.createWriteStream(  path.join(__dirname, "qrCodes", text + ".png") ))
  }
  const createFile = async (url)=>{
    if (!fs.existsSync(path.join(__dirname,  'urls.txt'))) {
        await fsPromises.writeFile(path.join(__dirname, 'urls.txt'), "");
    }
    await fsPromises.appendFile(path.join(__dirname, "urls.txt"), `${url}\n`)
  }