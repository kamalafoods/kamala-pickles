import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Get all orders (Admin)
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

let orderCounter = 1000;

router.post("/create-order", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    orderCounter++;
    const orderId = `KP${orderCounter}`;

    const newOrder = new Order({
      orderId,
      items,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      orderId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;