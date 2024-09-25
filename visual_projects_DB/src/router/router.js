"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const usuarioControllers_1 = require("../controllers/usuarioControllers");
const LiderController_1 = require("../controllers/LiderController");
const proyectoController_1 = require("../controllers/proyectoController");
const directorController_1 = require("../controllers/directorController");
const actividadController_1 = require("../controllers/actividadController");
const actividadPlaneadaController_1 = require("../controllers/actividadPlaneadaController");
const tareaController_1 = require("../controllers/tareaController");
const planeacionController_1 = require("../controllers/planeacionController");
const metaController_1 = require("../controllers/metaController");
const responsableController_1 = require("../controllers/responsableController");
const recursoController_1 = require("../controllers/recursoController");
const indicatorsController_1 = require("../controllers/indicatorsController");
const tareaPlaneadaController_1 = require("../controllers/tareaPlaneadaController");
const router = express_1.default.Router();
exports.router = router;
/** *************************  MODULO LOGIN  ***************************/
router.post("/api/login", usuarioControllers_1.login);
/** *************************  MODULO LIDER  ***************************/
router.get("/api/consultar/lideres", LiderController_1.consultarLideres);
router.get("/api/consultar/lideres/on-proyects", LiderController_1.consultarLideresSinProyecto);
router.post("/api/crear/lider", LiderController_1.crearLider);
router.put("/api/actualizar/lider", LiderController_1.actualizarLider);
router.delete("/api/eliminar/lider/:idLider", LiderController_1.eliminarLider);
/** *************************  MODULO PROYECTOS  ***************************/
router.get("/api/consultar/proyectos", proyectoController_1.consultarProyectos);
router.get("/api/consultar/proyectos/lider/:idLider", proyectoController_1.consultarProyectosLider);
router.post("/api/consultar/spi/projecto", indicatorsController_1.indicatorProjectSPI);
router.post("/api/consultar/cpi/projecto", indicatorsController_1.indicatorProjectCPI);
router.post("/api/crear/proyectos", proyectoController_1.crearProyectos);
router.put("/api/actualizar/proyecto", proyectoController_1.actualizarProyecto);
router.delete("/api/eliminar/proyecto/:idProyecto", proyectoController_1.eliminarProyecto);
/** *************************  MODULO DIRECTOR  ***************************/
router.get("/api/consultar/proyecto/director/:idDirector", proyectoController_1.consultarProyectosDirector);
router.post("/api/crear/director", directorController_1.crearDirector);
/** *************************  MODULO ACTIVIDADES  ***************************/
router.get("/api/consultar/actividades/meta/:idMeta", actividadController_1.consultarActividadesMeta);
router.get("/api/consultar/recursos/actividades/:idActividad", actividadController_1.consultarRecursosActividad);
router.get("/api/consultar/actividades-meta/inicio/:idMeta", actividadController_1.consultarActividadesMetaInicio);
router.get("/api/consultar/actividades-meta/organizacion/:idMeta", actividadController_1.consultarActividadesMetaOrganizacion);
router.get("/api/consultar/actividades-meta/ejecucion/:idMeta", actividadController_1.consultarActividadesMetaEjecucion);
//router.get("/api/consultar/actividades-planeadas/:idActividad",consultarActividadesPlaneadas);
router.get("/api/consultar/actividades-meta/cierre/:idMeta", actividadController_1.consultarActividadesMetaCierre);
router.get("/api/consultar/presupuesto-actividad/:idActividad", actividadController_1.consultarPresupuestoActividad);
router.put("/api/actualizar/estado-inicio/actividad/:idActividad", actividadController_1.actualizarActividadInicio);
router.put("/api/actualizar/estado-ejecucion/actividad/:idActividad", actividadController_1.actualizarActividadEjecucion);
router.put("/api/actualizar/estado-cierre/actividad/:idActividad", actividadController_1.actualizarActividadCierre);
router.put("/api/actualizar/estado/actividad", actividadController_1.actualizarActividadEstado);
router.put("/api/actualizar/actividad", actividadController_1.actualizarActividad);
router.post("/api/contar/actividades", actividadController_1.contarTotalActividades);
router.post("/api/contar/actividades/activas", actividadController_1.contarActividadesActivas);
router.post("/api/contar/actividades/finalizadas", actividadController_1.contarActividadesFinalizadas);
router.post("/api/pocentaje/actividades/finalizadas", actividadController_1.porcentajeActividadesTermidas);
router.post("/api/crear/actividad", actividadController_1.crearActividad);
router.delete("/api/eliminar/actividad/:idActividad", actividadController_1.eliminarActividad);
/** *********************  MODULO ACTIVIDADES PLANEADAS*************************/
router.post("/api/consultar/actividad/planeada", actividadPlaneadaController_1.buscarActividadPlaneada);
router.post("/api/information/indicators", actividadPlaneadaController_1.informationIndicators);
/** *************************  MODULO TAREAS  ***************************/
router.get("/api/consultar/tareas/actividad/:idActividad", tareaController_1.consultarTareasActividad);
router.get("/api/consultar/tareas-actividades/inicio/:idActividad", tareaController_1.consultarTareasActividadInicio);
router.get("/api/consultar/tareas-actividades/organizacion/:idActividad", tareaController_1.consultarTareasActividadOrganizacion);
router.get("/api/consultar/tareas-actividades/ejecucion/:idActividad", tareaController_1.consultarTareasActividadEjecucion);
router.get("/api/consultar/tareas-actividades/cierre/:idActividad", tareaController_1.consultarTareasActividadCierre);
router.get("/api/total/presupuesto-tarea/actividad/:idActividad", tareaController_1.totalPresupuestoTareaActividad);
router.post("/api/contar/tareas", tareaController_1.contarTotalTareas);
router.post("/api/pocentaje/tareas/finalizadas", tareaController_1.porcentajeTareasTermidas);
router.post("/api/crear/tarea", tareaController_1.crearTarea);
router.put("/api/actualizar/estado-inicio/tarea/:idTarea", tareaController_1.actualizarTareaInicio);
router.put("/api/actualizar/estado-organizacion/tarea/:idTarea", tareaController_1.actualizarTareaOrganizacion);
router.put("/api/actualizar/estado-ejecucion/tarea/:idTarea", tareaController_1.actualizarTareaEjecucion);
router.put("/api/actualizar/estado-cierre/tarea/:idTarea", tareaController_1.actualizarTareaCierre);
router.delete("/api/eliminar/tarea/:idTarea", tareaController_1.eliminarTarea);
router.put("/api/actualizar/tarea", tareaController_1.actualizarTarea);
/** *************************  MODULO TAREAS PLANEADAS  ***************************/
router.post("/api/consultar/tarea/planeada", tareaPlaneadaController_1.buscarTareaPlaneada);
/** *************************  MODULO PLANEACION  ***************************/
router.post("/api/crear/planeacion", planeacionController_1.crearPlaneacion);
/** *************************  MODULO METAS  ***************************/
router.get("/api/consultar/metas/:idCronograma", metaController_1.consultarMetasProyecto);
router.get("/api/consultar/presupuesto/meta/:idMeta", metaController_1.consultarPresupuestoMeta);
router.post("/api/crear/meta", metaController_1.crearMeta);
router.post("/api/contar/estado/metas", metaController_1.contarEstadoMetas);
router.put("/api/actualizar/estado/meta", metaController_1.actualizarMetaEstado);
router.put("/api/actualizar/meta", metaController_1.actualizarMeta);
router.delete("/api/eliminar/meta/:idMeta", metaController_1.eliminarMeta);
/** *************************  MODULO RESPONSABLES  ***************************/
router.get("/api/consultar/responsables", responsableController_1.buscarResponsables);
/** *************************  MODULO RECURSOS  ***************************/
router.get("/api/consultar/recurso/actividad/:idActividad", recursoController_1.consultarRecursoActividad);
router.get("/api/total/presupuesto-recurso/actividad/:idActividad", recursoController_1.totalPresupuestoRecursoActividad);
router.post("/api/crear/recurso/actividad", recursoController_1.crearRecursoActividad);
router.put("/api/actualizar/recurso/actividad", recursoController_1.actualizarRecursoActividad);
router.delete("/api/eliminar/recurso/actividad/:idRecurso", recursoController_1.eliminarRecursoActividad);
router.get("/api/consultar/recurso/tarea/:idTarea", recursoController_1.consultarRecursoTarea);
router.post("/api/crear/recurso/tarea", recursoController_1.crearRecursoTarea);
router.get("/api/total/presupuesto-recurso/tarea/:idTarea", recursoController_1.totalPresupuestoRecursoTarea);
router.delete("/api/eliminar/recurso/tarea/:idRecurso", recursoController_1.eliminarRecursoTarea);
router.put("/api/actualizar/recurso/tarea", recursoController_1.actualizarRecursoTarea);
//# sourceMappingURL=router.js.map