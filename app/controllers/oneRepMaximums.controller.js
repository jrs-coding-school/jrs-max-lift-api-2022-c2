const db = require('../index');
const { v4: uuid } = require('uuid');

exports.createNewOrm = (req, res) => {
    var { userId, exerciseId, max_weight, date } = req.body;


    if ((typeof userId !== 'string')
        || (typeof exerciseId !== 'string')
        || (typeof max_weight !== 'number')
        || (typeof date !== 'string')) {
        res.status(400).send({
            message: "You are missing required data",
            body: req.body
        })
        return;
    }

    // const id = uuid();

    const script = `
        INSERT INTO max_lifts.one_rep_maximums
            (user_id, exercise_id, max_weight, date)
        VALUES
            (?, ?, ?, ?);
    `

    let pValues = [userId, exerciseId, max_weight, date]

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem saving your ORM',
                err
            })
            return;
        } else {
            res.send({
                message: 'Your one rep max was saved in the database'
            })
            return;
        }
    })
}

exports.getUsersFullHistory = (req, res) => {

    const { userId } = req.params;
    console.log(userId)

    let script = `
        SELECT 
            one_rep_maximums.id, exercise_id, name, max_weight, date
        FROM exercises
        INNER JOIN one_rep_maximums
            ON exercises.id = one_rep_maximums.exercise_id
        WHERE (user_id = ?)
        ORDER BY one_rep_maximums.date DESC;
    `

    db.query(script, [userId], (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error getting the on rep maximums',
                err
            })
            return;
        } else if (results.length == 0) {
            res.status(404).send(
                'There are no saved lifts'
            )
            return;
        } else {
            res.send(results)
            return;
        }
    })
}


exports.getAllPrs = (req, res) => {

    const { userId } = req.params;
    console.log(userId)

    let script = `
        SELECT t1.id, t1.exercise_id, exercises.name, t1.max_weight, t1.date
        FROM one_rep_maximums as t1
        LEFT JOIN one_rep_maximums as t2
            ON t1.exercise_id = t2.exercise_id
            AND t1.max_weight < t2.max_weight
            AND t1.user_id = t2.user_id
        
        INNER JOIN exercises
            ON exercises.id = t1.exercise_id
        
        WHERE t1.user_id = ?
            AND t2.id IS  NULL
        
        ORDER BY t1.date DESC;
    `

    db.query(script, [userId], (err, results) => {
        if (err) {
            res.status(500).send({
                message: "There was an error getting your PRs"
            })
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "No PRs found for this user",
                userId
            })
            return;
        } else {
            res.send(results)
            return;
        }
    })
}


// GROUP BY excercise? Does this satisfy?
exports.getPrForOneExercise = (req, res) => {
    let { userId, exerciseId } = req.params;
    console.log("getting one pr", req.params)

    let script = `
        SELECT t1.id, t1.exercise_id, exercises.name, t1.max_weight, t1.date
        FROM one_rep_maximums as t1
        LEFT JOIN one_rep_maximums as t2
            ON t1.exercise_id = t2.exercise_id
            AND t1.max_weight < t2.max_weight
            AND t1.user_id = t2.user_id
        
        INNER JOIN exercises
            ON exercises.id = t1.exercise_id
        
        WHERE t1.user_id = ?
            AND t2.id IS  NULL
            AND t1.exercise_id = ?
        
        ORDER BY t1.date DESC;
    `

    db.query(script, [userId, exerciseId], (err, results) => {
        console.log(err, results)
        if (err) {
            res.status(500).send({
                message: 'There was an error getting your recent one rep maximums',
                err
            })
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No recent one rep maximums found for this user',
                userId
            })
        } else {
            res.send(results)
        }
        return;
    })
}

exports.getExerciseHistory = (req, res) => {
    let { userId, exerciseId } = req.params;

    let script = `
        SELECT 
            one_rep_maximums.id, exercise_id, name, max_weight, date
        FROM exercises
        INNER JOIN one_rep_maximums
            ON exercises.id = one_rep_maximums.exercise_id
        WHERE user_id = ?
            AND exercise_id = ?
        ORDER BY one_rep_maximums.date DESC;
    `

    let pValues = [userId, exerciseId];

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error getting your recent one rep maximums for this exercise',
                userId, exerciseId
            })
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No recent one rep maximums found for this user',
                userId
            })
        } else {
            res.send(results)
        }
        return;
    })
}

// not sure if i did this right
exports.updateOrm = (req, res) => {
    var { userId, max_weight, date } = req.body;
    var { id } = req.params;


    // This means you can change the max_weight and the date but not the excersize
    const script = `
        UPDATE max_lifts.one_rep_maximums
        SET (max_weight = ?, date = ?)
        WHERE id = ?
    `

    let pValues = [max_weight, date, id];

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error updating your maximums',
                err
            })
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No exercises to update found',
                userId
            })
            return;
        } else {
            res.send(results)
            return;
        }
    })
}

exports.deleteOrm = (req, res) => {
    let { id } = req.params;

    let script = `
        DELETE FROM max_lifts.one_rep_maximums
        WHERE (id = ?)
    `

    db.query(script, [id], (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error deleting your maximum',
                err
            })
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No exercises to delete found'
            })
            return;
        } else {
            res.send({
                message: "Excercise deleted successfully"
            })
            return;
        }
    })
}