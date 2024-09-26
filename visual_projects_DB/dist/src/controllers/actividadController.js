"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarActividadEstado = exports.eliminarActividad = exports.consultarPresupuestoActividad = exports.consultarRecursosActividad = exports.actualizarActividad = exports.actualizarActividadCierre = exports.actualizarActividadEjecucion = exports.actualizarActividadInicio = exports.actualizarActividadOrganizacion = exports.consultarActividadesMetaCierre = exports.consultarActividadesMetaEjecucion = exports.consultarActividadesMetaOrganizacion = exports.consultarActividadesMetaInicio = exports.crearActividad = exports.consultarActividadesMeta = exports.porcentajeActividadesTermidas = exports.contarActividadesActivas = exports.contarActividadesFinalizadas = exports.contarTotalActividades = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const sequelize_1 = require("sequelize");
const findActivities_1 = require("../services/findActivities");
const findTask_1 = require("../services/findTask");
/**
 * Funcion para contar el total de las activiades asociadas a un cronograma del proyecto.
 */
async function contarTotalActividades(req, res) {
    req = req.body.data.activity;
    const { idCronograma } = req;
    try {
        if (idCronograma) {
            let activitiesTotal = await (0, findActivities_1.findTotalActivities)(idCronograma);
            return (0, utils_1.responseMessage)(res, 200, activitiesTotal, "Total de las activiades asociadas a un cronograma del proyecto");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, 0, "el id esta en null");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.contarTotalActividades = contarTotalActividades;
/**
 * Funcion para contat el total de las activiades finalizadas asociadas a un cronograma del proyecto.
 */
async function contarActividadesFinalizadas(req, res) {
    req = req.body.data.activity;
    const { idCronograma } = req;
    try {
        if (idCronograma) {
            const contadorActividad = await (0, findActivities_1.findActivitiesFinish)(idCronograma);
            console.log("soy el contadorActividad", contadorActividad);
            if (contadorActividad) {
                return (0, utils_1.responseMessage)(res, 200, [{ contadorActividad: contadorActividad.contadorActividad }], "Total de las activiades finalizadas asociadas a un cronograma del proyecto.");
            }
            else {
                return (0, utils_1.responseMessage)(res, 200, [{ contadorActividad: 0 }], "Total de las activiades finalizadas asociadas a un cronograma del proyecto.");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [{ contadorActividad: 0 }], "Total de las activiades finalizadas asociadas a un cronograma del proyecto.");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.contarActividadesFinalizadas = contarActividadesFinalizadas;
async function contarActividadesActivas(req, res) {
    req = req.body.data.activity;
    const { idCronograma } = req;
    try {
        if (idCronograma) {
            const contadorActividad = await (0, findActivities_1.findActivitiesInitial)(idCronograma);
            if (contadorActividad) {
                return (0, utils_1.responseMessage)(res, 200, [{ contadorActividad: contadorActividad.contadorActividad }], "Total de las activiades Activas asociadas a un cronograma del proyecto.");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [{ contadorActividad: 0 }], "Total de las activiades Activas asociadas a un cronograma del proyecto.");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.contarActividadesActivas = contarActividadesActivas;
/*
   => Funcion para crear el porcetaje de las actividades donde el estado esta en cierre o 4
*/
async function porcentajeActividadesTermidas(req, res) {
    try {
        req = req.body.data.activity;
        const { idCronograma } = req;
        if (idCronograma !== null) {
            let actividadesActivas = await (0, findActivities_1.findActivitiesInitial)(idCronograma);
            let actividadesOrganization = await (0, findActivities_1.findActivitiesOrganization)(idCronograma);
            console.log("actividadesActivas", actividadesOrganization);
            let actividadesEjecution = await (0, findActivities_1.findActivitiesEjecution)(idCronograma);
            let actividadesFinish = await (0, findActivities_1.findActivitiesFinish)(idCronograma);
            let noActivity;
            if (actividadesActivas == 0 &&
                actividadesOrganization == 0 &&
                actividadesEjecution == 0 &&
                actividadesFinish == 0) {
                noActivity = 0.0001;
            }
            return (0, utils_1.responseMessage)(res, 200, [
                actividadesActivas,
                actividadesOrganization,
                actividadesEjecution,
                actividadesFinish,
                noActivity
            ], "Total de las activiades Activas asociadas a un cronograma del proyecto.");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [0, 0.1], "Error al obtener porcentaje del proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.porcentajeActividadesTermidas = porcentajeActividadesTermidas;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function consultarActividadesMeta(req, res) {
    try {
        let idMeta = req.params.idMeta;
        const actividades = await initModel.actividad.findAll({
            where: { Meta_idMeta: idMeta },
            include: [
                {
                    model: initModel.responsable,
                    as: "Responsable_",
                    include: [
                        {
                            model: initModel.usuario,
                            as: "Usuario_",
                            attributes: { exclude: ["contrasena"] },
                        },
                    ],
                },
                {
                    model: initModel.estado,
                    as: "Estado_",
                },
                {
                    model: initModel.tarea,
                    as: "tareas",
                    attributes: [],
                },
            ],
        });
        // Iterar sobre las actividades para contar el número de tareas asociadas a cada una
        const actividadesConTareas = await Promise.all(actividades.map(async (actividad) => {
            const contadorTareas = await initModel.tarea.count({
                where: { Actividad_idActividad: actividad.idActividad },
            });
            // Agregar el contador de tareas como un atributo adicional a la actividad
            return {
                ...actividad.toJSON(), // Convertir la actividad a objeto plano
                contadorTareas,
            };
        }));
        if (actividadesConTareas.length > 0) {
            return (0, utils_1.responseMessage)(res, 200, actividadesConTareas, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [], "No existen actividades asociados a la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarActividadesMeta = consultarActividadesMeta;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function crearActividad(req, res) {
    try {
        req = req.body.data.activity;
        const { nombre } = req;
        const { descripcion } = req;
        const { presupuesto } = req;
        const { fechaInicio } = req;
        const { fechaFinal } = req;
        const { usuario } = req;
        const { meta } = req;
        const { cronograma } = req;
        let createPlannedExist = await initModel.actividadplaneada.findOne({
            where: { nombre: nombre },
        });
        if (!createPlannedExist) {
            let responsableExist = await initModel.responsable.findOne({
                where: { Usuario_idUsuario: usuario },
            });
            !responsableExist
                ? (responsableExist = await initModel.responsable.create({
                    Usuario_idUsuario: usuario,
                }))
                : "";
            let idResponsable = responsableExist.dataValues.idResponsable;
            let createPlannedActivity = await initModel.actividadplaneada.create({
                nombre: nombre,
                descripcion: descripcion,
                presupuesto: presupuesto,
                fechaInicio: fechaInicio,
                FechaFinal: fechaFinal,
                Estado_idEstado: 1,
                Meta_idMeta: meta,
                Responsable_idResponsable: idResponsable,
                cronogramaOriginal: cronograma,
            });
            if (createPlannedActivity) {
                let createActivity = await initModel.actividad.create({
                    nombre: nombre,
                    descripcion: descripcion,
                    presupuesto: 0,
                    Estado_idEstado: 1,
                    Meta_idMeta: meta,
                    Responsable_idResponsable: idResponsable,
                });
                if (createActivity) {
                    return (0, utils_1.responseMessage)(res, 200, createActivity, "Actividad creada con exito");
                }
                else {
                    return (0, utils_1.responseMessage)(res, 400, false, "Error al crear la actividad");
                }
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error al crear la actividad planeada");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error el nombre ya se encuentra registrado");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.crearActividad = crearActividad;
/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
async function consultarActividadesMetaInicio(req, res) {
    try {
        let idMeta = req.params.idMeta;
        const lideres = await initModel.actividad.findAll({
            where: { Meta_idMeta: idMeta, Estado_idEstado: 1 },
        });
        if (lideres.length > 0) {
            let arrayLideres = [];
            for (let lider in lideres) {
                arrayLideres.push(lideres[lider].dataValues.idActividad);
            }
            return (0, utils_1.responseMessage)(res, 200, arrayLideres, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [], "No existen actividades asociados a la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarActividadesMetaInicio = consultarActividadesMetaInicio;
/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
async function consultarActividadesMetaOrganizacion(req, res) {
    try {
        let idMeta = req.params.idMeta;
        const lideres = await initModel.actividad.findAll({
            where: { Meta_idMeta: idMeta, Estado_idEstado: 2 },
        });
        if (lideres.length > 0) {
            let arrayLideres = [];
            for (let lider in lideres) {
                arrayLideres.push(lideres[lider].dataValues.idActividad);
            }
            return (0, utils_1.responseMessage)(res, 200, arrayLideres, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [], "No existen actividades asociados a la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarActividadesMetaOrganizacion = consultarActividadesMetaOrganizacion;
async function consultarActividadesMetaEjecucion(req, res) {
    try {
        let idMeta = req.params.idMeta;
        const lideres = await initModel.actividad.findAll({
            where: { Meta_idMeta: idMeta, Estado_idEstado: 3 },
        });
        if (lideres.length > 0) {
            let arrayLideres = [];
            for (let lider in lideres) {
                arrayLideres.push(lideres[lider].dataValues.idActividad);
            }
            return (0, utils_1.responseMessage)(res, 200, arrayLideres, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [], "No existen actividades asociados a la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarActividadesMetaEjecucion = consultarActividadesMetaEjecucion;
async function consultarActividadesMetaCierre(req, res) {
    try {
        let idMeta = req.params.idMeta;
        const lideres = await initModel.actividad.findAll({
            where: { Meta_idMeta: idMeta, Estado_idEstado: 4 },
        });
        if (lideres.length > 0) {
            let arrayLideres = [];
            for (let lider in lideres) {
                arrayLideres.push(lideres[lider].dataValues.idActividad);
            }
            return (0, utils_1.responseMessage)(res, 200, arrayLideres, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [], "No existen actividades asociados a la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarActividadesMetaCierre = consultarActividadesMetaCierre;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarActividadOrganizacion(req, res) {
    try {
        let idActividad = req.params.idActividad;
        let estado = { Estado_idEstado: 2 };
        let createPlannedExist = await initModel.actividad.update(estado, {
            where: { idActividad: idActividad },
        });
        if (createPlannedExist) {
            return (0, utils_1.responseMessage)(res, 200, createPlannedExist, "Actividad actualizada correctamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarActividadOrganizacion = actualizarActividadOrganizacion;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarActividadInicio(req, res) {
    try {
        let idActividad = req.params.idActividad;
        let estado = { Estado_idEstado: 1 };
        let createPlannedExist = await initModel.actividad.update(estado, {
            where: { idActividad: idActividad },
        });
        if (createPlannedExist) {
            return (0, utils_1.responseMessage)(res, 200, createPlannedExist, "Actividad actualizada correctamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarActividadInicio = actualizarActividadInicio;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarActividadEjecucion(req, res) {
    try {
        let idActividad = req.params.idActividad;
        let estado = { Estado_idEstado: 3 };
        let createPlannedExist = await initModel.actividad.update(estado, {
            where: { idActividad: idActividad },
        });
        if (createPlannedExist) {
            return (0, utils_1.responseMessage)(res, 200, createPlannedExist, "Actividad actualizada correctamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarActividadEjecucion = actualizarActividadEjecucion;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarActividadCierre(req, res) {
    try {
        let idActividad = req.params.idActividad;
        let estado = { Estado_idEstado: 4 };
        let createPlannedExist = await initModel.actividad.update(estado, {
            where: { idActividad: idActividad },
        });
        if (createPlannedExist) {
            return (0, utils_1.responseMessage)(res, 200, createPlannedExist, "Actividad actualizada correctamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarActividadCierre = actualizarActividadCierre;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarActividad(req, res) {
    try {
        req = req.body.data.activity;
        const { idActividad } = req;
        const { nombre } = req;
        const { descripcion } = req;
        const { presupuesto } = req;
        const { fechaInicio } = req;
        const { fechaFinal } = req;
        const { usuario } = req;
        let activityExist = await initModel.actividad.findOne({
            where: { nombre: nombre, idActividad: idActividad },
        });
        if (activityExist) {
            let responsableExist = await initModel.responsable.findOne({
                where: { Usuario_idUsuario: usuario },
            });
            !responsableExist
                ? (responsableExist = await initModel.responsable.create({
                    Usuario_idUsuario: usuario,
                }))
                : "";
            let idResponsable = responsableExist.dataValues.idResponsable;
            let activity = {
                nombre: nombre,
                descripcion: descripcion,
                presupuesto: presupuesto,
                Responsable_idResponsable: idResponsable,
            };
            let findActivity = await initModel.actividad.findOne({
                where: { idActividad: idActividad },
            });
            let nombreActividad = findActivity.dataValues.nombre;
            let activityPlaned = {
                nombre: nombre,
                descripcion: descripcion,
                Responsable_idResponsable: idResponsable,
                fechaInicio: fechaInicio,
                FechaFinal: fechaFinal,
            };
            let updateActivityPlaned = await initModel.actividadplaneada.update(activityPlaned, {
                where: { nombre: nombreActividad },
            });
            let updateActivity = await initModel.actividad.update(activity, {
                where: { idActividad: idActividad },
            });
            if (updateActivity) {
                return (0, utils_1.responseMessage)(res, 200, updateActivity, "Actividad actualizada correctamente");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la actividad");
            }
        }
        else {
            let activityExist = await initModel.actividad.findOne({
                where: { nombre: nombre, idActividad: { [sequelize_1.Op.not]: idActividad } },
            });
            if (activityExist) {
                return (0, utils_1.responseMessage)(res, 400, false, "ya existe una actividad con ese nombre");
            }
            else {
                let responsableExist = await initModel.responsable.findOne({
                    where: { Usuario_idUsuario: usuario },
                });
                !responsableExist
                    ? (responsableExist = await initModel.responsable.create({
                        Usuario_idUsuario: usuario,
                    }))
                    : "";
                let idResponsable = responsableExist.dataValues.idResponsable;
                let activity = {
                    nombre: nombre,
                    descripcion: descripcion,
                    presupuesto: presupuesto,
                    Responsable_idResponsable: idResponsable,
                };
                let findActivity = await initModel.actividad.findOne({
                    where: { idActividad: idActividad },
                });
                let nombreActividad = findActivity.dataValues.nombre;
                let activityPlaned = {
                    nombre: nombre,
                    descripcion: descripcion,
                    Responsable_idResponsable: idResponsable,
                    fechaInicio: fechaInicio,
                    FechaFinal: fechaFinal,
                };
                let updateActivityPlaned = await initModel.actividadplaneada.update(activityPlaned, {
                    where: { nombre: nombreActividad },
                });
                let updateActivity = await initModel.actividad.update(activity, {
                    where: { idActividad: idActividad },
                });
                if (updateActivity) {
                    return (0, utils_1.responseMessage)(res, 200, updateActivity, "Actividad actualizada correctamente");
                }
                else {
                    return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la actividad");
                }
            }
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarActividad = actualizarActividad;
async function consultarRecursosActividad(req, res) {
    try {
        let idActividad = req.params.idActividad;
        const recursos = await initModel.recurso.findAll({
            where: { Actividad_idActividad: idActividad },
        });
        if (recursos.length > 0) {
            return (0, utils_1.responseMessage)(res, 200, recursos, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, [], "No existen recursos asociados a la actividades");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarRecursosActividad = consultarRecursosActividad;
async function consultarPresupuestoActividad(req, res) {
    try {
        let idActividad = req.params.idActividad;
        const actividad = await initModel.actividad.findOne({
            where: { idActividad: idActividad },
        });
        if (actividad) {
            return (0, utils_1.responseMessage)(res, 200, actividad, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, [], "Erro al consultar la actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarPresupuestoActividad = consultarPresupuestoActividad;
async function eliminarActividad(req, res) {
    try {
        let idActividad = req.params.idActividad;
        await initModel.recurso.destroy({
            where: { Actividad_idActividad: idActividad },
        });
        let tareas = await initModel.tarea.findAll({
            where: { Actividad_idActividad: idActividad },
        });
        if (tareas.length > 0) {
            for (const tarea in tareas) {
                let idTarea = tareas[tarea].dataValues.idTarea;
                await initModel.recurso.destroy({
                    where: { Tarea_idTarea: idTarea },
                });
            }
        }
        await initModel.tarea.destroy({
            where: { Actividad_idActividad: idActividad },
        });
        const actividad = await initModel.actividad.findOne({
            where: {
                idActividad: idActividad,
            },
        });
        let idMeta = actividad.dataValues.Meta_idMeta;
        let presuepuestoActividad = actividad.dataValues.presupuesto;
        let meta = await initModel.meta.findOne({
            where: { idMeta: idMeta },
        });
        let presupuestoMeta = meta?.dataValues.presupuesto;
        let presupuestoUpdateMeta = {
            presupuesto: parseFloat(presupuestoMeta) - parseFloat(presuepuestoActividad),
        };
        await initModel.meta.update(presupuestoUpdateMeta, {
            where: { idMeta: idMeta },
        });
        let actividadDeleted = await initModel.actividad.destroy({
            where: { idActividad: idActividad },
        });
        if (actividadDeleted) {
            return (0, utils_1.responseMessage)(res, 200, actividad, "Se elimino la actividad exitosamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, [], "Erro al eliminar la actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.eliminarActividad = eliminarActividad;
async function actualizarActividadEstado(req, res) {
    try {
        req = req.body.data.activity;
        const { idActividad } = req;
        if (idActividad !== null) {
            let tareasInitial = await (0, findTask_1.findTaskInitialActivity)(idActividad);
            let tareasOrganization = await (0, findTask_1.findTaskOrganizationActivity)(idActividad);
            let tareasEjecution = await (0, findTask_1.findTaskEjecutionActivity)(idActividad);
            let tareasFinish = await (0, findTask_1.findTaskFinishActivity)(idActividad);
            if (tareasInitial == 0 &&
                tareasOrganization == 0 &&
                tareasEjecution == 0 &&
                tareasFinish == 0) {
                let estadoActividad = {
                    Estado_idEstado: 1,
                };
                const actividad = await initModel.actividad.update(estadoActividad, {
                    where: {
                        idActividad: idActividad,
                    },
                });
            }
            else {
                const maxTarea = Math.max(tareasInitial, tareasOrganization, tareasEjecution, tareasFinish);
                // Determina cuál variable tiene el valor máximo
                let tareaMaxima;
                if (maxTarea === tareasInitial) {
                    tareaMaxima = 1;
                }
                else if (maxTarea === tareasOrganization) {
                    tareaMaxima = 2;
                }
                else if (maxTarea === tareasEjecution) {
                    tareaMaxima = 3;
                }
                else if (maxTarea === tareasFinish) {
                    const maxTarea = Math.max(tareasInitial, tareasOrganization, tareasEjecution);
                    if (maxTarea !== 0) {
                        if (maxTarea === tareasInitial) {
                            tareaMaxima = 1;
                        }
                        else if (maxTarea === tareasOrganization) {
                            tareaMaxima = 2;
                        }
                        else if (maxTarea === tareasEjecution) {
                            tareaMaxima = 3;
                        }
                    }
                    else {
                        tareaMaxima = 4;
                    }
                }
                let estadoActividad = {
                    Estado_idEstado: tareaMaxima,
                };
                const actividad = await initModel.actividad.update(estadoActividad, {
                    where: {
                        idActividad: idActividad,
                    },
                });
            }
            return (0, utils_1.responseMessage)(res, 200, [tareasInitial, tareasOrganization, tareasEjecution, tareasFinish], "Total de las activiades Activas asociadas a un cronograma del proyecto.");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [0, 0.1], "Error al obtener porcentaje del proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarActividadEstado = actualizarActividadEstado;
