// Libuv

const x = 7;
const y = 5;

console.log(x+y);

// this async task is done using libuv n OS.
setTimeout(()=>{
    console.log("Hello after 3 seconds, using Libuv and OS");
},3000);

console.log("Bye");