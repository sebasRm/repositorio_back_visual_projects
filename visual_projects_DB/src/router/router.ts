import express from "express";
import { login } from "../controllers/usuarioControllers";
import {
  consultarLideres,
  consultarLideresSinProyecto,
  crearLider,
  eliminarLider,
  actualizarLider
} from "../controllers/LiderController";
import {
  consultarProyectos,
  crearProyectos,
  consultarProyectosDirector,
  consultarProyectosLider,
  eliminarProyecto,
  actualizarProyecto
} from "../controllers/proyectoController";
import { crearDirector } from "../controllers/directorController";
import {
  contarActividadesActivas,
  contarActividadesFinalizadas,
  contarTotalActividades,
  porcentajeActividades,
  consultarActividadesMeta,
  crearActividad,
  consultarActividadesMetaInicio,
  actualizarActividadOrganizacion,
  consultarActividadesMetaOrganizacion,
  actualizarActividadInicio,
  actualizarActividadEjecucion,
  actualizarActividadCierre,
  consultarActividadesMetaEjecucion,
  consultarActividadesMetaCierre,
  actualizarActividad,
  consultarRecursosActividad,
  consultarPresupuestoActividad,
  eliminarActividad,
  actualizarActividadEstado
} from "../controllers/actividadController";
import {
  informationIndicators,
  buscarActividadPlaneada,
} from "../controllers/actividadPlaneadaController";
import {
  contarTotalTareas,
  porcentajeTareas,
  crearTarea,
  consultarTareasActividad,
  consultarTareasActividadInicio,
  consultarTareasActividadOrganizacion,
  consultarTareasActividadEjecucion,
  consultarTareasActividadCierre,
  actualizarTareaInicio,
  actualizarTareaCierre,
  actualizarTareaEjecucion,
  actualizarTareaOrganizacion,
  totalPresupuestoTareaActividad,
  eliminarTarea,
  actualizarTarea
} from "../controllers/tareaController";
import { crearPlaneacion } from "../controllers/planeacionController";
import {
  consultarMetasProyecto,
  crearMeta,
  contarEstadoMetas,
  consultarPresupuestoMeta,
  actualizarMetaEstado,
  eliminarMeta,
  actualizarMeta
} from "../controllers/metaController";
import { buscarResponsables } from "../controllers/responsableController";
import {
  consultarRecursoActividad,
  crearRecursoActividad,
  totalPresupuestoRecursoActividad,
  eliminarRecursoActividad,
  actualizarRecursoActividad,
  consultarRecursoTarea,
  crearRecursoTarea,
  totalPresupuestoRecursoTarea,
  eliminarRecursoTarea,
  actualizarRecursoTarea
} from "../controllers/recursoController";
import {
  indicatorProjectSPI,
  indicatorProjectCPI,
} from "../controllers/indicatorsController";
import { buscarTareaPlaneada } from "../controllers/tareaPlaneadaController";

const router = express.Router();

/** *************************  MODULO LOGIN  ***************************/
router.post("/api/login", login);

/** *************************  MODULO LIDER  ***************************/
router.get("/api/consultar/lideres", consultarLideres);
router.get("/api/consultar/lideres/on-proyects", consultarLideresSinProyecto);
router.post("/api/crear/lider", crearLider);
router.put("/api/actualizar/lider", actualizarLider);
router.delete("/api/eliminar/lider/:idLider", eliminarLider);



/** *************************  MODULO PROYECTOS  ***************************/
router.get("/api/consultar/proyectos", consultarProyectos);
router.get("/api/consultar/proyectos/lider/:idLider", consultarProyectosLider);
router.post("/api/consultar/spi/projecto", indicatorProjectSPI);
router.post("/api/consultar/cpi/projecto", indicatorProjectCPI);
router.post("/api/crear/proyectos", crearProyectos);
router.put("/api/actualizar/proyecto", actualizarProyecto);
router.delete("/api/eliminar/proyecto/:idProyecto", eliminarProyecto);



/** *************************  MODULO DIRECTOR  ***************************/
router.get(
  "/api/consultar/proyecto/director/:idDirector",
  consultarProyectosDirector
);
router.post("/api/crear/director", crearDirector);

/** *************************  MODULO ACTIVIDADES  ***************************/
router.get("/api/consultar/actividades/meta/:idMeta", consultarActividadesMeta);
router.get(
  "/api/consultar/recursos/actividades/:idActividad",
  consultarRecursosActividad
);
router.get(
  "/api/consultar/actividades-meta/inicio/:idMeta",
  consultarActividadesMetaInicio
);
router.get(
  "/api/consultar/actividades-meta/organizacion/:idMeta",
  consultarActividadesMetaOrganizacion
);
router.get(
  "/api/consultar/actividades-meta/ejecucion/:idMeta",
  consultarActividadesMetaEjecucion
);
//router.get("/api/consultar/actividades-planeadas/:idActividad",consultarActividadesPlaneadas);
router.get(
  "/api/consultar/actividades-meta/cierre/:idMeta",
  consultarActividadesMetaCierre
);

