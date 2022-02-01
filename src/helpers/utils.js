/* ========================================================================
 * Copyright (C) BluePex Controle & Segurança - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Bruno B. Stein <bruno.stein@bluepex.com>, 2021
 * ========================================================================
 */

const UtilsHelper = {

  getRelations: (req, modelRelations) => {
    let reqRelations = req.query.relations ? req.query.relations.split(',') : [];
    let relations = [];
  
    if (reqRelations.length > 0) {
      reqRelations.forEach(relation => {
        relationIndex = relation.trim();
        if (modelRelations[relationIndex]) {
          relations.push(modelRelations[relationIndex]);
        }
      });
    }

    return relations;
  },
  
  checkValidation: (requiredFields, data) => {
    let validationFailed = [];

    requiredFields.forEach(field => {
      if (!data[field]) {
        validationFailed.push(field);
      }
    });
    
    return validationFailed;
  }

}

module.exports = UtilsHelper;