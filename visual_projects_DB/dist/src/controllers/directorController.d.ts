import { Request, Response } from "express";
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
export declare function crearDirector(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=directorController.d.ts.map