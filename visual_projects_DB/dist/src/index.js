"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.initModel = exports.main = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const conection_1 = require("./db/conection");
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router/router");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('', router_1.router);
let initModel;
const credentials = {
    database: process.env.DATABASE || 'visual-projects-empresa',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    host: process.env.HOST || 'localhost',
    dialect: process.env.DIALECT || 'mysql'
};
const main = async () => {
    let sequelizeConection = await conection_1.sequelize;
    //console.log("soy el sequelize", sequelize)
    sequelizeConection.authenticate();
    app.listen(4000, () => {
        console.log("Server listening port 4000");
    });
};
exports.main = main;
(0, exports.main)();
//# sourceMappingURL=index.js.map