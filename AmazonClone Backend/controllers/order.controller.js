import UserModel from "../models/user.model.js";

export const updateUserOrder = async (req, res) => {
    const { contact, orders } = req.body;
    // console.log(orders);
    
    
    if (!contact) {
        return res.status(400).json({ error: "User contact is required" });
    }
    if (!Array.isArray(orders)) {
        return res.status(400).json({ error: "Order must be an array" });
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
      { orders: orders }, 
      { new: true } 
    );

    res.status(200).json({ message: "User Order updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Could not update user Order", details: error.message });
  }
};

export const getUserOrder = async (req, res) => {
  
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
  
      res.status(200).json({ message: "User Order retrived successfully", orders: user.orders });
    } catch (error) {
      res.status(500).json({ error: "Could not retrive user orders", details: error.message });
    }
  };
  