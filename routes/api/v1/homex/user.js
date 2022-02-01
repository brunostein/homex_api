/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require("../../../../controllers/homex/user");
require('../../../../config/passport')(passport);

router.get('/get', passport.authenticate('jwt', { session: false }), UserController.getAll);
router.get('/get/:userId', passport.authenticate('jwt', { session: false }), UserController.getById);
router.get('/get-by', passport.authenticate('jwt', { session: false }), UserController.getBy);
router.get('/get-by-filters', passport.authenticate('jwt', { session: false }), UserController.getByFilters);
router.post('/create', passport.authenticate('jwt', { session: false }), UserController.create);
router.put('/update/:userId', passport.authenticate('jwt', { session: false }), UserController.update);
router.delete('/remove/:userId', passport.authenticate('jwt', { session: false }), UserController.remove);
router.post('/signin', passport.authenticate('jwt', { session: false }), UserController.signIn);

module.exports = router;
