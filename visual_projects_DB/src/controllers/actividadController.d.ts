import { Request, Response } from "express";
/**
 * Funcion para contar el total de las activiades asociadas a un cronograma del proyecto.
 */
export declare function contarTotalActividades(req: Request, res: Response): Promise<any>;
/**
 * Funcion para contat el total de las activiades finalizadas asociadas a un cronograma del proyecto.
 */
export declare function contarActividadesFinalizadas(req: Request, res: Response): Promise<any>;
export declare function contarActividadesActivas(req: Request, res: Response): Promise<any>;
export declare function porcentajeActividadesTermidas(req: Request, res: Response): Promise<any>;
export declare function consultarActividadesMeta(req: Request, res: Response): Promise<any>;
export declare function crearActividad(req: Request, res: Response): Promise<any>;
export declare function consultarActividadesMetaInicio(req: Request, res: Response): Promise<any>;
export declare function consultarActividadesMetaOrganizacion(req: Request, res: Response): Promise<any>;
export declare function consultarActividadesMetaEjecucion(req: Request, res: Response): Promise<any>;
export declare function consultarActividadesMetaCierre(req: Request, res: Response): Promise<any>;
export declare function actualizarActividadOrganizacion(req: Request, res: Response): Promise<any>;
export declare function actualizarActividadInicio(req: Request, res: Response): Promise<any>;
export declare function actualizarActividadEjecucion(req: Request, res: Response): Promise<any>;
export declare function actualizarActividadCierre(req: Request, res: Response): Promise<any>;
export declare function actualizarActividad(req: Request, res: Response): Promise<any>;
export declare function consultarRecursosActividad(req: Request, res: Response): Promise<any>;
export declare function consultarPresupuestoActividad(req: Request, res: Response): Promise<any>;
export declare function eliminarActividad(req: Request, res: Response): Promise<any>;
export declare function actualizarActividadEstado(req: Request, res: Response): Promise<any>;
//# sourceMappingURL=actividadController.d.ts.map