/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);
let id = '5e7c5983de54a5076a8771c9';

// User story 10 - All 6 functional tests required are complete and passing.
suite('Functional Tests', () => {
  
  suite('Routing tests', () => {

    suite('POST /api/books with title => create book object/expect book object', () => {
      
      test('Test POST /api/books with title', done => {
        chai.request(server)
        .post('/api/books')
        .send({title: 'Michael'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'title');
          assert.equal(res.body.title, 'Michael');
          assert.property(res.body, '_id');
          done();
        });
      });
      
      test('Test POST /api/books with no title given', done => {
        chai.request(server)
        .post('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'No title given');
          done();
        });
      });
      
    });


    suite('GET /api/books => array of books', () => {
      
      test('Test GET /api/books', done => {
        chai.request(server)
        .get('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentCount', 'Books in array should contain commentCount');
          assert.property(res.body[0], 'title', 'Books in array should contain title');
          assert.property(res.body[0], 'id', 'Books in array should contain _id');
          done();
        });       
      });
      
    });

    suite('GET /api/books/[id] => book object with [id]', () => {
      
      test('Test GET /api/books/[id] with id not in db', done => {
        chai.request(server)
        .get('/api/books/kjgkjg6')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'No book found by this ID');
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db', done => {
        chai.request(server)
        .get('/api/books/' +id)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'comments');
          assert.isArray(res.body.comments);
          assert.property(res.body, 'title');
          assert.property(res.body, '_id');
          assert.equal(res.body._id, id);
          done();
        });
      });
    })


    suite('POST /api/books/[id] => add comment/expect book object with id', () => {
      
      test('Test POST /api/books/[id] with comment', done => {
        chai.request(server)
        .post('/api/books/' +id)
        .send({comment: 'New Test'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'comments');
          assert.isArray(res.body.comments);
          assert.equal(res.body.comments[13], 'New Test')
          assert.property(res.body, 'title');
          assert.property(res.body, '_id');
          assert.equal(res.body._id, id);
          done();
        });
      });
      
    });

  });

});
