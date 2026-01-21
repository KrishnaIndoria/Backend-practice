const express = require("express");
const app = express();

app.use(express.json());

// database (think like it is the json file which we get whn we fetch using api)
const foodmenu= [
    {id:1,food:"Noodles",category:"veg",price:200},
    {id:2,food:"chicken",category:"non-veg",price:500},
    {id:3,food:"rice",category:"veg",price:100},
    {id:4,food:"roti",category:"veg",price:50},
    {id:5,food:"panner",category:"veg",price:200},
    {id:6,food:"salad",category:"veg",price:30},
    {id:7,food:"mutton",category:"non-veg",price:500},
    {id:8,food:"egg",category:"non-veg",price:40},
    {id:9,food:"naan",category:"veg",price:50},
    {id:10,food:"biryani",category:"veg",price:100},
    {id:11,food:"dosa",category:"veg",price:40},
    {id:12,food:"idli",category:"veg",price:30},
];

// user ka cart hai yeh , isme user ka selected food item yaha hoga
const AddToCart=[];

// middleware for authentication
app.use("/admin",(req,res,next)=>{
    // add item into foodmenu (database), now this can be done only by the admin not by a general user
    // so we have to authenticate whether the request being sent is from admin or not
    // so for now we write a dummy code to check
    // even for delete fooditem from database

    const token = "ABCDEF";
    const access = (token==="ABCDEF")?1:0;
    if(!access){
        res.status(403).send("No permission");
    }

    next(); //goes to the particular request being sent from client
})

app.get("/food",(req,res)=>{
    res.status(200).send(foodmenu);
})

app.post("/admin",(req,res)=>{
        foodmenu.push(req.body);
        res.status(201).send("Food Item added in database");
})

app.delete("/admin/:id",(req,res)=>{

        const id = parseInt(req.params.id);
        const index = foodmenu.findIndex(item=>item.id===id);

        if(index===-1){
            res.send("item not present");
        }
        else{
            foodmenu.splice(index,1);
            res.send("Succesfully deleted from database");
        }
})

// this is for user to add food in his cart
app.post("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const fooditem = foodmenu.find(item=>item.id === id);

    if(fooditem){
        AddToCart.push(fooditem);
        res.status(200).send("Item added in cart");
    }
    else{
        res.send("Item out of stock");
    }
})

app.delete("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const index = AddToCart.findIndex(item=>item.id===id);
    if(index!=-1){
        AddToCart.splice(index,1);
        res.send("Item removed succesfully");
    }
    else{
        res.send("Item not present in cart");
    }
})

app.get("/user",(req,res)=>{
    if(AddToCart.length==0)
        res.send("Cart is empty");
    else{
        res.send(AddToCart);
    }
})

// error handling
app.get("/dummy",(req,res)=>{
    try{
        JSON.parse("Hello"); //this will give an error, as"Hello" is not json
        res.send("Success");
    }
    catch(err){
        res.send("Some error occured")
    }
})

app.listen(3000,(req,res)=>{
    console.log("Listening at port 3000")
})
