"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarResponsables = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const utils_1 = require("../helpers/utils");
/**
 * Función para buscar todos los usuarios registrados en  el sistema
 */
async function buscarResponsables(req, res) {
    try {
        const user = await initModel.usuario.findAll({});
        if (user) {
            return (0, utils_1.responseMessage)(res, 202, user, "usuarios registrados");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "no existen usuarios registrados");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.buscarResponsables = buscarResponsables;
