"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lider = void 0;
const sequelize_1 = require("sequelize");
class lider extends sequelize_1.Model {
    static initModel(sequelize) {
        return lider.init({
            idLider: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            Usuario_idUsuario: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuario',
                    key: 'idUsuario'
                }
            }
        }, {
            sequelize,
            tableName: 'lider',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idLider" },
                    ]
                },
                {
                    name: "fk_Lider_Usuario1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Usuario_idUsuario" },
                    ]
                },
            ]
        });
    }
}
exports.lider = lider;
