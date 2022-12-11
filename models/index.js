const { Sequelize, DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize("bhvz2psfjw7anyho0gtx", "u2ftc9069m2kllps", "7NmsfekSLo1LifCVDXzC", {
    host: 'bhvz2psfjw7anyho0gtx-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    logging: false
});

try {
    sequelize.authenticate();
    console.log('Connection to DB successful')
} catch (err) {
    console.log('err in connecting db')
}

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./user')(sequelize, DataTypes)
db.bookings = require('./booking')(sequelize, DataTypes)

db.user.hasMany(db.bookings, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: "bookings" })
db.bookings.belongsTo(db.user, { foreignKey: 'user_id' })
db.sequelize.sync()

module.exports = db