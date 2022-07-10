import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log("Chamou esse middleware");
  // Receber o token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  //   console.log(authToken);
  const [, token] = authToken.split(" ");
  //   console.log(token);
  try {
    // Validar o token
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    // console.log(sub);
    // Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
