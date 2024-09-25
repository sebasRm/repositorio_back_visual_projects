import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
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

export class meta extends Model<metaAttributes, metaCreationAttributes> implements metaAttributes {
  idMeta!: number;
  nombre?: string;
  descripcion?: string;
  presupuesto?: number;
  Cronograma_idCronograma!: number;
  Estado_idEstado!: number;

  // meta belongsTo cronograma via Cronograma_idCronograma
  Cronograma_idCronograma_cronograma!: cronograma;
  getCronograma_idCronograma_cronograma!: Sequelize.BelongsToGetAssociationMixin<cronograma>;
  setCronograma_idCronograma_cronograma!: Sequelize.BelongsToSetAssociationMixin<cronograma, cronogramaId>;
  createCronograma_idCronograma_cronograma!: Sequelize.BelongsToCreateAssociationMixin<cronograma>;
  // meta belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // meta hasMany actividad via Meta_idMeta
  actividads!: actividad[];
  getActividads!: Sequelize.HasManyGetAssociationsMixin<actividad>;
  setActividads!: Sequelize.HasManySetAssociationsMixin<actividad, actividadId>;
  addActividad!: Sequelize.HasManyAddAssociationMixin<actividad, actividadId>;
  addActividads!: Sequelize.HasManyAddAssociationsMixin<actividad, actividadId>;
  createActividad!: Sequelize.HasManyCreateAssociationMixin<actividad>;
  removeActividad!: Sequelize.HasManyRemoveAssociationMixin<actividad, actividadId>;
  removeActividads!: Sequelize.HasManyRemoveAssociationsMixin<actividad, actividadId>;
  hasActividad!: Sequelize.HasManyHasAssociationMixin<actividad, actividadId>;
  hasActividads!: Sequelize.HasManyHasAssociationsMixin<actividad, actividadId>;
  countActividads!: Sequelize.HasManyCountAssociationsMixin;
  // meta hasMany actividadplaneada via Meta_idMeta
  actividadplaneadas!: actividadplaneada[];
  getActividadplaneadas!: Sequelize.HasManyGetAssociationsMixin<actividadplaneada>;
  setActividadplaneadas!: Sequelize.HasManySetAssociationsMixin<actividadplaneada, actividadplaneadaId>;
  addActividadplaneada!: Sequelize.HasManyAddAssociationMixin<actividadplaneada, actividadplaneadaId>;
  addActividadplaneadas!: Sequelize.HasManyAddAssociationsMixin<actividadplaneada, actividadplaneadaId>;
  createActividadplaneada!: Sequelize.HasManyCreateAssociationMixin<actividadplaneada>;
  removeActividadplaneada!: Sequelize.HasManyRemoveAssociationMixin<actividadplaneada, actividadplaneadaId>;
  removeActividadplaneadas!: Sequelize.HasManyRemoveAssociationsMixin<actividadplaneada, actividadplaneadaId>;
  hasActividadplaneada!: Sequelize.HasManyHasAssociationMixin<actividadplaneada, actividadplaneadaId>;
  hasActividadplaneadas!: Sequelize.HasManyHasAssociationsMixin<actividadplaneada, actividadplaneadaId>;
  countActividadplaneadas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof meta {
    return meta.init({
    idMeta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    presupuesto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Cronograma_idCronograma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cronograma',
        key: 'idCronograma'
      }
    },
    Estado_idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado',
        key: 'idEstado'
      }
    }
  }, {
    sequelize,
    tableName: 'meta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMeta" },
        ]
      },
      {
        name: "fk_Meta_Cronograma1_idx",
        using: "BTREE",
        fields: [
          { name: "Cronograma_idCronograma" },
        ]
      },
      {
        name: "fk_Meta_Estado1_idx",
        using: "BTREE",
        fields: [
          { name: "Estado_idEstado" },
        ]
      },
    ]
  });
  }
}
