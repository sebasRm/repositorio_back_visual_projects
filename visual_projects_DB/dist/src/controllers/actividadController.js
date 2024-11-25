"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarActividadEstado = exports.eliminarActividad = exports.consultarPresupuestoActividad = exports.consultarRecursosActividad = exports.actualizarActividad = exports.actualizarActividadCierre = exports.actualizarActividadEjecucion = exports.actualizarActividadInicio = exports.actualizarActividadOrganizacion = exports.consultarActividadesMetaCierre = exports.consultarActividadesMetaEjecucion = exports.consultarActividadesMetaOrganizacion = exports.consultarActividadesMetaInicio = exports.crearActividad = exports.consultarActividadesMeta = exports.porcentajeActividades = exports.contarActividadesActivas = exports.contarActividadesFinalizadas = exports.contarTotalActividades = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const sequelize_1 = require("sequelize");
const findActivities_1 = require("../services/findActivities");
const findTask_1 = require("../services/findTask");
/**
 * @description Cuenta el total de actividades asociadas a un cronograma de un proyecto.
 * La función consulta la base de datos para obtener el número total de actividades asociadas al cronograma
 * proporcionado mediante su `idCronograma`.
 *
 * @route POST /contarTotalActividades
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el total de actividades se obtuvo correctamente, con el número total de actividades asociadas.
 * - 200: Si no se proporciona un `idCronograma`, devuelve 0 indicando que no se encontró el cronograma.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
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
 * @description Cuenta el total de actividades finalizadas asociadas a un cronograma de un proyecto.
 * La función consulta la base de datos para obtener el número de actividades que están finalizadas
 * en el cronograma proporcionado mediante su `idCronograma`.
 *
 * @route POST /contarActividadesFinalizadas
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el total de actividades finalizadas se obtuvo correctamente, con el número de actividades finalizadas.
 * - 200: Si no se proporciona un `idCronograma`, devuelve un contador de actividades finalizadas igual a 0.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades finalizadas o al acceder a la base de datos.
 */
