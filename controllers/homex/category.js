/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const { categories } = require('../../models/homex');
const { items } = require('../../models/homex');
const UtilHelper = require('../../helpers/utils');

// Define the relations of Model
const modelRelations = {
  items: {
    model: items
  }
}

const CategoryController = {

  getAll: (req, res) => {
    try {
      let query = { 
        include: UtilHelper.getRelations(req, modelRelations)
      }

      categories.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Categories." });
    }
  },

  getById: (req, res) => {
    try {
      let query = { 
        where: {
          id: req.params.categoryId
        },
        include: UtilHelper.getRelations(req, modelRelations)
      }

      categories.findOne(query).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Category not found." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the categories." });
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

      categories.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Categories." });
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

      categories.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the categories." });
    }
  },

  create: async (req, res) => {
    try {

      let data = req.body;

      let  requiredFields = [
        "name", "home_id"
      ];

      let validationFailed = UtilHelper.checkValidation(requiredFields, data);

      if (validationFailed.length > 0) {
        return res.status(201).send({ success: false, msg: "Validation failed. The fileds are required (" + validationFailed.join(', ') + ")" });
      }

      let categoryData = {
        name: data.name,
        home_id: data.home_id
      };

      categories.create(categoryData).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Couldn't create Category." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't create Category." });
    }
  },

  update: (req, res) => {
    try {

      let categoryId = req.params.categoryId;
      let data = req.body;
      let categoryData = {};

      if (data.name !== undefined) {
        categoryData.name = data.name;
      }
      if (data.home_id !== undefined) {
        categoryData.home_id = data.home_id;
      }

      let query = {
        where: {
          id: categoryId
        }
      };

      categories.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "Category not found." });
        }

        User.update(categoryData, query).then(result => {
          if (result === null) {
            return res.status(201).send({ success: false, msg: "Couldn't update Category." });
          }

          return res.status(201).send({ success: true, data: result });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't update Category." });
    }
  },

  remove: (req, res) => {
    try {

      let categoryId = req.params.categoryId;

      let query = { 
        where: {
          id: categoryId
        },
      }

      categories.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "Category not found." });
        }

        User.destroy().then(success => {
          if (success === null) {
            return res.status(201).send({ success: false, msg: "Couldn't remove Category." });
          }

          return res.status(201).send({ success: true, msg: "Category removed successfully." });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't remove Category." });
    }
  },

}

module.exports = CategoryController;
