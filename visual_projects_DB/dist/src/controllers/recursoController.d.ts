import { Request, Response } from "express";
/**
 * @description Esta función consulta todos los recursos asociados a una actividad específica.
 * Utiliza el ID de la actividad proporcionado en los parámetros de la solicitud para buscar los recursos
 * relacionados en la base de datos. Si se encuentran recursos, se devuelve la lista de recursos
 * asociados a esa actividad; de lo contrario, se devuelve un mensaje indicando que la actividad
 * no tiene recursos asignados.
 *
 * @route GET /recurso-actividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idActividad` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si existen recursos asociados, se devuelve la lista de recursos.
 * - 404: Si no se encuentran recursos, se devuelve un mensaje indicando que la actividad no tiene recursos asignados.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function consultarRecursoActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función crea un nuevo recurso para una actividad específica.
 * Recibe los datos del recurso (nombre, descripción, presupuesto, idActividad , idMeta) desde el cuerpo de la solicitud.
 * Si no existe un recurso con el mismo nombre para la misma actividad, se crea un nuevo recurso y
 * se actualizan los presupuestos de la actividad y la meta correspondiente.
 * Si el recurso ya existe, se devuelve un mensaje de error indicando que el recurso ya está asignado.
 *
 * @route POST /crear-recurso-actividad
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene los datos del recurso en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se crea correctamente, se devuelve el recurso creado.
 * - 400: Si ya existe un recurso con el mismo nombre para la actividad, se devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function crearRecursoActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función calcula el total del presupuesto asignado a los recursos de una actividad específica.
 * Utiliza el ID de la actividad proporcionado en los parámetros de la solicitud para obtener todos los recursos
 * asociados a esa actividad. Luego, suma los presupuestos de los recursos y devuelve el total.
 * Si no existen recursos asignados a la actividad, se devuelve un mensaje indicando que no hay recursos.
 *
 * @route GET /total-presupuesto-recurso-actividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idActividad` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si existen recursos asociados, se devuelve el presupuesto total de los recursos.
 * - 400: Si no se encuentran recursos, se devuelve un mensaje indicando que no hay recursos creados para la actividad.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function totalPresupuestoRecursoActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función elimina un recurso de una actividad específica.
 * Recibe el ID del recurso a eliminar desde los parámetros de la solicitud.
 * Primero verifica si el recurso existe, luego actualiza el presupuesto de la actividad
 * y de la meta relacionada, restando el presupuesto del recurso que será eliminado.
 * Si la eliminación del recurso y la actualización de presupuestos es exitosa,
 * se devuelve un mensaje de éxito. Si el recurso no se encuentra o no se puede eliminar,
 * se devuelve un mensaje de error.
 *
 * @route DELETE /eliminar-recurso-actividad/:idRecurso
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idRecurso` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se elimina correctamente, se devuelve un mensaje de éxito.
 * - 400: Si el recurso no se encuentra o si ocurre un error en la eliminación, se devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function eliminarRecursoActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función actualiza un recurso asociado a una actividad específica.
 * Recibe los detalles del recurso a actualizar desde el cuerpo de la solicitud.
 * Primero verifica si el recurso ya existe en la actividad, y si es así, actualiza su presupuesto
 * en la actividad y la meta asociada. Si el recurso no existe, se verifica que no haya otro recurso
 * con el mismo nombre en otra actividad. En caso de éxito, se devuelve un mensaje con los datos del recurso actualizado.
 * Si ocurre algún error, se devuelve un mensaje de error.
 *
 * @route PUT /actualizar-recurso-actividad/:idRecurso
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene los detalles del recurso en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se actualiza correctamente, se devuelve un mensaje de éxito con los detalles del recurso actualizado.
 * - 400: Si ya existe un recurso con el mismo nombre en otra actividad o si el recurso no se encuentra, se devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function actualizarRecursoActividad(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función consulta los recursos asociados a una tarea específica.
 * Recibe el ID de la tarea desde los parámetros de la solicitud. Si la tarea tiene recursos asociados,
 * devuelve una lista de esos recursos. Si no existen recursos para la tarea, devuelve un mensaje indicando
 * que no hay recursos asignados. Si ocurre algún error, se devuelve un mensaje de error.
 *
 * @route GET /consultar-recurso-tarea/:idTarea
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si se encuentran recursos asociados a la tarea, se devuelve una lista de los recursos.
 * - 404: Si no se encuentran recursos asociados a la tarea, se devuelve un mensaje indicando que no hay recursos asignados.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function consultarRecursoTarea(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función crea un nuevo recurso asociado a una tarea específica.
 * Verifica si ya existe un recurso con el mismo nombre en la tarea antes de proceder con su creación.
 * Si el recurso no existe, lo crea y actualiza los presupuestos de la tarea, actividad y meta relacionadas,
 * sumando el presupuesto del nuevo recurso a los presupuestos existentes.
 * Si el recurso ya existe, devuelve un mensaje de error.
 *
 * @route POST /crear-recurso-tarea
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene los detalles del recurso a crear en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se crea correctamente, se devuelve un mensaje de éxito con los datos del nuevo recurso.
 * - 400: Si ya existe un recurso con el mismo nombre en la tarea, se devuelve un mensaje de error.
 * - 404: Si no se encuentra la tarea o algún otro recurso necesario para la creación, se devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function crearRecursoTarea(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función calcula el total del presupuesto de todos los recursos asociados a una tarea específica.
 * Recibe el ID de la tarea desde los parámetros de la solicitud y obtiene todos los recursos asociados.
 * Luego, suma los presupuestos de esos recursos para obtener el total.
 * Si no se encuentran recursos asociados a la tarea, se devuelve un mensaje indicando que no existen recursos.
 * Si ocurre un error en el servidor, se devuelve un mensaje de error.
 *
 * @route GET /total-presupuesto-recurso-tarea/:idTarea
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si se encuentran recursos asociados a la tarea, se devuelve el total del presupuesto de esos recursos.
 * - 400: Si no se encuentran recursos para la tarea, se devuelve un mensaje indicando que no existen recursos.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function totalPresupuestoRecursoTarea(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función elimina un recurso asociado a una tarea, y ajusta los presupuestos en la tarea,
 * la actividad y la meta correspondientes. Si la eliminación es exitosa, devuelve un mensaje indicando el éxito,
 * junto con el número de recursos eliminados. Si hay algún error, devuelve un mensaje de error.
 *
 * @route DELETE /eliminar-recurso/:idRecurso
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idRecurso` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se elimina exitosamente, devuelve un mensaje de éxito.
 * - 400: Si el recurso no se encuentra en la base de datos, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function eliminarRecursoTarea(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función actualiza un recurso asociado a una tarea. Ajusta el presupuesto en la tarea, actividad
 * y meta según las diferencias entre el presupuesto anterior y el nuevo. Si el recurso no existe, se verifica si existe
 * otro recurso con el mismo nombre en una tarea distinta, y si no se encuentra, se crea un nuevo recurso.
 *
 * @route PUT /actualizar-recurso/:idRecurso
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idRecurso` en la URL y el cuerpo de la solicitud con los datos actualizados del recurso.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se actualiza exitosamente, devuelve un mensaje con los detalles del recurso actualizado.
 * - 400: Si no se puede actualizar el recurso o el recurso no se encuentra en otra tarea, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function actualizarRecursoTarea(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=recursoController.d.ts.map