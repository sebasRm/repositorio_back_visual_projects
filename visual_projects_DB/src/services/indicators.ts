import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";

export async function serviceIndicatorProjectSPI(
  idCronograma: any,
  idPlaneacion: any
) {
  let ev = 0;

  let acitividadesCompletadas: any = await initModel.meta.findAll({
    where: { Cronograma_idCronograma: idCronograma },
    include: [
      {
        model: initModel.actividad,
        as: "actividads",
        attributes: ["nombre", "presupuesto"],
        where: {
          Estado_idEstado: 4,
        },
      },
    ],
  });
  
  if (acitividadesCompletadas.length > 0) {
    let pv: any = await initModel.planeacion.findOne({
      where: { idPlaneacion: idPlaneacion },
      attributes: ["presupuesto"],
    });

    if (pv) {
      pv = pv.dataValues.presupuesto;
 
     // console.log("soy el Cronograma_idCronograma", Cronograma_idCronograma)
      for (let goal in acitividadesCompletadas) {
        console.log("soy el Planeacion_idPlaneacion", acitividadesCompletadas[goal])
        let cursorActivities =
          acitividadesCompletadas[goal].dataValues.actividads;
        for (let activity in cursorActivities) {
          let nombre = cursorActivities[activity].dataValues.nombre;
          let actividadesPlaneadas: any =
            await initModel.actividadplaneada.findAll({
              where: { nombre: nombre },
              attributes: ["presupuesto"],
            });
          ev += actividadesPlaneadas[0].dataValues.presupuesto;
        }
      }
      let spi: any = ev / pv;
      let dataSPI = {
        ev: ev,
        pv: pv,
        spi: spi,
      };
      if (spi) {
        return dataSPI;
      }
    } else {
      let dataSPI = {
        ev: 0,
        pv: 0,
        spi: -1,
      };
      return dataSPI;
    }
  } else {
    let dataSPI = {
      ev: 0,
      pv: 0,
      spi: 0,
    };
    return dataSPI;
  }
}

export async function serviceIndicatorProjectCPI(idCronograma: any, idPlaneacion: any) {

    let ev = 0;
    let ac = 0;

    let acitividadesCompletadas: any = await initModel.meta.findAll({
      where: { Cronograma_idCronograma: idCronograma },
      include: [
        {
          model: initModel.actividad,
          as: "actividads",
          attributes: ["nombre", "presupuesto"],
          where: {
            Estado_idEstado: 4,
          },
        },
      ],
    });

    if (acitividadesCompletadas.length > 0) {
      for (let goal in acitividadesCompletadas) {
        let cursorActivities =
          acitividadesCompletadas[goal].dataValues.actividads;
        for (let activity in cursorActivities) {
          let nombre = cursorActivities[activity].dataValues.nombre;
          let presupuesto = cursorActivities[activity].dataValues.presupuesto;
          ac += presupuesto;
          let actividadesPlaneadas: any =
            await initModel.actividadplaneada.findAll({
              where: { nombre: nombre },
              attributes: ["presupuesto"],
            });
          ev += actividadesPlaneadas[0].dataValues.presupuesto;
        }
      }
      if (ac == 0) {
        let dataSPI = {
          ev: 0,
          ac: 0,
          cpi: 0,
        };
        return dataSPI
      }

      let cpi: any = ev / ac;
      let dataSPI = {
        ev: ev,
        ac: ac,
        cpi: cpi,
      };

      if (cpi) {
        return dataSPI
      } 
    } else {
      let dataSPI = {
        ev: 0,
        ac: 0,
        cpi: 0,
      };
      return dataSPI
    }
  
}
