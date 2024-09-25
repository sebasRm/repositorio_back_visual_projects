import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";

export async function findActivitiesActive(idCronograma: any) {
  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        attributes: [
            [
              Sequelize.fn("COUNT", Sequelize.col("idActividad")),
              "contadorActividad",
            ],
          ],  
          where: {
          Estado_idEstado: {
              [Sequelize.Op.not]: 4 // Estado diferente de 4
            }
          },              
      },
    ],
  });
  //console.log("contadorTareaPlaneada", contadorActividad[0].dataValues.actividads[0] )
  let totalActividades = contadorActividad[0].dataValues.actividads[0] ? contadorActividad[0].dataValues.actividads[0].dataValues.contadorActividad : 0
 
  return totalActividades;
}

export async function findTotalActivitiesPlanned(idCronograma: any) {
  const contadorActividadPlaneada: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividadplaneada,
        as: "actividadplaneadas",
        attributes: [
            [
              Sequelize.fn("COUNT", Sequelize.col("idActividadPlaneada")),
              "contadorActividadPlaneada",
            ],
          ],                
      },
    ],
  });
 // console.log("contadorTareaPlaneada", contadorActividadPlaneada)
  let totalActividadesPlaneadas = contadorActividadPlaneada[0].dataValues.actividadplaneadas[0] ? contadorActividadPlaneada[0].dataValues.actividadplaneadas[0].dataValues.contadorActividadPlaneada : 0
 // console.log("contadorTareaPlaneada", totalActividadesPlaneadas)
  return totalActividadesPlaneadas;
}

export async function findTotalActivities(idCronograma: any) {
  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;
}


export async function findActivitiesInitial(idCronograma: any) {

  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
        where: {
          Estado_idEstado: 1,
        }, 
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;

}

export async function findActivitiesOrganization(idCronograma: any) {
  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
        where: {
          Estado_idEstado: 2,
        }, 
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;
}

export async function findActivitiesEjecution(idCronograma: any) {
  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
        where: {
          Estado_idEstado: 3,
        }, 
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;
}

export async function findActivitiesFinish(idCronograma:any) {
  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      Cronograma_idCronograma: idCronograma,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
        where: {
          Estado_idEstado: 4,
        }, 
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;
}



export async function findActivitiesInitialGoal(idMeta: any) {

  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      idMeta: idMeta,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
        where: {
          Estado_idEstado: 1,
        }, 
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;

}

export async function findActivitiesOrganizationGoal(idMeta: any) {
  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      idMeta: idMeta,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
        where: {
          Estado_idEstado: 2,
        }, 
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;
}

export async function findActivitiesEjecutionGoal(idMeta: any) {
  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      idMeta: idMeta,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
        where: {
          Estado_idEstado: 3,
        }, 
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;
}

export async function findActivitiesFinishGoal(idMeta:any) {
  const contadorActividad: any = await initModel.meta.findAll({
    where: {
      idMeta: idMeta,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        //attributes: [],
        where: {
          Estado_idEstado: 4,
        }, 
      },
    ],
  });
 
  let totalActividades = 0;

  contadorActividad.forEach((meta:any) => {
    totalActividades += meta.actividads.length;
  });
  return totalActividades;
}