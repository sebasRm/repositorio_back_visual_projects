"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTareaPlaneada = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
/**
 * Funcion para contar el total de las activiades planeadas asociadas a un cronograma del proyecto.
 */
async function buscarTareaPlaneada(req, res) {
    req = req.body.data.task;
    const { nombreTarea } = req;
    try {
        if (nombreTarea) {
            let tarea = await initModel.tareaplaneada.findOne({
                where: { nombre: nombreTarea },
            });
            return (0, utils_1.responseMessage)(res, 200, tarea, "Informacion de contador de total de actividades planeadas, reales, terminadas y activas y tareas.");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, "Error al buscar la tarea", "el id esta en null");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.buscarTareaPlaneada = buscarTareaPlaneada;
//# sourceMappingURL=tareaPlaneadaController.js.map