/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();
const HomeController = require("../../../../controllers/homex/home");
require('../../../../config/passport')(passport);

router.get('/get', passport.authenticate('jwt', { session: false }), HomeController.getAll);
router.get('/get/:homeId', passport.authenticate('jwt', { session: false }), HomeController.getById);
router.get('/get-by', passport.authenticate('jwt', { session: false }), HomeController.getBy);
router.get('/get-by-filters', passport.authenticate('jwt', { session: false }), HomeController.getByFilters);
router.post('/create', passport.authenticate('jwt', { session: false }), HomeController.create);
router.put('/update/:homeId', passport.authenticate('jwt', { session: false }), HomeController.update);
router.delete('/remove/:homeId', passport.authenticate('jwt', { session: false }), HomeController.remove);
router.post('/share/:homeId', passport.authenticate('jwt', { session: false }), HomeController.share);

module.exports = router;
