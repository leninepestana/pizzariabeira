import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

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

// -- ROTAS DE PRODUCTOS --
// Criar producto
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);
export { router };
