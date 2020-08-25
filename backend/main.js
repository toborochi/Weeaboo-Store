const { App } = require("./app/app");
const { dotenv } = require('dotenv').config();

function main() { 
  const server = new App();
  
  const url = `http://${process.env.HOST}:${process.env.PORT}`;
  server.start(process.env.PORT||3000);
  console.log('\x1b[33m%s\x1b[0m',`url: ${url}`);  //cyan
  console.log('date: ',new Date());
}

main();
