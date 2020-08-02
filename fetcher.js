/*
Implement a small command line node app called fetcher.js which should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.

*/
//node fetcher.js http://www.example.edu/ ./index.html

const request = require('request');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output:process.stdout
});

//const { error } = require('console');

const args = process.argv.splice(2);
//to get the directories of the path
let directories = path.dirname(args[1]);


request(args[0], (err, response, body) => {
  if (err) throw err;
  if (response.statusCode !== 200) {
    const msg = `status code ${response.statusCode}`;
    console.log(Error(msg));
    process.exit(5);
  }
  //to check if the directories exist
  fs.access(directories, (err) => {
    if (err) {    // if exists--> no error
      console.log((Error(err)));
      process.exit(5);
    }
  });
  const data = body;
  fs.access(args[1], (err) => {
    if (!err) {
      rl.question('file aready exist!, Override?(Y/N)', answer => {
        if (answer !== 'Y') {
          process.exit(5);
        }
        writeToFile(args[1], data);
        rl.close();
      });
    } else {
      writeToFile(args[1], data);
    }
  });
});


function writeToFile(filePath, data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;

    //to get the size of the downloaded file in bytes

    //const stats = fs.statSync('./index.html');
    //console.log(stats.size)
    fs.stat(filePath, function(err, stats) {
      if (err) throw err;
      console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
      rl.close();
    });
  });

  
}