const joi = require('joi');
const pg = require('../utils/database');

module.exports = {
    'getUsers': async function (req, res) {

        //SQL Query
        let users = [];
        try {
            users = await pg.select('id', 'first_name', 'last_name', 'username', 'created_at').from('users')
        } catch (err) {
            console.log('Error: ', err)
            return res.status(500).json({
                statusCode: 500,
                error: {
                    message: 'Internal Server Error',
                },
                data: null
            });
        }

        console.log('Users: ', users)

        return res.status(200).json({
            statusCode: 200,
            error: null,
            data: users
        });
    },
    'getUser': async function (req, res) {

        const schema = joi.object({
            username: joi.string().token().required(),
        });

        try {
            const value = await schema.validateAsync(req.query, {
                abortEarly: false
            })
        } catch (err) {
            console.log('Error ::', err.details);

            err.details.forEach((v, k) => {
                delete v.type;
                delete v.context;
            })

            return res.status(400).json({
                statusCode: 400,
                error: {
                    message: 'BAD DATA',
                    details: err.details,
                },
            });
        }

        const username = req.params.username;

        let user = [];
        try {
            users = await pg.select('id', 'first_name', 'last_name', 'username', 'created_at')
                .from('users')
                .where({
                    username: username
                })
        } catch (err) {
            console.log('Error: ', err)
            return res.status(500).json({
                statusCode: 500,
                error: {
                    message: 'Internal Server Error',
                },
            });
        }

        return res.status(200).json({
            statusCode: 200,
            data: users[0] || null
        })
    },
    'postUsers': async function (req, res) {

        const schema = joi.object({
            users: joi.array().items(
                joi.object({
                    username: joi.string().token().required(),
                    first_name: joi.string(),
                    last_name: joi.string(),
                    email: joi.string().email().required(),
                })
            )
        })

        try {
            const value = await schema.validateAsync(req.body, {
                abortEarly: false
            })
        } catch (err) {
            console.log('Error ::', err.details);

            err.details.forEach((v, k) => {
                delete v.type;
                delete v.context;
            })

            return res.status(400).json({
                statusCode: 400,
                error: {
                    message: 'BAD DATA',
                    details: err.details,
                },
            });
        }

        let users = [];

        try {
            users = await pg('users')
                .insert(req.body.users)
                .returning([
                    'id', 'email',
                    'first_name', 'last_name', 'username',
                    'created_at'
                ])

        } catch (err) {
            console.log('Error: ', err)
            return res.status(500).json({
                statusCode: 500,
                error: {
                    message: 'Internal Server Error'
                },
            });
        }

        console.log('REQ.BODY :: ', req.body)

        return res.status(201).json({
            data: users
        })

    },
    'deleteUsers': async function (req, res) {
        const usernames = req.params.usernames;
    
        // Schéma de validation
        const schema = joi.object({
            usernames: joi.array().items(
                joi.string().token()
            )
        })
    
        let user
        try {
            user = await pg('users')
                .whereIn('username', req.body.usernames)
                .update({
                    deleted_at: new Date(),
                })
        } catch (err) {
            console.log('Error :', err.details);
    
            err.details.forEach((v, k) => {
                delete v.type;
                delete v.context;
            })
    
            return res.status(400).json({
                statusCode: 400,
                error: {
                    message: "Bad Request",
                    details: err.details
                }
            });
        }
    
        let users = [];
        try {
            users = await pg('users')
                .whereIn('username', req.body.usernames)
                .update({
                    deleted_at: new Date(),
                })
        } catch (error) {
            console.log('Error :', error)
            return res.status(500).json({
                statusCode: 500,
                error: {
                    message: "Internal Server Error",
                },
                data: null
            });
        }
    
        return res.status(200).json({
            statusCode: 200,
            data: null
        });
    }
}
