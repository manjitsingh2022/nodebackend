const express = require("express")
const router = express.Router()
const UserLogInController = require("../controllers/UserLogInController")

router.get('/', UserLogInController.index)
router.get('/show',UserLogInController.show)
router.post('/store',UserLogInController.store)
router.patch('/update',UserLogInController.update)
router.delete('/delete',UserLogInController.destroy)

module.exports = router