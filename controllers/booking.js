const db = require('../models/index')
const user = require('../models/user')
const Bookings = db.bookings

const addBooking = async (req, res) => {
    const { user_id, month, year, batch } = req.body
    if (user_id === undefined) {
        res.send({ status: "fail", data: "user_id can not be empty" })
        return
    }
    if (month === undefined) {
        res.send({ status: "fail", data: "umonth can not be empty" })
        return
    }
    if (year === undefined) {
        res.send({ status: "fail", data: "year can not be empty" })
        return
    }
    if (batch === undefined) {
        res.send({ status: "fail", data: "batch can not be empty" })
        return
    }
    const bookings = await Bookings.findAll({ where: { user_id: user_id, month: month, year: year, batch: batch } })
    console.log('bookings', bookings)

    if (bookings.length !== 0) {
        res.send({ status: "fail", data: "You have already booked this slot once" })
    } else {
        try {
            const obj = {
                user_id: user_id,
                month: month,
                year: year,
                batch: batch
            }
            const newBooking = await Bookings.create({
                user_id: user_id,
                month: month,
                year: year,
                batch: batch
            })
            res.send({ status: "pass", data: newBooking })
        } catch (err) {
            err.errors.forEach((error) => {
                res.send({ error: error.message, status: "fail" })
            })
            console.log(err)
        }
    }
}

const checkUser = async (req, res) => {
    const email = req.params.email
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user === null) {
            res.send({ newUser: true, data: null })
        } else {
            res.send({ newUser: false, data: user })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addBooking,
    checkUser
}
