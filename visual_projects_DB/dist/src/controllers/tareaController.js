"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarTarea = exports.eliminarTarea = exports.totalPresupuestoTareaActividad = exports.actualizarTareaCierre = exports.actualizarTareaEjecucion = exports.actualizarTareaOrganizacion = exports.actualizarTareaInicio = exports.consultarTareasActividadCierre = exports.consultarTareasActividadEjecucion = exports.consultarTareasActividadOrganizacion = exports.consultarTareasActividadInicio = exports.consultarTareasActividad = exports.crearTarea = exports.porcentajeTareas = exports.contarTotalTareas = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const sequelize_1 = require("sequelize");
const findTask_1 = require("../services/findTask");
/**
 * Función para contar el total de tareas asociadas a un cronograma de un proyecto.
 * Dado un `idCronograma`, consulta la base de datos para obtener el número total de tareas asociadas a dicho cronograma.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Se espera que el cuerpo de la solicitud tenga la estructura `{ data: { activity: { idCronograma } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la consulta.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Total de tareas asociadas al cronograma, o 0 si no hay tareas asociadas.
 *    - 503: Error en el servidor durante la consulta.
 */
async function contarTotalTareas(req, res) {
    req = req.body.data.activity;
    const { idCronograma } = req;
    try {
        if (idCronograma) {
            let totalTotal = await (0, findTask_1.findTotalTask)(idCronograma);
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
/**
 * Función para obtener el porcentaje de tareas terminadas en relación con el cronograma de un proyecto.
 * Dado un `idCronograma`, consulta la base de datos para obtener el número de tareas en diferentes estados:
 * - Tareas inicializadas
 * - Tareas organizadas
 * - Tareas en ejecución
 * - Tareas terminadas
 *
 * Calcula y retorna la información sobre las actividades asociadas al cronograma.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Se espera que el cuerpo de la solicitud tenga la estructura `{ data: { activity: { idCronograma } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la consulta.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Información sobre el total de tareas en los diferentes estados: inicial, organización, ejecución, y terminación.
 *    - 503: Error en el servidor durante la consulta.
 */
async function porcentajeTareas(req, res) {
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
exports.porcentajeTareas = porcentajeTareas;
/**
 * Función para crear una nueva tarea y asociarla con una actividad.
 * Esta función realiza los siguientes pasos:
 * 1. Verifica si la tarea planeada con el mismo nombre y actividad ya existe.
 * 2. Si no existe, crea un responsable (si no está registrado) y una tarea planeada.
 * 3. Luego crea la tarea real asociada con la actividad y el responsable.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Se espera que el cuerpo de la solicitud tenga la estructura `{ data: { task: { nombre, descripcion, presupuesto, fechaInicio, fechaFinal, usuario, idActividad, nombreActividad } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la creación:
 *    - 200: Si la tarea y la actividad planeada se crearon correctamente.
 *    - 400: En caso de error al crear la tarea o si el nombre ya está registrado.
 *    - 503: Error en el servidor durante la operación.
 */
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
/**
 * Función para consultar todas las tareas asociadas a una actividad específica.
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas asociadas a esa actividad.
 * 3. Incluye información adicional de los responsables de cada tarea y su estado.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas asociadas a la actividad y se retorna la lista.
 *    - 200: Si no existen tareas asociadas a la actividad, se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para consultar todas las tareas activas asociadas a una actividad específica.
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas activas asociadas a esa actividad.
 * 3. Si hay tareas con estado inicio, extrae los IDs de las tareas y los devuelve en una lista.
 * 4. Si no existen con estado inicio asociadas a la actividad, devuelve una lista vacía.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas activas asociadas a la actividad y se retorna la lista de IDs.
 *    - 200: Si no existen tareas activas asociadas a la actividad, se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para consultar todas las tareas asociadas a una actividad específica con un estado en organización
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas asociadas a esa actividad con estado "2" ("en organización").
 * 3. Si hay tareas con ese estado, extrae los IDs de las tareas y los devuelve en una lista.
 * 4. Si no existen tareas con el estado "2" asociadas a la actividad, devuelve una lista vacía.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas asociadas a la actividad con estado "2" y se retorna la lista de IDs.
 *    - 200: Si no existen tareas asociadas con estado "2", se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para consultar todas las tareas asociadas a una actividad específica con un estado en ejecución
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas asociadas a esa actividad con estado "3" ("en ejecución").
 * 3. Si hay tareas con ese estado, extrae los IDs de las tareas y los devuelve en una lista.
 * 4. Si no existen tareas con el estado "3" asociadas a la actividad, devuelve una lista vacía.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas asociadas a la actividad con estado "3" y se retorna la lista de IDs.
 *    - 200: Si no existen tareas asociadas con estado "3", se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para consultar todas las tareas asociadas a una actividad específica con un estado de "4" ("cerrada").
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas asociadas a esa actividad con estado "4" ("cerrada").
 * 3. Si hay tareas con ese estado, extrae los IDs de las tareas y los devuelve en una lista.
 * 4. Si no existen tareas con el estado "4" asociadas a la actividad, devuelve una lista vacía.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas asociadas a la actividad con estado "4" y se retorna la lista de IDs.
 *    - 200: Si no existen tareas asociadas con estado "4", se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para actualizar el estado de una tarea a "1" ("inicio").
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Verifica si se ha proporcionado el ID de la tarea.
 * 3. Si el ID es válido, actualiza el estado de la tarea a "1".
 * 4. Si la tarea se actualiza correctamente, devuelve un mensaje de éxito con el estado 200.
 * 5. Si no se proporciona un ID de tarea, devuelve un mensaje de error con el estado 404.
 * 6. Si ocurre un error durante la operación, devuelve un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la operación:
 *    - 200: Si la tarea se actualiza correctamente.
 *    - 400: Si ocurre un error al actualizar la tarea.
 *    - 404: Si no se proporciona el ID de la tarea.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para actualizar el estado de una tarea a "2" ("organización").
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Verifica si se ha proporcionado el ID de la tarea.
 * 3. Si el ID es válido, actualiza el estado de la tarea a "2".
 * 4. Si la tarea se actualiza correctamente, devuelve un mensaje de éxito con el estado 200.
 * 5. Si no se proporciona un ID de tarea, devuelve un mensaje de error con el estado 404.
 * 6. Si ocurre un error durante la operación, devuelve un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la operación:
 *    - 200: Si la tarea se actualiza correctamente.
 *    - 400: Si ocurre un error al actualizar la tarea.
 *    - 404: Si no se proporciona el ID de la tarea.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para actualizar el estado de una tarea a "3" ("ejecución").
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Verifica si se ha proporcionado el ID de la tarea.
 * 3. Si el ID es válido, actualiza el estado de la tarea a "3".
 * 4. Si la tarea se actualiza correctamente, devuelve un mensaje de éxito con el estado 200.
 * 5. Si no se proporciona un ID de tarea, devuelve un mensaje de error con el estado 404.
 * 6. Si ocurre un error durante la operación, devuelve un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la operación:
 *    - 200: Si la tarea se actualiza correctamente.
 *    - 400: Si ocurre un error al actualizar la tarea.
 *    - 404: Si no se proporciona el ID de la tarea.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para actualizar el estado de una tarea a "4" ("cierre").
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Verifica si se ha proporcionado el ID de la tarea.
 * 3. Si el ID es válido, actualiza el estado de la tarea a "4".
 * 4. Si la tarea se actualiza correctamente, devuelve un mensaje de éxito con el estado 200.
 * 5. Si no se proporciona un ID de tarea, devuelve un mensaje de error con el estado 404.
 * 6. Si ocurre un error durante la operación, devuelve un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la operación:
 *    - 200: Si la tarea se actualiza correctamente.
 *    - 400: Si ocurre un error al actualizar la tarea.
 *    - 404: Si no se proporciona el ID de la tarea.
 *    - 503: Error en el servidor durante la operación.
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
/**
 * Función para obtener el presupuesto total de todas las tareas asociadas a una actividad.
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la actividad desde los parámetros de la solicitud.
 * 2. Busca todas las tareas asociadas a la actividad proporcionada.
 * 3. Si se encuentran tareas, suma el presupuesto de cada tarea.
 * 4. Devuelve el total de presupuesto de todas las tareas asociadas a la actividad.
 * 5. Si no se encuentran tareas, responde con un mensaje indicando que no existen tareas.
 * 6. Si ocurre un error durante la operación, responde con un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el total de presupuesto de las tareas o un error:
 *    - 200: Si se encuentran tareas y se calcula el presupuesto total correctamente.
 *    - 400: Si no se encuentran tareas asociadas a la actividad.
 *    - 503: Error en el servidor durante la operación.
 */
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
/**
 * Función para eliminar una tarea y actualizar los presupuestos de la actividad y la meta asociadas.
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Elimina los recursos asociados a la tarea.
 * 3. Busca la tarea y obtiene el ID de la actividad y el presupuesto de la tarea.
 * 4. Actualiza el presupuesto de la actividad restando el presupuesto de la tarea eliminada.
 * 5. Actualiza el presupuesto de la meta asociada a la actividad.
 * 6. Elimina la tarea de la base de datos.
 * 7. Devuelve una respuesta indicando si la tarea fue eliminada exitosamente o si ocurrió un error.
 * 8. Si ocurre un error en cualquier parte del proceso, responde con un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con la tarea eliminada o un error:
 *    - 200: Si la tarea fue eliminada exitosamente.
 *    - 404: Si no se pudo eliminar la tarea.
 *    - 503: Error en el servidor durante la operación.
 */
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
/**
 * Función para actualizar una tarea existente.
 * Realiza lo siguiente:
 * 1. Obtiene los datos de la tarea que se van a actualizar desde el cuerpo de la solicitud (`req.body.data.task`).
 * 2. Verifica si ya existe una tarea con el mismo nombre y el mismo ID (`idTarea`).
 * 3. Si existe, busca al responsable (usuario asociado) de la tarea y lo crea si no existe.
 * 4. Actualiza la tarea con los nuevos datos, incluyendo el nombre, descripción y presupuesto.
 * 5. Actualiza la tarea planificada con las fechas de inicio y finalización, además del responsable.
 * 6. Si no existe una tarea con el mismo nombre, verifica que no haya otra tarea con ese nombre, y si es así, devuelve un error.
 * 7. Si la tarea se actualiza correctamente, responde con éxito, de lo contrario, con un error.
 * 8. Si ocurre un error en el proceso, devuelve una respuesta con un error 503 (error en el servidor).
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos de la tarea a actualizar en `req.body.data.task`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con la tarea actualizada o un error:
 *    - 200: Si la tarea fue actualizada exitosamente.
 *    - 400: Si hay un error al actualizar la tarea o si el nombre de la tarea ya existe.
 *    - 503: Error en el servidor durante la operación.
 */
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
                Responsable_idResponsable: idResponsable,
                fechaInicio: fechaInicio,
                FechaFinal: fechaFinal,
            };
            await initModel.tareaplaneada.update(tareaPlaned, {
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
                await initModel.tareaplaneada.update(tareaPlaned, {
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