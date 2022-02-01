/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const { units_measurements } = require('../../models/homex');
const { items } = require('../../models/homex');
const UtilHelper = require('../../helpers/utils');

// Define the relations of Model
const modelRelations = {
  items: {
    model: items
  }
}

const UnitMeasurementController = {

  getAll: (req, res) => {
    try {
      let query = { 
        include: UtilHelper.getRelations(req, modelRelations)
      }

      units_measurements.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the units measurements." });
    }
  },

  getById: (req, res) => {
    try {
      let query = { 
        where: {
          id: req.params.unitMeasurementId
        },
        include: UtilHelper.getRelations(req, modelRelations)
      }

      units_measurements.findOne(query).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Unit Measurement not found." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the units measurements." });
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

      units_measurements.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the units measurements." });
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

      units_measurements.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the units measurements." });
    }
  },

  create: async (req, res) => {
    try {

      let data = req.body;

      let  requiredFields = [
        "name"
      ];

      let validationFailed = UtilHelper.checkValidation(requiredFields, data);

      if (validationFailed.length > 0) {
        return res.status(201).send({ success: false, msg: "Validation failed. The fileds are required (" + validationFailed.join(', ') + ")" });
      }

      let categoryData = {
        name: data.name,
        home_id: data.home_id
      };

      units_measurements.create(categoryData).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Couldn't create the Unit Measurement." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't create the Unit Measurement." });
    }
  },

  update: (req, res) => {
    try {

      let unitMeasurementId = req.params.unitMeasurementId;
      let data = req.body;
      let categoryData = {};

      if (data.name !== undefined) {
        categoryData.name = data.name;
      }

      let query = {
        where: {
          id: unitMeasurementId
        }
      };

      units_measurements.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "Unit Measurement not found." });
        }

        User.update(categoryData, query).then(result => {
          if (result === null) {
            return res.status(201).send({ success: false, msg: "Couldn't update Unit Measurement." });
          }

          return res.status(201).send({ success: true, data: result });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't update Unit Measurement." });
    }
  },

  remove: (req, res) => {
    try {

      let unitMeasurementId = req.params.unitMeasurementId;

      let query = { 
        where: {
          id: unitMeasurementId
        },
      }

      units_measurements.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "Unit Measurement not found." });
        }

        User.destroy().then(success => {
          if (success === null) {
            return res.status(201).send({ success: false, msg: "Couldn't remove Unit Measurement." });
          }

          return res.status(201).send({ success: true, msg: "Unit Measurement removed successfully." });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't remove Unit Measurement." });
    }
  },

}

module.exports = UnitMeasurementController;
