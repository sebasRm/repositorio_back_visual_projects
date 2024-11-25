"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearDirector = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const utils_1 = require("../helpers/utils");
const bcrypt = require("bcrypt");
/**
 * @description Crea un nuevo director en el sistema, asociando un usuario a la entidad de director.
 * La función realiza lo siguiente:
 * 1. Verifica si ya existe un usuario con el correo proporcionado.
 * 2. Si el usuario no existe, crea un nuevo usuario con la información proporcionada.
 * 3. Luego, crea un director asociado a ese usuario.
 * 4. Si todo se ejecuta correctamente, responde con un mensaje de éxito.
 *
 * @route POST /crearDirector
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener los datos del usuario dentro del cuerpo de la solicitud (name, email, password).
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el director fue creado correctamente.
 * - 400: Si el correo ya está registrado o si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante el proceso de creación del director o al consultar la base de datos.
 */
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