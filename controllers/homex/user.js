/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const { users } = require('../../models/homex');
const { homes } = require('../../models/homex');
const UtilHelper = require('../../helpers/utils');
const bcrypt = require('bcrypt');

// Define the relations of Model
const modelRelations = {
  homes: {
    model: homes
  },
  homes_shared: 'homes_shared'
}

const UserController = {

  getAll: (req, res) => {
    try {
      let query = { 
        include: UtilHelper.getRelations(req, modelRelations)
      }

      users.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the users." });
    }
  },

  getById: (req, res) => {
    try {
      let query = { 
        where: {
          id: req.params.userId
        },
        include: UtilHelper.getRelations(req, modelRelations)
      }

      users.findOne(query).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "User not found." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the users." });
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

      users.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the users." });
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

      users.findAll(query).then(result => {
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't get the users." });
    }
  },

  create: async (req, res) => {
    try {

      let data = req.body;

      let  requiredFields = [
        "fullName", "email", "password"
      ];

      let validationFailed = UtilHelper.checkValidation(requiredFields, data);

      if (validationFailed.length > 0) {
        return res.status(201).send({ success: false, msg: "Validation failed. The fileds are required (" + validationFailed.join(', ') + ")" });
      }
      
      let userExists = await users.findOne({ where: { email: data.email }});
      
      if (userExists !== null) {
        return res.status(201).send({ success: false, msg: "User already exists" });
      }

      let userData = {
        fullName: data.fullName,
        email: data.email,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10), null)
      };

      users.create(userData).then(result => {
        if (result === null) {
          return res.status(201).send({ success: false, msg: "Couldn't create User." });
        }
        return res.status(201).send({ success: true, data: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't create User." });
    }
  },

  update: (req, res) => {
    try {

      let userId = req.params.userId;
      let data = req.body;
      let userData = {};

      if (data.fullName !== undefined) {
        userData.fullName = data.fullName;
      }
      if (data.email !== undefined) {
        userData.email = data.email;
      }
      if (data.password !== undefined) {
        userData.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10), null);
      }

      let query = {
        where: {
          id: userId
        }
      };

      users.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "User not found." });
        }

        User.update(userData, query).then(result => {
          if (result === null) {
            return res.status(201).send({ success: false, msg: "Couldn't update User." });
          }

          return res.status(201).send({ success: true, data: result });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't update User." });
    }
  },

  remove: (req, res) => {
    try {

      let userId = req.params.userId;

      let query = { 
        where: {
          id: userId
        },
      }

      users.findOne(query).then(User => {
        if (User === null) {
          return res.status(201).send({ success: false, msg: "User not found." });
        }

        User.destroy().then(success => {
          if (success === null) {
            return res.status(201).send({ success: false, msg: "Couldn't remove User." });
          }

          return res.status(201).send({ success: true, msg: "User removed successfully." });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Couldn't remove User." });
    }
  },
  
  signIn: async (req, res) => {
    try {
      let data = req.body;

      let query = {
        where: {
          email: data.email
        },
        include: UtilHelper.getRelations(req, modelRelations)
      };

      users.findOne(query).then((user) => {
        if (user == null) {
          return res.json({ success: false, msg: "Authentication failed. User not found." });
        }

        bcrypt.compare(data.password, user.password).then(async (isMatch) => {
          if (!isMatch) {
            return res.status(201).send({ success: false, msg: 'Authentication failed, wrong email or password.' });
          }

          return res.status(201).send({ success: true, data: user });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, msg: "Authenticate failed." });
    }
  },

}

module.exports = UserController;
