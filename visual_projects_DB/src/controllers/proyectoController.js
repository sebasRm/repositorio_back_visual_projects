"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarProyecto = exports.eliminarProyecto = exports.crearProyectos = exports.consultarProyectosLider = exports.consultarProyectosDirector = exports.consultarProyectos = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
const utils_1 = require("../helpers/utils");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const indicators_1 = require("../services/indicators");
const bcrypt = require("bcrypt");
/*
   => Funcion para consultar todos los proyectos
*/
async function consultarProyectos(req, res) {
    try {
        const proyectos = await initModel.proyecto.findAll({
            include: [
                {
                    model: initModel.planeacion,
                    as: "Planeacion_",
                },
                {
                    model: initModel.estado,
                    as: "Estado_",
                },
                {
                    model: initModel.lider,
                    as: "Lider_",
                    include: [
                        {
                            model: initModel.usuario,
                            as: "Usuario_",
                        },
                    ],
                },
            ],
        });
        if (proyectos) {
            let proyecto;
            //console.log("soy el proyectos", proyectos)
            for (proyecto in proyectos) {
                let Planeacion_idPlaneacion = proyectos[proyecto].dataValues
                    ? proyectos[proyecto].dataValues.Planeacion_idPlaneacion
                    : 0;
                let Cronograma_idCronograma = proyectos[proyecto].dataValues
                    ? proyectos[proyecto].dataValues.Planeacion_idPlaneacion
                    : 0;
                let spi = await (0, indicators_1.serviceIndicatorProjectSPI)(Cronograma_idCronograma, Planeacion_idPlaneacion);
                let cpi = await (0, indicators_1.serviceIndicatorProjectCPI)(Cronograma_idCronograma, Planeacion_idPlaneacion);
                proyectos[proyecto].dataValues.indicator_spi = spi;
                proyectos[proyecto].dataValues.indicator_cpi = cpi;
            }
            return (0, utils_1.responseMessage)(res, 200, proyectos, "proyectos asociados al director");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "no existen proyectos asociados al director");
        }
    }
    catch (error) {
        console.log("soy el error", error);
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarProyectos = consultarProyectos;
/*
   => Funcion para consultar todos los proyectos asociados a un director
*/
async function consultarProyectosDirector(req, res) {
    try {
        let id_director = req.params.idDirector;
        const proyectos = await initModel.proyecto.findAll({
            where: {
                Director_idDirector: id_director,
            },
            include: [
                {
                    model: initModel.estado,
                    as: "Estado_",
                },
                {
                    model: initModel.lider,
                    as: "Lider_",
                    include: [
                        {
                            model: initModel.usuario,
                            as: "Usuario_",
                        },
                    ],
                },
            ],
        });
        if (proyectos) {
            let proyecto;
            //console.log("soy el proyectos", proyectos)
            for (proyecto in proyectos) {
                let Planeacion_idPlaneacion = proyectos[proyecto].dataValues
                    ? proyectos[proyecto].dataValues.Planeacion_idPlaneacion
                    : 0;
                let Cronograma_idCronograma = proyectos[proyecto].dataValues
                    ? proyectos[proyecto].dataValues.Planeacion_idPlaneacion
                    : 0;
                let spi = await (0, indicators_1.serviceIndicatorProjectSPI)(Cronograma_idCronograma, Planeacion_idPlaneacion);
                let cpi = await (0, indicators_1.serviceIndicatorProjectCPI)(Cronograma_idCronograma, Planeacion_idPlaneacion);
                proyectos[proyecto].dataValues.indicator_spi = spi;
                proyectos[proyecto].dataValues.indicator_cpi = cpi;
            }
            return (0, utils_1.responseMessage)(res, 200, proyectos, "proyectos asociados al director");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "no existen proyectos asociados al director");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarProyectosDirector = consultarProyectosDirector;
/*
   => Función para consultar todos el proyecto asociados a un líder
*/
async function consultarProyectosLider(req, res) {
    try {
        let id_lider = req.params.idLider;
        const lideres = await initModel.proyecto.findAll({
            include: [
                {
                    model: initModel.lider,
                    as: "Lider_",
                    where: {
                        idLider: id_lider,
                    },
                },
                {
                    model: initModel.estado,
                    as: "Estado_",
                },
                {
                    model: initModel.planeacion,
                    as: "Planeacion_",
                },
            ],
        });
        if (lideres.length > 0) {
            return (0, utils_1.responseMessage)(res, 200, lideres, "Proyecto asociado al líder");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "No existen proyectos asociados al líderes");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarProyectosLider = consultarProyectosLider;
/*
   => Funcion para crear un proyecto
*/
async function crearProyectos(req, res) {
    try {
        req = req.body.data.project;
        const { name } = req;
        const { descripcion } = req;
        const { idLider } = req;
        const { idDirector } = req;
        console.log("soy el verdadero");
        const proyectoExist = await initModel.proyecto.findOne({
            where: { nombre: name },
        });
        if (proyectoExist) {
            return (0, utils_1.responseMessage)(res, 404, false, "Ya se encuentra registrado un proyecto con ese nombre");
        }
        const proyectos = await initModel.proyecto.create({
            nombre: name,
            descripcion: descripcion,
            fechaInicio: new Date(),
            Estado_idEstado: 1,
            Lider_idLider: idLider,
            Director_idDirector: idDirector,
        });
        if (proyectos) {
            return (0, utils_1.responseMessage)(res, 200, proyectos, "Proyecto creado correctamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error al crear la meta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.crearProyectos = crearProyectos;
async function eliminarProyecto(req, res) {
    try {
        let idProyecto = req.params.idProyecto;
        let proyecto = await initModel.proyecto.findOne({
            where: { idProyecto: idProyecto },
        });
        if (proyecto) {
            let idCronograma = proyecto.dataValues.Cronograma_idCronograma;
            let idPlaneacion = proyecto.dataValues.Planeacion_idPlaneacion;
            let metas = await initModel.meta.findAll({
                where: { Cronograma_idCronograma: idCronograma },
            });
            if (metas.length > 0) {
                for (const meta in metas) {
                    let idMeta = metas[meta].dataValues.idMeta;
                    let actividades = await initModel.actividad.findAll({
                        where: { Meta_idMeta: idMeta },
                    });
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
                }
            }
        }
        let planeacionDeleted = await initModel.proyecto.destroy({
            where: { idProyecto: idProyecto },
        });
        if (planeacionDeleted) {
            return (0, utils_1.responseMessage)(res, 200, planeacionDeleted, "Se elimino el proyecto exitosamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, [], "Error al eliminar el proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.eliminarProyecto = eliminarProyecto;
async function actualizarProyecto(req, res) {
    try {
        req = req.body.data.project;
        const { idProyecto } = req;
        const { name } = req;
        const { descripcion } = req;
        const { idEstado } = req;
        const { fechaInicio } = req;
        const { fechaFinal } = req;
        const { presupuesto } = req;
        const project = {
            nombre: name,
            descripcion: descripcion,
            fechaInicio: fechaInicio,
            fechaFinal: fechaFinal,
            Estado_idEstado: idEstado,
        };
        const proyectoUpdate = await initModel.proyecto.update(project, {
            where: { idProyecto: idProyecto },
        });
        const proyecto = await initModel.proyecto.findOne({
            where: { idProyecto: idProyecto },
        });
        const idPlaneacion = proyecto.dataValues.Planeacion_idPlaneacion;
        console.log('soy el idPlaneacion', idPlaneacion);
        if (idPlaneacion) {
            const presupuestoPlanificado = {
                presupuesto: presupuesto,
            };
            const proyectoUpdate = await initModel.planeacion.update(presupuestoPlanificado, {
                where: { idPlaneacion: idPlaneacion },
            });
        }
        if (proyectoUpdate) {
            return (0, utils_1.responseMessage)(res, 200, proyectoUpdate, "Proyecto actualizado correctamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar el proyecto");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarProyecto = actualizarProyecto;
//# sourceMappingURL=proyectoController.js.map