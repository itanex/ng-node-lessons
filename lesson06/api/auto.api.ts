import * as express from 'express';

let router = express.Router();

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
    }
];

/**
 * Read ALL resources (cRud)
 * 
 * Get all autos
 */
router.get('/', (request, response) => {
    response.status(200).json(autos);
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
        response.status(200)
            .json(record)
            .end();
    }

    response.status(404)
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

    response.status(201)
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

        response.status(204) // 204 - No Content
            .end();
    }

    response.status(404)
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

        response.status(204) // 204 - No Content
            .end();
    }

    response.status(404)
        .json('Auto Not Found')
        .end();
});


export default router;