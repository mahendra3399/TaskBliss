import User from "../Models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body;

        // Log received data for debugging
        console.log("Received data:", req.body);

        // Validate required fields
        if (!fullName || !username || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
        });

        if(newUser) {
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
          });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        console.error("Error in signup controller:", error.message); 
        res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req,res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({ error: "Invalid username" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const jwtToken = jwt.sign(
            { username: user.username, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            jwtToken
        });

    } catch (error) {
        console.error("Error in login controller:", error.message); 
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = (req,res) => {
   try {
      res.cookie("jwt", "", {maxAge: 0});
      res.status(200).json({message: "logged out successfully"});
   } catch (error) {
    console.error("Error in logout controller:", error.message); 
    res.status(500).json({ error: "Internal server error" });
   }
};