module.exports = (app) => {

    const users = require('../controllers/users.controller');

    app.get('/api/users', (req, res) => {
        res.send("not implemented :(")
    });


    // POST  /api/users  ->  create new user
    // POST  /api/users/login  ->  login

    // GET  /api/users  ->  get all users
    // GET  /api/users/:email  ->  get user by id

    // PUT  /api/users/:id  ->  update user

    // DELTE  /api/users/:id  ->  delete account

}