"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurso = void 0;
const sequelize_1 = require("sequelize");
class recurso extends sequelize_1.Model {
    static initModel(sequelize) {
        return recurso.init({
            idRecurso: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(400),
                allowNull: true
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(400),
                allowNull: true
            },
            presupuesto: {
                type: sequelize_1.DataTypes.DOUBLE,
                allowNull: true
            },
            TareaPlaneada_idTareaPlaneada: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'tareaplaneada',
                    key: 'idTareaPlaneada'
                }
            },
            ActividadPlaneada_idActividadPlaneada: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'actividadplaneada',
                    key: 'idActividadPlaneada'
                }
            },
            Actividad_idActividad: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'actividad',
                    key: 'idActividad'
                }
            },
            Tarea_idTarea: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'tarea',
                    key: 'idTarea'
                }
            }
        }, {
            sequelize,
            tableName: 'recurso',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idRecurso" },
                    ]
                },
                {
                    name: "fk_Recurso_TareaPlaneada1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "TareaPlaneada_idTareaPlaneada" },
                    ]
                },
                {
                    name: "fk_Recurso_ActividadPlaneada1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ActividadPlaneada_idActividadPlaneada" },
                    ]
                },
                {
                    name: "fk_Recurso_Actividad1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Actividad_idActividad" },
                    ]
                },
                {
                    name: "fk_Recurso_Tarea1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Tarea_idTarea" },
                    ]
                },
            ]
        });
    }
}
exports.recurso = recurso;
