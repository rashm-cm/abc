// sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sps', 'root', 'Rashmitha@09', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;
