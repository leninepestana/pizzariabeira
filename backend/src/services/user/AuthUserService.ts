import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Username or password did not match");
    }

    // Verificar se a password está correcta
    const passMatch = await compare(password, user.password);

    if (!passMatch) {
      throw new Error("Username or password did not match");
    }

    // Gerar um token JWT e devolver os dados do utilizador (id, name, email)

    console.log(email, password);

    return { ok: true };
  }
}

export { AuthUserService };
