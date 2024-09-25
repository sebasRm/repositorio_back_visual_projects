"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
let sequelize;
exports.sequelize = sequelize = new sequelize_1.Sequelize("visual-projects-empresa", "root", "", {
    host: "localhost",
    dialect: "mysql",
});
//# sourceMappingURL=conection.js.map