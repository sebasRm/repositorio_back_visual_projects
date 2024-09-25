import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { estado, estadoId } from './estado';
import type { meta, metaId } from './meta';
import type { recurso, recursoId } from './recurso';
import type { responsable, responsableId } from './responsable';
import type { tareaplaneada, tareaplaneadaId } from './tareaplaneada';

export interface actividadplaneadaAttributes {
  idActividadPlaneada: number;
  nombre?: string;
  descripcion?: string;
  presupuesto?: number;
  fechaInicio?: Date;
  FechaFinal?: Date;
  Estado_idEstado: number;
  Meta_idMeta: number;
  Responsable_idResponsable: number;
  cronogramaOriginal?: number;
}

export type actividadplaneadaPk = "idActividadPlaneada";
export type actividadplaneadaId = actividadplaneada[actividadplaneadaPk];
export type actividadplaneadaOptionalAttributes = "idActividadPlaneada" | "nombre" | "descripcion" | "presupuesto" | "fechaInicio" | "FechaFinal" | "cronogramaOriginal";
export type actividadplaneadaCreationAttributes = Optional<actividadplaneadaAttributes, actividadplaneadaOptionalAttributes>;

export class actividadplaneada extends Model<actividadplaneadaAttributes, actividadplaneadaCreationAttributes> implements actividadplaneadaAttributes {
  idActividadPlaneada!: number;
  nombre?: string;
  descripcion?: string;
  presupuesto?: number;
  fechaInicio?: Date;
  FechaFinal?: Date;
  Estado_idEstado!: number;
  Meta_idMeta!: number;
  Responsable_idResponsable!: number;
  cronogramaOriginal?: number;

  // actividadplaneada hasMany recurso via ActividadPlaneada_idActividadPlaneada
  recursos!: recurso[];
  getRecursos!: Sequelize.HasManyGetAssociationsMixin<recurso>;
  setRecursos!: Sequelize.HasManySetAssociationsMixin<recurso, recursoId>;
  addRecurso!: Sequelize.HasManyAddAssociationMixin<recurso, recursoId>;
  addRecursos!: Sequelize.HasManyAddAssociationsMixin<recurso, recursoId>;
  createRecurso!: Sequelize.HasManyCreateAssociationMixin<recurso>;
  removeRecurso!: Sequelize.HasManyRemoveAssociationMixin<recurso, recursoId>;
  removeRecursos!: Sequelize.HasManyRemoveAssociationsMixin<recurso, recursoId>;
  hasRecurso!: Sequelize.HasManyHasAssociationMixin<recurso, recursoId>;
  hasRecursos!: Sequelize.HasManyHasAssociationsMixin<recurso, recursoId>;
  countRecursos!: Sequelize.HasManyCountAssociationsMixin;
  // actividadplaneada hasMany tareaplaneada via ActividadPlaneada_idActividadPlaneada
  tareaplaneadas!: tareaplaneada[];
  getTareaplaneadas!: Sequelize.HasManyGetAssociationsMixin<tareaplaneada>;
  setTareaplaneadas!: Sequelize.HasManySetAssociationsMixin<tareaplaneada, tareaplaneadaId>;
  addTareaplaneada!: Sequelize.HasManyAddAssociationMixin<tareaplaneada, tareaplaneadaId>;
  addTareaplaneadas!: Sequelize.HasManyAddAssociationsMixin<tareaplaneada, tareaplaneadaId>;
  createTareaplaneada!: Sequelize.HasManyCreateAssociationMixin<tareaplaneada>;
  removeTareaplaneada!: Sequelize.HasManyRemoveAssociationMixin<tareaplaneada, tareaplaneadaId>;
  removeTareaplaneadas!: Sequelize.HasManyRemoveAssociationsMixin<tareaplaneada, tareaplaneadaId>;
  hasTareaplaneada!: Sequelize.HasManyHasAssociationMixin<tareaplaneada, tareaplaneadaId>;
  hasTareaplaneadas!: Sequelize.HasManyHasAssociationsMixin<tareaplaneada, tareaplaneadaId>;
  countTareaplaneadas!: Sequelize.HasManyCountAssociationsMixin;
  // actividadplaneada belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // actividadplaneada belongsTo meta via Meta_idMeta
  Meta_idMeta_metum!: meta;
  getMeta_idMeta_metum!: Sequelize.BelongsToGetAssociationMixin<meta>;
  setMeta_idMeta_metum!: Sequelize.BelongsToSetAssociationMixin<meta, metaId>;
  createMeta_idMeta_metum!: Sequelize.BelongsToCreateAssociationMixin<meta>;
  // actividadplaneada belongsTo responsable via Responsable_idResponsable
  Responsable_idResponsable_responsable!: responsable;
  getResponsable_idResponsable_responsable!: Sequelize.BelongsToGetAssociationMixin<responsable>;
  setResponsable_idResponsable_responsable!: Sequelize.BelongsToSetAssociationMixin<responsable, responsableId>;
  createResponsable_idResponsable_responsable!: Sequelize.BelongsToCreateAssociationMixin<responsable>;

  static initModel(sequelize: Sequelize.Sequelize): typeof actividadplaneada {
    return actividadplaneada.init({
    idActividadPlaneada: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    presupuesto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    FechaFinal: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Estado_idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado',
        key: 'idEstado'
      }
    },
    Meta_idMeta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meta',
        key: 'idMeta'
      }
    },
    Responsable_idResponsable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'responsable',
        key: 'idResponsable'
      }
    },
    cronogramaOriginal: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'actividadplaneada',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idActividadPlaneada" },
        ]
      },
      {
        name: "fk_ActividadPlaneada_Estado1_idx",
        using: "BTREE",
        fields: [
          { name: "Estado_idEstado" },
        ]
      },
      {
        name: "fk_ActividadPlaneada_Meta1_idx",
        using: "BTREE",
        fields: [
          { name: "Meta_idMeta" },
        ]
      },
      {
        name: "fk_ActividadPlaneada_Responsable1_idx",
        using: "BTREE",
        fields: [
          { name: "Responsable_idResponsable" },
        ]
      },
    ]
  });
  }
}
