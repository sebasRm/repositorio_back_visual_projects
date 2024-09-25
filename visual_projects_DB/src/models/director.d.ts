import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
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
export declare class director extends Model<directorAttributes, directorCreationAttributes> implements directorAttributes {
    idDirector: number;
    Usuario_idUsuario: number;
    proyectos: proyecto[];
    getProyectos: Sequelize.HasManyGetAssociationsMixin<proyecto>;
    setProyectos: Sequelize.HasManySetAssociationsMixin<proyecto, proyectoId>;
    addProyecto: Sequelize.HasManyAddAssociationMixin<proyecto, proyectoId>;
    addProyectos: Sequelize.HasManyAddAssociationsMixin<proyecto, proyectoId>;
    createProyecto: Sequelize.HasManyCreateAssociationMixin<proyecto>;
    removeProyecto: Sequelize.HasManyRemoveAssociationMixin<proyecto, proyectoId>;
    removeProyectos: Sequelize.HasManyRemoveAssociationsMixin<proyecto, proyectoId>;
    hasProyecto: Sequelize.HasManyHasAssociationMixin<proyecto, proyectoId>;
    hasProyectos: Sequelize.HasManyHasAssociationsMixin<proyecto, proyectoId>;
    countProyectos: Sequelize.HasManyCountAssociationsMixin;
    Usuario_idUsuario_usuario: usuario;
    getUsuario_idUsuario_usuario: Sequelize.BelongsToGetAssociationMixin<usuario>;
    setUsuario_idUsuario_usuario: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
    createUsuario_idUsuario_usuario: Sequelize.BelongsToCreateAssociationMixin<usuario>;
    static initModel(sequelize: Sequelize.Sequelize): typeof director;
}
//# sourceMappingURL=director.d.ts.map