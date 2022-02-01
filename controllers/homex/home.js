/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const { homes, users, shared_homes } = require('../../models/homex');
const UtilHelper = require('../../helpers/utils');

// Define the relations of Model
const modelRelations = {
  shared_users: 'shared_users'
}

const HomeController = {

  getAll: (req, res) => {
    try {
      let query = { 
        include: UtilHelper.getRelations(req, modelRelations)
      }

      homes.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Homes." });
    }
  },

  getById: (req, res) => {
    try {
      let query = { 
        where: {
          id: req.params.homeId
        },
        include: UtilHelper.getRelations(req, modelRelations)
      }

      homes.findOne(query).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Home not found." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Homes." });
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

      homes.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Homes." });
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

      homes.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the Homes." });
    }
  },

  create: async (req, res) => {
    try {

      let data = req.body;

      let  requiredFields = [
        "name", "user_id"
      ];

      let validationFailed = UtilHelper.checkValidation(requiredFields, data);

      if (validationFailed.length > 0) {
        return res.status(201).send({ success: false, msg: "Validation failed. The fileds are required (" + validationFailed.join(', ') + ")" });
      }

      let homeData = {
        name: data.name,
        descr: data.descr || null,
        user_id: data.user_id
      };

      homes.create(homeData).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Couldn't create Home." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't create Home." });
    }
  },

  update: (req, res) => {
    try {

      let homeId = req.params.homeId;
      let data = req.body;
      let homeData = {};

      if (data.name !== undefined) {
        homeData.name = data.name;
      }
      if (data.descr !== undefined) {
        homeData.descr = data.descr;
      }
      if (data.user_id !== undefined) {
        homeData.user_id = data.user_id;
      }

      let query = {
        where: {
          id: homeId
        }
      };

      homes.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "Home not found." });
        }

        User.update(homeData, query).then(result => {
          if (result === null) {
            return res.status(201).send({ success: false, msg: "Couldn't update Home." });
          }

          return res.status(201).send({ success: true, data: result });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't update Home." });
    }
  },

  remove: (req, res) => {
    try {

      let homeId = req.params.homeId;

      let query = { 
        where: {
          id: homeId
        },
      }

      homes.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "Home not found." });
        }

        User.destroy().then(success => {
          if (success === null) {
            return res.status(201).send({ success: false, msg: "Couldn't remove Home." });
          }

          return res.status(201).send({ success: true, msg: "Home removed successfully." });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't remove Home." });
    }
  },
  
  share: async (req, res) => {
    try {

      let homeId = req.params.homeId;
      let data = req.body;
      
      if (data.email === undefined) {
        return res.status(201).send({ success: false, msg: "Email is required." });
      }
      
      let queryUser = {
        where: {
          email: data.email
        }
      }
      
      let shareUser = await users.findOne(queryUser);
      if (shareUser === null) {
        return res.status(201).send({ success: false, msg: "User not found." });
      }

      let shareData = {
        home_id: homeId,
        user_id: shareUser.id,
      };

      let query = {
        where: shareData
      };
      
      var result = await shared_homes.findOne(query);
      if (result === null) {
        result = shared_homes.create(shareData);        
      }

      if (result === null) {
        return res.status(201).send({ success: false, msg: "Couldn't create the shared Home." });
      }
      
      return res.status(201).send({ success: true, data: result });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't create the shared Home." });
    }
  },

}

module.exports = HomeController;
