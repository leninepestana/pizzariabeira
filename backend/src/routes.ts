import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// Rotas User
router.post("/users", new CreateUserController().handle);
// Rota de login
router.post("/session", new AuthUserController().handle);
// Rota de detalhes do utilizador
router.get("/userinfo", isAuthenticated, new DetailUserController().handle);

export { router };
