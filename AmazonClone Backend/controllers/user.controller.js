import UserModel from './../models/user.model.js';

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "User ID is not provided" });

  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Could not get user", details: error.message });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const editedData = req.body;

  if (!id) return res.status(400).json({ error: "User ID is invalid" });

  try {
    const editedUser = await UserModel.findByIdAndUpdate(id, editedData, { new: true });
    if (!editedUser) return res.status(404).json({ error: "User not found for update" });

    res.status(200).json({ message: "User updated successfully", user: editedUser });
  } catch (error) {
    res.status(500).json({ error: "Could not update user", details: error.message });
  }
};




export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "User ID is invalid" });

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found for deletion" });

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: "Could not delete user", details: error.message });
  }
};
