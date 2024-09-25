import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import {
  serviceIndicatorProjectSPI,
  serviceIndicatorProjectCPI,
} from "../services/indicators";
const bcrypt = require("bcrypt");
import Sequelize, { Op } from "sequelize";
/*
   => Funcion para consultar todos los proyectos
*/
export async function consultarProyectos(req: Request, res: Response) {
  try {
    const proyectos: any = await initModel.proyecto.findAll({
      include: [
        {
          model: initModel.planeacion,
          as: "Planeacion_",
        },
        {
          model: initModel.estado,
          as: "Estado_",
        },
        {
          model: initModel.lider,
          as: "Lider_",
          include: [
            {
              model: initModel.usuario,
              as: "Usuario_",
            },
          ],
        },
      ],
    });
    if (proyectos) {
      let proyecto: any;
      //console.log("soy el proyectos", proyectos)
      for (proyecto in proyectos) {
        let Planeacion_idPlaneacion = proyectos[proyecto].dataValues
          ? proyectos[proyecto].dataValues.Planeacion_idPlaneacion
          : 0;
        let Cronograma_idCronograma = proyectos[proyecto].dataValues
          ? proyectos[proyecto].dataValues.Planeacion_idPlaneacion
          : 0;

        let spi = await serviceIndicatorProjectSPI(
          Cronograma_idCronograma,
          Planeacion_idPlaneacion
        );
        let cpi = await serviceIndicatorProjectCPI(
          Cronograma_idCronograma,
          Planeacion_idPlaneacion
        );
        proyectos[proyecto].dataValues.indicator_spi = spi;
        proyectos[proyecto].dataValues.indicator_cpi = cpi;
      }
      return responseMessage(
        res,
        200,
        proyectos,
        "proyectos asociados al director"
      );
    } else {
      return responseMessage(
        res,
        404,
        false,
        "no existen proyectos asociados al director"
      );
    }
  } catch (error) {
    console.log("soy el error", error);
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Funcion para consultar todos los proyectos asociados a un director
*/
export async function consultarProyectosDirector(req: Request, res: Response) {
  try {
    let id_director = req.params.idDirector;
    const proyectos:any = await initModel.proyecto.findAll({
      where: {
        Director_idDirector: id_director,
      },
      include: [
        {
          model: initModel.planeacion,
          as: "Planeacion_",
        },
        {
          model: initModel.estado,
          as: "Estado_",
        },
        {
          model: initModel.lider,
          as: "Lider_",
          include: [
            {
              model: initModel.usuario,
              as: "Usuario_",
            },
          ],
        },
      ],
    });
    if (proyectos) {
      let proyecto: any;
      //console.log("soy el proyectos", proyectos)
      for (proyecto in proyectos) {
        let Planeacion_idPlaneacion = proyectos[proyecto].dataValues
          ? proyectos[proyecto].dataValues.Planeacion_idPlaneacion
          : 0;
        let Cronograma_idCronograma = proyectos[proyecto].dataValues
          ? proyectos[proyecto].dataValues.Planeacion_idPlaneacion
          : 0;

        let spi = await serviceIndicatorProjectSPI(
          Cronograma_idCronograma,
          Planeacion_idPlaneacion
        );
        let cpi = await serviceIndicatorProjectCPI(
          Cronograma_idCronograma,
          Planeacion_idPlaneacion
        );
        proyectos[proyecto].dataValues.indicator_spi = spi;
        proyectos[proyecto].dataValues.indicator_cpi = cpi;
      }
      return responseMessage(
        res,
        200,
        proyectos,
        "proyectos asociados al director"
      );
    } else {
      return responseMessage(
        res,
        404,
        false,
        "no existen proyectos asociados al director"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar todos el proyecto asociados a un líder
*/
export async function consultarProyectosLider(req: Request, res: Response) {
  try {
    let id_lider = req.params.idLider;
    const lideres: any = await initModel.proyecto.findAll({
      include: [
        {
          model: initModel.lider,
          as: "Lider_",
          where: {
            idLider: id_lider,
          },
        },
        {
          model: initModel.estado,
          as: "Estado_",
        },
        {
          model: initModel.planeacion,
          as: "Planeacion_",
        },
      ],
    });
    if (lideres.length > 0) {
      return responseMessage(res, 200, lideres, "Proyecto asociado al líder");
    } else {
      return responseMessage(
        res,
        404,
        false,
        "No existen proyectos asociados al líderes"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Funcion para crear un proyecto
*/
export async function crearProyectos(req: Request, res: Response) {
  try {
    req = req.body.data.project;
    const { name }: any = req;
    const { descripcion }: any = req;
    const { idLider }: any = req;
    const { idDirector }: any = req;
    console.log("soy el verdadero");
    const proyectoExist: any = await initModel.proyecto.findOne({
      where: { nombre: name },
    });
    if (proyectoExist) {
      return responseMessage(
        res,
        404,
        false,
        "Ya se encuentra registrado un proyecto con ese nombre"
      );
    }
    const proyectos: any = await initModel.proyecto.create({
      nombre: name,
      descripcion: descripcion,
      fechaInicio: new Date(),
      Estado_idEstado: 1,
      Lider_idLider: idLider,
      Director_idDirector: idDirector,
    });
    if (proyectos) {
      return responseMessage(
        res,
        200,
        proyectos,
        "Proyecto creado correctamente"
      );
    } else {
      return responseMessage(res, 400, false, "Error al crear la meta");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function eliminarProyecto(req: Request, res: Response) {
  try {
    let idProyecto: any = req.params.idProyecto;

    let proyecto = await initModel.proyecto.findOne({
      where: { idProyecto: idProyecto },
    });

    if (proyecto) {
      let idCronograma = proyecto.dataValues.Cronograma_idCronograma;
      let idPlaneacion = proyecto.dataValues.Planeacion_idPlaneacion;
      let metas = await initModel.meta.findAll({
        where: { Cronograma_idCronograma: idCronograma },
      });

      if (metas.length > 0) {
        for (const meta in metas) {
          let idMeta = metas[meta].dataValues.idMeta;
          let actividades = await initModel.actividad.findAll({
            where: { Meta_idMeta: idMeta },
          });
          for (const actividad in actividades) {
            let idActividad = actividades[actividad].dataValues.idActividad;
            let tareas = await initModel.tarea.findAll({
              where: { Actividad_idActividad: idActividad },
            });
            if (tareas.length > 0) {
              for (const tarea in tareas) {
                let idTarea = tareas[tarea].dataValues.idTarea;
                await initModel.recurso.destroy({
                  where: { Tarea_idTarea: idTarea },
                });
                await initModel.tarea.destroy({
                  where: { idTarea: idTarea },
                });
              }
            }
            await initModel.recurso.destroy({
              where: { Actividad_idActividad: idActividad },
            });
            await initModel.actividad.destroy({
              where: { idActividad: idActividad },
            });
          }

          // Eliminar las actividades y tareas planeadas
          let actividadesPlaneadas = await initModel.actividadplaneada.findAll({
            where: { Meta_idMeta: idMeta },
          });

          if (actividadesPlaneadas.length > 0) {
            for (const actividad in actividadesPlaneadas) {
              let idActividad =
                actividadesPlaneadas[actividad].dataValues.idActividadPlaneada;
              let tareas = await initModel.tareaplaneada.findAll({
                where: { ActividadPlaneada_idActividadPlaneada: idActividad },
              });
              if (tareas.length > 0) {
                for (const tarea in tareas) {
                  let idTarea = tareas[tarea].dataValues.idTareaPlaneada;
                  await initModel.tareaplaneada.destroy({
                    where: { idTareaPlaneada: idTarea },
                  });
                }
              }
              await initModel.actividadplaneada.destroy({
                where: { idActividadPlaneada: idActividad },
              });
            }
          }
          let metaDeleted = await initModel.meta.destroy({
            where: { idMeta: idMeta },
          });
        }
      }
    }
    let planeacionDeleted = await initModel.proyecto.destroy({
      where: { idProyecto: idProyecto },
    });

    if (planeacionDeleted) {
      return responseMessage(
        res,
        200,
        planeacionDeleted,
        "Se elimino el proyecto exitosamente"
      );
    } else {
      return responseMessage(res, 404, [], "Error al eliminar el proyecto");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function actualizarProyecto(req: Request, res: Response) {
  try {
    req = req.body.data.project;
    const { idProyecto }: any = req;
    const { name }: any = req;
    const { descripcion }: any = req;
    const { idEstado }: any = req;
    const { fechaInicio }: any = req;
    const { fechaFinal }: any = req;
    const { presupuesto }: any = req;

    const project = {
      nombre: name,
      descripcion: descripcion,
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal,
      Estado_idEstado: idEstado,
    };
    const proyectoUpdate: any = await initModel.proyecto.update(project, {
      where: { idProyecto: idProyecto },
    });
    const proyecto: any = await initModel.proyecto.findOne({
      where: { idProyecto: idProyecto },
    });
    const idPlaneacion = proyecto.dataValues.Planeacion_idPlaneacion;
    console.log('soy el idPlaneacion',idPlaneacion)
    if (idPlaneacion) {
      const presupuestoPlanificado = {
        presupuesto: presupuesto,
      };
      const proyectoUpdate: any = await initModel.planeacion.update(
        presupuestoPlanificado,
        {
          where: { idPlaneacion: idPlaneacion },
        }
      );
    }

    if (proyectoUpdate) {
      return responseMessage(
        res,
        200,
        proyectoUpdate,
        "Proyecto actualizado correctamente"
      );
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error al actualizar el proyecto"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}
