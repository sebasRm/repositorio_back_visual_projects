"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarActividadPlaneada = exports.informationIndicators = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const findActivities_1 = require("../services/findActivities");
const findTask_1 = require("../services/findTask");
/**
 * @description Obtiene información relacionada con los indicadores del cronograma de un proyecto.
 * La función calcula y devuelve el total de actividades planeadas, actividades reales, actividades terminadas,
 * actividades activas, tareas planeadas, tareas reales, tareas terminadas y tareas activas asociadas a un cronograma.
 *
 * @route POST /informationIndicators
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la información de los indicadores se obtuvo correctamente, con los valores de las actividades y tareas.
 * - 400: Si no se proporciona un `idCronograma` o si no existe un valor válido.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante el cálculo de los indicadores o al consultar la base de datos.
 */
async function informationIndicators(req, res) {
    req = req.body.data.activity;
    const { idCronograma } = req;
    try {
        if (idCronograma) {
            let totalActivitiesPlanned = await (0, findActivities_1.findTotalActivitiesPlanned)(idCronograma);
            let totalActivities = await (0, findActivities_1.findTotalActivities)(idCronograma);
            let activitiesFinish = await (0, findActivities_1.findActivitiesFinish)(idCronograma);
            let activitiesActive = await (0, findActivities_1.findActivitiesActive)(idCronograma);
            let totalTask = await (0, findTask_1.findTotalTask)(idCronograma);
            let taskFinish = await (0, findTask_1.findTaskFinish)(idCronograma);
            let taskActive = await (0, findTask_1.findTaskActive)(idCronograma);
            let totalTaskPlanned = await (0, findTask_1.findTotalTaskPlanned)(idCronograma);
            return (0, utils_1.responseMessage)(res, 200, {
                totalActivitiesPlanned,
                totalActivities,
                activitiesFinish,
                activitiesActive,
                totalTaskPlanned,
                totalTask,
                taskFinish,
                taskActive,
            }, "Informacion de contador de total de actividades planeadas, reales, terminadas y activas y tareas.");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [{ contadorActividad: 0 }], "el id esta en null");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.informationIndicators = informationIndicators;
/**
 * @description Busca y devuelve información sobre una actividad planeada específica mediante su nombre.
 * La función consulta la base de datos para obtener los detalles de una actividad planeada con el nombre proporcionado.
 *
 * @route POST /buscarActividadPlaneada
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `nombreActividad` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad planeada se encuentra correctamente, devuelve los detalles de la actividad.
 * - 400: Si no se proporciona un `nombreActividad` o si ocurre un error al buscar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error al buscar la actividad en la base de datos.
 */
async function buscarActividadPlaneada(req, res) {
    req = req.body.data.activity;
    const { nombreActividad } = req;
    try {
        if (nombreActividad) {
            let actividad = await initModel.actividadplaneada.findOne({
                where: { nombre: nombreActividad },
            });
            return (0, utils_1.responseMessage)(res, 200, actividad, "Informacion de contador de total de actividades planeadas, reales, terminadas y activas y tareas.");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, "Error al busca la actividad", "el id esta en null");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.buscarActividadPlaneada = buscarActividadPlaneada;
//# sourceMappingURL=actividadPlaneadaController.js.map