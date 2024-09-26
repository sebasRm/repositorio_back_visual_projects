"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planeacion = void 0;
const sequelize_1 = require("sequelize");
class planeacion extends sequelize_1.Model {
    static initModel(sequelize) {
        return planeacion.init({
            idPlaneacion: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            objetivo: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true
            },
            presupuesto: {
                type: sequelize_1.DataTypes.DOUBLE,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'planeacion',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idPlaneacion" },
                    ]
                },
            ]
        });
    }
}
exports.planeacion = planeacion;
