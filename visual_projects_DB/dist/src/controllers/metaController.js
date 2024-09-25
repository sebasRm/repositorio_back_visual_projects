"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarMeta = exports.eliminarMeta = exports.actualizarMetaEstado = exports.consultarPresupuestoMeta = exports.contarEstadoMetas = exports.crearMeta = exports.consultarMetasProyecto = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
const findGoals_1 = require("../services/findGoals");
const findActivities_1 = require("../services/findActivities");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
/*
   => Funcion para consultar todos los proyectos
*/
async function consultarMetasProyecto(req, res) {
    try {
        let idCronograma = req.params.idCronograma;
        const cronogramaExist = await initModel.meta.findAll({
            where: { Cronograma_idCronograma: idCronograma },
            include: [
                { model: initModel.estado, as: "Estado_", attributes: ["nombre"] },
            ],
        });
        if (cronogramaExist.length > 0) {
            for (const goal in cronogramaExist) {
                let activitiesInitial = await (0, findGoals_1.findActivitiesState)(cronogramaExist[goal].dataValues.idMeta, 1);
                let activitiesOrganization = await (0, findGoals_1.findActivitiesState)(cronogramaExist[goal].dataValues.idMeta, 2);
                let activitiesEjecution = await (0, findGoals_1.findActivitiesState)(cronogramaExist[goal].dataValues.idMeta, 3);
                let activitiesFinish = await (0, findGoals_1.findActivitiesState)(cronogramaExist[goal].dataValues.idMeta, 4);
                let activitiesTotal = await (0, findGoals_1.findActivitiesTotal)(cronogramaExist[goal].dataValues.idMeta);
                let noActivity;
                if (activitiesInitial === 0 &&
                    activitiesOrganization === 0 &&
                    activitiesEjecution === 0 &&
                    activitiesFinish === 0) {
                    noActivity = 0.0001;
                }
                let totalActivitiesGoal = [
                    activitiesInitial,
                    activitiesOrganization,
                    activitiesEjecution,
                    activitiesFinish,
                    noActivity
                ];
                let taskInitial = await (0, findGoals_1.findTaskState)(cronogramaExist[goal].dataValues.idMeta, 1);
                let taskOrganization = await (0, findGoals_1.findTaskState)(cronogramaExist[goal].dataValues.idMeta, 2);
                let taskEjecution = await (0, findGoals_1.findTaskState)(cronogramaExist[goal].dataValues.idMeta, 3);
                let taskFinish = await (0, findGoals_1.findTaskState)(cronogramaExist[goal].dataValues.idMeta, 4);
                let taskTotal = await (0, findGoals_1.findTaskTotal)(cronogramaExist[goal].dataValues.idMeta);
                if (taskInitial === 0 &&
                    taskOrganization === 0 &&
                    taskEjecution === 0 &&
                    taskFinish === 0) {
                    noActivity = 0.0001;
                }
                let totaltaskGoal = [
                    taskInitial,
                    taskOrganization,
                    taskEjecution,
                    taskFinish,
                    noActivity
                ];
                cronogramaExist[goal].dataValues.totalActivitiesGoal =
                    totalActivitiesGoal;
                cronogramaExist[goal].dataValues.activitiesTotal = activitiesTotal;
                cronogramaExist[goal].dataValues.totaltaskGoal = totaltaskGoal;
                cronogramaExist[goal].dataValues.taskTotal = taskTotal;
            }
            return (0, utils_1.responseMessage)(res, 200, cronogramaExist, "Metas asociadas al proyecto");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "no existen metas asociadas al proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarMetasProyecto = consultarMetasProyecto;
async function crearMeta(req, res) {
    try {
        req = req.body.data.goal;
        const { idCronograma } = req;
        const { nombre } = req;
        const { descripcion } = req;
        const { presupuesto } = req;
        const createGoal = await initModel.meta.create({
            nombre: nombre,
            descripcion: descripcion,
            presupuesto: 0,
            Cronograma_idCronograma: idCronograma,
            Estado_idEstado: 1,
        });
        if (createGoal) {
            return (0, utils_1.responseMessage)(res, 200, createGoal, "Meta creada con exito");
        }
        else {
            return (0, utils_1.responseMessage)(res, 500, false, "Error al crear la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.crearMeta = crearMeta;
async function contarEstadoMetas(req, res) {
    try {
        req = req.body.data.goal;
        const { idCronograma } = req;
        let stateStart = await (0, findGoals_1.findStateGoalService)(idCronograma, 1);
        let stateOrganization = await (0, findGoals_1.findStateGoalService)(idCronograma, 2);
        let stateExecution = await (0, findGoals_1.findStateGoalService)(idCronograma, 3);
        let stateFinish = await (0, findGoals_1.findStateGoalService)(idCronograma, 4);
        stateStart = stateStart[0].dataValues.contadorMetas
            ? stateStart[0].dataValues.contadorMetas
            : 0;
        stateOrganization = stateOrganization[0].dataValues.contadorMetas
            ? stateOrganization[0].dataValues.contadorMetas
            : 0;
        stateExecution = stateExecution[0].dataValues.contadorMetas
            ? stateExecution[0].dataValues.contadorMetas
            : 0;
        stateFinish = stateFinish[0].dataValues.contadorMetas
            ? stateFinish[0].dataValues.contadorMetas
            : 0;
        return (0, utils_1.responseMessage)(res, 200, [stateStart, stateOrganization, stateExecution, stateFinish], "Meta creada con exito");
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.contarEstadoMetas = contarEstadoMetas;
/**
 * Funcion para contar el total de las activiades planeadas asociadas a un cronograma del proyecto.
 */
async function consultarPresupuestoMeta(req, res) {
    let idMeta = req.params.idMeta;
    try {
        let meta = await initModel.meta.findOne({
            where: { idMeta: idMeta },
        });
        if (meta) {
            return (0, utils_1.responseMessage)(res, 200, meta, "Meta.");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "Error no se encontro ninguna meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarPresupuestoMeta = consultarPresupuestoMeta;
async function actualizarMetaEstado(req, res) {
    try {
        req = req.body.data.goal;
        const { idMeta } = req;
        if (idMeta !== null) {
            let activityInitial = await (0, findActivities_1.findActivitiesInitialGoal)(idMeta);
            let activityOrganization = await (0, findActivities_1.findActivitiesOrganizationGoal)(idMeta);
            let activityEjecution = await (0, findActivities_1.findActivitiesEjecutionGoal)(idMeta);
            let activityFinish = await (0, findActivities_1.findActivitiesFinishGoal)(idMeta);
            if (activityInitial == 0 &&
                activityOrganization == 0 &&
                activityEjecution == 0 &&
                activityFinish == 0) {
                let estadoMeta = {
                    Estado_idEstado: 1,
                };
                const actividad = await initModel.meta.update(estadoMeta, {
                    where: {
                        idMeta: idMeta,
                    },
                });
            }
            else {
                const maxTarea = Math.max(activityInitial, activityOrganization, activityEjecution, activityFinish);
                // Determina cuál variable tiene el valor máximo
                let tareaMaxima;
                if (maxTarea === activityInitial) {
                    tareaMaxima = 1;
                }
                else if (maxTarea === activityOrganization) {
                    tareaMaxima = 2;
                }
                else if (maxTarea === activityEjecution) {
                    tareaMaxima = 3;
                }
                else if (maxTarea === activityFinish) {
                    const maxTarea = Math.max(activityInitial, activityOrganization, activityEjecution);
                    if (maxTarea !== 0) {
                        if (maxTarea === activityInitial) {
                            tareaMaxima = 1;
                        }
                        else if (maxTarea === activityOrganization) {
                            tareaMaxima = 2;
                        }
                        else if (maxTarea === activityEjecution) {
                            tareaMaxima = 3;
                        }
                    }
                    else {
                        tareaMaxima = 4;
                    }
                }
                let estadoMeta = {
                    Estado_idEstado: tareaMaxima,
                };
                const actividad = await initModel.meta.update(estadoMeta, {
                    where: {
                        idMeta: idMeta,
                    },
                });
            }
            return (0, utils_1.responseMessage)(res, 200, [
                activityInitial,
                activityOrganization,
                activityEjecution,
                activityFinish,
            ], "Meta actualizada con exito.");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [0, 0.1], "Error al obtener porcentaje del proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarMetaEstado = actualizarMetaEstado;
async function eliminarMeta(req, res) {
    try {
        let idMeta = req.params.idMeta;
        let actividades = await initModel.actividad.findAll({
            where: { Meta_idMeta: idMeta },
        });
        if (actividades.length > 0) {
            for (const actividad in actividades) {
                let idActividad = actividades[actividad].dataValues.idActividad;
                let tareas = await initModel.tarea.findAll({
                    where: { Actividad_idActividad: idActividad },
                });
                if (tareas.length > 0) {
                    for (const tarea in tareas) {
                        let idTarea = tareas[tarea].dataValues.idTarea;
                        await initModel.recurso.destroy({
                            where: { Tarea_idTarea: idTarea },
                        });
                        await initModel.tarea.destroy({
                            where: { idTarea: idTarea },
                        });
                    }
                }
                await initModel.recurso.destroy({
                    where: { Actividad_idActividad: idActividad },
                });
                await initModel.actividad.destroy({
                    where: { idActividad: idActividad },
                });
            }
        }
        // Eliminar las actividades y tareas planeadas
        let actividadesPlaneadas = await initModel.actividadplaneada.findAll({
            where: { Meta_idMeta: idMeta },
        });
        if (actividadesPlaneadas.length > 0) {
            for (const actividad in actividadesPlaneadas) {
                let idActividad = actividadesPlaneadas[actividad].dataValues.idActividadPlaneada;
                let tareas = await initModel.tareaplaneada.findAll({
                    where: { ActividadPlaneada_idActividadPlaneada: idActividad },
                });
                if (tareas.length > 0) {
                    for (const tarea in tareas) {
                        let idTarea = tareas[tarea].dataValues.idTareaPlaneada;
                        await initModel.tareaplaneada.destroy({
                            where: { idTareaPlaneada: idTarea },
                        });
                    }
                }
                await initModel.actividadplaneada.destroy({
                    where: { idActividadPlaneada: idActividad },
                });
            }
        }
        let metaDeleted = await initModel.meta.destroy({
            where: { idMeta: idMeta },
        });
        if (metaDeleted) {
            return (0, utils_1.responseMessage)(res, 200, metaDeleted, "Se elimino la meta exitosamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, [], "Erro al eliminar la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.eliminarMeta = eliminarMeta;
async function actualizarMeta(req, res) {
    try {
        req = req.body.data.goal;
        const { idMeta } = req;
        const { nombre } = req;
        const { descripcion } = req;
        const meta = {
            nombre: nombre,
            descripcion: descripcion
        };
        const updateGoal = await initModel.meta.update(meta, {
            where: { idMeta: idMeta }
        });
        if (updateGoal) {
            return (0, utils_1.responseMessage)(res, 200, updateGoal, "Meta actualizada con exito");
        }
        else {
            return (0, utils_1.responseMessage)(res, 500, false, "Error al actualizar la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarMeta = actualizarMeta;
//# sourceMappingURL=metaController.js.map