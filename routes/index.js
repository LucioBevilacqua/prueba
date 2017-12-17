const router = require('express').Router();

// Sales
router.use('/sales', require('./sales.routes'));


module.exports = router;