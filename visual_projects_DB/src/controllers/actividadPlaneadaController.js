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
 * Funcion para contar el total de las activiades planeadas asociadas a un cronograma del proyecto.
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
 * Funcion para contar el total de las activiades planeadas asociadas a un cronograma del proyecto.
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