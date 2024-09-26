"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findActivitiesFinishGoal = exports.findActivitiesEjecutionGoal = exports.findActivitiesOrganizationGoal = exports.findActivitiesInitialGoal = exports.findActivitiesFinish = exports.findActivitiesEjecution = exports.findActivitiesOrganization = exports.findActivitiesInitial = exports.findTotalActivities = exports.findTotalActivitiesPlanned = exports.findActivitiesActive = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const sequelize_1 = __importDefault(require("sequelize"));
async function findActivitiesActive(idCronograma) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                attributes: [
                    [
                        sequelize_1.default.fn("COUNT", sequelize_1.default.col("idActividad")),
                        "contadorActividad",
                    ],
                ],
                where: {
                    Estado_idEstado: {
                        [sequelize_1.default.Op.not]: 4 // Estado diferente de 4
                    }
                },
            },
        ],
    });
    //console.log("contadorTareaPlaneada", contadorActividad[0].dataValues.actividads[0] )
    let totalActividades = contadorActividad[0].dataValues.actividads[0] ? contadorActividad[0].dataValues.actividads[0].dataValues.contadorActividad : 0;
    return totalActividades;
}
exports.findActivitiesActive = findActivitiesActive;
async function findTotalActivitiesPlanned(idCronograma) {
    const contadorActividadPlaneada = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividadplaneada,
                as: "actividadplaneadas",
                attributes: [
                    [
                        sequelize_1.default.fn("COUNT", sequelize_1.default.col("idActividadPlaneada")),
                        "contadorActividadPlaneada",
                    ],
                ],
            },
        ],
    });
    // console.log("contadorTareaPlaneada", contadorActividadPlaneada)
    let totalActividadesPlaneadas = contadorActividadPlaneada[0].dataValues.actividadplaneadas[0] ? contadorActividadPlaneada[0].dataValues.actividadplaneadas[0].dataValues.contadorActividadPlaneada : 0;
    // console.log("contadorTareaPlaneada", totalActividadesPlaneadas)
    return totalActividadesPlaneadas;
}
exports.findTotalActivitiesPlanned = findTotalActivitiesPlanned;
async function findTotalActivities(idCronograma) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findTotalActivities = findTotalActivities;
async function findActivitiesInitial(idCronograma) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
                where: {
                    Estado_idEstado: 1,
                },
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findActivitiesInitial = findActivitiesInitial;
async function findActivitiesOrganization(idCronograma) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
                where: {
                    Estado_idEstado: 2,
                },
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findActivitiesOrganization = findActivitiesOrganization;
async function findActivitiesEjecution(idCronograma) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
                where: {
                    Estado_idEstado: 3,
                },
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findActivitiesEjecution = findActivitiesEjecution;
async function findActivitiesFinish(idCronograma) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
                where: {
                    Estado_idEstado: 4,
                },
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findActivitiesFinish = findActivitiesFinish;
async function findActivitiesInitialGoal(idMeta) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            idMeta: idMeta,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
                where: {
                    Estado_idEstado: 1,
                },
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findActivitiesInitialGoal = findActivitiesInitialGoal;
async function findActivitiesOrganizationGoal(idMeta) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            idMeta: idMeta,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
                where: {
                    Estado_idEstado: 2,
                },
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findActivitiesOrganizationGoal = findActivitiesOrganizationGoal;
async function findActivitiesEjecutionGoal(idMeta) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            idMeta: idMeta,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
                where: {
                    Estado_idEstado: 3,
                },
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findActivitiesEjecutionGoal = findActivitiesEjecutionGoal;
async function findActivitiesFinishGoal(idMeta) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            idMeta: idMeta,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                //attributes: [],
                where: {
                    Estado_idEstado: 4,
                },
            },
        ],
    });
    let totalActividades = 0;
    contadorActividad.forEach((meta) => {
        totalActividades += meta.actividads.length;
    });
    return totalActividades;
}
exports.findActivitiesFinishGoal = findActivitiesFinishGoal;
