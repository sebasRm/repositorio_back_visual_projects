"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.usuario = exports.tareaplaneada = exports.tarea = exports.responsable = exports.recurso = exports.proyecto = exports.planeacion = exports.meta = exports.lider = exports.estado = exports.director = exports.cronograma = exports.actividadplaneada = exports.actividad = void 0;
const actividad_1 = require("./actividad");
Object.defineProperty(exports, "actividad", { enumerable: true, get: function () { return actividad_1.actividad; } });
const actividadplaneada_1 = require("./actividadplaneada");
Object.defineProperty(exports, "actividadplaneada", { enumerable: true, get: function () { return actividadplaneada_1.actividadplaneada; } });
const cronograma_1 = require("./cronograma");
Object.defineProperty(exports, "cronograma", { enumerable: true, get: function () { return cronograma_1.cronograma; } });
const director_1 = require("./director");
Object.defineProperty(exports, "director", { enumerable: true, get: function () { return director_1.director; } });
const estado_1 = require("./estado");
Object.defineProperty(exports, "estado", { enumerable: true, get: function () { return estado_1.estado; } });
const lider_1 = require("./lider");
Object.defineProperty(exports, "lider", { enumerable: true, get: function () { return lider_1.lider; } });
const meta_1 = require("./meta");
Object.defineProperty(exports, "meta", { enumerable: true, get: function () { return meta_1.meta; } });
const planeacion_1 = require("./planeacion");
Object.defineProperty(exports, "planeacion", { enumerable: true, get: function () { return planeacion_1.planeacion; } });
const proyecto_1 = require("./proyecto");
Object.defineProperty(exports, "proyecto", { enumerable: true, get: function () { return proyecto_1.proyecto; } });
const recurso_1 = require("./recurso");
Object.defineProperty(exports, "recurso", { enumerable: true, get: function () { return recurso_1.recurso; } });
const responsable_1 = require("./responsable");
Object.defineProperty(exports, "responsable", { enumerable: true, get: function () { return responsable_1.responsable; } });
const tarea_1 = require("./tarea");
Object.defineProperty(exports, "tarea", { enumerable: true, get: function () { return tarea_1.tarea; } });
const tareaplaneada_1 = require("./tareaplaneada");
Object.defineProperty(exports, "tareaplaneada", { enumerable: true, get: function () { return tareaplaneada_1.tareaplaneada; } });
const usuario_1 = require("./usuario");
Object.defineProperty(exports, "usuario", { enumerable: true, get: function () { return usuario_1.usuario; } });
function initModels(sequelize) {
    const actividad = actividad_1.actividad.initModel(sequelize);
    const actividadplaneada = actividadplaneada_1.actividadplaneada.initModel(sequelize);
    const cronograma = cronograma_1.cronograma.initModel(sequelize);
    const director = director_1.director.initModel(sequelize);
    const estado = estado_1.estado.initModel(sequelize);
    const lider = lider_1.lider.initModel(sequelize);
    const meta = meta_1.meta.initModel(sequelize);
    const planeacion = planeacion_1.planeacion.initModel(sequelize);
    const proyecto = proyecto_1.proyecto.initModel(sequelize);
    const recurso = recurso_1.recurso.initModel(sequelize);
    const responsable = responsable_1.responsable.initModel(sequelize);
    const tarea = tarea_1.tarea.initModel(sequelize);
    const tareaplaneada = tareaplaneada_1.tareaplaneada.initModel(sequelize);
    const usuario = usuario_1.usuario.initModel(sequelize);
    recurso.belongsTo(actividad, { as: "Actividad_", foreignKey: "Actividad_idActividad" });
    actividad.hasMany(recurso, { as: "recursos", foreignKey: "Actividad_idActividad" });
    tarea.belongsTo(actividad, { as: "Actividad_", foreignKey: "Actividad_idActividad" });
    actividad.hasMany(tarea, { as: "tareas", foreignKey: "Actividad_idActividad" });
    recurso.belongsTo(actividadplaneada, { as: "ActividadPlaneada_", foreignKey: "ActividadPlaneada_idActividadPlaneada" });
    actividadplaneada.hasMany(recurso, { as: "recursos", foreignKey: "ActividadPlaneada_idActividadPlaneada" });
    tareaplaneada.belongsTo(actividadplaneada, { as: "ActividadPlaneada_", foreignKey: "ActividadPlaneada_idActividadPlaneada" });
    actividadplaneada.hasMany(tareaplaneada, { as: "tareaplaneadas", foreignKey: "ActividadPlaneada_idActividadPlaneada" });
    meta.belongsTo(cronograma, { as: "Cronograma_", foreignKey: "Cronograma_idCronograma" });
    cronograma.hasMany(meta, { as: "meta", foreignKey: "Cronograma_idCronograma" });
    proyecto.belongsTo(cronograma, { as: "Cronograma_", foreignKey: "Cronograma_idCronograma" });
    cronograma.hasMany(proyecto, { as: "proyectos", foreignKey: "Cronograma_idCronograma" });
    proyecto.belongsTo(director, { as: "Director_", foreignKey: "Director_idDirector" });
    director.hasMany(proyecto, { as: "proyectos", foreignKey: "Director_idDirector" });
    actividad.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado" });
    estado.hasMany(actividad, { as: "actividads", foreignKey: "Estado_idEstado" });
    actividadplaneada.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado" });
    estado.hasMany(actividadplaneada, { as: "actividadplaneadas", foreignKey: "Estado_idEstado" });
    meta.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado" });
    estado.hasMany(meta, { as: "meta", foreignKey: "Estado_idEstado" });
    proyecto.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado" });
    estado.hasMany(proyecto, { as: "proyectos", foreignKey: "Estado_idEstado" });
    tarea.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado" });
    estado.hasMany(tarea, { as: "tareas", foreignKey: "Estado_idEstado" });
    tareaplaneada.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado" });
    estado.hasMany(tareaplaneada, { as: "tareaplaneadas", foreignKey: "Estado_idEstado" });
    proyecto.belongsTo(lider, { as: "Lider_", foreignKey: "Lider_idLider" });
    lider.hasMany(proyecto, { as: "proyectos", foreignKey: "Lider_idLider" });
    actividad.belongsTo(meta, { as: "Meta_", foreignKey: "Meta_idMeta" });
    meta.hasMany(actividad, { as: "actividads", foreignKey: "Meta_idMeta" });
    actividadplaneada.belongsTo(meta, { as: "Meta_", foreignKey: "Meta_idMeta" });
    meta.hasMany(actividadplaneada, { as: "actividadplaneadas", foreignKey: "Meta_idMeta" });
    cronograma.belongsTo(planeacion, { as: "Planeacion_", foreignKey: "Planeacion_idPlaneacion" });
    planeacion.hasMany(cronograma, { as: "cronogramas", foreignKey: "Planeacion_idPlaneacion" });
    proyecto.belongsTo(planeacion, { as: "Planeacion_", foreignKey: "Planeacion_idPlaneacion" });
    planeacion.hasMany(proyecto, { as: "proyectos", foreignKey: "Planeacion_idPlaneacion" });
    actividad.belongsTo(responsable, { as: "Responsable_", foreignKey: "Responsable_idResponsable" });
    responsable.hasMany(actividad, { as: "actividads", foreignKey: "Responsable_idResponsable" });
    actividadplaneada.belongsTo(responsable, { as: "Responsable_", foreignKey: "Responsable_idResponsable" });
    responsable.hasMany(actividadplaneada, { as: "actividadplaneadas", foreignKey: "Responsable_idResponsable" });
    tarea.belongsTo(responsable, { as: "Responsable_", foreignKey: "Responsable_idResponsable" });
    responsable.hasMany(tarea, { as: "tareas", foreignKey: "Responsable_idResponsable" });
    tareaplaneada.belongsTo(responsable, { as: "Responsable_", foreignKey: "Responsable_idResponsable" });
    responsable.hasMany(tareaplaneada, { as: "tareaplaneadas", foreignKey: "Responsable_idResponsable" });
    recurso.belongsTo(tarea, { as: "Tarea_", foreignKey: "Tarea_idTarea" });
    tarea.hasMany(recurso, { as: "recursos", foreignKey: "Tarea_idTarea" });
    recurso.belongsTo(tareaplaneada, { as: "TareaPlaneada_", foreignKey: "TareaPlaneada_idTareaPlaneada" });
    tareaplaneada.hasMany(recurso, { as: "recursos", foreignKey: "TareaPlaneada_idTareaPlaneada" });
    director.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario" });
    usuario.hasMany(director, { as: "directors", foreignKey: "Usuario_idUsuario" });
    lider.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario" });
    usuario.hasMany(lider, { as: "liders", foreignKey: "Usuario_idUsuario" });
    responsable.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario" });
    usuario.hasMany(responsable, { as: "responsables", foreignKey: "Usuario_idUsuario" });
    return {
        actividad: actividad,
        actividadplaneada: actividadplaneada,
        cronograma: cronograma,
        director: director,
        estado: estado,
        lider: lider,
        meta: meta,
        planeacion: planeacion,
        proyecto: proyecto,
        recurso: recurso,
        responsable: responsable,
        tarea: tarea,
        tareaplaneada: tareaplaneada,
        usuario: usuario,
    };
}
exports.initModels = initModels;
