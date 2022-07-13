import prismaClient from "../../prisma";

interface OrderItemRequest {
  orderItem_id: string;
}
class RemoveOrderItemService {
  async execute({ orderItem_id }: OrderItemRequest) {
    const order = await prismaClient.orderItem.delete({
      where: { id: orderItem_id },
    });
    return { order };
  }
}
export { RemoveOrderItemService };
