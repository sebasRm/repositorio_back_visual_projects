import { Request, Response } from "express";
/**
 * @description Calcula el SPI (Schedule Performance Index) de un proyecto,
 * que es un indicador que mide la relación entre el valor ganado (EV)
 * y el valor planeado total PV (BAC) de las actividades completadas de un proyecto.
 *
 * @route POST /indicatorProjectSPI
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener los datos del proyecto (idCronograma, idPlaneacion) dentro del cuerpo de la solicitud.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con el cálculo del SPI:
 * - 200: Si el SPI fue calculado correctamente.
 * - 400: Si ocurrió un error al consultar el SPI.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante el cálculo del SPI o al intentar consultar las actividades planeadas.
 */
export declare function indicatorProjectSPI(req: Request, res: Response): Promise<any>;
/**
 * @description Calcula el CPI (Cost Performance Index) de un proyecto,
 * que es un indicador que mide la relación entre el valor ganado (EV)
 * y el costo real (AC) de las actividades completadas en el proyecto.
 *
 * @route POST /indicatorProjectCPI
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener los datos del proyecto (idCronograma) dentro del cuerpo de la solicitud.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con el cálculo del CPI:
 * - 200: Si el CPI fue calculado correctamente.
 * - 400: Si ocurrió un error al consultar el CPI.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante el cálculo del CPI o al intentar consultar las actividades planeadas.
 */
export declare function indicatorProjectCPI(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=indicatorsController.d.ts.map