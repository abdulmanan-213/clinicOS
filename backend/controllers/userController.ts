import { Request, Response } from "express";
import User, { IUser } from "../models/userSchema";
import bcrypt from "bcryptjs";

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    if (Array.isArray(req.body)) {
      const usersData = req.body;

      for (const user of usersData) {
        if (!user.name || !user.email || !user.password || !user.role) {
          return res.status(400).json({
            message: "All users must have name, email, and password, role",
          });
        }
      }

      const users = await Promise.all(
        usersData.map(async (user: any) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return {
            ...user,
            password: hashedPassword,
          };
        }),
      );

      const result = await User.insertMany(users, { ordered: false });

      return res.status(201).json({
        message: "Multiple users registered successfully",
        count: result.length,
        data: result,
      });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate email found",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// Get All Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, password, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role) user.role = role as "patient" | "doctor" | "admin";

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
