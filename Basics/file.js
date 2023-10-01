const { log } = require("console");
const fs = require("fs")
const os = require("os")
console.log(os.cpus().length);

// // Sync...
// fs.writeFileSync('./test.txt',"Hey There");

// //Async
// fs.writeFile("./test.txt","Hello World Async",(err)=>{})

//Synchronus-code will be executed line by line(top to bottom)

// console.log("ranjan");
// const result = fs.readFileSync("./contacts.txt","utf-8")
// console.log(result);
// console.log("djdsjkf");


//Async-in this approach, code does not guarantee line by line executed(non-blocking execution)
// console.log("1");
// fs.readFile("./contacts.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log(result);
//     }
// })
// console.log("2");
// console.log("90");
// console.log("98");


// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());
// fs.appendFileSync("./test.txt",'new Date().getDate().toLocaleString()\n');


// fs.cpSync("./test.txt","./copy.txt")
// fs.unlinkSync("./copy.txt")

// console.log(fs.statSync("./test.txt").isDirectory());

// fs.mkdirSync("my-docsss/a/b",{recursive: true});

//