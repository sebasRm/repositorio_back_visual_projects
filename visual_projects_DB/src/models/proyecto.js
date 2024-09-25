"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proyecto = void 0;
const sequelize_1 = require("sequelize");
class proyecto extends sequelize_1.Model {
    static initModel(sequelize) {
        return proyecto.init({
            idProyecto: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(400),
                allowNull: true
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true
            },
            fechaInicio: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            fechaFinal: {
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
            Lider_idLider: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'lider',
                    key: 'idLider'
                }
            },
            Director_idDirector: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'director',
                    key: 'idDirector'
                }
            },
            Planeacion_idPlaneacion: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'planeacion',
                    key: 'idPlaneacion'
                }
            },
            Cronograma_idCronograma: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'cronograma',
                    key: 'idCronograma'
                }
            }
        }, {
            sequelize,
            tableName: 'proyecto',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "idProyecto" },
                    ]
                },
                {
                    name: "fk_Proyecto_Estado1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Estado_idEstado" },
                    ]
                },
                {
                    name: "fk_Proyecto_Lider1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Lider_idLider" },
                    ]
                },
                {
                    name: "fk_Proyecto_Director1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Director_idDirector" },
                    ]
                },
                {
                    name: "fk_Proyecto_Planeacion1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Planeacion_idPlaneacion" },
                    ]
                },
                {
                    name: "fk_Proyecto_Cronograma1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "Cronograma_idCronograma" },
                    ]
                },
            ]
        });
    }
}
exports.proyecto = proyecto;
//# sourceMappingURL=proyecto.js.map