"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTareaPlaneada = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
/**
 * Función para buscar una tarea planeada en el sistema.
 * Dado el nombre de una tarea, consulta la base de datos para obtener la información asociada.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Espera que el cuerpo de la solicitud tenga la estructura `{ data: { task: { nombreTarea } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la consulta.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Tarea encontrada exitosamente, retorna la información de la tarea.
 *    - 400: Error en la solicitud, el nombre de la tarea no fue proporcionado.
 *    - 503: Error en el servidor durante la consulta.
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