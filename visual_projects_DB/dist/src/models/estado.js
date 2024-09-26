"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estado = void 0;
const sequelize_1 = require("sequelize");
class estado extends sequelize_1.Model {
    static initModel(sequelize) {
        return estado.init({
            idEstado: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(45),
                allowNull: true
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(300),
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
exports.estado = estado;
