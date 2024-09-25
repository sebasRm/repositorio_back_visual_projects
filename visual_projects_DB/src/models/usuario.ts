import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { director, directorId } from './director';
import type { lider, liderId } from './lider';
import type { responsable, responsableId } from './responsable';

export interface usuarioAttributes {
  idUsuario: number;
  nombre?: string;
  correo?: string;
  contrasena?: string;
}

export type usuarioPk = "idUsuario";
export type usuarioId = usuario[usuarioPk];
export type usuarioOptionalAttributes = "idUsuario" | "nombre" | "correo" | "contrasena";
export type usuarioCreationAttributes = Optional<usuarioAttributes, usuarioOptionalAttributes>;

export class usuario extends Model<usuarioAttributes, usuarioCreationAttributes> implements usuarioAttributes {
  idUsuario!: number;
  nombre?: string;
  correo?: string;
  contrasena?: string;

  // usuario hasMany director via Usuario_idUsuario
  directors!: director[];
  getDirectors!: Sequelize.HasManyGetAssociationsMixin<director>;
  setDirectors!: Sequelize.HasManySetAssociationsMixin<director, directorId>;
  addDirector!: Sequelize.HasManyAddAssociationMixin<director, directorId>;
  addDirectors!: Sequelize.HasManyAddAssociationsMixin<director, directorId>;
  createDirector!: Sequelize.HasManyCreateAssociationMixin<director>;
  removeDirector!: Sequelize.HasManyRemoveAssociationMixin<director, directorId>;
  removeDirectors!: Sequelize.HasManyRemoveAssociationsMixin<director, directorId>;
  hasDirector!: Sequelize.HasManyHasAssociationMixin<director, directorId>;
  hasDirectors!: Sequelize.HasManyHasAssociationsMixin<director, directorId>;
  countDirectors!: Sequelize.HasManyCountAssociationsMixin;
  // usuario hasMany lider via Usuario_idUsuario
  liders!: lider[];
  getLiders!: Sequelize.HasManyGetAssociationsMixin<lider>;
  setLiders!: Sequelize.HasManySetAssociationsMixin<lider, liderId>;
  addLider!: Sequelize.HasManyAddAssociationMixin<lider, liderId>;
  addLiders!: Sequelize.HasManyAddAssociationsMixin<lider, liderId>;
  createLider!: Sequelize.HasManyCreateAssociationMixin<lider>;
  removeLider!: Sequelize.HasManyRemoveAssociationMixin<lider, liderId>;
  removeLiders!: Sequelize.HasManyRemoveAssociationsMixin<lider, liderId>;
  hasLider!: Sequelize.HasManyHasAssociationMixin<lider, liderId>;
  hasLiders!: Sequelize.HasManyHasAssociationsMixin<lider, liderId>;
  countLiders!: Sequelize.HasManyCountAssociationsMixin;
  // usuario hasMany responsable via Usuario_idUsuario
  responsables!: responsable[];
  getResponsables!: Sequelize.HasManyGetAssociationsMixin<responsable>;
  setResponsables!: Sequelize.HasManySetAssociationsMixin<responsable, responsableId>;
  addResponsable!: Sequelize.HasManyAddAssociationMixin<responsable, responsableId>;
  addResponsables!: Sequelize.HasManyAddAssociationsMixin<responsable, responsableId>;
  createResponsable!: Sequelize.HasManyCreateAssociationMixin<responsable>;
  removeResponsable!: Sequelize.HasManyRemoveAssociationMixin<responsable, responsableId>;
  removeResponsables!: Sequelize.HasManyRemoveAssociationsMixin<responsable, responsableId>;
  hasResponsable!: Sequelize.HasManyHasAssociationMixin<responsable, responsableId>;
  hasResponsables!: Sequelize.HasManyHasAssociationsMixin<responsable, responsableId>;
  countResponsables!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof usuario {
    return usuario.init({
    idUsuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    contrasena: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
  }
}
