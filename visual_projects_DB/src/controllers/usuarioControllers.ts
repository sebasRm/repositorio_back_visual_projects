import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");

/**
 * Función para autenticar un usuario en el sistema.
 * Realiza la validación del correo y la contraseña del usuario contra la base de datos,
 * y retorna la información correspondiente según el estado del inicio de sesión.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Espera que el cuerpo de la solicitud tenga la estructura `{ data: { user: { email, password } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la autenticación.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Inicio de sesión exitoso, retorna los datos del usuario.
 *    - 404: Usuario no encontrado o contraseña incorrecta.
 *    - 503: Error en el servidor.
 */

export async function login(req: Request, res: Response) {
  req = req.body.data.user;
  const { password }: any = req;
  const { email }: any = req;
  try {
    const user: any = await initModel.usuario.findOne({
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
    if (!user) {
      return responseMessage(
        res,
        404,
        false,
        "Error el usuario no se encuentra registrado"
      );
    } else {
      const login = await bcrypt.compare(password, user.dataValues.contrasena);
      if (login) {
        return responseMessage(res, 200, user, "Usuario logeado correctamente");
      }
      return responseMessage(
        res,
        404,
        false,
        "Error la contraseña es incorrecta"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}
