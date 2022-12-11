module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                min: 18,
                max: 65
            },
            allowNull: false
        },
        admin: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, {
        modelName: 'Users'
    })
    return User
}