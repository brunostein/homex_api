/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();
const CategoryController = require("../../../../controllers/homex/category");
require('../../../../config/passport')(passport);

router.get('/get', passport.authenticate('jwt', { session: false }), CategoryController.getAll);
router.get('/get/:categoryId', passport.authenticate('jwt', { session: false }), CategoryController.getById);
router.get('/get-by', passport.authenticate('jwt', { session: false }), CategoryController.getBy);
router.get('/get-by-filters', passport.authenticate('jwt', { session: false }), CategoryController.getByFilters);
router.post('/create', passport.authenticate('jwt', { session: false }), CategoryController.create);
router.put('/update/:categoryId', passport.authenticate('jwt', { session: false }), CategoryController.update);
router.delete('/remove/:categoryId', passport.authenticate('jwt', { session: false }), CategoryController.remove);

module.exports = router;
