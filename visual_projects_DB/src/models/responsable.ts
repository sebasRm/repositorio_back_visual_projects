import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { actividad, actividadId } from './actividad';
import type { actividadplaneada, actividadplaneadaId } from './actividadplaneada';
import type { tarea, tareaId } from './tarea';
import type { tareaplaneada, tareaplaneadaId } from './tareaplaneada';
import type { usuario, usuarioId } from './usuario';

export interface responsableAttributes {
  idResponsable: number;
  Usuario_idUsuario: number;
}

export type responsablePk = "idResponsable";
export type responsableId = responsable[responsablePk];
export type responsableOptionalAttributes = "idResponsable";
export type responsableCreationAttributes = Optional<responsableAttributes, responsableOptionalAttributes>;

export class responsable extends Model<responsableAttributes, responsableCreationAttributes> implements responsableAttributes {
  idResponsable!: number;
  Usuario_idUsuario!: number;

  // responsable hasMany actividad via Responsable_idResponsable
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
  // responsable hasMany actividadplaneada via Responsable_idResponsable
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
  // responsable hasMany tarea via Responsable_idResponsable
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
  // responsable hasMany tareaplaneada via Responsable_idResponsable
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
  // responsable belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof responsable {
    return responsable.init({
    idResponsable: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    }
  }, {
    sequelize,
    tableName: 'responsable',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idResponsable" },
        ]
      },
      {
        name: "fk_Responsable_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
