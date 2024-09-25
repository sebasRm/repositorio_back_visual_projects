import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
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

export class recurso extends Model<recursoAttributes, recursoCreationAttributes> implements recursoAttributes {
  idRecurso!: number;
  nombre?: string;
  descripcion?: string;
  presupuesto?: number;
  TareaPlaneada_idTareaPlaneada?: number;
  ActividadPlaneada_idActividadPlaneada?: number;
  Actividad_idActividad?: number;
  Tarea_idTarea?: number;

  // recurso belongsTo actividad via Actividad_idActividad
  Actividad_idActividad_actividad!: actividad;
  getActividad_idActividad_actividad!: Sequelize.BelongsToGetAssociationMixin<actividad>;
  setActividad_idActividad_actividad!: Sequelize.BelongsToSetAssociationMixin<actividad, actividadId>;
  createActividad_idActividad_actividad!: Sequelize.BelongsToCreateAssociationMixin<actividad>;
  // recurso belongsTo actividadplaneada via ActividadPlaneada_idActividadPlaneada
  ActividadPlaneada_idActividadPlaneada_actividadplaneada!: actividadplaneada;
  getActividadPlaneada_idActividadPlaneada_actividadplaneada!: Sequelize.BelongsToGetAssociationMixin<actividadplaneada>;
  setActividadPlaneada_idActividadPlaneada_actividadplaneada!: Sequelize.BelongsToSetAssociationMixin<actividadplaneada, actividadplaneadaId>;
  createActividadPlaneada_idActividadPlaneada_actividadplaneada!: Sequelize.BelongsToCreateAssociationMixin<actividadplaneada>;
  // recurso belongsTo tarea via Tarea_idTarea
  Tarea_idTarea_tarea!: tarea;
  getTarea_idTarea_tarea!: Sequelize.BelongsToGetAssociationMixin<tarea>;
  setTarea_idTarea_tarea!: Sequelize.BelongsToSetAssociationMixin<tarea, tareaId>;
  createTarea_idTarea_tarea!: Sequelize.BelongsToCreateAssociationMixin<tarea>;
  // recurso belongsTo tareaplaneada via TareaPlaneada_idTareaPlaneada
  TareaPlaneada_idTareaPlaneada_tareaplaneada!: tareaplaneada;
  getTareaPlaneada_idTareaPlaneada_tareaplaneada!: Sequelize.BelongsToGetAssociationMixin<tareaplaneada>;
  setTareaPlaneada_idTareaPlaneada_tareaplaneada!: Sequelize.BelongsToSetAssociationMixin<tareaplaneada, tareaplaneadaId>;
  createTareaPlaneada_idTareaPlaneada_tareaplaneada!: Sequelize.BelongsToCreateAssociationMixin<tareaplaneada>;

  static initModel(sequelize: Sequelize.Sequelize): typeof recurso {
    return recurso.init({
    idRecurso: {
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
      type: DataTypes.STRING(45),
      allowNull: true
    },
    presupuesto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    TareaPlaneada_idTareaPlaneada: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tareaplaneada',
        key: 'idTareaPlaneada'
      }
    },
    ActividadPlaneada_idActividadPlaneada: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'actividadplaneada',
        key: 'idActividadPlaneada'
      }
    },
    Actividad_idActividad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'actividad',
        key: 'idActividad'
      }
    },
    Tarea_idTarea: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tarea',
        key: 'idTarea'
      }
    }
  }, {
    sequelize,
    tableName: 'recurso',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRecurso" },
        ]
      },
      {
        name: "fk_Recurso_TareaPlaneada1_idx",
        using: "BTREE",
        fields: [
          { name: "TareaPlaneada_idTareaPlaneada" },
        ]
      },
      {
        name: "fk_Recurso_ActividadPlaneada1_idx",
        using: "BTREE",
        fields: [
          { name: "ActividadPlaneada_idActividadPlaneada" },
        ]
      },
      {
        name: "fk_Recurso_Actividad1_idx",
        using: "BTREE",
        fields: [
          { name: "Actividad_idActividad" },
        ]
      },
      {
        name: "fk_Recurso_Tarea1_idx",
        using: "BTREE",
        fields: [
          { name: "Tarea_idTarea" },
        ]
      },
    ]
  });
  }
}
