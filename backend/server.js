import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import User from "./models/User.js"
import Product from "./models/product.js";
import Cart from "./models/Cart.js"
import authMiddleware from "./middleware/auth.js";

const app = express();

const JWT_SECRET = "secret123";

// app.use(
//     cors({
//         origin: "http://localhost:5175",
//         credentials: true, 
//         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//         allowedHeaders: ["Content-Type", "Authorization"]
//     })
// );

// app.options('*', cors()); 
app.use(cors());
app.use(express.json());

// we establish the connection between bckend and database 

mongoose.connect("mongodb://127.0.0.1:27017/amazonClone")
.then(()=> console.log("MongoDb connected......"))
.catch((err)=> console.error(err));

// test route

app.get("/",(req,res)=>{
    res.send("Amazon clone backend running...")
})

// create product routes 

app.post("/api/products",async (req,res)=>{
    try{
        const {name,price} = req.body;//
         const body = Array.isArray(req.body) ? req.body : [req.body];
        console.log(body);

        const product = await Product.insertMany(body);
         console.log("product",product);
        res.status(201).json(
            {message:"Product created successfully",
              data: product
            });

    }catch(err){
        res.status(500).json({message:"please check server error"});
    }
})
 
// get products route

app.get("/api/products",async (req,res)=>{
    try{
        const products = await Product.find({});
        console.log("products",products);   
        res.json(products);
    }catch(err){
        res.status(500).json({message:"Server error"});
    }   
});

 // this is signup API or routes
 // signup route

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

// this is  Login API or routes 
// login  route

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

    } catch(err){
        res.status(500).json({message:"Login error"})
    }
})

 // this is cart routes where we will add the cart product in database...
app.post("/api/cart/add",authMiddleware,async (req,res)=>{
    const {productId} = req.body;
    const userId = req.userId;
    
    try
    {
        let cart = await Cart.findOne({user:userId});
        if(!cart){
            cart = await Cart.create({
                user:userId,
                items:[{product:productId,quantity:1}]
            });

        }else{
            const itemIndex = cart.items.findIndex((item)=>item.product.toString()===productId);
            if(itemIndex >-1){
                cart.items[itemIndex].quantity += 1;
            }else{
                cart.items.push({product:productId,quantity:1});
            }
            await cart.save();
        }
        res.json({message:"Product added to cart"});
        
    }catch(error){
        res.status(500).json({message:"cart error"});
    }
});

/// get api cart route 

      app.get("/api/cart",authMiddleware, async (req,res)=>{
           try{
              const cart = await Cart.findOne({user:req.userId}).populate("items.product")
              res.json(cart);
           }catch(error){
            res.ststus(500).json({message:"Fetch cart error"});

           }
      });
    
// we start the server here
       const PORT = process.env.PORT || 5000;
       app.listen(PORT,()=>{
        console.log(`Backend server running on the http://localhost:${PORT}`);
    
});