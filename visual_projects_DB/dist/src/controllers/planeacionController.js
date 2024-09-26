"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearPlaneacion = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const utils_1 = require("../helpers/utils");
async function crearPlaneacion(req, res) {
    try {
        req = req.body.data.planeacion;
        const { idProyecto } = req;
        const { objetivoProyecto } = req;
        const { presupuestoProyecto } = req;
        const planeacion = await initModel.planeacion.create({
            objetivo: objetivoProyecto,
            presupuesto: presupuestoProyecto
        });
        if (planeacion) {
            let idPlaneacion = planeacion.dataValues.idPlaneacion;
            const cronograma = await initModel.cronograma.create({
                Planeacion_idPlaneacion: idPlaneacion
            });
            let idCronograma = cronograma.dataValues.idCronograma;
            let data = {
                Planeacion_idPlaneacion: idPlaneacion,
                Cronograma_idCronograma: idCronograma
            };
            const proyectoUpdate = await initModel.proyecto.update(data, {
                where: { idProyecto: idProyecto }
            });
            const proyecto = await initModel.proyecto.findOne({
                where: { idProyecto: idProyecto }
            });
            if (proyectoUpdate.length > 0) {
                return (0, utils_1.responseMessage)(res, 202, [proyecto], "proyecto creado correctamente");
            }
            else {
                return (0, utils_1.responseMessage)(res, 501, false, "error al crear el proyecto de la planeación...");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 501, false, "error al crear la planeación...");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.crearPlaneacion = crearPlaneacion;
