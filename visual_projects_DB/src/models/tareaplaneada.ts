import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
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

export class tareaplaneada extends Model<tareaplaneadaAttributes, tareaplaneadaCreationAttributes> implements tareaplaneadaAttributes {
  idTareaPlaneada!: number;
  nombre?: string;
  descripcion?: string;
  presupuesto?: number;
  fechaInicio?: Date;
  FechaFinal?: Date;
  Estado_idEstado!: number;
  ActividadPlaneada_idActividadPlaneada!: number;
  Responsable_idResponsable!: number;
  cronogramaOriginal?: number;

  // tareaplaneada belongsTo actividadplaneada via ActividadPlaneada_idActividadPlaneada
  ActividadPlaneada_idActividadPlaneada_actividadplaneada!: actividadplaneada;
  getActividadPlaneada_idActividadPlaneada_actividadplaneada!: Sequelize.BelongsToGetAssociationMixin<actividadplaneada>;
  setActividadPlaneada_idActividadPlaneada_actividadplaneada!: Sequelize.BelongsToSetAssociationMixin<actividadplaneada, actividadplaneadaId>;
  createActividadPlaneada_idActividadPlaneada_actividadplaneada!: Sequelize.BelongsToCreateAssociationMixin<actividadplaneada>;
  // tareaplaneada belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // tareaplaneada belongsTo responsable via Responsable_idResponsable
  Responsable_idResponsable_responsable!: responsable;
  getResponsable_idResponsable_responsable!: Sequelize.BelongsToGetAssociationMixin<responsable>;
  setResponsable_idResponsable_responsable!: Sequelize.BelongsToSetAssociationMixin<responsable, responsableId>;
  createResponsable_idResponsable_responsable!: Sequelize.BelongsToCreateAssociationMixin<responsable>;
  // tareaplaneada hasMany recurso via TareaPlaneada_idTareaPlaneada
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tareaplaneada {
    return tareaplaneada.init({
    idTareaPlaneada: {
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
    ActividadPlaneada_idActividadPlaneada: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'actividadplaneada',
        key: 'idActividadPlaneada'
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
    tableName: 'tareaplaneada',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTareaPlaneada" },
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
        name: "fk_TareaPlaneada_ActividadPlaneada1_idx",
        using: "BTREE",
        fields: [
          { name: "ActividadPlaneada_idActividadPlaneada" },
        ]
      },
      {
        name: "fk_TareaPlaneada_Responsable1_idx",
        using: "BTREE",
        fields: [
          { name: "Responsable_idResponsable" },
        ]
      },
    ]
  });
  }
}
