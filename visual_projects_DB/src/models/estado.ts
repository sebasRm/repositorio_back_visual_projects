import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { actividad, actividadId } from './actividad';
import type { actividadplaneada, actividadplaneadaId } from './actividadplaneada';
import type { meta, metaId } from './meta';
import type { proyecto, proyectoId } from './proyecto';
import type { tarea, tareaId } from './tarea';
import type { tareaplaneada, tareaplaneadaId } from './tareaplaneada';

export interface estadoAttributes {
  idEstado: number;
  nombre?: string;
  descripcion?: string;
}

export type estadoPk = "idEstado";
export type estadoId = estado[estadoPk];
export type estadoOptionalAttributes = "idEstado" | "nombre" | "descripcion";
export type estadoCreationAttributes = Optional<estadoAttributes, estadoOptionalAttributes>;

export class estado extends Model<estadoAttributes, estadoCreationAttributes> implements estadoAttributes {
  idEstado!: number;
  nombre?: string;
  descripcion?: string;

  // estado hasMany actividad via Estado_idEstado
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
  // estado hasMany actividadplaneada via Estado_idEstado
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
  // estado hasMany meta via Estado_idEstado
  meta!: meta[];
  getMeta!: Sequelize.HasManyGetAssociationsMixin<meta>;
  setMeta!: Sequelize.HasManySetAssociationsMixin<meta, metaId>;
  addMetum!: Sequelize.HasManyAddAssociationMixin<meta, metaId>;
  addMeta!: Sequelize.HasManyAddAssociationsMixin<meta, metaId>;
  createMetum!: Sequelize.HasManyCreateAssociationMixin<meta>;
  removeMetum!: Sequelize.HasManyRemoveAssociationMixin<meta, metaId>;
  removeMeta!: Sequelize.HasManyRemoveAssociationsMixin<meta, metaId>;
  hasMetum!: Sequelize.HasManyHasAssociationMixin<meta, metaId>;
  hasMeta!: Sequelize.HasManyHasAssociationsMixin<meta, metaId>;
  countMeta!: Sequelize.HasManyCountAssociationsMixin;
  // estado hasMany proyecto via Estado_idEstado
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
  // estado hasMany tarea via Estado_idEstado
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
  // estado hasMany tareaplaneada via Estado_idEstado
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

  static initModel(sequelize: Sequelize.Sequelize): typeof estado {
    return estado.init({
    idEstado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'estado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEstado" },
        ]
      },
    ]
  });
  }
}
