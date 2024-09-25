"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarRecursoTarea = exports.eliminarRecursoTarea = exports.totalPresupuestoRecursoTarea = exports.crearRecursoTarea = exports.consultarRecursoTarea = exports.actualizarRecursoActividad = exports.eliminarRecursoActividad = exports.totalPresupuestoRecursoActividad = exports.crearRecursoActividad = exports.consultarRecursoActividad = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const utils_1 = require("../helpers/utils");
const sequelize_1 = require("sequelize");
/**
 * Función para logear el usuario
 */
async function consultarRecursoActividad(req, res) {
    let idActividad = req.params.idActividad;
    try {
        const recurso = await initModel.recurso.findAll({
            where: { Actividad_idActividad: idActividad },
        });
        if (recurso.length > 0) {
            return (0, utils_1.responseMessage)(res, 200, recurso, "Recursos asociados a la actividad");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "la actividad aun no tiene recursos asignados");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarRecursoActividad = consultarRecursoActividad;
async function crearRecursoActividad(req, res) {
    try {
        req = req.body.data.recurso;
        const { nombre } = req;
        const { descripcion } = req;
        const { presupuesto } = req;
        const { idActividad } = req;
        const { idMeta } = req;
        const recursoExist = await initModel.recurso.findOne({
            where: { nombre: nombre, Actividad_idActividad: idActividad },
        });
        if (!recursoExist) {
            const recurso = await initModel.recurso.create({
                nombre: nombre,
                descripcion: descripcion,
                presupuesto: presupuesto,
                Actividad_idActividad: idActividad,
            });
            if (recurso) {
                let activity = await initModel.actividad.findOne({
                    where: { idActividad: idActividad },
                });
                let presupuestoActivity = activity?.dataValues.presupuesto;
                let presupuestoUpdate = {
                    presupuesto: parseFloat(presupuestoActivity) + parseFloat(presupuesto),
                };
                await initModel.actividad.update(presupuestoUpdate, {
                    where: { idActividad: idActividad },
                });
                let meta = await initModel.meta.findOne({
                    where: { idMeta: idMeta },
                });
                let presupuestoMeta = meta?.dataValues.presupuesto;
                let presupuestoUpdateMeta = {
                    presupuesto: parseFloat(presupuestoMeta) + parseFloat(presupuesto),
                };
                await initModel.meta.update(presupuestoUpdateMeta, {
                    where: { idMeta: idMeta },
                });
                return (0, utils_1.responseMessage)(res, 200, recurso, "Recurso creado con exito");
            }
            else {
                return (0, utils_1.responseMessage)(res, 404, false, "la actividad aun no tiene recursos asignados");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Ya existe un recurso con ese nombre asignado para esta actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.crearRecursoActividad = crearRecursoActividad;
async function totalPresupuestoRecursoActividad(req, res) {
    try {
        let presupuestoTotal = 0;
        let idActividad = req.params.idActividad;
        const recursos = await initModel.recurso.findAll({
            where: {
                Actividad_idActividad: idActividad,
            },
        });
        if (recursos.length > 0) {
            for (const recurso in recursos) {
                let presupuestoRecurso = recursos[recurso].dataValues.presupuesto;
                presupuestoTotal = presupuestoTotal + presupuestoRecurso;
            }
            return (0, utils_1.responseMessage)(res, 200, { presupuestoTotal: presupuestoTotal }, "total de presuepuesto en recursos para esta actividad");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, presupuestoTotal, "No existen recursos creados para esta actividad");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.totalPresupuestoRecursoActividad = totalPresupuestoRecursoActividad;
async function eliminarRecursoActividad(req, res) {
    try {
        let idRecurso = req.params.idRecurso;
        let recurso = await initModel.recurso.findOne({
            where: {
                idRecurso: idRecurso,
            },
        });
        if (recurso) {
            console.log("recursos", recurso);
            let idActividad = recurso.dataValues.Actividad_idActividad;
            let presuepuestoRecurso = recurso.dataValues.presupuesto;
            const actividad = await initModel.actividad.findOne({
                where: {
                    idActividad: idActividad,
                },
            });
            let idMeta = actividad.dataValues.Meta_idMeta;
            let presupuestoActividad = actividad.dataValues.presupuesto;
            let presupuesTotal = {
                presupuesto: parseFloat(presupuestoActividad) - parseFloat(presuepuestoRecurso),
            };
            const updateActividad = await initModel.actividad.update(presupuesTotal, {
                where: {
                    idActividad: idActividad,
                },
            });
            let meta = await initModel.meta.findOne({
                where: { idMeta: idMeta },
            });
            let presupuestoMeta = meta?.dataValues.presupuesto;
            let presupuestoUpdateMeta = {
                presupuesto: parseFloat(presupuestoMeta) - parseFloat(presuepuestoRecurso),
            };
            await initModel.meta.update(presupuestoUpdateMeta, {
                where: { idMeta: idMeta },
            });
            const recursos = await initModel.recurso.destroy({
                where: {
                    idRecurso: idRecurso,
                },
            });
            console.log("recursos", recursos);
            if (recursos) {
                return (0, utils_1.responseMessage)(res, 200, recursos, "Recurso eliminado con exito");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error no se elimino este recurso");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error no se encontro el recurso");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.eliminarRecursoActividad = eliminarRecursoActividad;
async function actualizarRecursoActividad(req, res) {
    try {
        req = req.body.data.recurso;
        const { nombre } = req;
        const { descripcion } = req;
        const { presupuesto } = req;
        const { idActividad } = req;
        const { idRecurso } = req;
        const { presupuestoMeta } = req;
        const { idMeta } = req;
        const recursoExist = await initModel.recurso.findOne({
            where: { Actividad_idActividad: idActividad },
        });
        if (recursoExist) {
            let presupuestoTotal = 0;
            let presupuestoRecurso = recursoExist?.dataValues.presupuesto;
            let activity = await initModel.actividad.findOne({
                where: { idActividad: idActividad },
            });
            let presupuestoActivity = activity?.dataValues.presupuesto;
            presupuestoTotal =
                parseFloat(presupuestoActivity) - parseFloat(presupuestoRecurso);
            let recurso = {
                nombre: nombre,
                descripcion: descripcion,
                presupuesto: presupuesto,
            };
            await initModel.recurso.update(recurso, {
                where: { idRecurso: idRecurso },
            });
            presupuestoTotal = parseFloat(presupuestoTotal) + parseFloat(presupuesto);
            let presupuestoUpdate = {
                presupuesto: presupuestoTotal,
            };
            await initModel.actividad.update(presupuestoUpdate, {
                where: { idActividad: idActividad },
            });
            /********************************************************************* */
            let presupuestoTotalMeta = parseFloat(presupuestoMeta) - parseFloat(presupuestoRecurso);
            presupuestoTotalMeta =
                parseFloat(presupuestoTotalMeta) + parseFloat(presupuesto);
            let presupuestoMetaUpdate = {
                presupuesto: presupuestoTotalMeta,
            };
            await initModel.meta.update(presupuestoMetaUpdate, {
                where: { idMeta: idMeta },
            });
            return (0, utils_1.responseMessage)(res, 200, recurso, "Recurso creado con exito");
        }
        else {
            const recursoExist = await initModel.recurso.findOne({
                where: {
                    nombre: nombre,
                    Actividad_idActividad: { [sequelize_1.Op.not]: idActividad },
                },
            });
            if (recursoExist) {
                return (0, utils_1.responseMessage)(res, 400, false, "ya existe un recurso con ese nombre");
            }
            else {
                let presupuestoTotal = 0;
                let presupuestoRecurso = recursoExist?.dataValues.presupuesto;
                let activity = await initModel.actividad.findOne({
                    where: { idActividad: idActividad },
                });
                let presupuestoActivity = activity?.dataValues.presupuesto;
                presupuestoTotal =
                    parseFloat(presupuestoActivity) - parseFloat(presupuestoRecurso);
                let recurso = {
                    nombre: nombre,
                    descripcion: descripcion,
                    presupuesto: presupuesto,
                };
                await initModel.recurso.update(recurso, {
                    where: { idRecurso: idRecurso },
                });
                presupuestoTotal =
                    parseFloat(presupuestoTotal) + parseFloat(presupuesto);
                let presupuestoUpdate = {
                    presupuesto: presupuestoTotal,
                };
                await initModel.actividad.update(presupuestoUpdate, {
                    where: { idActividad: idActividad },
                });
                let presupuestoTotalMeta = parseFloat(presupuestoMeta) - parseFloat(presupuestoRecurso);
                console.log("soy el presupuestoMeta", presupuestoTotalMeta);
                presupuestoTotalMeta =
                    parseFloat(presupuestoTotalMeta) + parseFloat(presupuesto);
                let presupuestoMetaUpdate = {
                    presupuesto: presupuestoTotalMeta,
                };
                await initModel.meta.update(presupuestoMetaUpdate, {
                    where: { idMeta: idMeta },
                });
                return (0, utils_1.responseMessage)(res, 200, recurso, "Recurso creado con exito");
            }
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarRecursoActividad = actualizarRecursoActividad;
async function consultarRecursoTarea(req, res) {
    let idTarea = req.params.idTarea;
    try {
        const recurso = await initModel.recurso.findAll({
            where: { Tarea_idTarea: idTarea },
        });
        if (recurso.length > 0) {
            return (0, utils_1.responseMessage)(res, 200, recurso, "Recursos asociados a la tarea");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "la tarea aun no tiene recursos asignados");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarRecursoTarea = consultarRecursoTarea;
async function crearRecursoTarea(req, res) {
    try {
        req = req.body.data.recurso;
        const { nombre } = req;
        const { descripcion } = req;
        const { presupuesto } = req;
        const { idTarea } = req;
        const { presupuestoActividad } = req;
        const { idActividad } = req;
        const { presupuestoMeta } = req;
        const { idMeta } = req;
        const recursoExist = await initModel.recurso.findOne({
            where: { nombre: nombre, Tarea_idTarea: idTarea },
        });
        if (!recursoExist) {
            const recurso = await initModel.recurso.create({
                nombre: nombre,
                descripcion: descripcion,
                presupuesto: presupuesto,
                Tarea_idTarea: idTarea,
            });
            if (recurso) {
                let task = await initModel.tarea.findOne({
                    where: { idTarea: idTarea },
                });
                let presupuestoActivity = task?.dataValues.presupuesto;
                let presupuestoUpdate = {
                    presupuesto: parseFloat(presupuestoActivity) + parseFloat(presupuesto),
                };
                await initModel.tarea.update(presupuestoUpdate, {
                    where: { idTarea: idTarea },
                });
                let totalPresupuestoActividad = { presupuesto: parseFloat(presupuestoActividad) + parseFloat(presupuesto) };
                await initModel.actividad.update(totalPresupuestoActividad, {
                    where: { idActividad: idActividad },
                });
                let meta = await initModel.meta.findOne({
                    where: { idMeta: idMeta },
                });
                let presupuestoMeta = meta?.dataValues.presupuesto;
                let presupuestoUpdateMeta = {
                    presupuesto: parseFloat(presupuestoMeta) + parseFloat(presupuesto),
                };
                await initModel.meta.update(presupuestoUpdateMeta, {
                    where: { idMeta: idMeta },
                });
                return (0, utils_1.responseMessage)(res, 200, recurso, "Recurso creado con exito");
            }
            else {
                return (0, utils_1.responseMessage)(res, 404, false, "la tarea aun no tiene recursos asignados");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Ya existe un recurso con ese nombre asignado para esta tarea");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.crearRecursoTarea = crearRecursoTarea;
async function totalPresupuestoRecursoTarea(req, res) {
    try {
        let presupuestoTotal = 0;
        let idTarea = req.params.idTarea;
        const recursos = await initModel.recurso.findAll({
            where: {
                Tarea_idTarea: idTarea,
            },
        });
        if (recursos.length > 0) {
            for (const recurso in recursos) {
                let presupuestoRecurso = recursos[recurso].dataValues.presupuesto;
                presupuestoTotal = presupuestoTotal + presupuestoRecurso;
            }
            return (0, utils_1.responseMessage)(res, 200, { presupuestoTotal: presupuestoTotal }, "total de presuepuesto en recursos para esta tarea");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, presupuestoTotal, "No existen recursos creados para esta tarea");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.totalPresupuestoRecursoTarea = totalPresupuestoRecursoTarea;
async function eliminarRecursoTarea(req, res) {
    try {
        let idRecurso = req.params.idRecurso;
        let recurso = await initModel.recurso.findOne({
            where: {
                idRecurso: idRecurso,
            },
        });
        if (recurso) {
            let idTarea = recurso.dataValues.Tarea_idTarea;
            let presuepuestoRecurso = recurso.dataValues.presupuesto;
            let tarea = await initModel.tarea.findOne({
                where: {
                    idTarea: idTarea,
                },
            });
            // ACTUALIZA LA TAREA
            let tareaPresupuesto = tarea.dataValues.presupuesto;
            let presupuesTotalTarea = {
                presupuesto: parseFloat(tareaPresupuesto) - parseFloat(presuepuestoRecurso),
            };
            await initModel.tarea.update(presupuesTotalTarea, {
                where: {
                    idTarea: idTarea,
                },
            });
            // ACTUALIZA LA ACTIVIDAD
            let idActividad = tarea.dataValues.Actividad_idActividad;
            let actividad = await initModel.actividad.findOne({
                where: {
                    idActividad: idActividad,
                },
            });
            let idMeta = actividad.dataValues.Meta_idMeta;
            let presupuestoActividad = actividad.dataValues.presupuesto;
            let presupuesTotal = {
                presupuesto: parseFloat(presupuestoActividad) - parseFloat(presuepuestoRecurso),
            };
            const updateActividad = await initModel.actividad.update(presupuesTotal, {
                where: {
                    idActividad: idActividad,
                },
            });
            // ACTUALIZA LA META
            let meta = await initModel.meta.findOne({
                where: { idMeta: idMeta },
            });
            let presupuestoMeta = meta?.dataValues.presupuesto;
            let presupuestoUpdateMeta = {
                presupuesto: parseFloat(presupuestoMeta) - parseFloat(presuepuestoRecurso),
            };
            await initModel.meta.update(presupuestoUpdateMeta, {
                where: { idMeta: idMeta },
            });
            const recursos = await initModel.recurso.destroy({
                where: {
                    idRecurso: idRecurso,
                },
            });
            if (recursos) {
                return (0, utils_1.responseMessage)(res, 200, recursos, "Recurso eliminado con exito");
            }
            else {
                return (0, utils_1.responseMessage)(res, 400, false, "Error no se elimino este recurso");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error no se encontro el recurso");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.eliminarRecursoTarea = eliminarRecursoTarea;
async function actualizarRecursoTarea(req, res) {
    try {
        req = req.body.data.recurso;
        const { nombre } = req;
        const { descripcion } = req;
        const { presupuesto } = req;
        const { idTarea } = req;
        const { idRecurso } = req;
        const { presupuestoMeta } = req;
        const { idMeta } = req;
        const { idActividad } = req;
        const recursoExist = await initModel.recurso.findOne({
            where: { Tarea_idTarea: idTarea },
        });
        if (recursoExist) {
            let presupuestoRecurso = recursoExist?.dataValues.presupuesto;
            // let presupuestoTotalTarea: any = 0;
            let tarea = await initModel.tarea.findOne({
                where: { idTarea: idTarea },
            });
            let presupuestoTarea = tarea?.dataValues.presupuesto;
            let presupuestoTotalTarea = parseFloat(presupuestoTarea) - parseFloat(presupuestoRecurso);
            presupuestoTotalTarea = parseFloat(presupuestoTotalTarea) + parseFloat(presupuesto);
            // console.log("soy el presupuestoTotalTarea", presupuestoTotalTarea,presupuesto)
            let presupuestoTareaUpdate = {
                presupuesto: presupuestoTotalTarea,
            };
            await initModel.tarea.update(presupuestoTareaUpdate, {
                where: { idTarea: idTarea },
            });
            /********************************************************************* */
            //let presupuestoTotalActividad: any = 0;
            let actividad = await initModel.actividad.findOne({
                where: { idActividad: idActividad },
            });
            let presupuestoActividad = actividad?.dataValues.presupuesto;
            let presupuestoTotalActividad = parseFloat(presupuestoActividad) - parseFloat(presupuestoRecurso);
            presupuestoTotalActividad = parseFloat(presupuestoTotalActividad) + parseFloat(presupuesto);
            let presupuestoActividadUpdate = {
                presupuesto: presupuestoTotalActividad,
            };
            await initModel.actividad.update(presupuestoActividadUpdate, {
                where: { idActividad: idActividad },
            });
            /********************************************************************* */
            let presupuestoTotalMeta = parseFloat(presupuestoMeta) - parseFloat(presupuestoRecurso);
            presupuestoTotalMeta =
                parseFloat(presupuestoTotalMeta) + parseFloat(presupuesto);
            let presupuestoMetaUpdate = {
                presupuesto: presupuestoTotalMeta,
            };
            await initModel.meta.update(presupuestoMetaUpdate, {
                where: { idMeta: idMeta },
            });
            let recurso = {
                nombre: nombre,
                descripcion: descripcion,
                presupuesto: presupuesto,
            };
            await initModel.recurso.update(recurso, {
                where: { idRecurso: idRecurso },
            });
            return (0, utils_1.responseMessage)(res, 200, recurso, "Recurso creado con exito");
        }
        else {
            const recursoExist = await initModel.recurso.findOne({
                where: {
                    nombre: nombre,
                    Tarea_idTarea: { [sequelize_1.Op.not]: idTarea },
                },
            });
            if (recursoExist) {
                return (0, utils_1.responseMessage)(res, 400, false, "ya existe un recurso con ese nombre");
            }
            else {
                let presupuestoRecurso = recursoExist?.dataValues.presupuesto;
                let presupuestoTotalTarea = 0;
                let tarea = await initModel.tarea.findOne({
                    where: { idTarea: idTarea },
                });
                let presupuestoTarea = tarea?.dataValues.presupuesto;
                presupuestoTotalTarea =
                    parseFloat(presupuestoTarea) - parseFloat(presupuestoRecurso);
                presupuestoTotalTarea = parseFloat(presupuestoTotalTarea) + parseFloat(presupuesto);
                let presupuestoTareaUpdate = {
                    presupuesto: presupuestoTotalTarea,
                };
                await initModel.tarea.update(presupuestoTareaUpdate, {
                    where: { idTarea: idTarea },
                });
                /********************************************************************* */
                let presupuestoTotalActividad = 0;
                let actividad = await initModel.actividad.findOne({
                    where: { idActividad: idActividad },
                });
                let presupuestoActividad = tarea?.dataValues.presupuesto;
                presupuestoTotalActividad =
                    parseFloat(presupuestoActividad) - parseFloat(presupuestoRecurso);
                presupuestoTotalActividad = parseFloat(presupuestoTotalTarea) + parseFloat(presupuesto);
                let presupuestoActividadUpdate = {
                    presupuesto: presupuestoTotalActividad,
                };
                await initModel.actividad.update(presupuestoActividadUpdate, {
                    where: { idActividad: idActividad },
                });
                /********************************************************************* */
                let presupuestoTotalMeta = parseFloat(presupuestoMeta) - parseFloat(presupuestoRecurso);
                presupuestoTotalMeta =
                    parseFloat(presupuestoTotalMeta) + parseFloat(presupuesto);
                let presupuestoMetaUpdate = {
                    presupuesto: presupuestoTotalMeta,
                };
                await initModel.meta.update(presupuestoMetaUpdate, {
                    where: { idMeta: idMeta },
                });
                let recurso = {
                    nombre: nombre,
                    descripcion: descripcion,
                    presupuesto: presupuesto,
                };
                await initModel.recurso.update(recurso, {
                    where: { idRecurso: idRecurso },
                });
                return (0, utils_1.responseMessage)(res, 200, recurso, "Recurso creado con exito");
            }
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarRecursoTarea = actualizarRecursoTarea;
//# sourceMappingURL=recursoController.js.map