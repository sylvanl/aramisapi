# Documentation aramisapi
Welcome to my data project API allowing you to manage data relating to the enhanced customer experience created by team 2.

## Table of contents
* [General information](#General)
* [Routes](#Routes)
* [Api versions](#Versions)

## General
Default route : 3001

## Routes
---

### Estimations
The `estimations` route allows you to retrieve car estimations from Aramaisauto.
It allows to choose the `columns` and/or the `id` to `GET`.

The query parameters are as follows:
```json
{
	"columns": ["list", "of columns to be requested"],
	"id": "an id from estimations table",
}
```


#### All columns
To `GET` all `columns`, all you need is the columns parameter to contain `"all"`.

##### Example
```json
{
	"columns": ["all"],
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
    "id": "8827430",
}
```

```json
{
	"columns": ["id", "vehicule_marque", "vehicule_modele", "estimation_prix_achat"],
    "id": "8827430",
}
```

## Versions
--- Comming Soon ---