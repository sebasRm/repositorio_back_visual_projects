import { Request, Response } from "express";
/**
 * @description Esta función crea una planeación asociada a un proyecto específico.
 * Durante el proceso, también crea un cronograma asociado a la planeación y actualiza
 * el proyecto para enlazarlo con la planeación y el cronograma creados.
 *
 * @route POST /crear-planeacion
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el cuerpo de la solicitud en formato JSON con los siguientes datos:
 * - `idProyecto` (number): Identificador único del proyecto al que se asociará la planeación.
 * - `objetivoProyecto` (string): Objetivo de la planeación. Ejemplo: `"Completar la implementación del sistema en 6 meses"`.
 * - `presupuestoProyecto` (number): Presupuesto asignado para la planeación. Ejemplo: `100000`.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 202: Si la planeación y el cronograma se crean con éxito, y el proyecto se actualiza correctamente.
 *   - El cuerpo de la respuesta incluye el proyecto actualizado.
 * - 501: Si ocurre un error al crear la planeación, cronograma o al actualizar el proyecto.
 * - 503: Si ocurre un error en el servidor durante la operación.
 *
 * @throws {Error} Si ocurre un error durante la creación de la planeación, el cronograma o la actualización del proyecto.
 */
export declare function crearPlaneacion(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=planeacionController.d.ts.map