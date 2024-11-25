import { Request, Response } from "express";
/**
 * @description Cuenta el total de actividades asociadas a un cronograma de un proyecto.
 * La función consulta la base de datos para obtener el número total de actividades asociadas al cronograma
 * proporcionado mediante su `idCronograma`.
 *
 * @route POST /contarTotalActividades
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el total de actividades se obtuvo correctamente, con el número total de actividades asociadas.
 * - 200: Si no se proporciona un `idCronograma`, devuelve 0 indicando que no se encontró el cronograma.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
export declare function contarTotalActividades(req: Request, res: Response): Promise<any>;
/**
 * @description Cuenta el total de actividades finalizadas asociadas a un cronograma de un proyecto.
 * La función consulta la base de datos para obtener el número de actividades que están finalizadas
 * en el cronograma proporcionado mediante su `idCronograma`.
 *
 * @route POST /contarActividadesFinalizadas
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el total de actividades finalizadas se obtuvo correctamente, con el número de actividades finalizadas.
 * - 200: Si no se proporciona un `idCronograma`, devuelve un contador de actividades finalizadas igual a 0.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades finalizadas o al acceder a la base de datos.
 */
export declare function contarActividadesFinalizadas(req: Request, res: Response): Promise<any>;
/**
 * @description Cuenta el total de actividades activas asociadas a un cronograma de un proyecto.
 * La función consulta la base de datos para obtener el número de actividades con estado inicial
 * (activas) asociadas al cronograma proporcionado mediante su `idCronograma`.
 *
 * @route POST /contarActividadesActivas
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el total de actividades activas se obtuvo correctamente, con el número de actividades activas asociadas.
 * - 200: Si no se proporciona un `idCronograma`, devuelve 0 indicando que no se encontraron actividades activas.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades activas o al acceder a la base de datos.
 */
export declare function contarActividadesActivas(req: Request, res: Response): Promise<any>;
/**
 * @description Cuenta el numero de actividades en sus estados respectivos
 * en un cronograma de un proyecto. La función consulta diversas métricas de actividades asociadas a
 * un cronograma especificado por su `idCronograma`, y devuelve un cálculo del porcentaje de
 * actividades completadas.
 *
 * @route POST /porcentajeActividadesTermidas
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si el porcentaje de actividades terminadas y otras métricas se obtuvieron correctamente.
 * - 200: Si no se proporciona un `idCronograma`, devuelve un valor predeterminado de actividades como 0.1.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
export declare function porcentajeActividades(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta las actividades asociadas a una meta de un proyecto. Esta función busca todas las actividades relacionadas con el `idMeta` proporcionado,
 * incluyendo información detallada sobre el responsable, el estado de la actividad, y las tareas asociadas a cada actividad.
 * Además, cuenta el número de tareas relacionadas con cada actividad y las incluye en la respuesta.
 *
 * @route GET /consultarActividadesMeta/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta, devuelve las actividades con el contador de tareas.
 * - 200: Si no se encuentran actividades asociadas a la meta, devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
export declare function consultarActividadesMeta(req: Request, res: Response): Promise<any>;
/**
 * @description Crea una nueva actividad asociada a una meta en un cronograma de un proyecto.
 * La función verifica si la actividad ya está registrada y, si no, la crea junto con una actividad planeada correspondiente.
 * Además, si no existe un responsable para el usuario asociado, se crea uno nuevo.
 *
 * @route POST /crearActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener la información de la actividad en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad se crea correctamente, devuelve la actividad recién creada.
 * - 400: Si el nombre de la actividad ya existe o si ocurre un error al crear la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la creación de la actividad o al acceder a la base de datos.
 */
export declare function crearActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta las actividades asociadas a una meta cuyo estado es "inicio" (Estado_idEstado = 1).
 * La función busca las actividades relacionadas con el `idMeta` proporcionado y cuyo estado sea 1 (inicio),
 * devolviendo los identificadores de las actividades asociadas.
 *
 * @route GET /consultarActividadesMetaInicio/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta con el estado "inicio", devuelve los identificadores de las actividades.
 * - 200: Si no se encuentran actividades asociadas a la meta con el estado "inicio", devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
