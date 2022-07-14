import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddOrderItemController } from "./controllers/order/AddOrderItemController";
import { RemoveOrderItemController } from "./controllers/order/RemoveOrderItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS DE UTILIZADORES --
router.post("/users", new CreateUserController().handle);
// Rota de login
router.post("/session", new AuthUserController().handle);
// Rota de detalhes do utilizador
router.get("/userinfo", isAuthenticated, new DetailUserController().handle);
// -- ROTAS DE CATEGORIAS --
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
// Listar categorias
router.get("/categories", isAuthenticated, new ListCategoryController().handle);

// -- ROTAS DE PRODUCT --
// Criar producto
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);
// Listar productos dentro de uma categoria
router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

// -- ROTAS DE ORDER --
// Criar uma order
router.post(
  "/order/create",
  isAuthenticated,
  new CreateOrderController().handle
);

// Apagar uma order
router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveOrderController().handle
);

// Adicionar items a Order
router.post(
  "/order/additem",
  isAuthenticated,
  new AddOrderItemController().handle
);

// Remover Item de uma Order
router.delete(
  "/order/removeitem",
  isAuthenticated,
  new RemoveOrderItemController().handle
);

// Atualizar o draft
router.put("/order/send", isAuthenticated, new SendOrderController().handle);

// Listar todas as Orders
router.get("/orders", isAuthenticated, new ListOrdersController().handle);

// Listar os detalhes da Order
router.get(
  "/order/detail",
  isAuthenticated,
  new DetailOrderController().handle
);

// Finalizar a Order
router.put(
  "/order/finish",
  isAuthenticated,
  new FinishOrderController().handle
);

export { router };
