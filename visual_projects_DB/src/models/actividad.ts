import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { estado, estadoId } from './estado';
import type { meta, metaId } from './meta';
import type { recurso, recursoId } from './recurso';
import type { responsable, responsableId } from './responsable';
import type { tarea, tareaId } from './tarea';

export interface actividadAttributes {
  idActividad: number;
  nombre?: string;
  descripcion?: string;
  presupuesto?: number;
  fechaInicio?: Date;
  FechaFinal?: Date;
  Estado_idEstado: number;
  Responsable_idResponsable: number;
  Meta_idMeta: number;
}

export type actividadPk = "idActividad";
export type actividadId = actividad[actividadPk];
export type actividadOptionalAttributes = "idActividad" | "nombre" | "descripcion" | "presupuesto" | "fechaInicio" | "FechaFinal";
export type actividadCreationAttributes = Optional<actividadAttributes, actividadOptionalAttributes>;

export class actividad extends Model<actividadAttributes, actividadCreationAttributes> implements actividadAttributes {
  idActividad!: number;
  nombre?: string;
  descripcion?: string;
  presupuesto?: number;
  fechaInicio?: Date;
  FechaFinal?: Date;
  Estado_idEstado!: number;
  Responsable_idResponsable!: number;
  Meta_idMeta!: number;

  // actividad hasMany recurso via Actividad_idActividad
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
  // actividad hasMany tarea via Actividad_idActividad
  tareas!: tarea[];
  getTareas!: Sequelize.HasManyGetAssociationsMixin<tarea>;
  setTareas!: Sequelize.HasManySetAssociationsMixin<tarea, tareaId>;
  addTarea!: Sequelize.HasManyAddAssociationMixin<tarea, tareaId>;
  addTareas!: Sequelize.HasManyAddAssociationsMixin<tarea, tareaId>;
  createTarea!: Sequelize.HasManyCreateAssociationMixin<tarea>;
  removeTarea!: Sequelize.HasManyRemoveAssociationMixin<tarea, tareaId>;
  removeTareas!: Sequelize.HasManyRemoveAssociationsMixin<tarea, tareaId>;
  hasTarea!: Sequelize.HasManyHasAssociationMixin<tarea, tareaId>;
  hasTareas!: Sequelize.HasManyHasAssociationsMixin<tarea, tareaId>;
  countTareas!: Sequelize.HasManyCountAssociationsMixin;
  // actividad belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // actividad belongsTo meta via Meta_idMeta
  Meta_idMeta_metum!: meta;
  getMeta_idMeta_metum!: Sequelize.BelongsToGetAssociationMixin<meta>;
  setMeta_idMeta_metum!: Sequelize.BelongsToSetAssociationMixin<meta, metaId>;
  createMeta_idMeta_metum!: Sequelize.BelongsToCreateAssociationMixin<meta>;
  // actividad belongsTo responsable via Responsable_idResponsable
  Responsable_idResponsable_responsable!: responsable;
  getResponsable_idResponsable_responsable!: Sequelize.BelongsToGetAssociationMixin<responsable>;
  setResponsable_idResponsable_responsable!: Sequelize.BelongsToSetAssociationMixin<responsable, responsableId>;
  createResponsable_idResponsable_responsable!: Sequelize.BelongsToCreateAssociationMixin<responsable>;

  static initModel(sequelize: Sequelize.Sequelize): typeof actividad {
    return actividad.init({
    idActividad: {
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
    Responsable_idResponsable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'responsable',
        key: 'idResponsable'
      }
    },
    Meta_idMeta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meta',
        key: 'idMeta'
      }
    }
  }, {
    sequelize,
    tableName: 'actividad',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idActividad" },
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
        name: "fk_Actividad_Responsable1_idx",
        using: "BTREE",
        fields: [
          { name: "Responsable_idResponsable" },
        ]
      },
      {
        name: "fk_Actividad_Meta1_idx",
        using: "BTREE",
        fields: [
          { name: "Meta_idMeta" },
        ]
      },
    ]
  });
  }
}
