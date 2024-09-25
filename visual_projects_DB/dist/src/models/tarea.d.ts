import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
import type { actividad, actividadId } from './actividad';
import type { estado, estadoId } from './estado';
import type { recurso, recursoId } from './recurso';
import type { responsable, responsableId } from './responsable';
export interface tareaAttributes {
    idTarea: number;
    nombre?: string;
    descripcion?: string;
    presupuesto?: number;
    fechaInicio?: Date;
    FechaFinal?: Date;
    Estado_idEstado: number;
    Actividad_idActividad: number;
    Responsable_idResponsable: number;
}
export type tareaPk = "idTarea";
export type tareaId = tarea[tareaPk];
export type tareaOptionalAttributes = "idTarea" | "nombre" | "descripcion" | "presupuesto" | "fechaInicio" | "FechaFinal";
export type tareaCreationAttributes = Optional<tareaAttributes, tareaOptionalAttributes>;
export declare class tarea extends Model<tareaAttributes, tareaCreationAttributes> implements tareaAttributes {
    idTarea: number;
    nombre?: string;
    descripcion?: string;
    presupuesto?: number;
    fechaInicio?: Date;
    FechaFinal?: Date;
    Estado_idEstado: number;
    Actividad_idActividad: number;
    Responsable_idResponsable: number;
    Actividad_idActividad_actividad: actividad;
    getActividad_idActividad_actividad: Sequelize.BelongsToGetAssociationMixin<actividad>;
    setActividad_idActividad_actividad: Sequelize.BelongsToSetAssociationMixin<actividad, actividadId>;
    createActividad_idActividad_actividad: Sequelize.BelongsToCreateAssociationMixin<actividad>;
    Estado_idEstado_estado: estado;
    getEstado_idEstado_estado: Sequelize.BelongsToGetAssociationMixin<estado>;
    setEstado_idEstado_estado: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
    createEstado_idEstado_estado: Sequelize.BelongsToCreateAssociationMixin<estado>;
    Responsable_idResponsable_responsable: responsable;
    getResponsable_idResponsable_responsable: Sequelize.BelongsToGetAssociationMixin<responsable>;
    setResponsable_idResponsable_responsable: Sequelize.BelongsToSetAssociationMixin<responsable, responsableId>;
    createResponsable_idResponsable_responsable: Sequelize.BelongsToCreateAssociationMixin<responsable>;
    recursos: recurso[];
    getRecursos: Sequelize.HasManyGetAssociationsMixin<recurso>;
    setRecursos: Sequelize.HasManySetAssociationsMixin<recurso, recursoId>;
    addRecurso: Sequelize.HasManyAddAssociationMixin<recurso, recursoId>;
    addRecursos: Sequelize.HasManyAddAssociationsMixin<recurso, recursoId>;
    createRecurso: Sequelize.HasManyCreateAssociationMixin<recurso>;
    removeRecurso: Sequelize.HasManyRemoveAssociationMixin<recurso, recursoId>;
    removeRecursos: Sequelize.HasManyRemoveAssociationsMixin<recurso, recursoId>;
    hasRecurso: Sequelize.HasManyHasAssociationMixin<recurso, recursoId>;
    hasRecursos: Sequelize.HasManyHasAssociationsMixin<recurso, recursoId>;
    countRecursos: Sequelize.HasManyCountAssociationsMixin;
    static initModel(sequelize: Sequelize.Sequelize): typeof tarea;
}
//# sourceMappingURL=tarea.d.ts.map