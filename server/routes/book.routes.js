const BookController = require('../controllers/book.controller');
const { authenticate,authorize } = require('../config/jwt.config');
module.exports = function(app){
    app.post('/api/books',authenticate,authorize,BookController.createBook);
    app.get('/api/book/:id',authenticate,authorize,BookController.findBook);
    app.get('/api/book',authenticate,BookController.getBooks);
    app.get('/api/booksbyAuthor/:id',authenticate,authorize, BookController.getBooksforAuthor);
    app.put('/api/book/:id',authenticate,BookController.update);
    app.delete('/api/book/:id',authenticate,authorize,BookController.delete);
    app.get('/api/borrowedBooks/:id',authenticate,authorize, BookController.getUserBorrowedBooks);
    app.get('/api/HeldBooks/:id',authenticate,authorize, BookController.getUserHeldBooks);
    }