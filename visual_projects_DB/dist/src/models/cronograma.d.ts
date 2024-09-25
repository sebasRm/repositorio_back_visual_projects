import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
import type { meta, metaId } from './meta';
import type { planeacion, planeacionId } from './planeacion';
import type { proyecto, proyectoId } from './proyecto';
export interface cronogramaAttributes {
    idCronograma: number;
    Planeacion_idPlaneacion?: number;
}
export type cronogramaPk = "idCronograma";
export type cronogramaId = cronograma[cronogramaPk];
export type cronogramaOptionalAttributes = "idCronograma" | "Planeacion_idPlaneacion";
export type cronogramaCreationAttributes = Optional<cronogramaAttributes, cronogramaOptionalAttributes>;
export declare class cronograma extends Model<cronogramaAttributes, cronogramaCreationAttributes> implements cronogramaAttributes {
    idCronograma: number;
    Planeacion_idPlaneacion?: number;
    meta: meta[];
    getMeta: Sequelize.HasManyGetAssociationsMixin<meta>;
    setMeta: Sequelize.HasManySetAssociationsMixin<meta, metaId>;
    addMetum: Sequelize.HasManyAddAssociationMixin<meta, metaId>;
    addMeta: Sequelize.HasManyAddAssociationsMixin<meta, metaId>;
    createMetum: Sequelize.HasManyCreateAssociationMixin<meta>;
    removeMetum: Sequelize.HasManyRemoveAssociationMixin<meta, metaId>;
    removeMeta: Sequelize.HasManyRemoveAssociationsMixin<meta, metaId>;
    hasMetum: Sequelize.HasManyHasAssociationMixin<meta, metaId>;
    hasMeta: Sequelize.HasManyHasAssociationsMixin<meta, metaId>;
    countMeta: Sequelize.HasManyCountAssociationsMixin;
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
    Planeacion_idPlaneacion_planeacion: planeacion;
    getPlaneacion_idPlaneacion_planeacion: Sequelize.BelongsToGetAssociationMixin<planeacion>;
    setPlaneacion_idPlaneacion_planeacion: Sequelize.BelongsToSetAssociationMixin<planeacion, planeacionId>;
    createPlaneacion_idPlaneacion_planeacion: Sequelize.BelongsToCreateAssociationMixin<planeacion>;
    static initModel(sequelize: Sequelize.Sequelize): typeof cronograma;
}
//# sourceMappingURL=cronograma.d.ts.map