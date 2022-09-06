const db = require('../index');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const saltRounds = 10;

exports.login = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400)
            .send({
                message: 'Could not login. username or password was missing.'
            });
        return;
    }

    const query = `
        SELECT * FROM users 
            WHERE username = ?;
    `;
    const placeholders = [username];

    db.query(query, placeholders, async (err, results) => {

        if (err) {
            // case #3
            res.status(500)
                .send({
                    message: "There was an error logging in. Please try again.",
                    error: err
                });
            return;
        } else if (results.length == 0) {
            // case #2
            res.status(404)
                .send({
                    message: "username or Password was incorrect."
                });
            return;
        } else {

            let encryptedPassword = results[0].password;
            const passwordMatched = await bcrypt.compare(password, encryptedPassword);

            if (passwordMatched) {
                // successful login

                let user = results[0];

                res.send({
                    message: "You have successfully logged in.",
                    user
                });
            } else {
                res.status(404)
                    .send({
                        message: 'username or password was incorrect'
                    });
            }
        }
    });

}

exports.createNewUser = async (req, res) => {

    let { username, password } = req.body;

    if (!username || !password) {
        // client error
        res.status(400)
            .send({
                message: "username or password was not defined."
            });
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
        INSERT INTO users
            (id, username, password)
            VALUES (?, ?, ?);
    `;
    const placeholders = [uuid(), username, encryptedPassword];

    db.query(query, placeholders, (err, results) => {
        if (err) {
            if (err.errno === 1062) {
                res.status(400)
                    .send({
                        error: err,
                        message: 'That username already exists.'
                    });
            } else {
                res.status(500)
                    .send({
                        error: err,
                        message: 'There was an error creating a new user.'
                    });
            }
        } else {
            // success
            this.login(req, res);
        }
    });
}

exports.getUserByUsername = (req, res) => {
    res.send("not implemented");
}

exports.updateUser = (req, res) => {
    res.send("not implemented");
}

exports.deleteAccount = (req, res) => {
    res.send("not implemented");
}