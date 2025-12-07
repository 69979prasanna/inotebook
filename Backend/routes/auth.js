require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
var fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken')

const JWT_SEC = process.env.JWT_TOKEN

router.post('/createuser', [
    body('username', 'Enter valid name').isLength({ min: 3 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            username: req.body.username,
            password: secPass,
            email: req.body.email
        })

        const data = { user: { id: user.id } }
        const authtoken = jwt.sign(data, JWT_SEC)
        res.json({ success: true, authtoken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})  


router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        const data = { user: { id: user.id } }
        const authtoken = jwt.sign(data, JWT_SEC)
        success = true
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router
