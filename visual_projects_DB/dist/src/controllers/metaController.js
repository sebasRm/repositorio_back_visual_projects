"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarMeta = exports.eliminarMeta = exports.actualizarMetaEstado = exports.consultarPresupuestoMeta = exports.contarEstadoMetas = exports.crearMeta = exports.consultarMetasProyecto = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
const findGoals_1 = require("../services/findGoals");
const findActivities_1 = require("../services/findActivities");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
/**
 * @description Esta función consulta las metas asociadas a un cronograma específico.
 * Incluye información sobre el estado de las metas, el progreso de actividades y tareas asociadas.
 *
 * @route GET /consultar-metas-proyecto/:idCronograma
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idCronograma` (string): ID del cronograma asociado a las metas.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los datos de las metas y su progreso:
 * - 200: Si se encuentran metas asociadas al cronograma.
 *   - Incluye información sobre:
 *     - Estados de las metas.
 *     - Actividades y tareas organizadas por estado (`Inicial`, `Organización`, `Ejecución`, `Finalizadas`).
 *     - Totales de actividades y tareas.
 * - 404: Si no existen metas asociadas al cronograma.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta o procesamiento de datos.
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
/**
 * @description Crea una nueva meta asociada a un cronograma específico.
 *
 * @route POST /crear-meta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idCronograma` (number): ID del cronograma al que se asociará la meta.
 * - `nombre` (string): Nombre de la meta.
 * - `descripcion` (string): Descripción de la meta.
 * - `presupuesto` (number): Presupuesto asignado (opcional, inicializado como 0).
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con el resultado de la creación:
 * - 200: Si la meta fue creada exitosamente.
 * - 500: Si ocurrió un error durante la creación de la meta.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la creación de la meta.
 */
async function crearMeta(req, res) {
    try {
        req = req.body.data.goal;
        const { idCronograma } = req;
        const { nombre } = req;
        const { descripcion } = req;
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
/**
 * @description Cuenta el número de metas en diferentes estados asociados a un cronograma.
 *
 * @route POST /contar-estado-metas
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idCronograma` (number): ID del cronograma cuyas metas se desean contar.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los conteos de metas por estado:
 * - 200: Si se obtienen los conteos correctamente.
 *   - Devuelve un array con los totales en el siguiente orden:
 *     - Metas en estado `Inicio`.
 *     - Metas en estado `Organización`.
 *     - Metas en estado `Ejecución`.
 *     - Metas en estado `Finalizado`.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante el cálculo de los estados.
 */
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
 * @description Consulta una meta específica y calcula el presupuesto total de sus actividades cerradas.
 *
 * @route GET /consultar-presupuesto-meta/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idMeta` (number): ID de la meta a consultar.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los datos de la meta y su presupuesto:
 * - 200: Si se encuentra la meta.
 *   - Incluye:
 *     - Datos de la meta.
 *     - `presupuestoCerrado`: Suma de los presupuestos de las actividades cerradas.
 * - 404: Si no se encuentra ninguna meta con el ID proporcionado.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta o el cálculo del presupuesto.
 */
async function consultarPresupuestoMeta(req, res) {
    let idMeta = req.params.idMeta;
    try {
        let meta = await initModel.meta.findOne({
            where: { idMeta: idMeta },
            include: [
                {
                    model: initModel.actividad,
                    as: "actividads",
                    required: false,
                    where: {
                        Estado_idEstado: 4,
                    },
                },
            ],
        });
        if (meta) {
            let presupuestoActividadesCerradas = 0;
            if (meta.dataValues?.actividads.length > 0) {
                let actividades = meta.dataValues?.actividads;
                for (const actividad in actividades) {
                    let presupuesto = actividades[actividad].dataValues.presupuesto;
                    presupuestoActividadesCerradas += presupuesto;
                }
            }
            meta.dataValues.presupuestoCerrado = presupuestoActividadesCerradas;
            delete meta.dataValues.actividads;
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
                await initModel.meta.update(estadoMeta, {
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
                await initModel.meta.update(estadoMeta, {
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
/**
 * @description Elimina una meta específica y todos sus datos relacionados, incluyendo actividades, tareas y recursos asociados.
 *
 * @route DELETE /eliminar-meta/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idMeta` (number): ID de la meta a eliminar.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si la meta y todos los datos relacionados fueron eliminados exitosamente.
 * - 404: Si no se pudo eliminar la meta.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la eliminación de la meta o sus datos relacionados.
 */
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
/**
 * @description Actualiza el nombre y la descripción de una meta específica.
 *
 * @route PUT /actualizar-meta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idMeta` (number): ID de la meta a actualizar.
 * - `nombre` (string): Nuevo nombre de la meta.
 * - `descripcion` (string): Nueva descripción de la meta.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si la meta fue actualizada exitosamente.
 * - 500: Si ocurrió un error al intentar actualizar la meta.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la meta.
 */
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