const router = require('express').Router()

const OrganizadorControll = require('../controllers/OrganizadorControll')
const userController = require("../controllers/userController")

router.post('/user', userController.createUser)
router.get('/user', userController.getAllUsers)
router.put('/user', userController.updateUser)
router.delete('/user/:cpf', userController.deleteUser)

router.post('/Org', OrganizadorControll.createOrganizador)
router.get('/Org', OrganizadorControll.getAllOrganizadores)
router.put('/Org', OrganizadorControll.updateOrganizador)
router.delete('/Org/:id',OrganizadorControll.deleteOrganizador)

module.exports = router