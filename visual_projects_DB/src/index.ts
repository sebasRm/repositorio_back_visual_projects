import  express  from "express";
import cors from "cors";
import { sequelize } from "./db/conection";
import dotenv from "dotenv";
import { initModels } from "./models/init-models";
import {router} from "./router/router"
dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());
app.use('',router);

let initModel:any

const credentials={
    database: process.env.DATABASE || 'visual-projects-db',
    user:process.env.USER || 'root',
    password:process.env.PASSWORD || '',
    host : process.env.HOST || 'localhost',
    dialect: process.env.DIALECT || 'mysql'
}

export const main = async()=>{
    let sequelizeConection:any = await sequelize;
    sequelizeConection.authenticate();
    app.listen(4000, ()=>{
        console.log("Server listening port 4000");
    });
}
export {initModel,app}
main(); 