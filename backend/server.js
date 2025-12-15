import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Product from "./models/product.js";
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import User from "./models/User.js"

const app = express();
const JWT_SECRET = "secret123";

app.use(
    cors({
        origin :"http://localhost:5173"
    })
)
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/amazonClone")
.then(()=> console.log("MongoDb connected......"))
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
            {"name":"LCD","price":80000},
            {"name":"Smart Watch","price":20000}
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


app.post("/api/auth/signup",async (req,res)=>{
  try{
          const{name ,email,password} = req.body
          console.log(req.body);
      const  existingUser = await User.findOne({email});
      if(existingUser){
        return res.status(400).json({message:"User already exists"});

      }
            const hashedPassword =  await bcrypt.hash(password,10)

             const user = await User.create({
                name,
                email,
                password:hashedPassword
              })

              res.status(201).json({message:"User registered successfully"});
    } 
    catch(err){
        console.error("Signup error:", err);
        res.status(500).json({message:"Signup error", error: err.message})

    }

});

app.post("/api/auth/login",async (req,res)=>{
    try{
        const{email,password} = req.body;
        console.log(req.body);

        const user = await User.findOne({email});
        console.log("user",user);

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        console.log("ismatch ",isMatch);
         
        if(!isMatch){
            return res.status(400).json({message:"wrong password,Try again"});

        }

        const token = jsonwebtoken.sign({id:user._id},JWT_SECRET,{expiresIn:"1d"});
        res.json({token ,user:{id:user._id,name:user.name,email:user.email}})
        console.log(token);

    }catch(err){
        res.status(500).json({message:"Login error"})
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend server running on the http://localhost:${PORT}`);
    
});