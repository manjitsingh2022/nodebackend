
const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserControllers")
router.get('/', UserController.index)
router.post('/login', UserController.login)
router.post('/register',UserController.register)
router.get('/show',UserController.show)
router.post('/store',UserController.store)
router.patch('/update',UserController.update)
router.delete('/delete',UserController.destroy)

module.exports = router