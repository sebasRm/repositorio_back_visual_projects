"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actividad = void 0;
const sequelize_1 = require("sequelize");
class actividad extends sequelize_1.Model {
    static initModel(sequelize) {
        return actividad.init({
            idActividad: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(300),
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
            Responsable_idResponsable: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'responsable',
                    key: 'idResponsable'
                }
            },
            Meta_idMeta: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'meta',
                    key: 'idMeta'
                }
            }
        }, {
            sequelize,
            tableName: 'actividad',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idActividad" },
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
                    name: "fk_Actividad_Responsable1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Responsable_idResponsable" },
                    ]
                },
                {
                    name: "fk_Actividad_Meta1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Meta_idMeta" },
                    ]
                },
            ]
        });
    }
}
exports.actividad = actividad;
//# sourceMappingURL=actividad.js.map