"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.director = void 0;
const sequelize_1 = require("sequelize");
class director extends sequelize_1.Model {
    static initModel(sequelize) {
        return director.init({
            idDirector: {
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
            tableName: 'director',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idDirector" },
                    ]
                },
                {
                    name: "fk_Director_Usuario_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Usuario_idUsuario" },
                    ]
                },
            ]
        });
    }
}
exports.director = director;
//# sourceMappingURL=director.js.map