const AuthorController = require('../controllers/author.controller');
const { authenticate,authorize } = require('../config/jwt.config');
module.exports = function(app){
    app.post('/api/authors',authenticate,authorize,AuthorController.createAuthor);
    app.get('/api/authors',authenticate,authorize, AuthorController.getAuthors);
    app.get('/api/authors/:id',authenticate,authorize, AuthorController.getAuthor);
    app.put('/api/authors/:id',authenticate,authorize,AuthorController.update);
    app.delete('/api/authors/:id',authenticate,authorize,AuthorController.delete);
    }