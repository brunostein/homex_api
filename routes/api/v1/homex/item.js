/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();
const ItemController = require("../../../../controllers/homex/item");
require('../../../../config/passport')(passport);

router.get('/get', passport.authenticate('jwt', { session: false }), ItemController.getAll);
router.get('/get/:itemId', passport.authenticate('jwt', { session: false }), ItemController.getById);
router.get('/get-by', passport.authenticate('jwt', { session: false }), ItemController.getBy);
router.get('/get-by-filters', passport.authenticate('jwt', { session: false }), ItemController.getByFilters);
router.post('/create', passport.authenticate('jwt', { session: false }), ItemController.create);
router.put('/update/:itemId', passport.authenticate('jwt', { session: false }), ItemController.update);
router.delete('/remove/:itemId', passport.authenticate('jwt', { session: false }), ItemController.remove);

module.exports = router;
