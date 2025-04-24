import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'


export const signUp = async (req, res) => {
  const formValues = req.body;
  
  if (!formValues.fullName || !formValues.password || !formValues.contact) {
    return res.status(400).json({ error: "Missing Required Fields" });
  }

  const email = formValues.contact.includes('@') ? formValues.contact : '';
  const mobile = !formValues.contact.includes('@') ? formValues.contact : '';

  try {
    let existingUser;
    if (email) {
      existingUser = await UserModel.findOne({ email });
    } else if (mobile) {
      existingUser = await UserModel.findOne({ mobile });
    }

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(formValues.password, 10);

    const user = {
      fullName: formValues.fullName,
      email: email,
      mobile: mobile,
      password: hashedPassword,
      cart: [],
      orders: []
    };

    const newUser = await UserModel.create(user);
    console.log("User created:", newUser);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error creating user", details: error.message });
  }
};

  export const login = async (req, res) => {

    const { contact, password } = req.body;
  
    if (!contact || !password) {
      return res.status(400).json({ error: "Enter required fields!" });
    }
  
    let user;
  
    try {
      if (contact.includes("@")) {
        user = await UserModel.findOne({ email: contact });
      } else {
        user = await UserModel.findOne({ mobile: contact });
      }
  
      if (!user) return res.status(400).json({ error: "User not available!" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
  
      const token = jwt.sign(
        { id: user._id, fullName: user.fullName },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      const safeUser = {
        fullName: user.fullName,
        contact: user.email || user.mobile,
      };
  
      res.status(200).json({ message: "Login successful", token, user: safeUser });
  
    } catch (error) {
      res.status(500).json({ error: "Login failed", details: error.message });
    }
  };
  