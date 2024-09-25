import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");


export async function crearDirector(req: Request, res: Response) {
    try {
      req = req.body.data.user;
      const { name }: any = req;
      const { email }: any = req;
      const { password }: any = req;
      const passwordCrypt = await bcrypt.hash(password, 10);
      const userExist = await initModel.usuario.findOne({
        where: {
          correo: email,
        },
      });
      if (userExist) {
        return  responseMessage(res, 400, false,"Ya existe un director asociado con ese correo");
      } else {
        const user: any = await initModel.usuario.create({
          nombre: name,
          correo: email,
          contrasena: passwordCrypt,
        });
        const director: any = await initModel.director.create({
          Usuario_idUsuario: user.dataValues.idUsuario,
        });
        if (director) {
            return  responseMessage(res, 200, director, "Director creado exitosamente");
        }
      }
    } catch (error) {
      return responseMessage(res, 400, error, "error server ...");
    }
  }
  