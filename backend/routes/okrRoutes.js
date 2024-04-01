

const express = require('express');
const router = express.Router();
const { getAllObjectives } = require('../controllers/objectiveController');
const { createObjective } = require('../controllers/objectiveController');
const userAuth = require('../middleware/auth');
router.get('/objectives',getAllObjectives);
// POST create objective
router.post('/objectives',createObjective);
module.exports = router;