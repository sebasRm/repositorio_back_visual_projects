import { Sequelize } from "sequelize";
let sequelize: any;

sequelize = new Sequelize("visual-projects-db", "root", "rBEyWEYvYtqzwGywgBkWcLciodZwjGlh", {
    host: "junction.proxy.rlwy.net",
    dialect: "mysql",
});

export { sequelize };
