// Imports
const joi = require('joi');
const pg = require('../utils/database');
const estimation_columns = require('../utils/data').estimation_columns;

// Expertises route
module.exports = {
    'getExpertises': async function (req, res) {

        const schema = joi.object({
            columns: joi.array().items(
                joi.string().valid("all", ...estimation_columns).required()
            ).required(),
            id: joi.string().token(),
        });

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

        const columns = req.body.columns;
        const id = req.body.id;
        let expertises = [];
        console.log(id)

        try {
            if (id !== undefined) {
                if (columns.includes("all")) {
                    console.log("All data")
                    expertises = await pg.select(...estimation_columns)
                        .from('estimations_avec_expertise')
                        .where({
                            id: id
                        })
                } else {
                    console.log("Some data")
                    expertises = await pg.select(...columns)
                        .from('estimations_avec_expertise')
                        .where({
                            id: id
                        })
                }
            } else {
                if (columns.includes("all")) {
                    console.log("All data")
                    expertises = await pg.select(...estimation_columns)
                        .from('estimations_avec_expertise')
                } else {
                    console.log("Some data")
                    expertises = await pg.select(...columns)
                        .from('estimations_avec_expertise')
                }
            }
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

        console.log('Expertises: ', expertises)

        return res.status(200).json({
            statusCode: 200,
            error: null,
            data: expertises
        });
    },
}