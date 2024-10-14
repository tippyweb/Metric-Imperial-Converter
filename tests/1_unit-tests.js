const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    test('1. convertHandler should correctly read a whole number input', function () {
        assert.equal(convertHandler.convert('3', 'kg').returnNum, 6.61387);
    });

    test('2. convertHandler should correctly read a decimal number input', function () {
        assert.equal(convertHandler.convert('40.375', 'lbs').returnNum, 18.31378);
    });

    test('3. convertHandler should correctly read a fractional input', function () {
        assert.equal(convertHandler.convert('75/20', 'mi').returnNum, 6.03503);
    });

    test('4. convertHandler should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.convert('3.2/5', 'km').returnNum, 0.39768);
    });

    test('5. convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
        assert.equal(convertHandler.convert('3/2/3', 'lbs'), 'invalid number');
    });

    test('6. convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.equal(convertHandler.getNum('L'), 1);
    });

    test('7. convertHandler should correctly read each valid input unit', function () {
        assert.equal(convertHandler.getUnit('4.5lbs'), 'lbs');
    });

    test('8. convertHandler should correctly return an error for an invalid input unit', function () {
        assert.equal(convertHandler.convert('30', 'feet'), 'invalid unit');
    });

    test('9. convertHandler should return the correct return unit for each valid input unit', function () {
        assert.equal(convertHandler.convert('5.5', 'mi').returnUnit, 'km');
    });

    test('10. convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.isTrue(/gallons/.test(convertHandler.convert('9', 'gal').string), true);
    });

    test('11. convertHandler should correctly convert gal to L', function () {
        assert.equal(convertHandler.convert('88', 'gal').returnUnit, 'L');
    });

    test('12. convertHandler should correctly convert L to gal', function () {
        assert.equal(convertHandler.convert('4/5', 'L').returnUnit, 'gal');
    });

    test('13. convertHandler should correctly convert mi to km', function () {
        assert.equal(convertHandler.convert('2.1', 'mi').returnUnit, 'km');
    });

    test('14. convertHandler should correctly convert km to mi', function () {
        assert.equal(convertHandler.convert('90', 'km').returnUnit, 'mi');
    });

    test('15. convertHandler should correctly convert lbs to kg', function () {
        assert.equal(convertHandler.convert('14.5', 'lbs').returnUnit, 'kg');
    });

    test('16. convertHandler should correctly convert kg to lbs', function () {
        assert.equal(convertHandler.convert('3.2', 'kg').returnUnit, 'lbs');
    });

});