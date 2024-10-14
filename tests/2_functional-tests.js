const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test('1. Convert a valid input such as 10L: GET request to /api/convert', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=10L')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isTrue(/10 liters converts to 2.64172 gallons/.test(res.text), true);
            done();
        });
    });

    test('2. Convert an invalid input such as 32g: GET request to /api/convert', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=32g')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isTrue(/invalid unit/.test(res.text), true);
            done();
        });
    });

    test('3. Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kg')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isTrue(/invalid number/.test(res.text), true);
            done();
        });
    });

    test('4. Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kilomegagram')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isTrue(/invalid number and unit/.test(res.text), true);
            done();
        });
    });

    test('5. Convert with no number such as kg: GET request to /api/convert', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=kg')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isTrue(/1 kilograms converts to 2.20462 pounds/.test(res.text), true);
            done();
        });
    });

});
