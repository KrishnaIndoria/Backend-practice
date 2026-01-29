const mongoose = require('mongoose');
const {Schema} = mongoose;

async function main(){
  await mongoose.connect(process.env.MONGO_URL);
//   after '/' i wrote Bookstore , this creates a DB called Bookstore 

//   schema (structure of db)
  const userschema = new Schema({
    name:String,
    age:Number,
    city:String
  })

  
//   creating collections (also called as Model)
const User = mongoose.model("user",userschema);
// this creates a collection called "user" in DB, of userschema 'schema' defined above.
// here const User is also a class.

// user1 is object
const user1 = new User({name:"krishna",age:19,city:"bangalore"}); //user1 is object of class 'User'
await user1.save(); //this stores user1 data in DB

// this creates a object and stores it in DB , another way of inserting data
// instead of above 2 lines methodd , we can do it in 1 line
await User.create({name:"giridhar",age:19,city:"bangalore"});

// for mutiple inputs , we insert using arrays
await User.insertMany([{name:"bhuvan",age:19},{name:"arun",age:19}]);

// this query gives us all the documents (data)
const ans = await User.find({});
console.log(ans);

// gives us document which has name:"giridhar".
const result = await User.find({name:"giridhar"});
console.log(result);

}

main()
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log(err));