async function contarActividadesFinalizadas(req, res) {
    req = req.body.data.activity;
    const { idCronograma } = req;
    try {
        if (idCronograma) {
            const contadorActividad = await (0, findActivities_1.findActivitiesFinish)(idCronograma);
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
/**
 * @description Cuenta el total de actividades activas asociadas a un cronograma de un proyecto.
 * La función consulta la base de datos para obtener el número de actividades con estado inicial
 * (activas) asociadas al cronograma proporcionado mediante su `idCronograma`.
 *
 * @route POST /contarActividadesActivas
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el total de actividades activas se obtuvo correctamente, con el número de actividades activas asociadas.
 * - 200: Si no se proporciona un `idCronograma`, devuelve 0 indicando que no se encontraron actividades activas.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades activas o al acceder a la base de datos.
 */
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
/**
 * @description Cuenta el numero de actividades en sus estados respectivos
 * en un cronograma de un proyecto. La función consulta diversas métricas de actividades asociadas a
 * un cronograma especificado por su `idCronograma`, y devuelve un cálculo del porcentaje de
 * actividades completadas.
 *
 * @route POST /porcentajeActividadesTermidas
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el porcentaje de actividades terminadas y otras métricas se obtuvieron correctamente.
 * - 200: Si no se proporciona un `idCronograma`, devuelve un valor predeterminado de actividades como 0.1.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
async function porcentajeActividades(req, res) {
    try {
        req = req.body.data.activity;
        const { idCronograma } = req;
        if (idCronograma !== null) {
            let actividadesActivas = await (0, findActivities_1.findActivitiesInitial)(idCronograma);
            let actividadesOrganization = await (0, findActivities_1.findActivitiesOrganization)(idCronograma);
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
exports.porcentajeActividades = porcentajeActividades;
/**
 * @description Consulta las actividades asociadas a una meta de un proyecto. Esta función busca todas las actividades relacionadas con el `idMeta` proporcionado,
 * incluyendo información detallada sobre el responsable, el estado de la actividad, y las tareas asociadas a cada actividad.
 * Además, cuenta el número de tareas relacionadas con cada actividad y las incluye en la respuesta.
 *
 * @route GET /consultarActividadesMeta/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta, devuelve las actividades con el contador de tareas.
 * - 200: Si no se encuentran actividades asociadas a la meta, devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
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
/**
 * @description Crea una nueva actividad asociada a una meta en un cronograma de un proyecto.
 * La función verifica si la actividad ya está registrada y, si no, la crea junto con una actividad planeada correspondiente.
 * Además, si no existe un responsable para el usuario asociado, se crea uno nuevo.
 *
 * @route POST /crearActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener la información de la actividad en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad se crea correctamente, devuelve la actividad recién creada.
 * - 400: Si el nombre de la actividad ya existe o si ocurre un error al crear la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la creación de la actividad o al acceder a la base de datos.
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
/**
 * @description Consulta las actividades asociadas a una meta cuyo estado es "inicio" (Estado_idEstado = 1).
 * La función busca las actividades relacionadas con el `idMeta` proporcionado y cuyo estado sea 1 (inicio),
 * devolviendo los identificadores de las actividades asociadas.
 *
 * @route GET /consultarActividadesMetaInicio/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta con el estado "inicio", devuelve los identificadores de las actividades.
 * - 200: Si no se encuentran actividades asociadas a la meta con el estado "inicio", devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
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
/**
 * @description Consulta las actividades asociadas a una meta cuyo estado es "organización" (Estado_idEstado = 2).
 * La función busca las actividades relacionadas con el `idMeta` proporcionado y cuyo estado sea 2 (organización),
 * devolviendo los identificadores de las actividades asociadas.
 *
 * @route GET /consultarActividadesMetaOrganizacion/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta con el estado "organización", devuelve los identificadores de las actividades.
 * - 200: Si no se encuentran actividades asociadas a la meta con el estado "organización", devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
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
/**
 * @description Consulta las actividades asociadas a una meta cuyo estado es "ejecución" (Estado_idEstado = 3).
 * La función busca las actividades relacionadas con el `idMeta` proporcionado y cuyo estado sea 3 (ejecución),
 * devolviendo los identificadores de las actividades asociadas.
 *
 * @route GET /consultarActividadesMetaEjecucion/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta con el estado "ejecución", devuelve los identificadores de las actividades.
 * - 200: Si no se encuentran actividades asociadas a la meta con el estado "ejecución", devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
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
/**
 * @description Consulta las actividades asociadas a una meta cuyo estado es "cierre" (Estado_idEstado = 4).
 * La función busca las actividades relacionadas con el `idMeta` proporcionado y cuyo estado sea 4 (cierre),
 * devolviendo los identificadores de las actividades asociadas.
 *
 * @route GET /consultarActividadesMetaCierre/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta con el estado "cierre", devuelve los identificadores de las actividades.
 * - 200: Si no se encuentran actividades asociadas a la meta con el estado "cierre", devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
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
/**
 * @description Actualiza el estado de una actividad a "organización" (Estado_idEstado = 2).
 * Esta función recibe el `idActividad` de la actividad a actualizar y cambia su estado al valor 2 (organización).
 *
 * @route PUT /actualizarActividadOrganizacion/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad fue actualizada correctamente.
 * - 400: Si ocurrió un error al actualizar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la actividad o al acceder a la base de datos.
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
/**
 * @description Actualiza el estado de una actividad a "inicio" (Estado_idEstado = 1).
 * Esta función recibe el `idActividad` de la actividad a actualizar y cambia su estado al valor 1 (inicio).
 *
 * @route PUT /actualizarActividadInicio/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad fue actualizada correctamente.
 * - 400: Si ocurrió un error al actualizar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la actividad o al acceder a la base de datos.
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
/**
 * @description Actualiza el estado de una actividad a "ejecución" (Estado_idEstado = 3).
 * Esta función recibe el `idActividad` de la actividad a actualizar y cambia su estado al valor 3 (ejecución).
 *
 * @route PUT /actualizarActividadEjecucion/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad fue actualizada correctamente.
 * - 400: Si ocurrió un error al actualizar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la actividad o al acceder a la base d
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
/**
 * @description Actualiza el estado de una actividad a "cierre" (Estado_idEstado = 4).
 * Esta función recibe el `idActividad` de la actividad a actualizar y cambia su estado al valor 4 (cierre).
 *
 * @route PUT /actualizarActividadCierre/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad fue actualizada correctamente.
 * - 400: Si ocurrió un error al actualizar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la actividad o al acceder a la base de datos.
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
/**
 * @description Actualiza una actividad existente o valida la creación de una nueva.
 * Esta función actualiza información detallada sobre una actividad, incluyendo el nombre,
 * descripción, presupuesto, fechas, y responsable asociado.
 *
 * @route PUT /actualizarActividad
 * @param {Request} req - El objeto de la solicitud HTTP, contiene los datos de la actividad en `req.body.data.activity`.
 *    - `idActividad`: ID único de la actividad.
 *    - `nombre`: Nombre de la actividad.
 *    - `descripcion`: Descripción de la actividad.
 *    - `presupuesto`: Presupuesto asignado.
 *    - `fechaInicio`: Fecha de inicio.
 *    - `fechaFinal`: Fecha de finalización.
 *    - `usuario`: ID del usuario responsable.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Actividad actualizada correctamente.
 * - 400: Error al actualizar la actividad o ya existe una actividad con el mismo nombre.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al interactuar con la base de datos.
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
/**
 * @description Consulta los recursos asociados a una actividad específica.
 * Esta función busca en la base de datos todos los recursos vinculados a un ID de actividad proporcionado.
 *
 * @route GET /consultarRecursosActividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Lista de recursos asociados a la actividad.
 * - 404: No existen recursos asociados a la actividad.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al consultar los recursos en la base de datos.
 */
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
/**
 * @description Consulta el presupuesto asociado a una actividad específica.
 * La función busca una actividad por su ID y devuelve su información.
 *
 * @route GET /consultarPresupuestoActividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP. Debe incluir el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Información de la actividad, incluyendo el presupuesto asociado.
 * - 404: Error al consultar la actividad o no existe.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al interactuar con la base de datos.
 */
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
/**
 * @description Elimina una actividad y sus dependencias asociadas, incluyendo tareas y recursos.
 * También ajusta el presupuesto de la meta asociada a la actividad eliminada.
 *
 * @route DELETE /eliminarActividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP. Debe incluir el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Actividad eliminada exitosamente.
 * - 404: Error al eliminar la actividad o la actividad no existe.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al interactuar con la base de datos.
 */
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
/**
 * @description Actualiza el estado de una actividad en función de las tareas asociadas a ella.
 * La función evalúa las tareas en diferentes fases (Inicial, Organización, Ejecución, Finalización) y ajusta el estado de la actividad.
 *
 * @route PUT /actualizarActividadEstado
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene los datos de la actividad en `req.body.data.activity`.
 *    - `idActividad`: ID único de la actividad.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Estado actualizado exitosamente con el desglose de tareas en las fases.
 * - 200: Error al obtener el porcentaje del proyecto si `idActividad` no es válido.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al interactuar con la base de datos.
 */
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
//# sourceMappingURL=actividadController.js.map