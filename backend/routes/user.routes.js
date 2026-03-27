const express = require("express")
const { submit, getAll, deleteUser } = require("../controller/form.controller.js")

const router = express.Router()

router.post('/submit', submit)
router.get('/all', getAll)
router.delete('/delete/:id', deleteUser)


module.exports= router