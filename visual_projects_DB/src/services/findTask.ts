import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";

export async function findTotalTaskPlanned(idCronograma: any) {
  const contadorTareaPlaneada: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividadplaneada,
        as: "actividadplaneadas",
        include: [
          {
            model: initModel.tareaplaneada,
            as: "tareaplaneadas",
            where: {
              cronogramaOriginal: true,
            },
          },
        ],
      },
    ],
  });
  let totalTareasPlaneadas = 0;

  contadorTareaPlaneada.forEach((meta: any) => {
    meta.actividadplaneadas?.forEach((actividad: any) => {
      totalTareasPlaneadas += actividad.tareaplaneadas.length;
    });
  });
  return totalTareasPlaneadas;
}

export async function findTotalTask(idCronograma: any) {
  //console.log("contadorTarea", idCronograma);
  const contadorTarea: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        include: [
          {
            model: initModel.tarea,
            as: "tareas",
          },
        ],
      },
    ],
  });

  let totalTareas = 0;
  for (let i = 0; i < contadorTarea.length; i++) {
    const meta = contadorTarea[i];
    if (meta.dataValues.actividads.length > 0) {
      for (let j = 0; j < meta.dataValues.actividads.length; j++) {
        const actividad = meta.dataValues.actividads[j];
        if (actividad.dataValues.tareas.length > 0) {
          totalTareas += actividad.dataValues.tareas.length;
        }
      }
    }
  }
  return totalTareas;
}

export async function findTaskActive(idCronograma: any) {
  const contadorTarea: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        include: [
          {
            model: initModel.tarea,
            as: "tareas",
            where: {
              Estado_idEstado: {
                [Sequelize.Op.ne]: 4, // Utilizar $ne para "no igual a 4"
              },
            },
          },
        ],
      },
    ],
  });
  let totalTareas = 0;
  for (let i = 0; i < contadorTarea.length; i++) {
    const meta = contadorTarea[i];
    if (meta.dataValues.actividads.length > 0) {
      for (let j = 0; j < meta.dataValues.actividads.length; j++) {
        const actividad = meta.dataValues.actividads[j];
        if (actividad.dataValues.tareas.length > 0) {
          totalTareas += actividad.dataValues.tareas.length;
        }
      }
    }
  }
  return totalTareas;
}

export async function findTaskInitial(idCronograma: any) {
  const contadorTarea = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        include: [
          {
            model: initModel.tarea,
            as: "tareas",
          },
        ],
      },
    ],
  });
  
  // Calcular el total de tareas filtradas por Estado_idEstado = 1 directamente
  let totalTareas = 0;
  contadorTarea.forEach((meta) => {
    meta.actividads.forEach((actividad) => {
      const tareasFiltradas = actividad.tareas.filter(tarea => tarea.Estado_idEstado === 1);
      totalTareas += tareasFiltradas.length;
    });
  });
  
  return totalTareas;
}

export async function findTaskOrganization(idCronograma: any) {
  const contadorTarea = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        include: [
          {
            model: initModel.tarea,
            as: "tareas",
          },
        ],
      },
    ],
  });
  
  // Calcular el total de tareas filtradas por Estado_idEstado = 1 directamente
  let totalTareas = 0;
  contadorTarea.forEach((meta) => {
    meta.actividads.forEach((actividad) => {
      const tareasFiltradas = actividad.tareas.filter(tarea => tarea.Estado_idEstado === 2);
      totalTareas += tareasFiltradas.length;
    });
  });
  
  return totalTareas;
}

export async function findTaskEjecution(idCronograma: any) {
  const contadorTarea = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        include: [
          {
            model: initModel.tarea,
            as: "tareas",
          },
        ],
      },
    ],
  });
  
  // Calcular el total de tareas filtradas por Estado_idEstado = 1 directamente
  let totalTareas = 0;
  contadorTarea.forEach((meta) => {
    meta.actividads.forEach((actividad) => {
      const tareasFiltradas = actividad.tareas.filter(tarea => tarea.Estado_idEstado === 3);
      totalTareas += tareasFiltradas.length;
    });
  });
  
  return totalTareas;
}

export async function findTaskFinish(idCronograma: any) {
  const contadorTarea = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        include: [
          {
            model: initModel.tarea,
            as: "tareas",
          },
        ],
      },
    ],
  });
  
  // Calcular el total de tareas filtradas por Estado_idEstado = 1 directamente
  let totalTareas = 0;
  contadorTarea.forEach((meta) => {
    meta.actividads.forEach((actividad) => {
      const tareasFiltradas = actividad.tareas.filter(tarea => tarea.Estado_idEstado === 4);
      totalTareas += tareasFiltradas.length;
    });
  });
  
  return totalTareas;
}

export async function findTaskInitialActivity(idActividad: any) {
  const contadorTarea: any = await initModel.actividad.findAll({
    where: {
      idActividad: idActividad,
    },
    include: [
      {
        model: initModel.tarea,
        as: "tareas",
        where: {
          Estado_idEstado: 1,
        },
      },
    ],
  });
  let totalTareas = 0;
  for (let i = 0; i < contadorTarea.length; i++) {
    const meta: any = contadorTarea[i];
    if (meta?.dataValues?.tareas?.length > 0) {
      totalTareas += meta.dataValues.tareas.length;
    }
  }
  return totalTareas;
}

export async function findTaskOrganizationActivity(idActividad: any) {
  const contadorTarea: any = await initModel.actividad.findAll({
    where: {
      idActividad: idActividad,
    },
    include: [
      {
        model: initModel.tarea,
        as: "tareas",
        where: {
          Estado_idEstado: 2,
        },
      },
    ],
  });
  let totalTareas = 0;
  for (let i = 0; i < contadorTarea.length; i++) {
    const meta: any = contadorTarea[i];
    if (meta.dataValues.tareas.length > 0) {
      totalTareas += meta.dataValues.tareas.length;
    }
  }
  return totalTareas;
}

export async function findTaskEjecutionActivity(idActividad: any) {
  const contadorTarea: any = await initModel.actividad.findAll({
    where: {
      idActividad: idActividad,
    },
    include: [
      {
        model: initModel.tarea,
        as: "tareas",
        where: {
          Estado_idEstado: 3,
        },
      },
    ],
  });
  let totalTareas = 0;
  for (let i = 0; i < contadorTarea.length; i++) {
    const meta: any = contadorTarea[i];
    if (meta.dataValues.tareas.length > 0) {
      totalTareas += meta.dataValues.tareas.length;
    }
  }
  return totalTareas;
}

export async function findTaskFinishActivity(idActividad: any) {
  const contadorTarea: any = await initModel.actividad.findAll({
    where: {
      idActividad: idActividad,
    },
    include: [
      {
        model: initModel.tarea,
        as: "tareas",
        where: {
          Estado_idEstado: 4,
        },
      },
    ],
  });
  let totalTareas = 0;
  for (let i = 0; i < contadorTarea.length; i++) {
    const meta: any = contadorTarea[i];
    if (meta.dataValues.tareas.length > 0) {
      totalTareas += meta.dataValues.tareas.length;
    }
  }
  return totalTareas;
}
