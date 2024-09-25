import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
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

export class proyecto extends Model<proyectoAttributes, proyectoCreationAttributes> implements proyectoAttributes {
  idProyecto!: number;
  nombre?: string;
  descripcion?: string;
  fechaInicio?: Date;
  fechaFinal?: Date;
  Estado_idEstado!: number;
  Lider_idLider!: number;
  Director_idDirector!: number;
  Planeacion_idPlaneacion?: number;
  Cronograma_idCronograma?: number;

  // proyecto belongsTo cronograma via Cronograma_idCronograma
  Cronograma_idCronograma_cronograma!: cronograma;
  getCronograma_idCronograma_cronograma!: Sequelize.BelongsToGetAssociationMixin<cronograma>;
  setCronograma_idCronograma_cronograma!: Sequelize.BelongsToSetAssociationMixin<cronograma, cronogramaId>;
  createCronograma_idCronograma_cronograma!: Sequelize.BelongsToCreateAssociationMixin<cronograma>;
  // proyecto belongsTo director via Director_idDirector
  Director_idDirector_director!: director;
  getDirector_idDirector_director!: Sequelize.BelongsToGetAssociationMixin<director>;
  setDirector_idDirector_director!: Sequelize.BelongsToSetAssociationMixin<director, directorId>;
  createDirector_idDirector_director!: Sequelize.BelongsToCreateAssociationMixin<director>;
  // proyecto belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // proyecto belongsTo lider via Lider_idLider
  Lider_idLider_lider!: lider;
  getLider_idLider_lider!: Sequelize.BelongsToGetAssociationMixin<lider>;
  setLider_idLider_lider!: Sequelize.BelongsToSetAssociationMixin<lider, liderId>;
  createLider_idLider_lider!: Sequelize.BelongsToCreateAssociationMixin<lider>;
  // proyecto belongsTo planeacion via Planeacion_idPlaneacion
  Planeacion_idPlaneacion_planeacion!: planeacion;
  getPlaneacion_idPlaneacion_planeacion!: Sequelize.BelongsToGetAssociationMixin<planeacion>;
  setPlaneacion_idPlaneacion_planeacion!: Sequelize.BelongsToSetAssociationMixin<planeacion, planeacionId>;
  createPlaneacion_idPlaneacion_planeacion!: Sequelize.BelongsToCreateAssociationMixin<planeacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof proyecto {
    return proyecto.init({
    idProyecto: {
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
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fechaFinal: {
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
    Lider_idLider: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lider',
        key: 'idLider'
      }
    },
    Director_idDirector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'director',
        key: 'idDirector'
      }
    },
    Planeacion_idPlaneacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'planeacion',
        key: 'idPlaneacion'
      }
    },
    Cronograma_idCronograma: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cronograma',
        key: 'idCronograma'
      }
    }
  }, {
    sequelize,
    tableName: 'proyecto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProyecto" },
        ]
      },
      {
        name: "fk_Proyecto_Estado1_idx",
        using: "BTREE",
        fields: [
          { name: "Estado_idEstado" },
        ]
      },
      {
        name: "fk_Proyecto_Lider1_idx",
        using: "BTREE",
        fields: [
          { name: "Lider_idLider" },
        ]
      },
      {
        name: "fk_Proyecto_Director1_idx",
        using: "BTREE",
        fields: [
          { name: "Director_idDirector" },
        ]
      },
      {
        name: "fk_Proyecto_Planeacion1_idx",
        using: "BTREE",
        fields: [
          { name: "Planeacion_idPlaneacion" },
        ]
      },
      {
        name: "fk_Proyecto_Cronograma1_idx",
        using: "BTREE",
        fields: [
          { name: "Cronograma_idCronograma" },
        ]
      },
    ]
  });
  }
}
