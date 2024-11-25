import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import {
  serviceIndicatorProjectSPI,
  serviceIndicatorProjectCPI,
} from "../services/indicators";


/**
 * @description Esta función consulta todos los proyectos asociados a un director, 
 * incluyendo detalles sobre la planeación, estado y líder del proyecto, así como 
 * los indicadores SPI y CPI calculados para cada proyecto. Si los proyectos son 
 * encontrados, se devuelve una lista con todos los proyectos y sus indicadores. 
 * Si no se encuentran proyectos, se devuelve un mensaje indicando que no existen proyectos asociados al director.
 * En caso de error en el servidor, se devuelve un mensaje con el error.
 * 
 * @route GET /consultar-proyectos
 * @param {Request} req - El objeto de la solicitud HTTP. 
 * El objeto `req` no tiene parámetros específicos en la URL, pero incluye las credenciales necesarias en el encabezado si es necesario.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si los proyectos son encontrados, devuelve una lista de proyectos con sus detalles e indicadores SPI y CPI.
 * - 404: Si no se encuentran proyectos asociados al director, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
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

/**
 * @description Esta función consulta todos los proyectos asociados a un director específico, 
 * identificado por su `idDirector`. Incluye detalles sobre la planeación, estado y líder del proyecto, 
 * así como los indicadores SPI y CPI calculados para cada proyecto. Si los proyectos son 
 * encontrados, se devuelve una lista con todos los proyectos y sus indicadores. 
 * Si no se encuentran proyectos, se devuelve un mensaje indicando que no existen proyectos asociados al director.
 * En caso de error en el servidor, se devuelve un mensaje con el error.
 * 
 * @route GET /consultar-proyectos-director/:idDirector
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idDirector` en la URL. 
 * Ejemplo: `/consultar-proyectos-director/123`
 * El parámetro `idDirector` debe ser un identificador único del director.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si los proyectos son encontrados, devuelve una lista de proyectos con sus detalles e indicadores SPI y CPI.
 * - 404: Si no se encuentran proyectos asociados al director, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
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

/**
 * @description Esta función consulta todos los proyectos asociados a un líder específico, 
 * identificado por su `idLider`. La función devuelve una lista con los proyectos asociados 
 * a ese líder, incluyendo detalles sobre el estado y la planeación del proyecto. 
 * Si no se encuentran proyectos, se devuelve un mensaje indicando que no existen proyectos asociados al líder.
 * En caso de error en el servidor, se devuelve un mensaje con el error.
 * 
 * @route GET /consultar-proyectos-lider/:idLider
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idLider` en la URL. 
 * El parámetro `idLider` debe ser un identificador único del líder. Ejemplo: `/consultar-proyectos-lider/45`.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si se encuentran proyectos asociados al líder, devuelve una lista de proyectos con sus detalles.
 * - 404: Si no existen proyectos asociados al líder, devuelve un mensaje indicando la ausencia de proyectos.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
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

/**
 * @description Esta función permite la creación de un nuevo proyecto. Los datos del proyecto, 
 * como el nombre, descripción, líder y director, se reciben en el cuerpo de la solicitud. 
 * Antes de crear el proyecto, la función verifica si ya existe un proyecto con el mismo nombre. 
 * Si el proyecto se crea con éxito, se devuelve una respuesta indicando la creación correcta. 
 * Si ya existe un proyecto con el mismo nombre o ocurre algún error, se devuelve un mensaje adecuado.
 * 
 * @route POST /crear-proyecto
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el cuerpo de la solicitud en formato JSON con los siguientes datos:
 * - `name` (string): Nombre del proyecto. Ejemplo: `"Proyecto Alpha"`.
 * - `descripcion` (string): Descripción del proyecto. Ejemplo: `"Descripción del proyecto Alpha"`.
 * - `idLider` (number): Identificador del líder asociado al proyecto. Ejemplo: `2`.
 * - `idDirector` (number): Identificador del director asociado al proyecto. Ejemplo: `1`.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el proyecto es creado con éxito, devuelve los datos del proyecto recién creado.
 * - 404: Si ya existe un proyecto con el mismo nombre, devuelve un mensaje indicando el conflicto.
 * - 400: Si ocurre un error al crear el proyecto, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function crearProyectos(req: Request, res: Response) {
  try {
    req = req.body.data.project;
    const { name }: any = req;
    const { descripcion }: any = req;
    const { idLider }: any = req;
    const { idDirector }: any = req;
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

/**
 * @description Esta función elimina un proyecto específico identificado por su `idProyecto`. 
 * Durante el proceso, también elimina las dependencias relacionadas con el proyecto, como metas, 
 * actividades, tareas y recursos asociados. La función asegura que todas las relaciones 
 * jerárquicas sean eliminadas antes de eliminar el proyecto.
 * 
 * @route DELETE /eliminar-proyecto/:idProyecto
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idProyecto` en la URL:
 * - `idProyecto` (number): Identificador único del proyecto a eliminar.
 *   Ejemplo: `/eliminar-proyecto/123`.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el proyecto y sus dependencias se eliminan con éxito.
 * - 404: Si el proyecto no se encuentra o hay un error al eliminar.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la operación de eliminación.
 */

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
          await initModel.meta.destroy({
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

/**
 * @description Esta función actualiza los detalles de un proyecto específico, incluyendo su 
 * nombre, descripción, estado, fechas de inicio y finalización, y presupuesto planificado. 
 * Si el proyecto tiene una planeación asociada, también actualiza el presupuesto dentro de la planeación.
 * 
 * @route PUT /actualizar-proyecto
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el cuerpo de la solicitud en formato JSON con los siguientes datos:
 * - `idProyecto` (number): Identificador único del proyecto a actualizar.
 * - `name` (string): Nuevo nombre del proyecto. Ejemplo: `"Proyecto Beta"`.
 * - `descripcion` (string): Nueva descripción del proyecto. Ejemplo: `"Descripción del proyecto Beta"`.
 * - `idEstado` (number): Identificador del nuevo estado del proyecto.
 * - `fechaInicio` (Date): Nueva fecha de inicio del proyecto. Ejemplo: `"2024-01-01"`.
 * - `fechaFinal` (Date): Nueva fecha de finalización del proyecto. Ejemplo: `"2024-12-31"`.
 * - `presupuesto` (number): Nuevo presupuesto planificado del proyecto.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el proyecto se actualiza con éxito.
 * - 400: Si hay un error al actualizar el proyecto.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la operación de actualización.
 */

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
