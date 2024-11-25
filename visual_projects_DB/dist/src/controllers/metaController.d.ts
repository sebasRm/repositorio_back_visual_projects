import { Request, Response } from "express";
/**
 * @description Esta función consulta las metas asociadas a un cronograma específico.
 * Incluye información sobre el estado de las metas, el progreso de actividades y tareas asociadas.
 *
 * @route GET /consultar-metas-proyecto/:idCronograma
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idCronograma` (string): ID del cronograma asociado a las metas.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los datos de las metas y su progreso:
 * - 200: Si se encuentran metas asociadas al cronograma.
 *   - Incluye información sobre:
 *     - Estados de las metas.
 *     - Actividades y tareas organizadas por estado (`Inicial`, `Organización`, `Ejecución`, `Finalizadas`).
 *     - Totales de actividades y tareas.
 * - 404: Si no existen metas asociadas al cronograma.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta o procesamiento de datos.
 */
export declare function consultarMetasProyecto(req: Request, res: Response): Promise<any>;
/**
 * @description Crea una nueva meta asociada a un cronograma específico.
 *
 * @route POST /crear-meta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idCronograma` (number): ID del cronograma al que se asociará la meta.
 * - `nombre` (string): Nombre de la meta.
 * - `descripcion` (string): Descripción de la meta.
 * - `presupuesto` (number): Presupuesto asignado (opcional, inicializado como 0).
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con el resultado de la creación:
 * - 200: Si la meta fue creada exitosamente.
 * - 500: Si ocurrió un error durante la creación de la meta.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la creación de la meta.
 */
export declare function crearMeta(req: Request, res: Response): Promise<any>;
/**
 * @description Cuenta el número de metas en diferentes estados asociados a un cronograma.
 *
 * @route POST /contar-estado-metas
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idCronograma` (number): ID del cronograma cuyas metas se desean contar.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los conteos de metas por estado:
 * - 200: Si se obtienen los conteos correctamente.
 *   - Devuelve un array con los totales en el siguiente orden:
 *     - Metas en estado `Inicio`.
 *     - Metas en estado `Organización`.
 *     - Metas en estado `Ejecución`.
 *     - Metas en estado `Finalizado`.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante el cálculo de los estados.
 */
export declare function contarEstadoMetas(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta una meta específica y calcula el presupuesto total de sus actividades cerradas.
 *
 * @route GET /consultar-presupuesto-meta/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idMeta` (number): ID de la meta a consultar.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los datos de la meta y su presupuesto:
 * - 200: Si se encuentra la meta.
 *   - Incluye:
 *     - Datos de la meta.
 *     - `presupuestoCerrado`: Suma de los presupuestos de las actividades cerradas.
 * - 404: Si no se encuentra ninguna meta con el ID proporcionado.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta o el cálculo del presupuesto.
 */
export declare function consultarPresupuestoMeta(req: Request, res: Response): Promise<any>;
export declare function actualizarMetaEstado(req: Request, res: Response): Promise<any>;
/**
 * @description Elimina una meta específica y todos sus datos relacionados, incluyendo actividades, tareas y recursos asociados.
 *
 * @route DELETE /eliminar-meta/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idMeta` (number): ID de la meta a eliminar.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si la meta y todos los datos relacionados fueron eliminados exitosamente.
 * - 404: Si no se pudo eliminar la meta.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la eliminación de la meta o sus datos relacionados.
 */
export declare function eliminarMeta(req: Request, res: Response): Promise<any>;
/**
 * @description Actualiza el nombre y la descripción de una meta específica.
 *
 * @route PUT /actualizar-meta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idMeta` (number): ID de la meta a actualizar.
 * - `nombre` (string): Nuevo nombre de la meta.
 * - `descripcion` (string): Nueva descripción de la meta.
 *
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si la meta fue actualizada exitosamente.
 * - 500: Si ocurrió un error al intentar actualizar la meta.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la meta.
 */
export declare function actualizarMeta(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=metaController.d.ts.map