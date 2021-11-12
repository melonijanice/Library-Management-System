const UserController = require('../controllers/user.controllers');
const { authenticate,authorize } = require('../config/jwt.config');
module.exports = function(app){
    app.post('/api/users',UserController.createUser);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.get('/api/users',authenticate,authorize,UserController.getAll);
    app.get('/api/users/:id',authenticate,authorize,UserController.getOne);
    app.put('/api/users/:id',authenticate,authorize,UserController.update);
    app.put('/api/users/:id/GenerateCard',authenticate,authorize,UserController.generateLibraryCard);
    app.put('/api/users/:id/RejectUser',authenticate,authorize,UserController.RejectUser);
    app.delete('/api/users/:id',authenticate,authorize,UserController.deleteUser);
}