router.get(
  "/api/consultar/presupuesto-actividad/:idActividad",
  consultarPresupuestoActividad
);

router.put(
  "/api/actualizar/estado-inicio/actividad/:idActividad",
  actualizarActividadInicio
);
router.put(
  "/api/actualizar/estado-ejecucion/actividad/:idActividad",
  actualizarActividadEjecucion
);
router.put(
  "/api/actualizar/estado-cierre/actividad/:idActividad",
  actualizarActividadCierre
);

router.put("/api/actualizar/estado/actividad",actualizarActividadEstado)
router.put("/api/actualizar/actividad", actualizarActividad);
router.post("/api/contar/actividades", contarTotalActividades);
router.post("/api/contar/actividades/activas", contarActividadesActivas);
router.post(
  "/api/contar/actividades/finalizadas",
  contarActividadesFinalizadas
);
router.post(
  "/api/pocentaje/actividades/finalizadas",
  porcentajeActividades
);
router.post("/api/crear/actividad", crearActividad);

router.delete("/api/eliminar/actividad/:idActividad", eliminarActividad);

/** *********************  MODULO ACTIVIDADES PLANEADAS*************************/
router.post("/api/consultar/actividad/planeada", buscarActividadPlaneada);
router.post("/api/information/indicators", informationIndicators);

/** *************************  MODULO TAREAS  ***************************/
router.get(
  "/api/consultar/tareas/actividad/:idActividad",
  consultarTareasActividad
);
router.get(
  "/api/consultar/tareas-actividades/inicio/:idActividad",
  consultarTareasActividadInicio
);
router.get(
  "/api/consultar/tareas-actividades/organizacion/:idActividad",
  consultarTareasActividadOrganizacion
);
router.get(
  "/api/consultar/tareas-actividades/ejecucion/:idActividad",
  consultarTareasActividadEjecucion
);
router.get(
  "/api/consultar/tareas-actividades/cierre/:idActividad",
  consultarTareasActividadCierre
);
router.get(
  "/api/total/presupuesto-tarea/actividad/:idActividad",
  totalPresupuestoTareaActividad
);

router.post("/api/contar/tareas", contarTotalTareas);
router.post("/api/pocentaje/tareas/finalizadas", porcentajeTareas);
router.post("/api/crear/tarea", crearTarea);
router.put(
  "/api/actualizar/estado-inicio/tarea/:idTarea",
  actualizarTareaInicio
);
router.put(
  "/api/actualizar/estado-organizacion/tarea/:idTarea",
  actualizarTareaOrganizacion
);
router.put(
  "/api/actualizar/estado-ejecucion/tarea/:idTarea",
  actualizarTareaEjecucion
);
router.put(
  "/api/actualizar/estado-cierre/tarea/:idTarea",
  actualizarTareaCierre
);

router.delete("/api/eliminar/tarea/:idTarea", eliminarTarea);
router.put("/api/actualizar/tarea", actualizarTarea);

/** *************************  MODULO TAREAS PLANEADAS  ***************************/
router.post("/api/consultar/tarea/planeada", buscarTareaPlaneada);


/** *************************  MODULO PLANEACION  ***************************/
router.post("/api/crear/planeacion", crearPlaneacion);

/** *************************  MODULO METAS  ***************************/
router.get("/api/consultar/metas/:idCronograma", consultarMetasProyecto);
router.get("/api/consultar/presupuesto/meta/:idMeta", consultarPresupuestoMeta);
router.post("/api/crear/meta", crearMeta);
router.post("/api/contar/estado/metas", contarEstadoMetas);
router.put("/api/actualizar/estado/meta",actualizarMetaEstado)
router.put("/api/actualizar/meta",actualizarMeta)
router.delete("/api/eliminar/meta/:idMeta", eliminarMeta);



/** *************************  MODULO RESPONSABLES  ***************************/
router.get("/api/consultar/responsables", buscarResponsables);

/** *************************  MODULO RECURSOS  ***************************/
router.get(
  "/api/consultar/recurso/actividad/:idActividad",
  consultarRecursoActividad
);
router.get(
  "/api/total/presupuesto-recurso/actividad/:idActividad",
  totalPresupuestoRecursoActividad
);
router.post("/api/crear/recurso/actividad", crearRecursoActividad);
router.put("/api/actualizar/recurso/actividad", actualizarRecursoActividad)
router.delete("/api/eliminar/recurso/actividad/:idRecurso", eliminarRecursoActividad);

router.get("/api/consultar/recurso/tarea/:idTarea",consultarRecursoTarea)
router.post("/api/crear/recurso/tarea", crearRecursoTarea);
router.get(
  "/api/total/presupuesto-recurso/tarea/:idTarea",
  totalPresupuestoRecursoTarea
);
router.delete("/api/eliminar/recurso/tarea/:idRecurso", eliminarRecursoTarea);
router.put("/api/actualizar/recurso/tarea", actualizarRecursoTarea)


export { router };
