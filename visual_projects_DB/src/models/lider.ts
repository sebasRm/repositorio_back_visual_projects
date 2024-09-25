import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { proyecto, proyectoId } from './proyecto';
import type { usuario, usuarioId } from './usuario';

export interface liderAttributes {
  idLider: number;
  Usuario_idUsuario: number;
}

export type liderPk = "idLider";
export type liderId = lider[liderPk];
export type liderOptionalAttributes = "idLider";
export type liderCreationAttributes = Optional<liderAttributes, liderOptionalAttributes>;

export class lider extends Model<liderAttributes, liderCreationAttributes> implements liderAttributes {
  idLider!: number;
  Usuario_idUsuario!: number;

  // lider hasMany proyecto via Lider_idLider
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
  // lider belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof lider {
    return lider.init({
    idLider: {
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
    tableName: 'lider',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLider" },
        ]
      },
      {
        name: "fk_Lider_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
