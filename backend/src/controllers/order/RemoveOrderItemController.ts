import { Request, Response } from "express";
import { RemoveOrderItemService } from "../../services/order/RemoveOrderItemService";

class RemoveOrderItemController {
  async handle(req: Request, res: Response) {
    const orderItem_id = req.query.orderItem_id as string;
    const removeOrderItemService = new RemoveOrderItemService();
    const order = await removeOrderItemService.execute({ orderItem_id });
    return res.json(order);
  }
}
export { RemoveOrderItemController };
