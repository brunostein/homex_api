/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const { items } = require('../../models/homex');
const UtilHelper = require('../../helpers/utils');

// Define the relations of Model
const modelRelations = {
}

const ItemController = {

  getAll: (req, res) => {
    try {
      let query = { 
        include: UtilHelper.getRelations(req, modelRelations)
      }

      items.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Items." });
    }
  },

  getById: (req, res) => {
    try {
      let query = { 
        where: {
          id: req.params.itemId
        },
        include: UtilHelper.getRelations(req, modelRelations)
      }

      items.findOne(query).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Item not found." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Items." });
    }
  },

  getBy: (req, res) => {
    try {

      let field = req.query.field;
      let value = req.query.value;

      let query = { 
        where: {
          [field]: value
        },
        include: UtilHelper.getRelations(req, modelRelations)
      }

      items.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Items." });
    }
  },

  getByFilters: (req, res) => {
    try {
      let filters = req.query.filters || [];
      
      if (filters.length === 0) {
        return res.status(400).send({ success: false, msg: "Enter with filters." });
      }

      let query = { 
        where: filters,
        include: UtilHelper.getRelations(req, modelRelations)
      }

      items.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Items." });
    }
  },

  create: async (req, res) => {
    try {

      let data = req.body;

      let  requiredFields = [
        "name", "category_id"
      ];

      let validationFailed = UtilHelper.checkValidation(requiredFields, data);

      if (validationFailed.length > 0) {
        return res.status(201).send({ success: false, msg: "Validation failed. The fileds are required (" + validationFailed.join(', ') + ")" });
      }

      let itemData = {
        name: data.name,
        category_id: data.category_id,
        amount: data.amount || 0
      };

      items.create(itemData).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Couldn't create Item." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't create Item." });
    }
  },

  update: (req, res) => {
    try {

      let itemId = req.params.itemId;
      let data = req.body;
      let itemData = {};

      if (data.name !== undefined) {
        itemData.name = data.name;
      }
      if (data.category_id !== undefined) {
        itemData.category_id = data.category_id;
      }
      if (data.amount !== undefined) {
        itemData.amount = data.amount;
      }

      let query = {
        where: {
          id: itemId
        }
      };

      items.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "Item not found." });
        }

        User.update(itemData, query).then(result => {
          if (result === null) {
            return res.status(201).send({ success: false, msg: "Couldn't update Item." });
          }

          return res.status(201).send({ success: true, data: result });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't update Item." });
    }
  },

  remove: (req, res) => {
    try {

      let itemId = req.params.itemId;

      let query = { 
        where: {
          id: itemId
        },
      }

      items.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "Item not found." });
        }

        User.destroy().then(success => {
          if (success === null) {
            return res.status(201).send({ success: false, msg: "Couldn't remove Item." });
          }

          return res.status(201).send({ success: true, msg: "Item removed successfully." });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't remove Item." });
    }
  },

}

module.exports = ItemController;
