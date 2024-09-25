"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearDirector = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const utils_1 = require("../helpers/utils");
const bcrypt = require("bcrypt");
async function crearDirector(req, res) {
    try {
        req = req.body.data.user;
        const { name } = req;
        const { email } = req;
        const { password } = req;
        const passwordCrypt = await bcrypt.hash(password, 10);
        const userExist = await initModel.usuario.findOne({
            where: {
                correo: email,
            },
        });
        if (userExist) {
            return (0, utils_1.responseMessage)(res, 400, false, "Ya existe un director asociado con ese correo");
        }
        else {
            const user = await initModel.usuario.create({
                nombre: name,
                correo: email,
                contrasena: passwordCrypt,
            });
            const director = await initModel.director.create({
                Usuario_idUsuario: user.dataValues.idUsuario,
            });
            if (director) {
                return (0, utils_1.responseMessage)(res, 200, director, "Director creado exitosamente");
            }
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 400, error, "error server ...");
    }
}
exports.crearDirector = crearDirector;
//# sourceMappingURL=directorController.js.map