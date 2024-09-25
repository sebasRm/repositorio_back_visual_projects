import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
import type { cronograma, cronogramaId } from './cronograma';
import type { proyecto, proyectoId } from './proyecto';
export interface planeacionAttributes {
    idPlaneacion: number;
    objetivo?: string;
    presupuesto?: number;
}
export type planeacionPk = "idPlaneacion";
export type planeacionId = planeacion[planeacionPk];
export type planeacionOptionalAttributes = "idPlaneacion" | "objetivo" | "presupuesto";
export type planeacionCreationAttributes = Optional<planeacionAttributes, planeacionOptionalAttributes>;
export declare class planeacion extends Model<planeacionAttributes, planeacionCreationAttributes> implements planeacionAttributes {
    idPlaneacion: number;
    objetivo?: string;
    presupuesto?: number;
    cronogramas: cronograma[];
    getCronogramas: Sequelize.HasManyGetAssociationsMixin<cronograma>;
    setCronogramas: Sequelize.HasManySetAssociationsMixin<cronograma, cronogramaId>;
    addCronograma: Sequelize.HasManyAddAssociationMixin<cronograma, cronogramaId>;
    addCronogramas: Sequelize.HasManyAddAssociationsMixin<cronograma, cronogramaId>;
    createCronograma: Sequelize.HasManyCreateAssociationMixin<cronograma>;
    removeCronograma: Sequelize.HasManyRemoveAssociationMixin<cronograma, cronogramaId>;
    removeCronogramas: Sequelize.HasManyRemoveAssociationsMixin<cronograma, cronogramaId>;
    hasCronograma: Sequelize.HasManyHasAssociationMixin<cronograma, cronogramaId>;
    hasCronogramas: Sequelize.HasManyHasAssociationsMixin<cronograma, cronogramaId>;
    countCronogramas: Sequelize.HasManyCountAssociationsMixin;
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
    static initModel(sequelize: Sequelize.Sequelize): typeof planeacion;
}
//# sourceMappingURL=planeacion.d.ts.map