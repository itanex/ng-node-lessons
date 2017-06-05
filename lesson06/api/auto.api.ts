import * as express from 'express';

let router = express.Router();

// Data
let autos: any[] = [
    {
        "id": 1,
        "make": "Subaru",
        "model": "CrossTrek",
        "year": 2014
    },
    {
        "id": 2,
        "make": "Subaru",
        "model": "Outback",
        "year": 2017
    },
    {
        "id": 3,
        "make": "Subaru",
        "model": "Forester",
        "year": 2008
    },
    {
        "id": 4,
        "make": "Subaru",
        "model": "Imprezza",
        "year": 2003
    },
    {
        "id": 5,
        "make": "Ford",
        "model": "F150",
        "year": 2012
    },
    {
        "id": 5,
        "make": "Ford",
        "model": "Festiva",
        "year": 2001
    },
    {
        "id": 6,
        "make": "Ford",
        "model": "Pinto",
        "year": 1982
    },
    {
        "id": 7,
        "make": "Ford",
        "model": "F10",
        "year": 2011
    },
    {
        "id": 8,
        "make": "Ford",
        "model": "Mustang",
        "year": 2014
    },
    {
        "id": 9,
        "make": "Chevrolet",
        "model": "Volt",
        "year": 2014
    },
    {
        "id": 10,
        "make": "Chevrolet",
        "model": "Blazer",
        "year": 2001
    },
    {
        "id": 11,
        "make": "Chevrolet",
        "model": "Suburban",
        "year": 2009
    },
    {
        "id": 12,
        "make": "Chevrolet",
        "model": "Leaf",
        "year": 2016
    },
    {
        "id": 13,
        "make": "Dodge",
        "model": "Charger",
        "year": 2018
    },
    {
        "id": 14,
        "make": "Dodge",
        "model": "Caravan",
        "year": 1998
    },
    {
        "id": 15,
        "make": "Dodge",
        "model": "Caravan",
        "year": 2018
    },
    {
        "id": 16,
        "make": "Dodge",
        "model": "Charger",
        "year": 1987
    }
];

/**
 * Read ALL resources (cRud)
 * 
 * Get all autos
 */
router.get('/', (request, response) => {
    return response.status(200).json(autos);
});

/**
 * Read Specific resource (cRud)
 * 
 * Get auto by ID
 */
router.get('/:id', (request, response) => {
    // Need to validate input for security
    // Validation of data from user prevents SQL Injection Attacks
    let id = request.params.id;

    let record = autos.filter((item): boolean => {
        return item.id == id;
    })[0];

    if(record) {
        return response.status(200)
            .json(record)
            .end();
    }

    return response.status(404)
        .json('Auto Not Found')
        .end();
});

/**
 * ADD a resource (Crud)
 * 
 * Add a new auto to the list
 */
router.post('/', (request, response) => {
    // Need to validate input for security
    // Validation of data from user prevents SQL Injection Attacks
    let auto = request.body;

    // save auto in collection
    auto.id = autos.length + 1;
    autos.push(auto);

    return response.status(201)
        .header('Location', `api/autos/${auto.id}`)
        .json(auto);
});

/**
 * UPDATE Specific resource (crUd)
 * 
 * Update specific auto by ID
 */
router.put('/:id', (request, response) => {
    // Need to validate input for security
    // Validation of data from user prevents SQL Injection Attacks
    let id = parseInt(request.params.id);
    let auto = request.body;

    let record = autos.filter((item): boolean => {
        return item.id == id;
    })[0];

    if(record) {
        // what makes this different than get /:id
        record.make = auto.make;
        record.model = auto.model;
        record.year = auto.year;

        return response.status(204) // 204 - No Content
            .end();
    }

    return response.status(404)
        .json('Auto Not Found')
        .end();
});



/**
 * DELETE Specific resource (cruD)
 * 
 * DELETE specific auto by ID
 */
router.delete('/:id', (request, response) => {
    // Need to validate input for security
    // Validation of data from user prevents SQL Injection Attacks
    let id = request.params.id;

    let record = autos.filter((item): boolean => {
        return item.id == id;
    })[0];

    if(record) {
        autos.splice(autos.indexOf(record), 1);

        return response.status(204) // 204 - No Content
            .end();
    }

    return response.status(404)
        .json('Auto Not Found')
        .end();
});


export default router;