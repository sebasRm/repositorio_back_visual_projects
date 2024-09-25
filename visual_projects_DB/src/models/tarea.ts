import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
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

export class tarea extends Model<tareaAttributes, tareaCreationAttributes> implements tareaAttributes {
  idTarea!: number;
  nombre?: string;
  descripcion?: string;
  presupuesto?: number;
  fechaInicio?: Date;
  FechaFinal?: Date;
  Estado_idEstado!: number;
  Actividad_idActividad!: number;
  Responsable_idResponsable!: number;

  // tarea belongsTo actividad via Actividad_idActividad
  Actividad_idActividad_actividad!: actividad;
  getActividad_idActividad_actividad!: Sequelize.BelongsToGetAssociationMixin<actividad>;
  setActividad_idActividad_actividad!: Sequelize.BelongsToSetAssociationMixin<actividad, actividadId>;
  createActividad_idActividad_actividad!: Sequelize.BelongsToCreateAssociationMixin<actividad>;
  // tarea belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // tarea belongsTo responsable via Responsable_idResponsable
  Responsable_idResponsable_responsable!: responsable;
  getResponsable_idResponsable_responsable!: Sequelize.BelongsToGetAssociationMixin<responsable>;
  setResponsable_idResponsable_responsable!: Sequelize.BelongsToSetAssociationMixin<responsable, responsableId>;
  createResponsable_idResponsable_responsable!: Sequelize.BelongsToCreateAssociationMixin<responsable>;
  // tarea hasMany recurso via Tarea_idTarea
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tarea {
    return tarea.init({
    idTarea: {
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
    Actividad_idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'actividad',
        key: 'idActividad'
      }
    },
    Responsable_idResponsable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'responsable',
        key: 'idResponsable'
      }
    }
  }, {
    sequelize,
    tableName: 'tarea',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTarea" },
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
        name: "fk_Tarea_Actividad1_idx",
        using: "BTREE",
        fields: [
          { name: "Actividad_idActividad" },
        ]
      },
      {
        name: "fk_Tarea_Responsable1_idx",
        using: "BTREE",
        fields: [
          { name: "Responsable_idResponsable" },
        ]
      },
    ]
  });
  }
}
