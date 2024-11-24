"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
let sequelize;
exports.sequelize = sequelize = new sequelize_1.Sequelize("visual-projects-db", "root", "OXzgqqObMZSNVQqQEjKhwHbJVoeYgGhU", {
    host: "mysql.railway.internal",
    dialect: "mysql",
});
