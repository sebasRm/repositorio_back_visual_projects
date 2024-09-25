import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
import type { cronograma, cronogramaId } from './cronograma';
import type { director, directorId } from './director';
import type { estado, estadoId } from './estado';
import type { lider, liderId } from './lider';
import type { planeacion, planeacionId } from './planeacion';
export interface proyectoAttributes {
    idProyecto: number;
    nombre?: string;
    descripcion?: string;
    fechaInicio?: Date;
    fechaFinal?: Date;
    Estado_idEstado: number;
    Lider_idLider: number;
    Director_idDirector: number;
    Planeacion_idPlaneacion?: number;
    Cronograma_idCronograma?: number;
}
export type proyectoPk = "idProyecto";
export type proyectoId = proyecto[proyectoPk];
export type proyectoOptionalAttributes = "idProyecto" | "nombre" | "descripcion" | "fechaInicio" | "fechaFinal" | "Planeacion_idPlaneacion" | "Cronograma_idCronograma";
export type proyectoCreationAttributes = Optional<proyectoAttributes, proyectoOptionalAttributes>;
export declare class proyecto extends Model<proyectoAttributes, proyectoCreationAttributes> implements proyectoAttributes {
    idProyecto: number;
    nombre?: string;
    descripcion?: string;
    fechaInicio?: Date;
    fechaFinal?: Date;
    Estado_idEstado: number;
    Lider_idLider: number;
    Director_idDirector: number;
    Planeacion_idPlaneacion?: number;
    Cronograma_idCronograma?: number;
    Cronograma_idCronograma_cronograma: cronograma;
    getCronograma_idCronograma_cronograma: Sequelize.BelongsToGetAssociationMixin<cronograma>;
    setCronograma_idCronograma_cronograma: Sequelize.BelongsToSetAssociationMixin<cronograma, cronogramaId>;
    createCronograma_idCronograma_cronograma: Sequelize.BelongsToCreateAssociationMixin<cronograma>;
    Director_idDirector_director: director;
    getDirector_idDirector_director: Sequelize.BelongsToGetAssociationMixin<director>;
    setDirector_idDirector_director: Sequelize.BelongsToSetAssociationMixin<director, directorId>;
    createDirector_idDirector_director: Sequelize.BelongsToCreateAssociationMixin<director>;
    Estado_idEstado_estado: estado;
    getEstado_idEstado_estado: Sequelize.BelongsToGetAssociationMixin<estado>;
    setEstado_idEstado_estado: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
    createEstado_idEstado_estado: Sequelize.BelongsToCreateAssociationMixin<estado>;
    Lider_idLider_lider: lider;
    getLider_idLider_lider: Sequelize.BelongsToGetAssociationMixin<lider>;
    setLider_idLider_lider: Sequelize.BelongsToSetAssociationMixin<lider, liderId>;
    createLider_idLider_lider: Sequelize.BelongsToCreateAssociationMixin<lider>;
    Planeacion_idPlaneacion_planeacion: planeacion;
    getPlaneacion_idPlaneacion_planeacion: Sequelize.BelongsToGetAssociationMixin<planeacion>;
    setPlaneacion_idPlaneacion_planeacion: Sequelize.BelongsToSetAssociationMixin<planeacion, planeacionId>;
    createPlaneacion_idPlaneacion_planeacion: Sequelize.BelongsToCreateAssociationMixin<planeacion>;
    static initModel(sequelize: Sequelize.Sequelize): typeof proyecto;
}
//# sourceMappingURL=proyecto.d.ts.map