import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();

// Rotas User
router.post("/users", new CreateUserController().handle);
// Rota de login
router.post("/session", new AuthUserController().handle);

export { router };
