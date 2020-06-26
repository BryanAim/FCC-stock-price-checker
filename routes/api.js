/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');

const StockHandler = require('../controllers/stockHandler');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  const stockHandler = new StockHandler();

  app.route('/api/stock-prices')
    .get(function (req, res){
      const db = req.app.locals.db //mongodb
      const collection = req.app.locals.collection; //mongodb collection
      let stock = req.query.stock;
      let likes = req.query.like || false;
      let ip = req.ip;
      let moreThanOne = Array.isArray(stock) || false;

      //if 2 stocks & like exists, retrieve array of 2 stocks data
      if (moreThanOne || likes) {
        let firstStock = stock[0].toUpperCase();
        let secondStock = stock[1].toUpperCase();
        stockHandler.stockData(firstStock, collection, likes, ip).then((data1, err)=> {
          if (typeof(data1)=== 'string') {
            res.send('Our standard API call frequency is 5 calls per minute and 500 calls per day.')
          } else {
            if (data1) {
              let stock1 = data1;
              stockHandler.stockData(secondStock, collection, likes, ip).then((data2, err)=>{

                if (typeof(data2)==='string') {
                  res.send('Our standard API call frequency is 5 calls per minute and 500 calls per day')
                } else {
                  if (data2) {
                    let stock2 = data2;
                    let stockData = [{
                      stock: stock1.stock,
                      price: stock1.price,
                      rel_likes: stockHandler.relLikes(stock1, stock2)
                    },
                  {
                    stock: stock2.stock,
                    price: stock2.price,
                    rel_likes: stockHandler.relLikes(stock2,stock1)
                  }
                ];
                res.json({stockData});
                  }
                }
              });
            }
          }
        });
      } else {
        stock = stock.toUpperCase();
        stockHandler.stockData(stock, collection, likes, ip).then((data)=> {
          if (typeof data=== 'string') {
            res.send('Our standard API call frequency is 5 calls per minute and 500 calls per day.')
          }
          res.json({stockData: data});
        }).catch(err => {
          console.log(err)
          
        });
      }
    });
    
};
