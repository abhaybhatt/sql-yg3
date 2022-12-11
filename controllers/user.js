const db = require('../models/index')
const User = db.user
const Bookings = db.bookings

const addUser = async (req, res) => {
    try {
        const { firstName, lastName, email, age, admin } = req.body
        if (age === null) {
            return
        }
        else if (email === null) {
            return
        }
        else if (firstName === null) {
            return
        }

        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            admin: admin
        })

        // const data = await newUser.save()
        res.status(200).send({ data: newUser, created: true })
    } catch (err) {
        err.errors.forEach((error) => {
            if (error.type === 'unique violation') {
                res.send({ error: 'Email already in use', created: false })
            }
            if (error.type === 'Validation error') {
                res.send({ error: 'Invalid age', created: false })
            } else {
                res.send({ error: error.message, created: false })
            }
        })
        console.log(err)
    }

}

const checkUser = async (req, res) => {
    const email = req.params.email
    try {
        if (email === null) {
            res.send('Enter email')
        }
        const user = await User.findOne({
            include: [{
                model: Bookings,
                as: "bookings",
                attributes: ['batch', 'month', 'year']
            }],
            where: { email: email }
        });
        if (user === null) {
            res.send({ newUser: true, data: null })
        } else {
            res.send({ newUser: false, data: user })
        }
    } catch (err) {
        err.errors.forEach((error) => {
            res.send({ error: error.message, created: false })
        })
    }
}


module.exports = {
    addUser,
    checkUser
}
