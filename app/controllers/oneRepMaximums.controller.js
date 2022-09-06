const db = require('../index');
const { v4: uuid } = require('uuid');

exports.createNewOrm = (req, res) => {
    var { user_id, exercise_id, max_weight, date } = req.body;

    if ((typeof user_id != 'string')
        || (typeof exercise_id != 'string')
        || (typeof max_weight != 'number')
        || (typeof date != 'string')) {
        res.status(400).send({
            message: "You are missing required data",
            body: req.body
        })
        return;
    }

    const id = uuid();

    const script = `
        INSERT INTO max_lifts.one_rep_maximums
            (id, user_id, exercise_id, max_weight, date)
        VALUES
            (?, ?, ?, ?, ?);
    `

    let pValues = [id, user_id, exercise_id, max_weight, date]

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem saving your ORM',
                err
            })
            return;
        } else {
            res.send({
                message: 'Your one rep max was saved in the database',
                id
            })
            return;
        }
    })
}

exports.getAllOrms = (req, res) => {

    const { user_id } = req.body;

    // const script = `
    //     SELECT * FROM max_lifts.one_rep_maximums
    //     WHERE (user_id = ?);
    // `
    const script = `
        SELECT 
            max_lifts.exersises.name AS name, 
            max_lifts.one_rep_maximums.max_weight AS max_weight,
            max_lifts.one_rep_maximums.date AS date
        FROM max_lifts.exersises
        WHERE (user_id = ?)
        CENTER JOIN max_lifts.one_rep_maximums
        ON max_lifts.exersises.id = max_lifts.one_rep_maximums.exercise_id
        ORDER BY max_lifts.one_rep_maximums.date DESC;
    `

    db.query(script, [user_id], (err, results) => {
        if (results.length == 0) {
            res.status(404).send(
                'There are no saved lifts'
            )
            return;
        } else if (err) {
            res.status(500).send({
                message: 'There was an error getting the on rep maximums',
                err
            })
            return;
        } else {
            res.send({
                results
            })
            return;
        }
    })
}

// how is this different from get all Orms? are we saving all rep maxes?
// we don't have a spot for # of reps in the database
exports.getFullHistory = (req, res) => {
    res.send("not implimented yet")
}


exports.getAllPrs = (req, res) => {

    const { user_id } = req.body;

    let script = `
        SELECT 
            max_lifts.exersises.name AS name, 
            MAX(max_lifts.one_rep_maximums.max_weight) AS max_weight
        FROM max_lifts.exersises
        WHERE (user_id = ?)
        CENTER JOIN max_lifts.one_rep_maximums
        ON max_lifts.exersises.id = max_lifts.one_rep_maximums.exercise_id
        ORDER BY max_lifts.one_rep_maximums.date DESC;
    `

    db.query(script, [user_id], (err, results) => {
        if (err) {
            res.status(500).send({
                message: "There was an error getting your PRs"
            })
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "No PRs found for this user",
                user_id
            })
            return;
        } else {
            res.send(results)
            return;
        }
    })
}


// GROUP BY excercise? Does this satisfy?
exports.getRecentForExercise = (req, res) => {
    let { user_id } = req.body;

    let script = `
        SELECT 
            max_lifts.exersises.name AS name, 
            max_lifts.one_rep_maximums.max_weight AS max_weight,
            MAX(max_lifts.one_rep_maximums.date)
        FROM max_lifts.exersises
        WHERE (user_id = ?)
        CENTER JOIN max_lifts.one_rep_maximums
        ON max_lifts.exersises.id = max_lifts.one_rep_maximums.exercise_id
        GROUP BY name
        ORDER BY date DESC;
    `

    db.query(script, [user_id], (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error getting your recent one rep maximums',
                err
            })
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No recent one rep maximums found for this user',
                user_id
            })
        } else {
            res.send(results)
        }
        return;
    })
}

exports.getExerciseHistory = (req, res) => {
    let { user_id } = req.body;

    let script = `
        SELECT 
            max_lifts.exersises.name AS name, 
            max_lifts.one_rep_maximums.max_weight AS max_weight,
            max_lifts.one_rep_maximums.date AS date
        FROM max_lifts.exersises
        WHERE (user_id = ?)
        CENTER JOIN max_lifts.one_rep_maximums
        ON max_lifts.exersises.id = max_lifts.one_rep_maximums.exercise_id
        ORDER BY date DESC;
    `

    db.query(script, [user_id], (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error getting your recent one rep maximums',
                err
            })
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No recent one rep maximums found for this user',
                user_id
            })
        } else {
            res.send(results)
        }
        return;
    })
}

// not sure if i did this right
exports.updateOrm = (req, res) => {
    var { id, user_id, exercise_id, max_weight, date } = req.body;


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
                message: 'No exersises to update found',
                user_id
            })
            return;
        } else {
            res.send(results)
            return;
        }
    })
}

exports.deleteOrm = (req, res) => {
    let { user_id, id } = req.body;

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
                message: 'No exersises to delete found',
                user_id
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