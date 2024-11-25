"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronograma = void 0;
const sequelize_1 = require("sequelize");
class cronograma extends sequelize_1.Model {
    static initModel(sequelize) {
        return cronograma.init({
            idCronograma: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            Planeacion_idPlaneacion: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'planeacion',
                    key: 'idPlaneacion'
                }
            }
        }, {
            sequelize,
            tableName: 'cronograma',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idCronograma" },
                    ]
                },
                {
                    name: "fk_Cronograma_Planeacion1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Planeacion_idPlaneacion" },
                    ]
                },
            ]
        });
    }
}
exports.cronograma = cronograma;
//# sourceMappingURL=cronograma.js.map