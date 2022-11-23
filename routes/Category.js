const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/CategoryController")
router.get('/categories', categoryController.index)
router.get('/show',categoryController.show)
router.post('/store',categoryController.store)
router.patch('/update',categoryController.update)
router.post('/delete',categoryController.destroy)
router.delete('/deleteRecord',categoryController.deleteAllData)

module.exports = router