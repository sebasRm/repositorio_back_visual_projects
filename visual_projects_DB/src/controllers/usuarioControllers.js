"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const utils_1 = require("../helpers/utils");
const bcrypt = require("bcrypt");
/**
 * Función para logear el usuario
 */
async function login(req, res) {
    req = req.body.data.user;
    const { password } = req;
    const { email } = req;
    try {
        const user = await initModel.usuario.findOne({
            where: { correo: email },
            include: [
                {
                    model: initModel.lider,
                    as: "liders",
                },
                {
                    model: initModel.director,
                    as: "directors",
                },
            ],
        });
        if (!user) {
            return (0, utils_1.responseMessage)(res, 404, false, "Error el usuario no se encuentra registrado");
        }
        else {
            const login = await bcrypt.compare(password, user.dataValues.contrasena);
            if (login) {
                return (0, utils_1.responseMessage)(res, 200, user, "Usuario logeado correctamente");
            }
            return (0, utils_1.responseMessage)(res, 404, false, "Error la contraseña es incorrecta");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.login = login;
//# sourceMappingURL=usuarioControllers.js.map