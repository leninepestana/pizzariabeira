import { Request, Response } from "express";
import { AddOrderItemService } from "../../services/order/AddOrderItemService";

class AddOrderItemController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;
    const addOrderItem = new AddOrderItemService();
    const addOrder = await addOrderItem.execute({
      order_id,
      product_id,
      amount,
    });
    return res.json(addOrder);
  }
}
export { AddOrderItemController };
