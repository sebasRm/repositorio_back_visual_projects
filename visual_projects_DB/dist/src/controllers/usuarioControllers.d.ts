import { Request, Response } from "express";
/**
 * Función para autenticar un usuario en el sistema.
 * Realiza la validación del correo y la contraseña del usuario contra la base de datos,
 * y retorna la información correspondiente según el estado del inicio de sesión.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Espera que el cuerpo de la solicitud tenga la estructura `{ data: { user: { email, password } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la autenticación.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Inicio de sesión exitoso, retorna los datos del usuario.
 *    - 404: Usuario no encontrado o contraseña incorrecta.
 *    - 503: Error en el servidor.
 */
export declare function login(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=usuarioControllers.d.ts.map