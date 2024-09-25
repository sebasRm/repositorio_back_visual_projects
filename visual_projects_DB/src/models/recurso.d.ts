import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
import type { actividad, actividadId } from './actividad';
import type { actividadplaneada, actividadplaneadaId } from './actividadplaneada';
import type { tarea, tareaId } from './tarea';
import type { tareaplaneada, tareaplaneadaId } from './tareaplaneada';
export interface recursoAttributes {
    idRecurso: number;
    nombre?: string;
    descripcion?: string;
    presupuesto?: number;
    TareaPlaneada_idTareaPlaneada?: number;
    ActividadPlaneada_idActividadPlaneada?: number;
    Actividad_idActividad?: number;
    Tarea_idTarea?: number;
}
export type recursoPk = "idRecurso";
export type recursoId = recurso[recursoPk];
export type recursoOptionalAttributes = "idRecurso" | "nombre" | "descripcion" | "presupuesto" | "TareaPlaneada_idTareaPlaneada" | "ActividadPlaneada_idActividadPlaneada" | "Actividad_idActividad" | "Tarea_idTarea";
export type recursoCreationAttributes = Optional<recursoAttributes, recursoOptionalAttributes>;
export declare class recurso extends Model<recursoAttributes, recursoCreationAttributes> implements recursoAttributes {
    idRecurso: number;
    nombre?: string;
    descripcion?: string;
    presupuesto?: number;
    TareaPlaneada_idTareaPlaneada?: number;
    ActividadPlaneada_idActividadPlaneada?: number;
    Actividad_idActividad?: number;
    Tarea_idTarea?: number;
    Actividad_idActividad_actividad: actividad;
    getActividad_idActividad_actividad: Sequelize.BelongsToGetAssociationMixin<actividad>;
    setActividad_idActividad_actividad: Sequelize.BelongsToSetAssociationMixin<actividad, actividadId>;
    createActividad_idActividad_actividad: Sequelize.BelongsToCreateAssociationMixin<actividad>;
    ActividadPlaneada_idActividadPlaneada_actividadplaneada: actividadplaneada;
    getActividadPlaneada_idActividadPlaneada_actividadplaneada: Sequelize.BelongsToGetAssociationMixin<actividadplaneada>;
    setActividadPlaneada_idActividadPlaneada_actividadplaneada: Sequelize.BelongsToSetAssociationMixin<actividadplaneada, actividadplaneadaId>;
    createActividadPlaneada_idActividadPlaneada_actividadplaneada: Sequelize.BelongsToCreateAssociationMixin<actividadplaneada>;
    Tarea_idTarea_tarea: tarea;
    getTarea_idTarea_tarea: Sequelize.BelongsToGetAssociationMixin<tarea>;
    setTarea_idTarea_tarea: Sequelize.BelongsToSetAssociationMixin<tarea, tareaId>;
    createTarea_idTarea_tarea: Sequelize.BelongsToCreateAssociationMixin<tarea>;
    TareaPlaneada_idTareaPlaneada_tareaplaneada: tareaplaneada;
    getTareaPlaneada_idTareaPlaneada_tareaplaneada: Sequelize.BelongsToGetAssociationMixin<tareaplaneada>;
    setTareaPlaneada_idTareaPlaneada_tareaplaneada: Sequelize.BelongsToSetAssociationMixin<tareaplaneada, tareaplaneadaId>;
    createTareaPlaneada_idTareaPlaneada_tareaplaneada: Sequelize.BelongsToCreateAssociationMixin<tareaplaneada>;
    static initModel(sequelize: Sequelize.Sequelize): typeof recurso;
}
//# sourceMappingURL=recurso.d.ts.map