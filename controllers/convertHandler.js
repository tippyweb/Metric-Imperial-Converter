function ConvertHandler() {
  
  this.getNum = function(input) {
    const char = input.match(/[A-Za-z]/);
    let result;

    if (char.index == 0) {
      result = 1;
    } else {
      result = input.slice(0, char.index);
    }
   
    return result;
  };
  
  this.getUnit = function(input) {
    const char = input.match(/[A-Za-z]/);
    let result = input.slice(char.index);

    // convert initUnit to lower case
    result = result.toLowerCase();

    // for 'l', make it capitalized
    if (result == 'l') {
      result = 'L';
    }
   
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'gallons';
    };

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const LToGal = 0.264172;
    const lbsToKg = 0.453592;
    const kgToLbs = 2.204624;
    const miToKm = 1.60934;
    const kmToMi = 0.621373;
    let isInvalidNum = false;
    let isInvalidUnit = false;
    let returnNum;
    let returnUnit;
    let result;
    
    // check if initUnit is invalid
    if (!(/^\d+$/.test(initNum) ||
          /^(0|[1-9]\d*)(\.\d+)?$/.test(initNum)  ||
          /^(0|[1-9]\d*)(\.\d+)?\/(0|[1-9]\d*)(\.\d+)?$/.test(initNum)
    )) {
      isInvalidNum = true;

    } else {
      // initNum is a fractional input
      if (/^(0|[1-9]\d*)(\.\d+)?\/(0|[1-9]\d*)(\.\d+)?$/.test(initNum)) {
        const nums = initNum.split('/');
        initNum = nums[0] / nums[1];
      } else {
        initNum = Number(initNum);
      }
    }

    // check if initUnit is invalid
    if (!(initUnit == 'gal' || initUnit == 'L'  || initUnit == 'lbs' || 
          initUnit == 'kg'  || initUnit == 'km' || initUnit == 'mi'
    )) {
      isInvalidUnit = true;
    }

    // return invalid number/unit error
    if (isInvalidNum && isInvalidUnit) {
      return 'invalid number and unit';
    }
    
    if (isInvalidNum || isInvalidUnit) {
      if (isInvalidNum) {
        return 'invalid number';
      } else {
        return 'invalid unit';
      }
    }

    switch (initUnit) {
      case 'gal':
        returnNum = Number(initNum) * galToL;
        returnUnit = 'L';
        break;
      case 'L':
        returnNum = Number(initNum) * LToGal;
        returnUnit = 'gal';
        break;
      case 'lbs':
        returnNum = Number(initNum) * lbsToKg;
        returnUnit = 'kg';
        break;
      case 'kg':
        returnNum = Number(initNum) * kgToLbs;
        returnUnit = 'lbs';
        break;
      case 'mi':
        returnNum = Number(initNum) * miToKm;
        returnUnit = 'km';
        break;
      case 'km':
        returnNum = Number(initNum) * kmToMi;
        returnUnit = 'mi';
        break;
      default:
        returnUnit = 'invalid';
    };

    result = this.getString(initNum, initUnit, returnNum, returnUnit);
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initSpellOutUnit = this.spellOutUnit(initUnit);
    const returnSpellOutUnit = this.spellOutUnit(returnUnit);
    const result = {
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": Number(returnNum.toFixed(5)),
      "returnUnit": returnUnit,
      "string": `${initNum} ${initSpellOutUnit} converts to ${Number(returnNum.toFixed(5))} ${returnSpellOutUnit}`
    };
    return result;
  };
  
}

module.exports = ConvertHandler;
