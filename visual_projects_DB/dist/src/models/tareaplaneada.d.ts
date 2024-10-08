import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
import type { actividadplaneada, actividadplaneadaId } from './actividadplaneada';
import type { estado, estadoId } from './estado';
import type { recurso, recursoId } from './recurso';
import type { responsable, responsableId } from './responsable';
export interface tareaplaneadaAttributes {
    idTareaPlaneada: number;
    nombre?: string;
    descripcion?: string;
    presupuesto?: number;
    fechaInicio?: Date;
    FechaFinal?: Date;
    Estado_idEstado: number;
    ActividadPlaneada_idActividadPlaneada: number;
    Responsable_idResponsable: number;
    cronogramaOriginal?: number;
}
export type tareaplaneadaPk = "idTareaPlaneada";
export type tareaplaneadaId = tareaplaneada[tareaplaneadaPk];
export type tareaplaneadaOptionalAttributes = "idTareaPlaneada" | "nombre" | "descripcion" | "presupuesto" | "fechaInicio" | "FechaFinal" | "cronogramaOriginal";
export type tareaplaneadaCreationAttributes = Optional<tareaplaneadaAttributes, tareaplaneadaOptionalAttributes>;
export declare class tareaplaneada extends Model<tareaplaneadaAttributes, tareaplaneadaCreationAttributes> implements tareaplaneadaAttributes {
    idTareaPlaneada: number;
    nombre?: string;
    descripcion?: string;
    presupuesto?: number;
    fechaInicio?: Date;
    FechaFinal?: Date;
    Estado_idEstado: number;
    ActividadPlaneada_idActividadPlaneada: number;
    Responsable_idResponsable: number;
    cronogramaOriginal?: number;
    ActividadPlaneada_idActividadPlaneada_actividadplaneada: actividadplaneada;
    getActividadPlaneada_idActividadPlaneada_actividadplaneada: Sequelize.BelongsToGetAssociationMixin<actividadplaneada>;
    setActividadPlaneada_idActividadPlaneada_actividadplaneada: Sequelize.BelongsToSetAssociationMixin<actividadplaneada, actividadplaneadaId>;
    createActividadPlaneada_idActividadPlaneada_actividadplaneada: Sequelize.BelongsToCreateAssociationMixin<actividadplaneada>;
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
    static initModel(sequelize: Sequelize.Sequelize): typeof tareaplaneada;
}
//# sourceMappingURL=tareaplaneada.d.ts.map