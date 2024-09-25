import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { proyecto, proyectoId } from './proyecto';
import type { usuario, usuarioId } from './usuario';

export interface directorAttributes {
  idDirector: number;
  Usuario_idUsuario: number;
}

export type directorPk = "idDirector";
export type directorId = director[directorPk];
export type directorOptionalAttributes = "idDirector";
export type directorCreationAttributes = Optional<directorAttributes, directorOptionalAttributes>;

export class director extends Model<directorAttributes, directorCreationAttributes> implements directorAttributes {
  idDirector!: number;
  Usuario_idUsuario!: number;

  // director hasMany proyecto via Director_idDirector
  proyectos!: proyecto[];
  getProyectos!: Sequelize.HasManyGetAssociationsMixin<proyecto>;
  setProyectos!: Sequelize.HasManySetAssociationsMixin<proyecto, proyectoId>;
  addProyecto!: Sequelize.HasManyAddAssociationMixin<proyecto, proyectoId>;
  addProyectos!: Sequelize.HasManyAddAssociationsMixin<proyecto, proyectoId>;
  createProyecto!: Sequelize.HasManyCreateAssociationMixin<proyecto>;
  removeProyecto!: Sequelize.HasManyRemoveAssociationMixin<proyecto, proyectoId>;
  removeProyectos!: Sequelize.HasManyRemoveAssociationsMixin<proyecto, proyectoId>;
  hasProyecto!: Sequelize.HasManyHasAssociationMixin<proyecto, proyectoId>;
  hasProyectos!: Sequelize.HasManyHasAssociationsMixin<proyecto, proyectoId>;
  countProyectos!: Sequelize.HasManyCountAssociationsMixin;
  // director belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof director {
    return director.init({
    idDirector: {
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
    tableName: 'director',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDirector" },
        ]
      },
      {
        name: "fk_Director_Usuario_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
