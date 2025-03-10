import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function changeOrderStatus(req: Request, res: Response) {
   try {
      const { orderId } = req.params;
      const { status } = req.body;

      const allowedStatuses = ['WAITING', 'IN_PRODUCTION', 'DONE'];

      if (!allowedStatuses.includes(status)) {
         return res.status(400).json({
            error: "Status should be one of these: WAITING/IN_PRODUCTION/DONE"
         })
      }

      await Order.findByIdAndUpdate(orderId, { status: status})
      res.sendStatus(204);

   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: 'Internal server error!'
      })
   }
}
