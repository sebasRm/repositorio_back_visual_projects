import type { Sequelize } from "sequelize";
import { actividad as _actividad } from "./actividad";
import type { actividadAttributes, actividadCreationAttributes } from "./actividad";
import { actividadplaneada as _actividadplaneada } from "./actividadplaneada";
import type { actividadplaneadaAttributes, actividadplaneadaCreationAttributes } from "./actividadplaneada";
import { cronograma as _cronograma } from "./cronograma";
import type { cronogramaAttributes, cronogramaCreationAttributes } from "./cronograma";
import { director as _director } from "./director";
import type { directorAttributes, directorCreationAttributes } from "./director";
import { estado as _estado } from "./estado";
import type { estadoAttributes, estadoCreationAttributes } from "./estado";
import { lider as _lider } from "./lider";
import type { liderAttributes, liderCreationAttributes } from "./lider";
import { meta as _meta } from "./meta";
import type { metaAttributes, metaCreationAttributes } from "./meta";
import { planeacion as _planeacion } from "./planeacion";
import type { planeacionAttributes, planeacionCreationAttributes } from "./planeacion";
import { proyecto as _proyecto } from "./proyecto";
import type { proyectoAttributes, proyectoCreationAttributes } from "./proyecto";
import { recurso as _recurso } from "./recurso";
import type { recursoAttributes, recursoCreationAttributes } from "./recurso";
import { responsable as _responsable } from "./responsable";
import type { responsableAttributes, responsableCreationAttributes } from "./responsable";
import { tarea as _tarea } from "./tarea";
import type { tareaAttributes, tareaCreationAttributes } from "./tarea";
import { tareaplaneada as _tareaplaneada } from "./tareaplaneada";
import type { tareaplaneadaAttributes, tareaplaneadaCreationAttributes } from "./tareaplaneada";
import { usuario as _usuario } from "./usuario";
import type { usuarioAttributes, usuarioCreationAttributes } from "./usuario";

export {
  _actividad as actividad,
  _actividadplaneada as actividadplaneada,
  _cronograma as cronograma,
  _director as director,
  _estado as estado,
  _lider as lider,
  _meta as meta,
  _planeacion as planeacion,
  _proyecto as proyecto,
  _recurso as recurso,
  _responsable as responsable,
  _tarea as tarea,
  _tareaplaneada as tareaplaneada,
  _usuario as usuario,
};

