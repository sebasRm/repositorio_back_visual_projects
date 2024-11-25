import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
/**
 * @description Consulta todos los líderes registrados, incluyendo los usuarios asociados a cada líder.
 * 
 * @route GET /consultar-lideres
 * @param {Request} req - El objeto de la solicitud HTTP.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si existen líderes registrados, junto con los datos de los líderes y sus usuarios asociados.
 * - 404: Si no se encuentran líderes registrados.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la consulta de los líderes.
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

/**
 * @description Consulta todos los líderes que no están asociados a un proyecto, incluyendo los usuarios asociados a cada líder.
 * 
 * @route GET /consultar-lideres-sin-proyecto
 * @param {Request} req - El objeto de la solicitud HTTP.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si existen líderes sin proyectos asociados, junto con los datos de los líderes y sus usuarios asociados.
 * - 404: Si no se encuentran líderes sin proyectos registrados.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la consulta de los líderes sin proyecto.
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

/**
 * @description Crea un nuevo líder asociando un usuario y una contraseña cifrada. 
 * Verifica que no exista ya un usuario con el mismo correo.
 * 
 * @route POST /crear-lider
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener los datos del usuario (nombre, correo, contraseña).
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si el líder fue creado correctamente, junto con los datos del líder.
 * - 400: Si ya existe un líder con el mismo correo.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la creación del líder o al verificar la existencia del correo.
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
/**
 * @description Elimina un líder junto con su usuario asociado, siempre y cuando el líder no esté asignado a un proyecto.
 * 
 * @route DELETE /eliminar-lider/:idLider
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el parámetro `idLider` en la URL.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si el líder y su usuario fueron eliminados correctamente.
 * - 404: Si el líder tiene un proyecto asociado y no puede ser eliminado.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error al eliminar el líder o al verificar la existencia de un proyecto asociado.
 */

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

/**
 * @description Actualiza el nombre de un líder en la base de datos. 
 * La actualización se realiza en el usuario asociado al líder, buscando el `idLider` 
 * y actualizando el nombre del usuario correspondiente.
 * 
 * @route PUT /actualizar-lider
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener los datos del líder (idLider, nombre) dentro del cuerpo de la solicitud.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si el líder fue actualizado correctamente.
 * - 400: Si hubo un error al intentar actualizar el líder.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la actualización del líder o al intentar encontrar el usuario asociado.
 */

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