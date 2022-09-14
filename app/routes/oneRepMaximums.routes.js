module.exports = (app) => {

    const orms = require('../controllers/oneRepMaximums.controller');

    app.post('/api/orms', orms.createNewOrm);
    app.get('/api/orms/user/:userId', orms.getUsersFullHistory);
    app.get('/api/orms/user/:userId/recent', orms.getAllPrs);
    app.get('/api/orms/user/:userId/recent/:exerciseId', orms.getPrForOneExercise);
    app.get('/api/orms/user/:userId/exercise/:exerciseId', orms.getExerciseHistory);

    app.put('/api/orms/', orms.updateOrm);

    app.delete('/api/orms/:id', orms.deleteOrm);

}