# Documentation aramisapi
Welcome to my data project API allowing you to manage data relating to the enhanced customer experience created by the Survey Corps team (War chant this way -> https://www.youtube.com/watch?v=BhipGqSZEB0).

## Table of contents
* [General information](#General)
* [Routes](#Routes)
* [Api versions](#Versions)
* [Installation](#Installation)
* [Settings](#Settings)
* [Run](#Run)

## General
Default port : 3000

## Routes

### Expertises
The `expertises` route found on `/expertises` allows you to retrieve car expertises from Aramaisauto.
It allows to choose the `columns` and/or the `id` to `GET`.

The query parameters are as follows:
```json
{
    "columns": ["list", "of columns to be requested"],
    "id": "an id from expertises table",
}
```
Where `columns` are required and `id` is optional.


#### All columns
To `GET` all `columns`, all you need is the columns parameter to contain `"all"`.

##### Example
```json
{
    "columns": ["all"]
}
```

#### Specific columns
To `GET` specific `columns`,  you can choose specific columns with the `columns` parameter.
You can choose as many columns in `columns` as needed.

##### List of possible columns
```
"id",
"vehicule_marque",
"vehicule_modele",
"vehicule_energie",
"vehicule_date_mec",
"vehicule_km",
"vehicule_finition",
"vehicule_transmission",
"vehicule_motorisation",
"estimation_date",
"estimation_status",
"estimation_prix_achat",
"estimation_prix_vente",
"estimation_reprise_type_estimation",
"estimation_top",
"expertise_top",
"expertise_prix_vente_coteur_ttc",
"expertise_prix_remise_coteur_ttc",
"expertise_canal_vente",
"expertise_frevo_ttc",
"frais_correction_carrosserie",
"frais_mecaniques_corriges",
"frais_pneumatiques",
"reprise_top",
"trc_cervo_carro",
"trc_cervo_elt_amovibles",
"trc_cervo_ht_meca",
"trc_cervo_trains_roulants",
"trc_cervo_reconditionnement_ht",
```

##### Example
```json
{
    "columns": ["id", "vehicule_marque", "vehicule_modele", "estimation_prix_achat"],
}
```

#### Specific estimation by id
To `GET` a specific `id`, you need to do is to add the `id` parameter with the estimation id you want to `GET`.

##### Examples
```json
{
    "columns": ["all"],
    "id": "8827430"
}
```

```json
{
    "columns": ["id", "vehicule_marque", "vehicule_modele", "estimation_prix_achat"],
    "id": "8827430"
}
```

### Estimations
The `estimations` route found on `/estimations` allows you to retrieve car estimations from Aramaisauto.
It allows to choose the `columns` and/or the `id` to `GET`.

The query parameters are as follows:
```json
{
    "columns": ["list", "of columns to be requested"],
    "id": "an id from estimations table",
}
```
Where `columns` are required and `id` is optional.


#### All columns
To `GET` all `columns`, all you need is the columns parameter to contain `"all"`.

##### Example
```json
{
    "columns": ["all"]
}
```

#### Specific columns
To `GET` specific `columns`,  you can choose specific columns with the `columns` parameter.
You can choose as many columns in `columns` as needed.

##### List of possible columns
```
"id",
"vehicule_marque",
"vehicule_modele",
"vehicule_energie",
"vehicule_date_mec",
"vehicule_km",
"vehicule_finition",
"vehicule_transmission",
"vehicule_motorisation",
"estimation_date",
"estimation_status",
"estimation_prix_achat",
"estimation_prix_vente",
"estimation_reprise_type_estimation",
// ↓ Following columns are available but null ↓
"estimation_top",
"expertise_top",
"expertise_prix_vente_coteur_ttc",
"expertise_prix_remise_coteur_ttc",
"expertise_canal_vente",
"expertise_frevo_ttc",
"frais_correction_carrosserie",
"frais_mecaniques_corriges",
"frais_pneumatiques",
"reprise_top",
"trc_cervo_carro",
"trc_cervo_elt_amovibles",
"trc_cervo_ht_meca",
"trc_cervo_trains_roulants",
"trc_cervo_reconditionnement_ht",
```

##### Example
```json
{
    "columns": ["id", "vehicule_marque", "vehicule_modele", "estimation_prix_achat"],
}
```

#### Specific estimation by id
To `GET` a specific `id`, you need to do is to add the `id` parameter with the estimation id you want to `GET`.

##### Examples
```json
{
    "columns": ["all"],
    "id": "8827430"
}
```

```json
{
    "columns": ["id", "vehicule_marque", "vehicule_modele", "estimation_prix_achat"],
    "id": "8827430"
}
```

## Versions
--- Coming Soon ---

## Installation
This part of the documentation is for installing the api on your local machine.

### Prerequisits
Node v14.16.0 (other versions may also work but have not been tested).

### Install modules

#### Node
Install [node](https://nodejs.org/en/) modules.
```
npm install
```

#### Express
Install [express](https://expressjs.com/fr/) node framework.
```
npm i express
```

#### Knex
Install [knex](http://knexjs.org/) SQL query builder.
```
npm i knex
```

#### Joi
Install [joi](https://joi.dev/api/?v=17.4.0) data schema validation used here to validate query.
```
npm i joi
```

#### Dotenv
Install [dotenv](https://www.npmjs.com/package/dotenv) to store envoronment variables in .env.
```
npm i dotenv
```

#### Express basic auth
Install [express basic auth](https://www.npmjs.com/package/express-basic-auth) to provide basic athentification.
```
npm i express-basic-auth
```

### Settings

#### .env
Create and complete `.env` file in same folder as `.env.example` example file.
```
DATABASE_URL=databaseConnectionLink
PORT=chosenPort
```

#### api-users
Create and complete `api-users.js` file in same folder as `api-users-example.js`.
```javascript
module.exports = {
    users : { 
        username1 : "password2",
        username2 : "password2",
    }
}
```

### Run
```
npm start
```