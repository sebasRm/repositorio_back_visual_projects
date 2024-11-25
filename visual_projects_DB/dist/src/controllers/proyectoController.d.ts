import { Request, Response } from "express";
/**
 * @description Esta función consulta todos los proyectos asociados a un director,
 * incluyendo detalles sobre la planeación, estado y líder del proyecto, así como
 * los indicadores SPI y CPI calculados para cada proyecto. Si los proyectos son
 * encontrados, se devuelve una lista con todos los proyectos y sus indicadores.
 * Si no se encuentran proyectos, se devuelve un mensaje indicando que no existen proyectos asociados al director.
 * En caso de error en el servidor, se devuelve un mensaje con el error.
 *
 * @route GET /consultar-proyectos
 * @param {Request} req - El objeto de la solicitud HTTP.
 * El objeto `req` no tiene parámetros específicos en la URL, pero incluye las credenciales necesarias en el encabezado si es necesario.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si los proyectos son encontrados, devuelve una lista de proyectos con sus detalles e indicadores SPI y CPI.
 * - 404: Si no se encuentran proyectos asociados al director, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function consultarProyectos(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función consulta todos los proyectos asociados a un director específico,
 * identificado por su `idDirector`. Incluye detalles sobre la planeación, estado y líder del proyecto,
 * así como los indicadores SPI y CPI calculados para cada proyecto. Si los proyectos son
 * encontrados, se devuelve una lista con todos los proyectos y sus indicadores.
 * Si no se encuentran proyectos, se devuelve un mensaje indicando que no existen proyectos asociados al director.
 * En caso de error en el servidor, se devuelve un mensaje con el error.
 *
 * @route GET /consultar-proyectos-director/:idDirector
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idDirector` en la URL.
 * Ejemplo: `/consultar-proyectos-director/123`
 * El parámetro `idDirector` debe ser un identificador único del director.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si los proyectos son encontrados, devuelve una lista de proyectos con sus detalles e indicadores SPI y CPI.
 * - 404: Si no se encuentran proyectos asociados al director, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function consultarProyectosDirector(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función consulta todos los proyectos asociados a un líder específico,
 * identificado por su `idLider`. La función devuelve una lista con los proyectos asociados
 * a ese líder, incluyendo detalles sobre el estado y la planeación del proyecto.
 * Si no se encuentran proyectos, se devuelve un mensaje indicando que no existen proyectos asociados al líder.
 * En caso de error en el servidor, se devuelve un mensaje con el error.
 *
 * @route GET /consultar-proyectos-lider/:idLider
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idLider` en la URL.
 * El parámetro `idLider` debe ser un identificador único del líder. Ejemplo: `/consultar-proyectos-lider/45`.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si se encuentran proyectos asociados al líder, devuelve una lista de proyectos con sus detalles.
 * - 404: Si no existen proyectos asociados al líder, devuelve un mensaje indicando la ausencia de proyectos.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function consultarProyectosLider(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función permite la creación de un nuevo proyecto. Los datos del proyecto,
 * como el nombre, descripción, líder y director, se reciben en el cuerpo de la solicitud.
 * Antes de crear el proyecto, la función verifica si ya existe un proyecto con el mismo nombre.
 * Si el proyecto se crea con éxito, se devuelve una respuesta indicando la creación correcta.
 * Si ya existe un proyecto con el mismo nombre o ocurre algún error, se devuelve un mensaje adecuado.
 *
 * @route POST /crear-proyecto
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el cuerpo de la solicitud en formato JSON con los siguientes datos:
 * - `name` (string): Nombre del proyecto. Ejemplo: `"Proyecto Alpha"`.
 * - `descripcion` (string): Descripción del proyecto. Ejemplo: `"Descripción del proyecto Alpha"`.
 * - `idLider` (number): Identificador del líder asociado al proyecto. Ejemplo: `2`.
 * - `idDirector` (number): Identificador del director asociado al proyecto. Ejemplo: `1`.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el proyecto es creado con éxito, devuelve los datos del proyecto recién creado.
 * - 404: Si ya existe un proyecto con el mismo nombre, devuelve un mensaje indicando el conflicto.
 * - 400: Si ocurre un error al crear el proyecto, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export declare function crearProyectos(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función elimina un proyecto específico identificado por su `idProyecto`.
 * Durante el proceso, también elimina las dependencias relacionadas con el proyecto, como metas,
 * actividades, tareas y recursos asociados. La función asegura que todas las relaciones
 * jerárquicas sean eliminadas antes de eliminar el proyecto.
 *
 * @route DELETE /eliminar-proyecto/:idProyecto
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idProyecto` en la URL:
 * - `idProyecto` (number): Identificador único del proyecto a eliminar.
 *   Ejemplo: `/eliminar-proyecto/123`.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el proyecto y sus dependencias se eliminan con éxito.
 * - 404: Si el proyecto no se encuentra o hay un error al eliminar.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la operación de eliminación.
 */
export declare function eliminarProyecto(req: Request, res: Response): Promise<any>;
/**
 * @description Esta función actualiza los detalles de un proyecto específico, incluyendo su
 * nombre, descripción, estado, fechas de inicio y finalización, y presupuesto planificado.
 * Si el proyecto tiene una planeación asociada, también actualiza el presupuesto dentro de la planeación.
 *
 * @route PUT /actualizar-proyecto
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el cuerpo de la solicitud en formato JSON con los siguientes datos:
 * - `idProyecto` (number): Identificador único del proyecto a actualizar.
 * - `name` (string): Nuevo nombre del proyecto. Ejemplo: `"Proyecto Beta"`.
 * - `descripcion` (string): Nueva descripción del proyecto. Ejemplo: `"Descripción del proyecto Beta"`.
 * - `idEstado` (number): Identificador del nuevo estado del proyecto.
 * - `fechaInicio` (Date): Nueva fecha de inicio del proyecto. Ejemplo: `"2024-01-01"`.
 * - `fechaFinal` (Date): Nueva fecha de finalización del proyecto. Ejemplo: `"2024-12-31"`.
 * - `presupuesto` (number): Nuevo presupuesto planificado del proyecto.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el proyecto se actualiza con éxito.
 * - 400: Si hay un error al actualizar el proyecto.
 * - 503: Si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error durante la operación de actualización.
 */
export declare function actualizarProyecto(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=proyectoController.d.ts.map