export type {
  actividadAttributes,
  actividadCreationAttributes,
  actividadplaneadaAttributes,
  actividadplaneadaCreationAttributes,
  cronogramaAttributes,
  cronogramaCreationAttributes,
  directorAttributes,
  directorCreationAttributes,
  estadoAttributes,
  estadoCreationAttributes,
  liderAttributes,
  liderCreationAttributes,
  metaAttributes,
  metaCreationAttributes,
  planeacionAttributes,
  planeacionCreationAttributes,
  proyectoAttributes,
  proyectoCreationAttributes,
  recursoAttributes,
  recursoCreationAttributes,
  responsableAttributes,
  responsableCreationAttributes,
  tareaAttributes,
  tareaCreationAttributes,
  tareaplaneadaAttributes,
  tareaplaneadaCreationAttributes,
  usuarioAttributes,
  usuarioCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const actividad = _actividad.initModel(sequelize);
  const actividadplaneada = _actividadplaneada.initModel(sequelize);
  const cronograma = _cronograma.initModel(sequelize);
  const director = _director.initModel(sequelize);
  const estado = _estado.initModel(sequelize);
  const lider = _lider.initModel(sequelize);
  const meta = _meta.initModel(sequelize);
  const planeacion = _planeacion.initModel(sequelize);
  const proyecto = _proyecto.initModel(sequelize);
  const recurso = _recurso.initModel(sequelize);
  const responsable = _responsable.initModel(sequelize);
  const tarea = _tarea.initModel(sequelize);
  const tareaplaneada = _tareaplaneada.initModel(sequelize);
  const usuario = _usuario.initModel(sequelize);

  recurso.belongsTo(actividad, { as: "Actividad_", foreignKey: "Actividad_idActividad"});
  actividad.hasMany(recurso, { as: "recursos", foreignKey: "Actividad_idActividad"});
  tarea.belongsTo(actividad, { as: "Actividad_", foreignKey: "Actividad_idActividad"});
  actividad.hasMany(tarea, { as: "tareas", foreignKey: "Actividad_idActividad"});
  recurso.belongsTo(actividadplaneada, { as: "ActividadPlaneada_", foreignKey: "ActividadPlaneada_idActividadPlaneada"});
  actividadplaneada.hasMany(recurso, { as: "recursos", foreignKey: "ActividadPlaneada_idActividadPlaneada"});
  tareaplaneada.belongsTo(actividadplaneada, { as: "ActividadPlaneada_", foreignKey: "ActividadPlaneada_idActividadPlaneada"});
  actividadplaneada.hasMany(tareaplaneada, { as: "tareaplaneadas", foreignKey: "ActividadPlaneada_idActividadPlaneada"});
  meta.belongsTo(cronograma, { as: "Cronograma_", foreignKey: "Cronograma_idCronograma"});
  cronograma.hasMany(meta, { as: "meta", foreignKey: "Cronograma_idCronograma"});
  proyecto.belongsTo(cronograma, { as: "Cronograma_", foreignKey: "Cronograma_idCronograma"});
  cronograma.hasMany(proyecto, { as: "proyectos", foreignKey: "Cronograma_idCronograma"});
  proyecto.belongsTo(director, { as: "Director_", foreignKey: "Director_idDirector"});
  director.hasMany(proyecto, { as: "proyectos", foreignKey: "Director_idDirector"});
  actividad.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(actividad, { as: "actividads", foreignKey: "Estado_idEstado"});
  actividadplaneada.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(actividadplaneada, { as: "actividadplaneadas", foreignKey: "Estado_idEstado"});
  meta.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(meta, { as: "meta", foreignKey: "Estado_idEstado"});
  proyecto.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(proyecto, { as: "proyectos", foreignKey: "Estado_idEstado"});
  tarea.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(tarea, { as: "tareas", foreignKey: "Estado_idEstado"});
  tareaplaneada.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(tareaplaneada, { as: "tareaplaneadas", foreignKey: "Estado_idEstado"});
  proyecto.belongsTo(lider, { as: "Lider_", foreignKey: "Lider_idLider"});
  lider.hasMany(proyecto, { as: "proyectos", foreignKey: "Lider_idLider"});
  actividad.belongsTo(meta, { as: "Meta_", foreignKey: "Meta_idMeta"});
  meta.hasMany(actividad, { as: "actividads", foreignKey: "Meta_idMeta"});
  actividadplaneada.belongsTo(meta, { as: "Meta_", foreignKey: "Meta_idMeta"});
  meta.hasMany(actividadplaneada, { as: "actividadplaneadas", foreignKey: "Meta_idMeta"});
  cronograma.belongsTo(planeacion, { as: "Planeacion_", foreignKey: "Planeacion_idPlaneacion"});
  planeacion.hasMany(cronograma, { as: "cronogramas", foreignKey: "Planeacion_idPlaneacion"});
  proyecto.belongsTo(planeacion, { as: "Planeacion_", foreignKey: "Planeacion_idPlaneacion"});
  planeacion.hasMany(proyecto, { as: "proyectos", foreignKey: "Planeacion_idPlaneacion"});
  actividad.belongsTo(responsable, { as: "Responsable_", foreignKey: "Responsable_idResponsable"});
  responsable.hasMany(actividad, { as: "actividads", foreignKey: "Responsable_idResponsable"});
  actividadplaneada.belongsTo(responsable, { as: "Responsable_", foreignKey: "Responsable_idResponsable"});
  responsable.hasMany(actividadplaneada, { as: "actividadplaneadas", foreignKey: "Responsable_idResponsable"});
  tarea.belongsTo(responsable, { as: "Responsable_", foreignKey: "Responsable_idResponsable"});
  responsable.hasMany(tarea, { as: "tareas", foreignKey: "Responsable_idResponsable"});
  tareaplaneada.belongsTo(responsable, { as: "Responsable_", foreignKey: "Responsable_idResponsable"});
  responsable.hasMany(tareaplaneada, { as: "tareaplaneadas", foreignKey: "Responsable_idResponsable"});
  recurso.belongsTo(tarea, { as: "Tarea_", foreignKey: "Tarea_idTarea"});
  tarea.hasMany(recurso, { as: "recursos", foreignKey: "Tarea_idTarea"});
  recurso.belongsTo(tareaplaneada, { as: "TareaPlaneada_", foreignKey: "TareaPlaneada_idTareaPlaneada"});
  tareaplaneada.hasMany(recurso, { as: "recursos", foreignKey: "TareaPlaneada_idTareaPlaneada"});
  director.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(director, { as: "directors", foreignKey: "Usuario_idUsuario"});
  lider.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(lider, { as: "liders", foreignKey: "Usuario_idUsuario"});
  responsable.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(responsable, { as: "responsables", foreignKey: "Usuario_idUsuario"});

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
