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
    let auto = request.body;

    // save auto in collection
    auto.id = autos.length + 1;
    autos.push(auto);

    response.status(201)
        .header('Location', `api/autos/${auto.id}`)
        .json(auto);
});

export default router;