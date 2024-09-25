"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarLider = exports.eliminarLider = exports.crearLider = exports.consultarLideresSinProyecto = exports.consultarLideres = void 0;
const init_models_1 = require("../models/init-models");
const conection_1 = require("../db/conection");
let initModel = (0, init_models_1.initModels)(conection_1.sequelize);
const utils_1 = require("../helpers/utils");
const bcrypt = require("bcrypt");
/*
   => Funcion para consultar todos los lideres
*/
async function consultarLideres(req, res) {
    try {
        const lideres = await initModel.lider.findAll({
            include: [
                {
                    model: initModel.usuario,
                    as: "Usuario_",
                },
            ],
        });
        if (lideres) {
            return (0, utils_1.responseMessage)(res, 200, lideres, "Líderes creados actualmente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "No existen líderes registrados");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarLideres = consultarLideres;
/*
   => Funcion para consultar todos los lideres sin un proyecto asociado
*/
async function consultarLideresSinProyecto(req, res) {
    try {
        let lideresOnProjects = [];
        const lideres = await initModel.lider.findAll({
            include: [
                {
                    model: initModel.usuario,
                    as: "Usuario_",
                },
                {
                    model: initModel.proyecto,
                    as: "proyectos",
                },
            ],
        });
        if (lideres.length > 0) {
            for (let lider in lideres) {
                let cursorProject = lideres[lider].dataValues.proyectos;
                if (cursorProject.length == 0) {
                    let cursorUser = lideres[lider].dataValues.Usuario_;
                    cursorUser.dataValues.idLider = lideres[lider].dataValues.idLider;
                    lideresOnProjects.push(cursorUser);
                }
            }
            return (0, utils_1.responseMessage)(res, 200, lideresOnProjects, "Líderes sin proyectos asociados");
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "No existen líderes registrados");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.consultarLideresSinProyecto = consultarLideresSinProyecto;
/*
   => Funcion para crear un lider
*/
async function crearLider(req, res) {
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
            return (0, utils_1.responseMessage)(res, 400, false, "Ya existe un líder asociado con ese correo");
        }
        else {
            const user = await initModel.usuario.create({
                nombre: name,
                correo: email,
                contrasena: passwordCrypt,
            });
            const lider = await initModel.lider.create({
                Usuario_idUsuario: user.dataValues.idUsuario,
            });
            if (lider) {
                return (0, utils_1.responseMessage)(res, 200, lider, "Líder creado correctamente");
            }
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.crearLider = crearLider;
async function eliminarLider(req, res) {
    try {
        let idLider = req.params.idLider;
        const proyecto = await initModel.proyecto.findOne({
            where: { Lider_idLider: idLider },
        });
        if (!proyecto) {
            const lider = await initModel.lider.findOne({
                where: { idLider: idLider },
            });
            const idUsuario = lider.dataValues.Usuario_idUsuario;
            console.log("soy el idUsuario", idUsuario);
            const lideres = await initModel.lider.destroy({
                where: { idLider: idLider },
            });
            await initModel.usuario.destroy({
                where: { idUsuario: idUsuario },
            });
            if (lideres) {
                return (0, utils_1.responseMessage)(res, 200, lideres, "Líder eliminado existosamente");
            }
        }
        else {
            return (0, utils_1.responseMessage)(res, 404, false, "Error al eliminar el Líder, tiene un proyecto asociado");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.eliminarLider = eliminarLider;
async function actualizarLider(req, res) {
    try {
        req = req.body.data.lider;
        const { idLider } = req;
        const { nombre } = req;
        const usuario = { nombre: nombre };
        const lider = await initModel.lider.findOne({
            where: {
                idLider: idLider,
            },
        });
        const idUsuario = lider?.dataValues.Usuario_idUsuario;
        const usuarioUpdate = await initModel.usuario.update(usuario, {
            where: {
                idUsuario: idUsuario,
            },
        });
        if (usuarioUpdate) {
            return (0, utils_1.responseMessage)(res, 200, usuarioUpdate, "Líder actualizado existosamente");
        }
        else {
            return (0, utils_1.responseMessage)(res, 400, false, "Error al actualizar el líder");
        }
    }
    catch (error) {
        return (0, utils_1.responseMessage)(res, 503, error, "error server ...");
    }
}
exports.actualizarLider = actualizarLider;
//# sourceMappingURL=LiderController.js.map