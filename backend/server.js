import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Product from "./models/product.js";
const app = express();

app.use(
    cors({
        origin :"http://localhost:5173"
    })
)
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/amazonClone")
.then(()=> console.log("MongoDb connected"))
.catch((err)=> console.error(err));


app.get("/",(req,res)=>{
    res.send("Amazon clone backend running...")
})


app.post("/api/products/seed",async (req,res)=>{
    try{


        const productData = [
            {"name":"Laptop","price":23000},
            {"name":"Phone","price":34000},
            {"name":"iPhone","price":110000},
            {"name":"LCD","price":80000}
         ]        

         await Product.insertMany(productData);
         res.json({message:"Products seeded successfully"})
    } catch(err){
       res.status(500).json({message:"Error seeding data", error: err.message});
    }

})

app.get("/api/products",async (req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        res.status(500).json({message:"server error"});
    }
    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend server running on the http://localhost:${PORT}`);
    
});