"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actividadplaneada = void 0;
const sequelize_1 = require("sequelize");
class actividadplaneada extends sequelize_1.Model {
    static initModel(sequelize) {
        return actividadplaneada.init({
            idActividadPlaneada: {
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
            Meta_idMeta: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'meta',
                    key: 'idMeta'
                }
            },
            Responsable_idResponsable: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'responsable',
                    key: 'idResponsable'
                }
            },
            cronogramaOriginal: {
                type: sequelize_1.DataTypes.TINYINT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'actividadplaneada',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idActividadPlaneada" },
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
                    name: "fk_ActividadPlaneada_Meta1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Meta_idMeta" },
                    ]
                },
                {
                    name: "fk_ActividadPlaneada_Responsable1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Responsable_idResponsable" },
                    ]
                },
            ]
        });
    }
}
exports.actividadplaneada = actividadplaneada;
