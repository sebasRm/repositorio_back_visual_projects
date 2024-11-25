import { Request, Response } from "express";
/**
 * Función para contar el total de tareas asociadas a un cronograma de un proyecto.
 * Dado un `idCronograma`, consulta la base de datos para obtener el número total de tareas asociadas a dicho cronograma.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Se espera que el cuerpo de la solicitud tenga la estructura `{ data: { activity: { idCronograma } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la consulta.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Total de tareas asociadas al cronograma, o 0 si no hay tareas asociadas.
 *    - 503: Error en el servidor durante la consulta.
 */
export declare function contarTotalTareas(req: Request, res: Response): Promise<any>;
/**
 * Función para obtener el porcentaje de tareas terminadas en relación con el cronograma de un proyecto.
 * Dado un `idCronograma`, consulta la base de datos para obtener el número de tareas en diferentes estados:
 * - Tareas inicializadas
 * - Tareas organizadas
 * - Tareas en ejecución
 * - Tareas terminadas
 *
 * Calcula y retorna la información sobre las actividades asociadas al cronograma.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Se espera que el cuerpo de la solicitud tenga la estructura `{ data: { activity: { idCronograma } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la consulta.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Información sobre el total de tareas en los diferentes estados: inicial, organización, ejecución, y terminación.
 *    - 503: Error en el servidor durante la consulta.
 */
