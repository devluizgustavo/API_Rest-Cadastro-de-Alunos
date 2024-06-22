import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errors: ["Dados invalidos."] });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ errors: ["Usuário não existe."] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(400).json({ errors: ["Senha invalida."] });
    }

    const { id } = user;
    //                     Resgatar Dados |         token          | expiração
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      //Tempo que o token irá durar
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new TokenController();
