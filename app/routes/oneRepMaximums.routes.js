module.exports = (app) => {

    const orms = require('../controllers/oneRepMaximums.controller');

    app.get('/api/orms', (req, res) => {
        res.send("not implemented :(")
    });

    app.post('/api/orms', orms.createNewOrm);

    // GET  /api/orms  ->  get all orms
    app.post('/api/orms', orms.getAllOrms);

    // GET  /api/orms/user/:userId  ->  get full history
    app.post('/api/orms/user/:userId', orms.getFullHistory);

    // GET  /api/orms/user/:userId/recent  ->  get all prs to date
    app.post('/api/orms', orms.getAllPrs);

    // GET  /api/orms/user/:userId/recent/:exerciseId  ->  get most recent for just one exercise
    app.post('/api/orms/user/:userId/recent/:exerciseId', orms.getRecentForExercise);

    // GET  /api/orms/user/:userId/exercise/:exerciseId  ->  get exercise history
    app.post('/api/orms/user/:userId/exercise/:exerciseId', orms.getExerciseHistory);

    // PUT  /api/orms/:id  ->  update orm
    app.post('/api/orms/:id', orms.updateOrm);

    // DELETE  /api/orms/:id  ->  delete orm
    app.post('/api/orms/:id', orms.deleteOrm);

}