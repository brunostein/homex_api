/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();
const UnitMeasurementController = require("../../../../controllers/homex/unit_measurement");
require('../../../../config/passport')(passport);

router.get('/get', passport.authenticate('jwt', { session: false }), UnitMeasurementController.getAll);
router.get('/get/:unitMeasurementId', passport.authenticate('jwt', { session: false }), UnitMeasurementController.getById);
router.get('/get-by', passport.authenticate('jwt', { session: false }), UnitMeasurementController.getBy);
router.get('/get-by-filters', passport.authenticate('jwt', { session: false }), UnitMeasurementController.getByFilters);
router.post('/create', passport.authenticate('jwt', { session: false }), UnitMeasurementController.create);
router.put('/update/:unitMeasurementId', passport.authenticate('jwt', { session: false }), UnitMeasurementController.update);
router.delete('/remove/:unitMeasurementId', passport.authenticate('jwt', { session: false }), UnitMeasurementController.remove);

module.exports = router;
