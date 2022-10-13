const { Router } = require('express')
const todos = require('./todos.js')

const router = Router();

router.use('/todos', todos)



module.exports = router;