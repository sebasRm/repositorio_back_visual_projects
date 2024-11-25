import { Sequelize } from "sequelize";
let sequelize: any;

sequelize = new Sequelize("visual-projects-db", "root", "OXzgqqObMZSNVQqQEjKhwHbJVoeYgGhU", {
  host: "mysql.railway.internal",
  dialect: "mysql",
});

export { sequelize };
