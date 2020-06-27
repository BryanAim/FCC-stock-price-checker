/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
          
          //complete this one too
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG', 'should retrieve stock name');
          assert.property(res.body.stockData, 'price', 'shoild have _id property');
          assert.property(res.body.stockData, 'likes', 'stock should have likes property');
          done();
        });
      });
      
      let likes;

      test('1 stock with like', function(done) {
        chai.request(server)
        .get('api/stock-prices')
        .query({stock: 'goog', likes: true})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.equal(res.body.stockData.likes, 1);
          assert.property(res.body.stockData, 'price');
          likes = res.body.stockData.likes;
          done()
        })
        
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('api/stock-prices')
        .query({stock: 'goog', likes: true})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.equal(res.stockData.likes, 'likes');
          assert.property(res.body.stockData, 'price');
          done();
        })
        
      });
      
      test('2 stocks', function(done) {
        
      });
      
      test('2 stocks with like', function(done) {
        
      });
      
    });

});
