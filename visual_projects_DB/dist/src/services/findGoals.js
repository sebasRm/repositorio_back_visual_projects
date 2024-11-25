"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTaskTotal = exports.findTaskState = exports.findActivitiesTotal = exports.findActivitiesState = exports.findStateGoalService = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const sequelize_1 = __importDefault(require("sequelize"));
async function findStateGoalService(idCronograma, estado) {
    const contadorMetas = await initModel.meta.findAll({
        where: { Cronograma_idCronograma: idCronograma },
        attributes: [
            [
                sequelize_1.default.fn("COUNT", sequelize_1.default.col("idMeta")),
                "contadorMetas",
            ],
        ],
        include: [
            {
                model: initModel.estado,
                as: "Estado_",
                where: { idEstado: estado },
                attributes: [],
            },
        ]
    });
    return contadorMetas;
}
exports.findStateGoalService = findStateGoalService;
async function findActivitiesState(idMeta, estado) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            idMeta: idMeta,
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
                    Estado_idEstado: estado,
                },
            },
        ],
    });
    let totalActividades = contadorActividad[0].dataValues.actividads[0] ? contadorActividad[0].dataValues.actividads[0].dataValues.contadorActividad : 0;
    return totalActividades;
}
exports.findActivitiesState = findActivitiesState;
async function findActivitiesTotal(idMeta) {
    const contadorActividad = await initModel.meta.findAll({
        where: {
            idMeta: idMeta,
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
            },
        ],
    });
    let totalActividades = contadorActividad[0].dataValues.actividads[0] ? contadorActividad[0].dataValues.actividads[0].dataValues.contadorActividad : 0;
    return totalActividades;
}
exports.findActivitiesTotal = findActivitiesTotal;
async function findTaskState(idMeta, estado) {
    const contadorTarea = await initModel.meta.findAll({
        where: {
            idMeta: idMeta,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                include: [{
                        model: initModel.tarea,
                        as: "tareas",
                        attributes: [
                            [
                                sequelize_1.default.fn("COUNT", sequelize_1.default.col("idTarea")),
                                "contadorTareas",
                            ],
                        ],
                        where: {
                            Estado_idEstado: estado
                        }
                    }]
            },
        ],
    });
    let totalTareas = contadorTarea[0].dataValues.actividads[0]?.dataValues.tareas[0] ? contadorTarea[0].dataValues.actividads[0].dataValues.tareas[0].dataValues.contadorTareas : 0;
    //console.log("taskInitial", totalTareas)
    return totalTareas;
}
exports.findTaskState = findTaskState;
async function findTaskTotal(idMeta) {
    const contadorTarea = await initModel.meta.findAll({
        where: {
            idMeta: idMeta,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                include: [{
                        model: initModel.tarea,
                        as: "tareas",
                        attributes: [
                            [
                                sequelize_1.default.fn("COUNT", sequelize_1.default.col("idTarea")),
                                "contadorTareas",
                            ],
                        ],
                    }]
            },
        ],
    });
    //console.log("taskInitial", contadorTarea[0].dataValues.actividads[0])
    let totalTareas = contadorTarea[0].dataValues.actividads[0]?.dataValues.tareas[0] ? contadorTarea[0].dataValues.actividads[0].dataValues.tareas[0].dataValues.contadorTareas : 0;
    return totalTareas;
}
exports.findTaskTotal = findTaskTotal;
//# sourceMappingURL=findGoals.js.map