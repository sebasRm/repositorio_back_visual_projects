"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarTarea = exports.eliminarTarea = exports.totalPresupuestoTareaActividad = exports.actualizarTareaCierre = exports.actualizarTareaEjecucion = exports.actualizarTareaOrganizacion = exports.actualizarTareaInicio = exports.consultarTareasActividadCierre = exports.consultarTareasActividadEjecucion = exports.consultarTareasActividadOrganizacion = exports.consultarTareasActividadInicio = exports.consultarTareasActividad = exports.crearTarea = exports.porcentajeTareasTermidas = exports.contarTotalTareas = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const sequelize_1 = require("sequelize");
const findTask_1 = require("../services/findTask");
/**
 * Funcion para contar el total de las activiades asociadas a un cronograma del proyecto.
 */
async function contarTotalTareas(req, res) {
    req = req.body.data.activity;
    const { idCronograma } = req;
    try {
        if (idCronograma) {
            // console.log("soy el contadorTareas", idCronograma)
            let totalTotal = await (0, findTask_1.findTotalTask)(idCronograma);
            //console.log("soy el totalTotal", totalTotal)
            if (totalTotal) {
                return (0, utils_1.responseMessage)(res, 200, totalTotal, "Total de las activiades asociadas a un cronograma del proyecto");
            }
            else {
                return (0, utils_1.responseMessage)(res, 200, 0, "Total de las activiades asociadas a un cronograma del proyecto");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, 0, "Total de las activiades asociadas a un cronograma del proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.contarTotalTareas = contarTotalTareas;
/*
   => Funcion para crear el porcetaje de las tareas cuto estado esta en cierre o 4
*/
async function porcentajeTareasTermidas(req, res) {
    try {
        req = req.body.data.activity;
        const { idCronograma } = req;
        if (idCronograma !== null) {
            let tareasInitial = await (0, findTask_1.findTaskInitial)(idCronograma);
            let tareasOrganization = await (0, findTask_1.findTaskOrganization)(idCronograma);
            let tareasEjecution = await (0, findTask_1.findTaskEjecution)(idCronograma);
            let tareasFinish = await (0, findTask_1.findTaskFinish)(idCronograma);
            let noActivity;
            if (tareasInitial == 0 &&
                tareasOrganization == 0 &&
                tareasEjecution == 0 &&
                tareasFinish == 0) {
                noActivity = 0.0001;
            }
            return (0, utils_1.responseMessage)(res, 200, [tareasInitial, tareasOrganization, tareasEjecution, tareasFinish, noActivity], "Total de las activiades Activas asociadas a un cronograma del proyecto.");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [0, 0.1], "Error al obtener porcentaje del proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.porcentajeTareasTermidas = porcentajeTareasTermidas;
async function crearTarea(req, res) {
    req = req.body.data.task;
    const { nombre } = req;
    const { descripcion } = req;
    const { presupuesto } = req;
    const { fechaInicio } = req;
    const { fechaFinal } = req;
    const { usuario } = req;
    const { idActividad } = req;
    const { nombreActividad } = req;
    let createPlannedExist = await initModel.tarea.findOne({
        where: { nombre: nombre, Actividad_idActividad: idActividad },
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
        let activityPlanned = await initModel.actividadplaneada.findOne({
            where: { nombre: nombreActividad },
        });
        let idActivityPlanned = activityPlanned?.dataValues.idActividadPlaneada;
        let createdPlannedTask = await initModel.tareaplaneada.create({
            nombre: nombre,
            descripcion: descripcion,
            presupuesto: presupuesto,
            fechaInicio: fechaInicio,
            FechaFinal: fechaFinal,
            Estado_idEstado: 1,
            ActividadPlaneada_idActividadPlaneada: idActivityPlanned,
            Responsable_idResponsable: idResponsable,
            cronogramaOriginal: activityPlanned?.dataValues.cronogramaOriginal === 1 ? 1 : 0,
        });
        if (createdPlannedTask) {
            let createTask = await initModel.tarea.create({
                nombre: nombre,
                descripcion: descripcion,
                presupuesto: 0,
                Estado_idEstado: 1,
                Actividad_idActividad: idActividad,
                Responsable_idResponsable: idResponsable,
            });
            if (createTask) {
                /* let activity = await initModel.actividad.findOne({
                   where: { idActividad: idActividad },
                 });
                 let presupuestoActivity: any = activity?.dataValues.presupuesto;
                 let presupuestoUpdate = {
                   presupuesto: parseInt(presupuestoActivity) + parseInt(presupuesto),
                 };
         
                 await initModel.actividad.update(presupuestoUpdate, {
                   where: { idActividad: idActividad },
                 });*/
                return (0, utils_1.responseMessage)(res, 200, createTask, "Tarea creada con exito");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error al crear la Tarea");
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
exports.crearTarea = crearTarea;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function consultarTareasActividad(req, res) {
    try {
        let idActividad = req.params.idActividad;
        const lideres = await initModel.tarea.findAll({
            where: { Actividad_idActividad: idActividad },
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
            ],
        });
        if (lideres.length > 0) {
            return (0, utils_1.responseMessage)(res, 200, lideres, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 200, [], "No existen tareas asociados a una actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarTareasActividad = consultarTareasActividad;
/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
async function consultarTareasActividadInicio(req, res) {
    try {
        let idActividad = req.params.idActividad;
        const lideres = await initModel.tarea.findAll({
            where: { Actividad_idActividad: idActividad, Estado_idEstado: 1 },
        });
        if (lideres.length > 0) {
            let arrayLideres = [];
            for (let lider in lideres) {
                arrayLideres.push(lideres[lider].dataValues.idTarea);
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
exports.consultarTareasActividadInicio = consultarTareasActividadInicio;
/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
async function consultarTareasActividadOrganizacion(req, res) {
    try {
        let idActividad = req.params.idActividad;
        const lideres = await initModel.tarea.findAll({
            where: { Actividad_idActividad: idActividad, Estado_idEstado: 2 },
        });
        if (lideres.length > 0) {
            let arrayLideres = [];
            for (let lider in lideres) {
                arrayLideres.push(lideres[lider].dataValues.idTarea);
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
exports.consultarTareasActividadOrganizacion = consultarTareasActividadOrganizacion;
/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
async function consultarTareasActividadEjecucion(req, res) {
    try {
        let idActividad = req.params.idActividad;
        const lideres = await initModel.tarea.findAll({
            where: { Actividad_idActividad: idActividad, Estado_idEstado: 3 },
        });
        if (lideres.length > 0) {
            let arrayLideres = [];
            for (let lider in lideres) {
                arrayLideres.push(lideres[lider].dataValues.idTarea);
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
exports.consultarTareasActividadEjecucion = consultarTareasActividadEjecucion;
/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
async function consultarTareasActividadCierre(req, res) {
    try {
        let idActividad = req.params.idActividad;
        const lideres = await initModel.tarea.findAll({
            where: { Actividad_idActividad: idActividad, Estado_idEstado: 4 },
        });
        if (lideres.length > 0) {
            let arrayLideres = [];
            for (let lider in lideres) {
                arrayLideres.push(lideres[lider].dataValues.idTarea);
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
exports.consultarTareasActividadCierre = consultarTareasActividadCierre;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarTareaInicio(req, res) {
    try {
        let idTarea = req.params.idTarea;
        if (idTarea) {
            let estado = { Estado_idEstado: 1 };
            let createPlannedExist = await initModel.tarea.update(estado, {
                where: { idTarea: idTarea },
            });
            if (createPlannedExist) {
                return (0, utils_1.responseMessage)(res, 200, createPlannedExist, "Tarea actualizada correctamente");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la tarea");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "Error no esta ingresando el parametro requerido");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarTareaInicio = actualizarTareaInicio;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarTareaOrganizacion(req, res) {
    try {
        let idTarea = req.params.idTarea;
        if (idTarea) {
            let estado = { Estado_idEstado: 2 };
            let createPlannedExist = await initModel.tarea.update(estado, {
                where: { idTarea: idTarea },
            });
            if (createPlannedExist) {
                return (0, utils_1.responseMessage)(res, 200, createPlannedExist, "Tarea actualizada correctamente");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la tarea");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "Error no esta ingresando el parametro requerido");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarTareaOrganizacion = actualizarTareaOrganizacion;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarTareaEjecucion(req, res) {
    try {
        let idTarea = req.params.idTarea;
        if (idTarea) {
            let estado = { Estado_idEstado: 3 };
            let createPlannedExist = await initModel.tarea.update(estado, {
                where: { idTarea: idTarea },
            });
            if (createPlannedExist) {
                return (0, utils_1.responseMessage)(res, 200, createPlannedExist, "Tarea actualizada correctamente");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la tarea");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "Error no esta ingresando el parametro requerido");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarTareaEjecucion = actualizarTareaEjecucion;
/*
   => Función para consultar las actividades asociadas a una meta
*/
async function actualizarTareaCierre(req, res) {
    try {
        let idTarea = req.params.idTarea;
        if (idTarea) {
            let estado = { Estado_idEstado: 4 };
            let createPlannedExist = await initModel.tarea.update(estado, {
                where: { idTarea: idTarea },
            });
            if (createPlannedExist) {
                return (0, utils_1.responseMessage)(res, 200, createPlannedExist, "Tarea actualizada correctamente");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la tarea");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "Error no esta ingresando el parametro requerido");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarTareaCierre = actualizarTareaCierre;
async function totalPresupuestoTareaActividad(req, res) {
    try {
        let presupuestoTotal = 0;
        let idActividad = req.params.idActividad;
        const tareas = await initModel.tarea.findAll({
            where: {
                Actividad_idActividad: idActividad,
            },
        });
        if (tareas.length > 0) {
            for (const tarea in tareas) {
                let presupuestoTarea = tareas[tarea].dataValues.presupuesto;
                presupuestoTotal = presupuestoTotal + presupuestoTarea;
            }
            return (0, utils_1.responseMessage)(res, 200, { presupuestoTotal: presupuestoTotal }, "total de presuepuesto en tareas para esta actividad");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, presupuestoTotal, "No existen tareas creados para esta actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.totalPresupuestoTareaActividad = totalPresupuestoTareaActividad;
async function eliminarTarea(req, res) {
    try {
        let idTarea = req.params.idTarea;
        await initModel.recurso.destroy({
            where: { Tarea_idTarea: idTarea },
        });
        const tarea = await initModel.tarea.findOne({
            where: {
                idTarea: idTarea,
            },
        });
        let idActividad = tarea.dataValues.Actividad_idActividad;
        let presuepuestoTarea = tarea.dataValues.presupuesto;
        let actividad = await initModel.actividad.findOne({
            where: { idActividad: idActividad },
        });
        let idMeta = actividad?.dataValues.Meta_idMeta;
        let presupuestoActividad = actividad?.dataValues.presupuesto;
        let presupuestoUpdateActividad = {
            presupuesto: parseFloat(presupuestoActividad) - parseFloat(presuepuestoTarea),
        };
        await initModel.actividad.update(presupuestoUpdateActividad, {
            where: { idActividad: idActividad },
        });
        let meta = await initModel.meta.findOne({
            where: { idMeta: idMeta },
        });
        let presuepuestoMeta = meta.dataValues.presupuesto;
        let presupuestoUpdateMeta = {
            presupuesto: parseFloat(presuepuestoMeta) - parseFloat(presuepuestoTarea),
        };
        await initModel.meta.update(presupuestoUpdateMeta, {
            where: { idMeta: idMeta },
        });
        let tareaDeleted = await initModel.tarea.destroy({
            where: { idTarea: idTarea },
        });
        if (tareaDeleted) {
            return (0, utils_1.responseMessage)(res, 200, tarea, "Se elimino la tarea exitosamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, [], "Erro al eliminar la tarea");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.eliminarTarea = eliminarTarea;
async function actualizarTarea(req, res) {
    try {
        req = req.body.data.task;
        const { idTarea } = req;
        const { nombre } = req;
        const { descripcion } = req;
        const { presupuesto } = req;
        const { fechaInicio } = req;
        const { fechaFinal } = req;
        const { usuario } = req;
        let activityExist = await initModel.tarea.findOne({
            where: { nombre: nombre, idTarea: idTarea },
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
            let task = {
                nombre: nombre,
                descripcion: descripcion,
                presupuesto: presupuesto,
                Responsable_idResponsable: idResponsable,
            };
            let findTask = await initModel.tarea.findOne({
                where: { idTarea: idTarea },
            });
            let nombreTarea = findTask.dataValues.nombre;
            let tareaPlaned = {
                nombre: nombre,
                descripcion: descripcion,
                //presupuesto: presupuesto,
                Responsable_idResponsable: idResponsable,
                fechaInicio: fechaInicio,
                FechaFinal: fechaFinal,
            };
            let updateActivityPlaned = await initModel.tareaplaneada.update(tareaPlaned, {
                where: { nombre: nombreTarea },
            });
            let updateActivity = await initModel.tarea.update(task, {
                where: { idTarea: idTarea },
            });
            if (updateActivity) {
                return (0, utils_1.responseMessage)(res, 200, updateActivity, "tarea actualizada correctamente");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la tarea");
            }
        }
        else {
            let activityExist = await initModel.tarea.findOne({
                where: { nombre: nombre, idTarea: { [sequelize_1.Op.not]: idTarea } },
            });
            if (activityExist) {
                return (0, utils_1.responseMessage)(res, 400, false, "ya existe una tarea con ese nombre");
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
                let task = {
                    nombre: nombre,
                    descripcion: descripcion,
                    presupuesto: presupuesto,
                    Responsable_idResponsable: idResponsable,
                };
                let findTask = await initModel.tarea.findOne({
                    where: { idTarea: idTarea },
                });
                let nombreTarea = findTask.dataValues.nombre;
                let tareaPlaned = {
                    nombre: nombre,
                    descripcion: descripcion,
                    presupuesto: presupuesto,
                    Responsable_idResponsable: idResponsable,
                    fechaInicio: fechaInicio,
                    FechaFinal: fechaFinal,
                };
                let updateActivityPlaned = await initModel.tareaplaneada.update(tareaPlaned, {
                    where: { nombre: nombreTarea },
                });
                let updateActivity = await initModel.tarea.update(task, {
                    where: { idTarea: idTarea },
                });
                if (updateActivity) {
                    return (0, utils_1.responseMessage)(res, 200, updateActivity, "tarea actualizada correctamente");
                }
                else {
                    return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar la tarea");
                }
            }
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarTarea = actualizarTarea;
//# sourceMappingURL=tareaController.js.map