import { Sequelize } from "sequelize";
let sequelize: any;

sequelize = new Sequelize("visual-projects-db", "root", "rBEyWEYvYtqzwGywgBkWcLciodZwjGlh", {
    host: "mysql.railway.internal",
    dialect: "mysql",
});

export { sequelize };
