import { Request, Response } from "express";
/**
 * @description Obtiene información relacionada con los indicadores del cronograma de un proyecto.
 * La función calcula y devuelve el total de actividades planeadas, actividades reales, actividades terminadas,
 * actividades activas, tareas planeadas, tareas reales, tareas terminadas y tareas activas asociadas a un cronograma.
 *
 * @route POST /informationIndicators
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la información de los indicadores se obtuvo correctamente, con los valores de las actividades y tareas.
 * - 400: Si no se proporciona un `idCronograma` o si no existe un valor válido.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante el cálculo de los indicadores o al consultar la base de datos.
 */
export declare function informationIndicators(req: Request, res: Response): Promise<any>;
/**
 * @description Busca y devuelve información sobre una actividad planeada específica mediante su nombre.
 * La función consulta la base de datos para obtener los detalles de una actividad planeada con el nombre proporcionado.
 *
 * @route POST /buscarActividadPlaneada
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `nombreActividad` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad planeada se encuentra correctamente, devuelve los detalles de la actividad.
 * - 400: Si no se proporciona un `nombreActividad` o si ocurre un error al buscar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error al buscar la actividad en la base de datos.
 */
export declare function buscarActividadPlaneada(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=actividadPlaneadaController.d.ts.map