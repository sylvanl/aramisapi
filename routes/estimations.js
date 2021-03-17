const joi = require('joi');
const pg = require('../utils/database');
const estimation_columns = require('../utils/data').estimation_columns;

module.exports = {
    'getEstimations': async function (req, res) {

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
        let estimations = [];

        try {
            if (id !== null) {
                if (columns.includes("all")) {
                    console.log("All data")
                    estimations = await pg.select(...estimation_columns)
                        .from('estimations')
                        .where({
                            id: id
                        })
                } else {
                    console.log("Some data")
                    estimations = await pg.select(...columns)
                        .from('estimations')
                        .where({
                            id: id
                        })
                }
            } else {
                if (columns.includes("all")) {
                    console.log("All data")
                    estimations = await pg.select(...estimation_columns)
                        .from('estimations')
                } else {
                    console.log("Some data")
                    estimations = await pg.select(...columns)
                        .from('estimations')
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

        console.log('Estimations: ', estimations)

        return res.status(200).json({
            statusCode: 200,
            error: null,
            data: estimations
        });
    },
}

// 'getEstimations': async function (req, res) {

//     //SQL Query
//     let estimations = [];
//     try {
//         estimations = await pg.select(...estimation_columns)
//         .from('estimations')
//     } catch (err) {
//         console.log('Error: ', err)
//         return res.status(500).json({
//             statusCode: 500,
//             error: {
//                 message: 'Internal Server Error',
//             },
//             data: null
//         });
//     }

//     console.log('Estimations: ', estimations)

//     return res.status(200).json({
//         statusCode: 200,
//         error: null,
//         data: estimations
//     });
// },
// 'getEstimation': async function (req, res) {

//     const schema = joi.object({
//         id: joi.string().token().required(),
//     });

//     try {
//         const value = await schema.validateAsync(req.params, {
//             abortEarly: false
//         })
//     } catch (err) {
//         console.log('Error ::', err.details);

//         err.details.forEach((v, k) => {
//             delete v.type;
//             delete v.context;
//         })

//         return res.status(400).json({
//             statusCode: 400,
//             error: {
//                 message: 'BAD DATA',
//                 details: err.details,
//             },
//         });
//     }

//     const id = req.params.id;

//     let estimations = [];
//     try {
//         estimations = await pg.select()
//             .from('estimations')
//             .where({
//                 id: id
//             })
//     } catch (err) {
//         console.log('Error: ', err)
//         return res.status(500).json({
//             statusCode: 500,
//             error: {
//                 message: 'Internal Server Error',
//             },
//         });
//     }

//     return res.status(200).json({
//         statusCode: 200,
//         data: estimations[0] || null
//     })
// },
// 'getEstimationsByColumns': async function (req, res) {

//     const schema = joi.object({
//         columns: joi.array().items(
//             joi.string().valid(...estimation_columns).required()
//         ).required(),
//     });

//    try {
//         const value = await schema.validateAsync(req.body, {
//             abortEarly: false
//         })
//     } catch (err) {
//         console.log('Error ::', err.details);

//         err.details.forEach((v, k) => {
//             delete v.type;
//             delete v.context;
//         })

//         return res.status(400).json({
//             statusCode: 400,
//             error: {
//                 message: 'BAD DATA',
//                 details: err.details,
//             },
//         });
//     }

//     let estimations = [];

//     let columns = [];
//     columns = req.body.columns;

//     try {
//         estimations = await pg.select(...columns)
//             .from('estimations')
//     } catch (err) {
//         console.log('Error: ', err)
//         return res.status(500).json({
//             statusCode: 500,
//             error: {
//                 message: 'Internal Server Error',
//             },
//             data: null
//         });
//     }

//     console.log('Estimations: ', estimations)

//     return res.status(200).json({
//         statusCode: 200,
//         error: null,
//         data: estimations
//     });
// },
