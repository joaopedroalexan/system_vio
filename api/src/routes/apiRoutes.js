const router = require("express").Router()

const OrganizadorControll = require('../controllers/OrganizadorControll')
const userController = require("../controllers/userController")
const EventControll = require ("../controllers/EventControll")

router.post('/user', userController.createUser)
router.get('/user', userController.getAllUsers)
router.put('/user', userController.updateUser)
router.delete('/user/:cpf', userController.deleteUser)

router.post('/Org', OrganizadorControll.createOrg)
router.get('/Org', OrganizadorControll.getAllOrg)
router.put('/Org', OrganizadorControll.updateOrg)
router.delete('/Org/:id',OrganizadorControll.deleteOrg)

router.post('/Event', EventControll.createEvents)
router.get('/Event', EventControll.GetAllEvents)
router.put('/Event', EventControll.updateEvents)

module.exports = router;