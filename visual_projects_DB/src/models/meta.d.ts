import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
import type { actividad, actividadId } from './actividad';
import type { actividadplaneada, actividadplaneadaId } from './actividadplaneada';
import type { cronograma, cronogramaId } from './cronograma';
import type { estado, estadoId } from './estado';
export interface metaAttributes {
    idMeta: number;
    nombre?: string;
    descripcion?: string;
    presupuesto?: number;
    Cronograma_idCronograma: number;
    Estado_idEstado: number;
}
export type metaPk = "idMeta";
export type metaId = meta[metaPk];
export type metaOptionalAttributes = "idMeta" | "nombre" | "descripcion" | "presupuesto";
export type metaCreationAttributes = Optional<metaAttributes, metaOptionalAttributes>;
export declare class meta extends Model<metaAttributes, metaCreationAttributes> implements metaAttributes {
    idMeta: number;
    nombre?: string;
    descripcion?: string;
    presupuesto?: number;
    Cronograma_idCronograma: number;
    Estado_idEstado: number;
    Cronograma_idCronograma_cronograma: cronograma;
    getCronograma_idCronograma_cronograma: Sequelize.BelongsToGetAssociationMixin<cronograma>;
    setCronograma_idCronograma_cronograma: Sequelize.BelongsToSetAssociationMixin<cronograma, cronogramaId>;
    createCronograma_idCronograma_cronograma: Sequelize.BelongsToCreateAssociationMixin<cronograma>;
    Estado_idEstado_estado: estado;
    getEstado_idEstado_estado: Sequelize.BelongsToGetAssociationMixin<estado>;
    setEstado_idEstado_estado: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
    createEstado_idEstado_estado: Sequelize.BelongsToCreateAssociationMixin<estado>;
    actividads: actividad[];
    getActividads: Sequelize.HasManyGetAssociationsMixin<actividad>;
    setActividads: Sequelize.HasManySetAssociationsMixin<actividad, actividadId>;
    addActividad: Sequelize.HasManyAddAssociationMixin<actividad, actividadId>;
    addActividads: Sequelize.HasManyAddAssociationsMixin<actividad, actividadId>;
    createActividad: Sequelize.HasManyCreateAssociationMixin<actividad>;
    removeActividad: Sequelize.HasManyRemoveAssociationMixin<actividad, actividadId>;
    removeActividads: Sequelize.HasManyRemoveAssociationsMixin<actividad, actividadId>;
    hasActividad: Sequelize.HasManyHasAssociationMixin<actividad, actividadId>;
    hasActividads: Sequelize.HasManyHasAssociationsMixin<actividad, actividadId>;
    countActividads: Sequelize.HasManyCountAssociationsMixin;
    actividadplaneadas: actividadplaneada[];
    getActividadplaneadas: Sequelize.HasManyGetAssociationsMixin<actividadplaneada>;
    setActividadplaneadas: Sequelize.HasManySetAssociationsMixin<actividadplaneada, actividadplaneadaId>;
    addActividadplaneada: Sequelize.HasManyAddAssociationMixin<actividadplaneada, actividadplaneadaId>;
    addActividadplaneadas: Sequelize.HasManyAddAssociationsMixin<actividadplaneada, actividadplaneadaId>;
    createActividadplaneada: Sequelize.HasManyCreateAssociationMixin<actividadplaneada>;
    removeActividadplaneada: Sequelize.HasManyRemoveAssociationMixin<actividadplaneada, actividadplaneadaId>;
    removeActividadplaneadas: Sequelize.HasManyRemoveAssociationsMixin<actividadplaneada, actividadplaneadaId>;
    hasActividadplaneada: Sequelize.HasManyHasAssociationMixin<actividadplaneada, actividadplaneadaId>;
    hasActividadplaneadas: Sequelize.HasManyHasAssociationsMixin<actividadplaneada, actividadplaneadaId>;
    countActividadplaneadas: Sequelize.HasManyCountAssociationsMixin;
    static initModel(sequelize: Sequelize.Sequelize): typeof meta;
}
//# sourceMappingURL=meta.d.ts.map