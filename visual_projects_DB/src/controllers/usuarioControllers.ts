import { Request, Response } from "express";
import { initModels} from "../models/init-models"
import { sequelize } from "../db/conection";
let initModel= initModels(sequelize)
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");

/**
 * Función para logear el usuario
 */

export async function login(req: Request, res: Response) {
  req = req.body.data.user;
  const { password }: any = req;
  const { email }: any = req;
  try {
    const user :any = await initModel.usuario.findOne({
      where: { correo: email },
      include: [
        {
          model: initModel.lider,
          as: "liders",
        },
        {
            model: initModel.director,
            as: "directors",
          },
      ],
    });
    if(!user)
    {
      return  responseMessage(res, 404, false,"Error el usuario no se encuentra registrado");
    }
    else{
        const login = await bcrypt.compare(password, user.dataValues.contrasena);   
        if (login) {
          return  responseMessage(res, 200, user,"Usuario logeado correctamente");
        }
        return  responseMessage(res, 404, false,"Error la contraseña es incorrecta");
    }
  } catch (error) {
    return  responseMessage(res, 503, error,"error server ...");
  }
}
