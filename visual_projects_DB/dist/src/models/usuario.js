"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = void 0;
const sequelize_1 = require("sequelize");
class usuario extends sequelize_1.Model {
    static initModel(sequelize) {
        return usuario.init({
            idUsuario: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(45),
                allowNull: true
            },
            correo: {
                type: sequelize_1.DataTypes.STRING(45),
                allowNull: true
            },
            contrasena: {
                type: sequelize_1.DataTypes.STRING(300),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'usuario',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idUsuario" },
                    ]
                },
            ]
        });
    }
}
exports.usuario = usuario;
//# sourceMappingURL=usuario.js.map