export declare function porcentajeTareas(req: Request, res: Response): Promise<any>;
/**
 * Función para crear una nueva tarea y asociarla con una actividad.
 * Esta función realiza los siguientes pasos:
 * 1. Verifica si la tarea planeada con el mismo nombre y actividad ya existe.
 * 2. Si no existe, crea un responsable (si no está registrado) y una tarea planeada.
 * 3. Luego crea la tarea real asociada con la actividad y el responsable.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Se espera que el cuerpo de la solicitud tenga la estructura `{ data: { task: { nombre, descripcion, presupuesto, fechaInicio, fechaFinal, usuario, idActividad, nombreActividad } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la creación:
 *    - 200: Si la tarea y la actividad planeada se crearon correctamente.
 *    - 400: En caso de error al crear la tarea o si el nombre ya está registrado.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function crearTarea(req: Request, res: Response): Promise<any>;
/**
 * Función para consultar todas las tareas asociadas a una actividad específica.
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas asociadas a esa actividad.
 * 3. Incluye información adicional de los responsables de cada tarea y su estado.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas asociadas a la actividad y se retorna la lista.
 *    - 200: Si no existen tareas asociadas a la actividad, se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function consultarTareasActividad(req: Request, res: Response): Promise<any>;
/**
 * Función para consultar todas las tareas activas asociadas a una actividad específica.
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas activas asociadas a esa actividad.
 * 3. Si hay tareas con estado inicio, extrae los IDs de las tareas y los devuelve en una lista.
 * 4. Si no existen con estado inicio asociadas a la actividad, devuelve una lista vacía.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas activas asociadas a la actividad y se retorna la lista de IDs.
 *    - 200: Si no existen tareas activas asociadas a la actividad, se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function consultarTareasActividadInicio(req: Request, res: Response): Promise<any>;
/**
 * Función para consultar todas las tareas asociadas a una actividad específica con un estado en organización
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas asociadas a esa actividad con estado "2" ("en organización").
 * 3. Si hay tareas con ese estado, extrae los IDs de las tareas y los devuelve en una lista.
 * 4. Si no existen tareas con el estado "2" asociadas a la actividad, devuelve una lista vacía.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas asociadas a la actividad con estado "2" y se retorna la lista de IDs.
 *    - 200: Si no existen tareas asociadas con estado "2", se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function consultarTareasActividadOrganizacion(req: Request, res: Response): Promise<any>;
/**
 * Función para consultar todas las tareas asociadas a una actividad específica con un estado en ejecución
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas asociadas a esa actividad con estado "3" ("en ejecución").
 * 3. Si hay tareas con ese estado, extrae los IDs de las tareas y los devuelve en una lista.
 * 4. Si no existen tareas con el estado "3" asociadas a la actividad, devuelve una lista vacía.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas asociadas a la actividad con estado "3" y se retorna la lista de IDs.
 *    - 200: Si no existen tareas asociadas con estado "3", se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function consultarTareasActividadEjecucion(req: Request, res: Response): Promise<any>;
/**
 * Función para consultar todas las tareas asociadas a una actividad específica con un estado de "4" ("cerrada").
 * Esta función realiza lo siguiente:
 * 1. Obtiene el ID de la actividad a través de los parámetros de la solicitud.
 * 2. Realiza una consulta en la base de datos para obtener todas las tareas asociadas a esa actividad con estado "4" ("cerrada").
 * 3. Si hay tareas con ese estado, extrae los IDs de las tareas y los devuelve en una lista.
 * 4. Si no existen tareas con el estado "4" asociadas a la actividad, devuelve una lista vacía.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los parámetros enviados por el cliente.
 *                         Se espera que la solicitud tenga un parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la consulta:
 *    - 200: Si se encuentran tareas asociadas a la actividad con estado "4" y se retorna la lista de IDs.
 *    - 200: Si no existen tareas asociadas con estado "4", se responde con una lista vacía.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function consultarTareasActividadCierre(req: Request, res: Response): Promise<any>;
/**
 * Función para actualizar el estado de una tarea a "1" ("inicio").
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Verifica si se ha proporcionado el ID de la tarea.
 * 3. Si el ID es válido, actualiza el estado de la tarea a "1".
 * 4. Si la tarea se actualiza correctamente, devuelve un mensaje de éxito con el estado 200.
 * 5. Si no se proporciona un ID de tarea, devuelve un mensaje de error con el estado 404.
 * 6. Si ocurre un error durante la operación, devuelve un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la operación:
 *    - 200: Si la tarea se actualiza correctamente.
 *    - 400: Si ocurre un error al actualizar la tarea.
 *    - 404: Si no se proporciona el ID de la tarea.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function actualizarTareaInicio(req: Request, res: Response): Promise<any>;
/**
 * Función para actualizar el estado de una tarea a "2" ("organización").
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Verifica si se ha proporcionado el ID de la tarea.
 * 3. Si el ID es válido, actualiza el estado de la tarea a "2".
 * 4. Si la tarea se actualiza correctamente, devuelve un mensaje de éxito con el estado 200.
 * 5. Si no se proporciona un ID de tarea, devuelve un mensaje de error con el estado 404.
 * 6. Si ocurre un error durante la operación, devuelve un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la operación:
 *    - 200: Si la tarea se actualiza correctamente.
 *    - 400: Si ocurre un error al actualizar la tarea.
 *    - 404: Si no se proporciona el ID de la tarea.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function actualizarTareaOrganizacion(req: Request, res: Response): Promise<any>;
/**
 * Función para actualizar el estado de una tarea a "3" ("ejecución").
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Verifica si se ha proporcionado el ID de la tarea.
 * 3. Si el ID es válido, actualiza el estado de la tarea a "3".
 * 4. Si la tarea se actualiza correctamente, devuelve un mensaje de éxito con el estado 200.
 * 5. Si no se proporciona un ID de tarea, devuelve un mensaje de error con el estado 404.
 * 6. Si ocurre un error durante la operación, devuelve un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la operación:
 *    - 200: Si la tarea se actualiza correctamente.
 *    - 400: Si ocurre un error al actualizar la tarea.
 *    - 404: Si no se proporciona el ID de la tarea.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function actualizarTareaEjecucion(req: Request, res: Response): Promise<any>;
/**
 * Función para actualizar el estado de una tarea a "4" ("cierre").
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Verifica si se ha proporcionado el ID de la tarea.
 * 3. Si el ID es válido, actualiza el estado de la tarea a "4".
 * 4. Si la tarea se actualiza correctamente, devuelve un mensaje de éxito con el estado 200.
 * 5. Si no se proporciona un ID de tarea, devuelve un mensaje de error con el estado 404.
 * 6. Si ocurre un error durante la operación, devuelve un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el estado de la operación:
 *    - 200: Si la tarea se actualiza correctamente.
 *    - 400: Si ocurre un error al actualizar la tarea.
 *    - 404: Si no se proporciona el ID de la tarea.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function actualizarTareaCierre(req: Request, res: Response): Promise<any>;
/**
 * Función para obtener el presupuesto total de todas las tareas asociadas a una actividad.
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la actividad desde los parámetros de la solicitud.
 * 2. Busca todas las tareas asociadas a la actividad proporcionada.
 * 3. Si se encuentran tareas, suma el presupuesto de cada tarea.
 * 4. Devuelve el total de presupuesto de todas las tareas asociadas a la actividad.
 * 5. Si no se encuentran tareas, responde con un mensaje indicando que no existen tareas.
 * 6. Si ocurre un error durante la operación, responde con un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idActividad` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con el total de presupuesto de las tareas o un error:
 *    - 200: Si se encuentran tareas y se calcula el presupuesto total correctamente.
 *    - 400: Si no se encuentran tareas asociadas a la actividad.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function totalPresupuestoTareaActividad(req: Request, res: Response): Promise<any>;
/**
 * Función para eliminar una tarea y actualizar los presupuestos de la actividad y la meta asociadas.
 * Realiza lo siguiente:
 * 1. Obtiene el ID de la tarea desde los parámetros de la solicitud.
 * 2. Elimina los recursos asociados a la tarea.
 * 3. Busca la tarea y obtiene el ID de la actividad y el presupuesto de la tarea.
 * 4. Actualiza el presupuesto de la actividad restando el presupuesto de la tarea eliminada.
 * 5. Actualiza el presupuesto de la meta asociada a la actividad.
 * 6. Elimina la tarea de la base de datos.
 * 7. Devuelve una respuesta indicando si la tarea fue eliminada exitosamente o si ocurrió un error.
 * 8. Si ocurre un error en cualquier parte del proceso, responde con un mensaje de error con el estado 503.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con la tarea eliminada o un error:
 *    - 200: Si la tarea fue eliminada exitosamente.
 *    - 404: Si no se pudo eliminar la tarea.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function eliminarTarea(req: Request, res: Response): Promise<any>;
/**
 * Función para actualizar una tarea existente.
 * Realiza lo siguiente:
 * 1. Obtiene los datos de la tarea que se van a actualizar desde el cuerpo de la solicitud (`req.body.data.task`).
 * 2. Verifica si ya existe una tarea con el mismo nombre y el mismo ID (`idTarea`).
 * 3. Si existe, busca al responsable (usuario asociado) de la tarea y lo crea si no existe.
 * 4. Actualiza la tarea con los nuevos datos, incluyendo el nombre, descripción y presupuesto.
 * 5. Actualiza la tarea planificada con las fechas de inicio y finalización, además del responsable.
 * 6. Si no existe una tarea con el mismo nombre, verifica que no haya otra tarea con ese nombre, y si es así, devuelve un error.
 * 7. Si la tarea se actualiza correctamente, responde con éxito, de lo contrario, con un error.
 * 8. Si ocurre un error en el proceso, devuelve una respuesta con un error 503 (error en el servidor).
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos de la tarea a actualizar en `req.body.data.task`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Response} - Responde con la tarea actualizada o un error:
 *    - 200: Si la tarea fue actualizada exitosamente.
 *    - 400: Si hay un error al actualizar la tarea o si el nombre de la tarea ya existe.
 *    - 503: Error en el servidor durante la operación.
 */
export declare function actualizarTarea(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=tareaController.d.ts.map