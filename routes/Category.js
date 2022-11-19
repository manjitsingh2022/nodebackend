const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/CategoryController")
router.get('/categories', categoryController.index)
// router.get('/show',UserController.show)
router.post('/store',categoryController.store)
// router.post('/login', categoryController.login)
// router.patch('/update',categoryController.update)
// router.delete('/delete',categoryController.destroy)

module.exports = router