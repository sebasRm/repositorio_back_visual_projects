"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indicatorProjectCPI = exports.indicatorProjectSPI = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
async function indicatorProjectSPI(req, res) {
    try {
        req = req.body.data.project;
        const { idCronograma } = req;
        const { idPlaneacion } = req;
        let ev = 0;
        let acitividadesCompletadas = await initModel.meta.findAll({
            where: { Cronograma_idCronograma: idCronograma },
            include: [
                {
                    model: initModel.actividad,
                    as: "actividads",
                    attributes: ["nombre", "presupuesto"],
                    where: {
                        Estado_idEstado: 4,
                    },
                },
            ],
        });
        if (acitividadesCompletadas.length > 0) {
            let pv = await initModel.planeacion.findOne({
                where: { idPlaneacion: idPlaneacion },
                attributes: ["presupuesto"],
            });
            if (pv) {
                pv = pv.dataValues.presupuesto;
                for (let goal in acitividadesCompletadas) {
                    let cursorActivities = acitividadesCompletadas[goal].dataValues.actividads;
                    for (let activity in cursorActivities) {
                        let nombre = cursorActivities[activity].dataValues.nombre;
                        let actividadesPlaneadas = await initModel.actividadplaneada.findAll({ where: { nombre: nombre }, attributes: ['presupuesto'] });
                        ev += actividadesPlaneadas[0].dataValues.presupuesto;
                    }
                }
                let spi = ev / pv;
                let dataSPI = {
                    ev: ev,
                    pv: pv,
                    spi: spi
                };
                if (spi) {
                    return (0, utils_1.responseMessage)(res, 200, dataSPI, "SPI del proyecto");
                }
                else {
                    return (0, utils_1.responseMessage)(res, 400, false, "error al consultar sl spi");
                }
            }
            else {
                let dataSPI = {
                    ev: 0,
                    pv: 0,
                    spi: -1
                };
                return (0, utils_1.responseMessage)(res, 200, dataSPI, "no tiene planeacion");
            }
        }
        else {
            let dataSPI = {
                ev: 0,
                pv: 0,
                spi: 0
            };
            return (0, utils_1.responseMessage)(res, 200, dataSPI, "SPI del proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.indicatorProjectSPI = indicatorProjectSPI;
async function indicatorProjectCPI(req, res) {
    try {
        req = req.body.data.project;
        const { idCronograma } = req;
        const { idPlaneacion } = req;
        let ev = 0;
        let ac = 0;
        let acitividadesCompletadas = await initModel.meta.findAll({
            where: { Cronograma_idCronograma: idCronograma },
            include: [
                {
                    model: initModel.actividad,
                    as: "actividads",
                    attributes: ["nombre", "presupuesto"],
                    where: {
                        Estado_idEstado: 4,
                    },
                },
            ],
        });
        if (acitividadesCompletadas.length > 0) {
            for (let goal in acitividadesCompletadas) {
                let cursorActivities = acitividadesCompletadas[goal].dataValues.actividads;
                for (let activity in cursorActivities) {
                    let nombre = cursorActivities[activity].dataValues.nombre;
                    let presupuesto = cursorActivities[activity].dataValues.presupuesto;
                    ac += presupuesto;
                    let actividadesPlaneadas = await initModel.actividadplaneada.findAll({ where: { nombre: nombre }, attributes: ['presupuesto'] });
                    ev += actividadesPlaneadas[0].dataValues.presupuesto;
                }
            }
            if (ac == 0) {
                let dataSPI = {
                    ev: 0,
                    ac: 0,
                    cpi: 0
                };
                return (0, utils_1.responseMessage)(res, 200, dataSPI, "SPI del proyecto");
            }
            let cpi = ev / ac;
            let dataSPI = {
                ev: ev,
                ac: ac,
                cpi: cpi
            };
            if (cpi) {
                return (0, utils_1.responseMessage)(res, 200, dataSPI, "SPI del proyecto");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "error al consultar sl spi");
            }
        }
        else {
            let dataSPI = {
                ev: 0,
                ac: 0,
                cpi: 0
            };
            return (0, utils_1.responseMessage)(res, 200, dataSPI, "SPI del proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.indicatorProjectCPI = indicatorProjectCPI;
