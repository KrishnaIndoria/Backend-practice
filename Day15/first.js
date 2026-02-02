const bcrypt = require("bcrypt");

const password = "krish@123";

async function Hashing(){
    const hashpass = await bcrypt.hash(password,10);
    console.log(hashpass);
}

Hashing();