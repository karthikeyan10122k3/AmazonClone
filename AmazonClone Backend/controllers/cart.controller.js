import UserModel from "../models/user.model.js";

export const updateUserCart = async (req, res) => {
    const { contact, cart } = req.body;
    
    if (!contact) {
        return res.status(400).json({ error: "User contact is required" });
    }
    if (!Array.isArray(cart)) {
        return res.status(400).json({ error: "Cart must be an array" });
    }
    const email = contact.includes('@') ? contact : '';
    const mobile = !contact.includes('@') ? contact : '';

  try {
    let user;
    if (email) {
      user = await UserModel.findOne({ email });
    }else{
      user = await UserModel.findOne({ mobile });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id, 
      { cart: cart }, 
      { new: true } 
    );

    res.status(200).json({ message: "User cart updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Could not update User Cart", details: error.message });
  }
};

export const getUserCart = async (req, res) => {
  
  const { contact } = req.query;
  
    if (!contact) {
      return res.status(400).json({ error: "User contact is required" });
    }
    const email = contact.includes('@') ? contact : '';
    const mobile = !contact.includes('@') ? contact : '';
  
  
    try {
      let user;
      if (email) {
        user = await UserModel.findOne({ email });
      }else{
        user = await UserModel.findOne({ mobile });
      }
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ message: "User cart retrived successfully", cart: user.cart });
    } catch (error) {
      res.status(500).json({ error: "Could not retrive user cart", details: error.message });
    }
  };
  