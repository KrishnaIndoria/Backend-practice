// collabarting backend and database

const express = require('express');
const app = express();
const main = require("./database");
const User = require("./models/users");

app.use(express.json());

app.get("/info",async (req,res)=>{
    const ans = await User.find({});
    res.send(ans);
})

app.post("/info",async (req,res)=>{
    const ans = new User(req.body);
    await ans.save();
    res.send("Added succesfully");

})


main()
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening at port 3000");
    });
  })
  .catch((err) => console.log(err));
