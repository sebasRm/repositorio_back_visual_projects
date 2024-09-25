"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
let sequelize;
exports.sequelize = sequelize = new sequelize_1.Sequelize("visual-projects-db", "root", "rBEyWEYvYtqzwGywgBkWcLciodZwjGlh", {
    host: "junction.proxy.rlwy.net:24276",
    dialect: "mysql",
});
//# sourceMappingURL=conection.js.map
