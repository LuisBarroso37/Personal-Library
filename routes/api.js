/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

let Library = require('../models/library.model');
const mongoose = require('mongoose');

module.exports = app => {
  
  app.route('/api/books')
  // User story 4 - I can get /api/books to retrieve an array of all books containing title, _id, & commentcount
    .get((req, res) => {
      Library.find()
      .then(books => {
        res.send(books.map(book => {
          return { id: book._id, title: book.title, commentCount: book.comments.length };
        }))  
      })
      .catch(err => {
        res.status(400).json('Error: ' + err);
      });
    })
    
  // User story 3 - I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id
    .post(async (req, res) => {
      const title = req.body.title;
    
      if(!title) {
        return res.send('No title given');
      }
    
      try {
        let library = await Library.findOne({title});
        
        if (library) {
          res.send('Book already exists');
        } else {
          let library = new Library({
            title
          });
          
          await library.save();
          let _id = library._id;
          
          res.send({title, _id});
        }
      } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
      }
    })
    
  // User story 9 - I can send a delete request to /api/books to delete all books in the database. 
  // Returned will be 'complete delete successful' if successful.
    .delete((req, res) => {
      Library.deleteMany({})
      .then(result => {
        res.send('Complete delete successful');
      })
      .catch(err => {
        res.status(400).json('Error: ' + err);
      })
    });

  app.route('/api/books/:id')
  
  // User story 5 - I can get /api/books/{_id} to retrieve a single object of a book containing 
  // title, _id, & an array of comments (empty array if no comments present).
    .get((req, res) => {
      let bookid = req.params.id;
    
      Library.findById({_id: bookid})
      .then(doc => {
        res.send(doc);
      })
      .catch(err => { // User story 8 - If I try to request a book that doesn't exist I will get a 'no book exists' message.
        res.send('No book found by this ID');
      })
    })
    
  // User story 6 - I can post a comment to /api/books/{_id} to add a comment to a book 
  // and returned will be the books object similar to get /api/books/{_id}.
    .post((req, res) => {
      let bookid = req.params.id;
      let comments = req.body.comment;
    
        Library.findOneAndUpdate({_id: bookid}, {$push: {comments}}, {new: true, useFindAndModify: false})
        .then(doc => {
          res.send(doc);
        })
        .catch(err => {
          console.error(err);
          res.send('No book found by this ID');
        })
    })
    
  // User story 7 - I can delete /api/books/{_id} to delete a book from the collection. 
  // Returned will be 'delete successful' if successful.
    .delete((req, res) => {
      let bookid = req.params.id;
    
      Library.findOneAndRemove({_id: bookid})
      .then(doc => {
        res.send('Delete Successful');
      })
      .catch(err => {
        res.status(400).json('Error: ' + err);
      })
    });
  
};
