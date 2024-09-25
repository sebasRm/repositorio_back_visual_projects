"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meta = void 0;
const sequelize_1 = require("sequelize");
class meta extends sequelize_1.Model {
    static initModel(sequelize) {
        return meta.init({
            idMeta: {
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
            Cronograma_idCronograma: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'cronograma',
                    key: 'idCronograma'
                }
            },
            Estado_idEstado: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'estado',
                    key: 'idEstado'
                }
            }
        }, {
            sequelize,
            tableName: 'meta',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idMeta" },
                    ]
                },
                {
                    name: "fk_Meta_Cronograma1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Cronograma_idCronograma" },
                    ]
                },
                {
                    name: "fk_Meta_Estado1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Estado_idEstado" },
                    ]
                },
            ]
        });
    }
}
exports.meta = meta;
//# sourceMappingURL=meta.js.map