export declare function consultarActividadesMetaInicio(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta las actividades asociadas a una meta cuyo estado es "organización" (Estado_idEstado = 2).
 * La función busca las actividades relacionadas con el `idMeta` proporcionado y cuyo estado sea 2 (organización),
 * devolviendo los identificadores de las actividades asociadas.
 *
 * @route GET /consultarActividadesMetaOrganizacion/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta con el estado "organización", devuelve los identificadores de las actividades.
 * - 200: Si no se encuentran actividades asociadas a la meta con el estado "organización", devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
export declare function consultarActividadesMetaOrganizacion(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta las actividades asociadas a una meta cuyo estado es "ejecución" (Estado_idEstado = 3).
 * La función busca las actividades relacionadas con el `idMeta` proporcionado y cuyo estado sea 3 (ejecución),
 * devolviendo los identificadores de las actividades asociadas.
 *
 * @route GET /consultarActividadesMetaEjecucion/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta con el estado "ejecución", devuelve los identificadores de las actividades.
 * - 200: Si no se encuentran actividades asociadas a la meta con el estado "ejecución", devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
export declare function consultarActividadesMetaEjecucion(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta las actividades asociadas a una meta cuyo estado es "cierre" (Estado_idEstado = 4).
 * La función busca las actividades relacionadas con el `idMeta` proporcionado y cuyo estado sea 4 (cierre),
 * devolviendo los identificadores de las actividades asociadas.
 *
 * @route GET /consultarActividadesMetaCierre/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idMeta` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si se encuentran actividades asociadas a la meta con el estado "cierre", devuelve los identificadores de las actividades.
 * - 200: Si no se encuentran actividades asociadas a la meta con el estado "cierre", devuelve un array vacío.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la consulta de las actividades o al acceder a la base de datos.
 */
export declare function consultarActividadesMetaCierre(req: Request, res: Response): Promise<any>;
/**
 * @description Actualiza el estado de una actividad a "organización" (Estado_idEstado = 2).
 * Esta función recibe el `idActividad` de la actividad a actualizar y cambia su estado al valor 2 (organización).
 *
 * @route PUT /actualizarActividadOrganizacion/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad fue actualizada correctamente.
 * - 400: Si ocurrió un error al actualizar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la actividad o al acceder a la base de datos.
 */
export declare function actualizarActividadOrganizacion(req: Request, res: Response): Promise<any>;
/**
 * @description Actualiza el estado de una actividad a "inicio" (Estado_idEstado = 1).
 * Esta función recibe el `idActividad` de la actividad a actualizar y cambia su estado al valor 1 (inicio).
 *
 * @route PUT /actualizarActividadInicio/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad fue actualizada correctamente.
 * - 400: Si ocurrió un error al actualizar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la actividad o al acceder a la base de datos.
 */
export declare function actualizarActividadInicio(req: Request, res: Response): Promise<any>;
/**
 * @description Actualiza el estado de una actividad a "ejecución" (Estado_idEstado = 3).
 * Esta función recibe el `idActividad` de la actividad a actualizar y cambia su estado al valor 3 (ejecución).
 *
 * @route PUT /actualizarActividadEjecucion/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad fue actualizada correctamente.
 * - 400: Si ocurrió un error al actualizar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la actividad o al acceder a la base d
*/
export declare function actualizarActividadEjecucion(req: Request, res: Response): Promise<any>;
/**
 * @description Actualiza el estado de una actividad a "cierre" (Estado_idEstado = 4).
 * Esta función recibe el `idActividad` de la actividad a actualizar y cambia su estado al valor 4 (cierre).
 *
 * @route PUT /actualizarActividadCierre/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad fue actualizada correctamente.
 * - 400: Si ocurrió un error al actualizar la actividad.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la actividad o al acceder a la base de datos.
 */
export declare function actualizarActividadCierre(req: Request, res: Response): Promise<any>;
/**
 * @description Actualiza una actividad existente o valida la creación de una nueva.
 * Esta función actualiza información detallada sobre una actividad, incluyendo el nombre,
 * descripción, presupuesto, fechas, y responsable asociado.
 *
 * @route PUT /actualizarActividad
 * @param {Request} req - El objeto de la solicitud HTTP, contiene los datos de la actividad en `req.body.data.activity`.
 *    - `idActividad`: ID único de la actividad.
 *    - `nombre`: Nombre de la actividad.
 *    - `descripcion`: Descripción de la actividad.
 *    - `presupuesto`: Presupuesto asignado.
 *    - `fechaInicio`: Fecha de inicio.
 *    - `fechaFinal`: Fecha de finalización.
 *    - `usuario`: ID del usuario responsable.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Actividad actualizada correctamente.
 * - 400: Error al actualizar la actividad o ya existe una actividad con el mismo nombre.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al interactuar con la base de datos.
 */
export declare function actualizarActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta los recursos asociados a una actividad específica.
 * Esta función busca en la base de datos todos los recursos vinculados a un ID de actividad proporcionado.
 *
 * @route GET /consultarRecursosActividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP, debe contener el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Lista de recursos asociados a la actividad.
 * - 404: No existen recursos asociados a la actividad.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al consultar los recursos en la base de datos.
 */
export declare function consultarRecursosActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Consulta el presupuesto asociado a una actividad específica.
 * La función busca una actividad por su ID y devuelve su información.
 *
 * @route GET /consultarPresupuestoActividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP. Debe incluir el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Información de la actividad, incluyendo el presupuesto asociado.
 * - 404: Error al consultar la actividad o no existe.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al interactuar con la base de datos.
 */
export declare function consultarPresupuestoActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Elimina una actividad y sus dependencias asociadas, incluyendo tareas y recursos.
 * También ajusta el presupuesto de la meta asociada a la actividad eliminada.
 *
 * @route DELETE /eliminarActividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP. Debe incluir el `idActividad` como parámetro de la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Actividad eliminada exitosamente.
 * - 404: Error al eliminar la actividad o la actividad no existe.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al interactuar con la base de datos.
 */
export declare function eliminarActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Actualiza el estado de una actividad en función de las tareas asociadas a ella.
 * La función evalúa las tareas en diferentes fases (Inicial, Organización, Ejecución, Finalización) y ajusta el estado de la actividad.
 *
 * @route PUT /actualizarActividadEstado
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene los datos de la actividad en `req.body.data.activity`.
 *    - `idActividad`: ID único de la actividad.
 * @param {Response} res - El objeto de la respuesta HTTP.
 *
 * @returns {Response} - Devuelve los siguientes resultados posibles:
 * - 200: Estado actualizado exitosamente con el desglose de tareas en las fases.
 * - 200: Error al obtener el porcentaje del proyecto si `idActividad` no es válido.
 * - 503: Error en el servidor.
 *
 * @throws {Error} Si ocurre un error al interactuar con la base de datos.
 */
export declare function actualizarActividadEstado(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=actividadController.d.ts.map