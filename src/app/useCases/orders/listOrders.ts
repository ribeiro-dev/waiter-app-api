import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function listOrders(req: Request, res: Response) {
   try {
      const orders = await Order.find()
         .sort({ createdAt: 1}) // desc would be -1
         .populate('products.product'); // get data from the relationship (make a join)

      res.json(orders);
   } catch (error) {
      console.log(error);
      res.sendStatus(500);
   }
}
