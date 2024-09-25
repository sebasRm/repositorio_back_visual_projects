import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";

export async function findStateGoalService(idCronograma:any, estado:any) {
    const contadorMetas: any = await initModel.meta.findAll({
        where:{Cronograma_idCronograma:idCronograma},
        attributes: [
          [
            Sequelize.fn("COUNT", Sequelize.col("idMeta")),
            "contadorMetas",
          ],
        ],
      include: [
        {
          model: initModel.estado,
          as: "Estado_",
          where: { idEstado: estado },
          attributes: [],
        },
      ]
      });
      return contadorMetas;
}

export async function findActivitiesState(idMeta:any, estado:any) {
  const contadorActividad: any = await initModel.meta.findAll({
      where: {
        idMeta: idMeta,
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
              Estado_idEstado: estado,
            },              
        },
      ],
    });
    
    let totalActividades = contadorActividad[0].dataValues.actividads[0] ? contadorActividad[0].dataValues.actividads[0].dataValues.contadorActividad : 0
 return totalActividades
}


export async function findActivitiesTotal(idMeta:any) {
  const contadorActividad: any = await initModel.meta.findAll({
      where: {
        idMeta: idMeta,
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
        },
      ],
    });
    
  let totalActividades = contadorActividad[0].dataValues.actividads[0] ? contadorActividad[0].dataValues.actividads[0].dataValues.contadorActividad : 0
  return totalActividades
}


export async function findTaskState(idMeta:any, estado:any) {
  const contadorTarea: any = await initModel.meta.findAll({
    where: {
      idMeta: idMeta,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        include:[{
            model:initModel.tarea,
            as:"tareas",
            attributes: [
                [
                  Sequelize.fn("COUNT", Sequelize.col("idTarea")),
                  "contadorTareas",
                ],
              ],
            where:{
                Estado_idEstado:estado
            }  
        }]
        
      },
    ],
  });
 
  let totalTareas = contadorTarea[0].dataValues.actividads[0]?.dataValues.tareas[0] ? contadorTarea[0].dataValues.actividads[0].dataValues.tareas[0].dataValues.contadorTareas: 0
  //console.log("taskInitial", totalTareas)
  return totalTareas
}


export async function findTaskTotal(idMeta:any) {
  const contadorTarea: any = await initModel.meta.findAll({
    where: {
      idMeta: idMeta,
    },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        include:[{
            model:initModel.tarea,
            as:"tareas",
            attributes: [
                [
                  Sequelize.fn("COUNT", Sequelize.col("idTarea")),
                  "contadorTareas",
                ],
              ],
        }]
        
      },
    ],
  });
  //console.log("taskInitial", contadorTarea[0].dataValues.actividads[0])
  let totalTareas = contadorTarea[0].dataValues.actividads[0]?.dataValues.tareas[0] ? contadorTarea[0].dataValues.actividads[0].dataValues.tareas[0].dataValues.contadorTareas : 0
  return totalTareas
}

