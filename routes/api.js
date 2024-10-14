'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const number = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);

    const result = convertHandler.convert(number, unit);

/*
console.log("Input:  " + input);
console.log("Number: " + number);
console.log("Unit:   " + unit);
console.log("Result: " + JSON.stringify(result));
*/

    res.json(result);

  });

};
