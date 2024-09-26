"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tarea = void 0;
const sequelize_1 = require("sequelize");
class tarea extends sequelize_1.Model {
    static initModel(sequelize) {
        return tarea.init({
            idTarea: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true
            },
            presupuesto: {
                type: sequelize_1.DataTypes.DOUBLE,
                allowNull: true
            },
            fechaInicio: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            FechaFinal: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            Estado_idEstado: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'estado',
                    key: 'idEstado'
                }
            },
            Actividad_idActividad: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'actividad',
                    key: 'idActividad'
                }
            },
            Responsable_idResponsable: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'responsable',
                    key: 'idResponsable'
                }
            }
        }, {
            sequelize,
            tableName: 'tarea',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idTarea" },
                    ]
                },
                {
                    name: "fk_ActividadPlaneada_Estado1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Estado_idEstado" },
                    ]
                },
                {
                    name: "fk_Tarea_Actividad1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Actividad_idActividad" },
                    ]
                },
                {
                    name: "fk_Tarea_Responsable1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Responsable_idResponsable" },
                    ]
                },
            ]
        });
    }
}
exports.tarea = tarea;
