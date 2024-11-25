"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTaskFinishActivity = exports.findTaskEjecutionActivity = exports.findTaskOrganizationActivity = exports.findTaskInitialActivity = exports.findTaskFinish = exports.findTaskEjecution = exports.findTaskOrganization = exports.findTaskInitial = exports.findTaskActive = exports.findTotalTask = exports.findTotalTaskPlanned = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const sequelize_1 = __importDefault(require("sequelize"));
async function findTotalTaskPlanned(idCronograma) {
    const contadorTareaPlaneada = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividadplaneada,
                as: "actividadplaneadas",
                include: [
                    {
                        model: initModel.tareaplaneada,
                        as: "tareaplaneadas",
                        where: {
                            cronogramaOriginal: true,
                        },
                    },
                ],
            },
        ],
    });
    let totalTareasPlaneadas = 0;
    contadorTareaPlaneada.forEach((meta) => {
        meta.actividadplaneadas?.forEach((actividad) => {
            totalTareasPlaneadas += actividad.tareaplaneadas.length;
        });
    });
    return totalTareasPlaneadas;
}
exports.findTotalTaskPlanned = findTotalTaskPlanned;
async function findTotalTask(idCronograma) {
    //console.log("contadorTarea", idCronograma);
    const contadorTarea = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                include: [
                    {
                        model: initModel.tarea,
                        as: "tareas",
                    },
                ],
            },
        ],
    });
    let totalTareas = 0;
    for (let i = 0; i < contadorTarea.length; i++) {
        const meta = contadorTarea[i];
        if (meta.dataValues.actividads.length > 0) {
            for (let j = 0; j < meta.dataValues.actividads.length; j++) {
                const actividad = meta.dataValues.actividads[j];
                if (actividad.dataValues.tareas.length > 0) {
                    totalTareas += actividad.dataValues.tareas.length;
                }
            }
        }
    }
    return totalTareas;
}
exports.findTotalTask = findTotalTask;
async function findTaskActive(idCronograma) {
    const contadorTarea = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                include: [
                    {
                        model: initModel.tarea,
                        as: "tareas",
                        where: {
                            Estado_idEstado: {
                                [sequelize_1.default.Op.ne]: 4, // Utilizar $ne para "no igual a 4"
                            },
                        },
                    },
                ],
            },
        ],
    });
    let totalTareas = 0;
    for (let i = 0; i < contadorTarea.length; i++) {
        const meta = contadorTarea[i];
        if (meta.dataValues.actividads.length > 0) {
            for (let j = 0; j < meta.dataValues.actividads.length; j++) {
                const actividad = meta.dataValues.actividads[j];
                if (actividad.dataValues.tareas.length > 0) {
                    totalTareas += actividad.dataValues.tareas.length;
                }
            }
        }
    }
    return totalTareas;
}
exports.findTaskActive = findTaskActive;
async function findTaskInitial(idCronograma) {
    const contadorTarea = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                include: [
                    {
                        model: initModel.tarea,
                        as: "tareas",
                    },
                ],
            },
        ],
    });
    // Calcular el total de tareas filtradas por Estado_idEstado = 1 directamente
    let totalTareas = 0;
    contadorTarea.forEach((meta) => {
        meta.actividads.forEach((actividad) => {
            const tareasFiltradas = actividad.tareas.filter(tarea => tarea.Estado_idEstado === 1);
            totalTareas += tareasFiltradas.length;
        });
    });
    return totalTareas;
}
exports.findTaskInitial = findTaskInitial;
async function findTaskOrganization(idCronograma) {
    const contadorTarea = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                include: [
                    {
                        model: initModel.tarea,
                        as: "tareas",
                    },
                ],
            },
        ],
    });
    // Calcular el total de tareas filtradas por Estado_idEstado = 1 directamente
    let totalTareas = 0;
    contadorTarea.forEach((meta) => {
        meta.actividads.forEach((actividad) => {
            const tareasFiltradas = actividad.tareas.filter(tarea => tarea.Estado_idEstado === 2);
            totalTareas += tareasFiltradas.length;
        });
    });
    return totalTareas;
}
exports.findTaskOrganization = findTaskOrganization;
async function findTaskEjecution(idCronograma) {
    const contadorTarea = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                include: [
                    {
                        model: initModel.tarea,
                        as: "tareas",
                    },
                ],
            },
        ],
    });
    // Calcular el total de tareas filtradas por Estado_idEstado = 1 directamente
    let totalTareas = 0;
    contadorTarea.forEach((meta) => {
        meta.actividads.forEach((actividad) => {
            const tareasFiltradas = actividad.tareas.filter(tarea => tarea.Estado_idEstado === 3);
            totalTareas += tareasFiltradas.length;
        });
    });
    return totalTareas;
}
exports.findTaskEjecution = findTaskEjecution;
async function findTaskFinish(idCronograma) {
    const contadorTarea = await initModel.meta.findAll({
        where: {
            Cronograma_idCronograma: idCronograma,
        },
        include: [
            {
                model: initModel.actividad,
                as: "actividads",
                include: [
                    {
                        model: initModel.tarea,
                        as: "tareas",
                    },
                ],
            },
        ],
    });
    // Calcular el total de tareas filtradas por Estado_idEstado = 1 directamente
    let totalTareas = 0;
    contadorTarea.forEach((meta) => {
        meta.actividads.forEach((actividad) => {
            const tareasFiltradas = actividad.tareas.filter(tarea => tarea.Estado_idEstado === 4);
            totalTareas += tareasFiltradas.length;
        });
    });
    return totalTareas;
}
exports.findTaskFinish = findTaskFinish;
async function findTaskInitialActivity(idActividad) {
    const contadorTarea = await initModel.actividad.findAll({
        where: {
            idActividad: idActividad,
        },
        include: [
            {
                model: initModel.tarea,
                as: "tareas",
                where: {
                    Estado_idEstado: 1,
                },
            },
        ],
    });
    let totalTareas = 0;
    for (let i = 0; i < contadorTarea.length; i++) {
        const meta = contadorTarea[i];
        if (meta?.dataValues?.tareas?.length > 0) {
            totalTareas += meta.dataValues.tareas.length;
        }
    }
    return totalTareas;
}
exports.findTaskInitialActivity = findTaskInitialActivity;
async function findTaskOrganizationActivity(idActividad) {
    const contadorTarea = await initModel.actividad.findAll({
        where: {
            idActividad: idActividad,
        },
        include: [
            {
                model: initModel.tarea,
                as: "tareas",
                where: {
                    Estado_idEstado: 2,
                },
            },
        ],
    });
    let totalTareas = 0;
    for (let i = 0; i < contadorTarea.length; i++) {
        const meta = contadorTarea[i];
        if (meta.dataValues.tareas.length > 0) {
            totalTareas += meta.dataValues.tareas.length;
        }
    }
    return totalTareas;
}
exports.findTaskOrganizationActivity = findTaskOrganizationActivity;
async function findTaskEjecutionActivity(idActividad) {
    const contadorTarea = await initModel.actividad.findAll({
        where: {
            idActividad: idActividad,
        },
        include: [
            {
                model: initModel.tarea,
                as: "tareas",
                where: {
                    Estado_idEstado: 3,
                },
            },
        ],
    });
    let totalTareas = 0;
    for (let i = 0; i < contadorTarea.length; i++) {
        const meta = contadorTarea[i];
        if (meta.dataValues.tareas.length > 0) {
            totalTareas += meta.dataValues.tareas.length;
        }
    }
    return totalTareas;
}
exports.findTaskEjecutionActivity = findTaskEjecutionActivity;
async function findTaskFinishActivity(idActividad) {
    const contadorTarea = await initModel.actividad.findAll({
        where: {
            idActividad: idActividad,
        },
        include: [
            {
                model: initModel.tarea,
                as: "tareas",
                where: {
                    Estado_idEstado: 4,
                },
            },
        ],
    });
    let totalTareas = 0;
    for (let i = 0; i < contadorTarea.length; i++) {
        const meta = contadorTarea[i];
        if (meta.dataValues.tareas.length > 0) {
            totalTareas += meta.dataValues.tareas.length;
        }
    }
    return totalTareas;
}
exports.findTaskFinishActivity = findTaskFinishActivity;
//# sourceMappingURL=findTask.js.map