"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsable = void 0;
const sequelize_1 = require("sequelize");
class responsable extends sequelize_1.Model {
    static initModel(sequelize) {
        return responsable.init({
            idResponsable: {
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
            tableName: 'responsable',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idResponsable" },
                    ]
                },
                {
                    name: "fk_Responsable_Usuario1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Usuario_idUsuario" },
                    ]
                },
            ]
        });
    }
}
exports.responsable = responsable;
