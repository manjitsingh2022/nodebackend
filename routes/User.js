
const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserControllers")
router.get('/index', UserController.index)
router.get('/show',UserController.show)
router.post('/register',UserController.register)
router.post('/store',UserController.store)
router.post('/login', UserController.login)
router.patch('/update',UserController.update)
router.delete('/delete',UserController.destroy)

module.exports = router