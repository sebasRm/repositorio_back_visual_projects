import { Sequelize } from "sequelize";
let sequelize: any;

sequelize = new Sequelize("visual-projects-empresa", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize };
