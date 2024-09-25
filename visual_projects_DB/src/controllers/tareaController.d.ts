import { Request, Response } from "express";
/**
 * Funcion para contar el total de las activiades asociadas a un cronograma del proyecto.
 */
export declare function contarTotalTareas(req: Request, res: Response): Promise<any>;
export declare function porcentajeTareasTermidas(req: Request, res: Response): Promise<any>;
export declare function crearTarea(req: Request, res: Response): Promise<any>;
export declare function consultarTareasActividad(req: Request, res: Response): Promise<any>;
export declare function consultarTareasActividadInicio(req: Request, res: Response): Promise<any>;
export declare function consultarTareasActividadOrganizacion(req: Request, res: Response): Promise<any>;
export declare function consultarTareasActividadEjecucion(req: Request, res: Response): Promise<any>;
export declare function consultarTareasActividadCierre(req: Request, res: Response): Promise<any>;
export declare function actualizarTareaInicio(req: Request, res: Response): Promise<any>;
export declare function actualizarTareaOrganizacion(req: Request, res: Response): Promise<any>;
export declare function actualizarTareaEjecucion(req: Request, res: Response): Promise<any>;
export declare function actualizarTareaCierre(req: Request, res: Response): Promise<any>;
export declare function totalPresupuestoTareaActividad(req: Request, res: Response): Promise<any>;
export declare function eliminarTarea(req: Request, res: Response): Promise<any>;
export declare function actualizarTarea(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=tareaController.d.ts.map