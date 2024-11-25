import { Request, Response } from "express";
/**
 * Función para buscar una tarea planeada en el sistema.
 * Dado el nombre de una tarea, consulta la base de datos para obtener la información asociada.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Espera que el cuerpo de la solicitud tenga la estructura `{ data: { task: { nombreTarea } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la consulta.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Tarea encontrada exitosamente, retorna la información de la tarea.
 *    - 400: Error en la solicitud, el nombre de la tarea no fue proporcionado.
 *    - 503: Error en el servidor durante la consulta.
 */
export declare function buscarTareaPlaneada(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=tareaPlaneadaController.d.ts.map