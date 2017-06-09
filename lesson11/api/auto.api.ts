import * as express from 'express';

import { Auto } from '../models/auto';
import { ValidateAuto } from '../utitlities/auto.validator';
import { ValidateId } from '../utitlities/id.validator';

let router = express.Router();

/**
 * Read ALL resources (cRud)
 * 
 * Get all autos
 */
router.get('/', (request, response) => {
    Auto.find()
        .then((autos) => {
            response.status(200).json(autos).end();
        });
});

/**
 * Read Specific resource (cRud)
 * 
 * Get auto by ID
 */
router.get('/:id', ValidateId, (request, response) => {
    let id = request.params.id;

    Auto.findById(id)
        .then((autos) => {
            response.status(200).json(autos)
                .end();
        })
        .catch(reason => {
            response.status(404)
                .json(`Auto(${id}) Not Found`)
                .end();
        });
});

/**
 * ADD a resource (Crud)
 * 
 * Add a new auto to the list
 */
router.post('/', ValidateAuto, (request, response) => {
    let auto = new Auto(request.body);

    auto.save()
        .then(auto => {
            response.status(201)
                .header('Location', `api/autos/${auto._id}`)
                .end();
        })
        .catch((reason) => {
            response.status(400)
                .json(reason)
                .end();
        });
});

/**
 * UPDATE Specific resource (crUd)
 * 
 * Update specific auto by ID
 */
router.put('/:id', ValidateId, ValidateAuto, (request, response) => {
    let id = request.params.id;
    let auto = new Auto(request.body);

    auto._id = id;

    Auto.findByIdAndUpdate(id, auto)
        .then(() => {
            response.status(204)
                .end();
        })
        .catch((reason) => {
            response.status(404)
                .json(`Auto(${id}) Not Found`)
                .end();
        });
});

/**
 * DELETE Specific resource (cruD)
 * 
 * DELETE specific auto by ID
 */
router.delete('/:id', ValidateId, (request, response) => {
    let id = request.params.id;

    Auto.findByIdAndRemove(id)
        .then(() => {
            response.status(204)
                .end();
        })
        .catch(() => {
            response.status(404)
                .json('Auto Not Found')
                .end()
        });
});

export default router;