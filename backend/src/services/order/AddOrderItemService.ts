import prismaClient from "../../prisma";

interface OrderItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddOrderItemService {
  async execute({ order_id, product_id, amount }: OrderItemRequest) {
    const orderItem = await prismaClient.orderItem.create({
      data: { order_id: order_id, product_id: product_id, amount },
    });
    return { orderItem };
  }
}
export { AddOrderItemService };
