import { Sequelize } from "sequelize";
let sequelize: any;

sequelize = new Sequelize("visual-projects-db", "root", "rBEyWEYvYtqzwGywgBkWcLciodZwjGlh", {
    host: "junction.proxy.rlwy.net:24276",
    dialect: "mysql",
});

export { sequelize };
