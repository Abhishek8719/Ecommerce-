const express = require("express");
const cors = require("cors")

const app = express();
app.use(
    cors({
        origin :"http://localhost:5173"
    })
)
app.use(express.json());

const products = [
    {id : 1,name:"Laptop",price :55000},
    {id:2,name :"Phone",price :25000},
    {id:3,name:"Headphones",price :30000},
    {id :4,name :"keyboard",price: 1500},
    {id :5,name :"Aamla juice",price:400}

]
app.get("/",(req,res)=>{
    res.send("Amazon clone backend running...")
})

app.get("/api/products",(req,res)=>{
    res.json(products);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend server running on the http://localhost:${PORT}`);
    
});