import { Request, Response } from "express";
/**
 * @description Consulta todos los líderes registrados, incluyendo los usuarios asociados a cada líder.
 *
 * @route GET /consultar-lideres
 * @param {Request} req - El objeto de la solicitud HTTP.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si existen líderes registrados, junto con los datos de los líderes y sus usuarios asociados.
 * - 404: Si no se encuentran líderes registrados.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de los líderes.
 */
export declare function consultarLideres(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta todos los líderes que no están asociados a un proyecto, incluyendo los usuarios asociados a cada líder.
 *
 * @route GET /consultar-lideres-sin-proyecto
 * @param {Request} req - El objeto de la solicitud HTTP.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si existen líderes sin proyectos asociados, junto con los datos de los líderes y sus usuarios asociados.
 * - 404: Si no se encuentran líderes sin proyectos registrados.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de los líderes sin proyecto.
 */
export declare function consultarLideresSinProyecto(req: Request, res: Response): Promise<any>;
/**
 * @description Crea un nuevo líder asociando un usuario y una contraseña cifrada.
 * Verifica que no exista ya un usuario con el mismo correo.
 *
 * @route POST /crear-lider
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener los datos del usuario (nombre, correo, contraseña).
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si el líder fue creado correctamente, junto con los datos del líder.
 * - 400: Si ya existe un líder con el mismo correo.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la creación del líder o al verificar la existencia del correo.
 */
export declare function crearLider(req: Request, res: Response): Promise<any>;
/**
 * @description Elimina un líder junto con su usuario asociado, siempre y cuando el líder no esté asignado a un proyecto.
 *
 * @route DELETE /eliminar-lider/:idLider
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el parámetro `idLider` en la URL.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si el líder y su usuario fueron eliminados correctamente.
 * - 404: Si el líder tiene un proyecto asociado y no puede ser eliminado.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error al eliminar el líder o al verificar la existencia de un proyecto asociado.
 */
export declare function eliminarLider(req: Request, res: Response): Promise<any>;
/**
 * @description Actualiza el nombre de un líder en la base de datos.
 * La actualización se realiza en el usuario asociado al líder, buscando el `idLider`
 * y actualizando el nombre del usuario correspondiente.
 *
 * @route PUT /actualizar-lider
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener los datos del líder (idLider, nombre) dentro del cuerpo de la solicitud.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si el líder fue actualizado correctamente.
 * - 400: Si hubo un error al intentar actualizar el líder.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización del líder o al intentar encontrar el usuario asociado.
 */
export declare function actualizarLider(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=LiderController.d.ts.map