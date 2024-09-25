import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
/*
   => Funcion para consultar todos los lideres
*/
export async function consultarLideres(req: Request, res: Response) {
  try {
    const lideres: any = await initModel.lider.findAll({
      include: [
        {
          model: initModel.usuario,
          as: "Usuario_",
        },
      ],
    });
    if (lideres) {
      return responseMessage(res, 200, lideres, "Líderes creados actualmente");
    } else {
      return responseMessage(res, 404, false, "No existen líderes registrados");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Funcion para consultar todos los lideres sin un proyecto asociado
*/
export async function consultarLideresSinProyecto(req: Request, res: Response) {
  try {
    let lideresOnProjects = [];
    const lideres: any = await initModel.lider.findAll({
      include: [
        {
          model: initModel.usuario,
          as: "Usuario_",
        },
        {
          model: initModel.proyecto,
          as: "proyectos",
        },
      ],
    });

    if (lideres.length > 0) {
      for (let lider in lideres) {
        let cursorProject = lideres[lider].dataValues.proyectos;
        if (cursorProject.length == 0) {
          let cursorUser = lideres[lider].dataValues.Usuario_;
          cursorUser.dataValues.idLider = lideres[lider].dataValues.idLider;
          lideresOnProjects.push(cursorUser);
        }
      }
      return responseMessage(
        res,
        200,
        lideresOnProjects,
        "Líderes sin proyectos asociados"
      );
    } else {
      return responseMessage(res, 404, false, "No existen líderes registrados");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Funcion para crear un lider
*/

export async function crearLider(req: Request, res: Response) {
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
      return responseMessage(
        res,
        400,
        false,
        "Ya existe un líder asociado con ese correo"
      );
    } else {
      const user: any = await initModel.usuario.create({
        nombre: name,
        correo: email,
        contrasena: passwordCrypt,
      });
      const lider: any = await initModel.lider.create({
        Usuario_idUsuario: user.dataValues.idUsuario,
      });
      if (lider) {
        return responseMessage(res, 200, lider, "Líder creado correctamente");
      }
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function eliminarLider(req: Request, res: Response) {
  try {
    let idLider = req.params.idLider;

    const proyecto: any = await initModel.proyecto.findOne({
      where: { Lider_idLider: idLider },
    });
    if (!proyecto) {
      const lider: any = await initModel.lider.findOne({
        where: { idLider: idLider },
      });
      const idUsuario = lider.dataValues.Usuario_idUsuario
      console.log("soy el idUsuario",idUsuario)
     
      const lideres: any = await initModel.lider.destroy({
        where: { idLider: idLider },
      });
      await initModel.usuario.destroy({
        where: { idUsuario: idUsuario },
      });
      if (lideres) {
        return responseMessage(
          res,
          200,
          lideres,
          "Líder eliminado existosamente"
        );
      }
    } else {
      return responseMessage(
        res,
        404,
        false,
        "Error al eliminar el Líder, tiene un proyecto asociado"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function actualizarLider(req: Request, res: Response) {
  try {
    req = req.body.data.lider;
    const { idLider }: any = req;
    const { nombre }: any = req;

    const usuario={nombre:nombre}  
    const lider = await initModel.lider.findOne({
      where: {
        idLider: idLider,
      },
    });
    const idUsuario=lider?.dataValues.Usuario_idUsuario
    const usuarioUpdate = await initModel.usuario.update(usuario,{
      where: {
        idUsuario: idUsuario,
      },
    });
    if (usuarioUpdate) {
      return responseMessage(
        res,
        200,
        usuarioUpdate,
        "Líder actualizado existosamente"
      );
    } 
    else{
      return responseMessage(
        res,
        400,
        false,
        "Error al actualizar el líder"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}