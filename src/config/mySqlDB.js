import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('chat_app_db', 'root', null, {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
    min: 0,
    max: 10,
    idle: 10000,
  },
  dialectOptions: {
    useUTC: false,
  },
  timezone: '+07:00',
})

try {
  await sequelize.authenticate()
  console.log('MySQL Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize
