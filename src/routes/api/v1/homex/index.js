/* ========================================================================
 * Copyright (C) BluePex Controle & Segurança - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Bruno B. Stein <bruno.stein@bluepex.com>, 2021
 * ========================================================================
 */

const express = require('express');
const router = express.Router();

router.use('/users', require('./user'));
router.use('/homes', require('./home'));
router.use('/categories', require('./category'));
router.use('/items', require('./item'));
router.use('/units-measurements', require('./unit_measurement'));

module.exports = router;
