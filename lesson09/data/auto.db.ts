/**
 * This is a MOCK repository that uses an array behind the scene as 
 * it is not important to the lesson that there be a real DB
 */

import { IAuto } from '../models/auto';

// Data
let autos: IAuto[] = [
    <IAuto>{
        id: 1,
        make: "Subaru",
        model: "CrossTrek",
        year: 2014
    },
    <IAuto>{
        id: 2,
        make: "Subaru",
        model: "Outback",
        year: 2017
    },
    <IAuto>{
        id: 3,
        make: "Subaru",
        model: "Forester",
        year: 2008
    },
    <IAuto>{
        id: 4,
        make: "Subaru",
        model: "Imprezza",
        year: 2003
    },
    <IAuto>{
        id: 5,
        make: "Ford",
        model: "F150",
        year: 2012
    },
    <IAuto>{
        id: 5,
        make: "Ford",
        model: "Festiva",
        year: 2001
    },
    <IAuto>{
        id: 6,
        make: "Ford",
        model: "Pinto",
        year: 1982
    },
    <IAuto>{
        id: 7,
        make: "Ford",
        model: "F10",
        year: 2011
    },
    <IAuto>{
        id: 8,
        make: "Ford",
        model: "Mustang",
        year: 2014
    },
    <IAuto>{
        id: 9,
        make: "Chevrolet",
        model: "Volt",
        year: 2014
    },
    <IAuto>{
        id: 10,
        make: "Chevrolet",
        model: "Blazer",
        year: 2001
    },
    <IAuto>{
        id: 11,
        make: "Chevrolet",
        model: "Suburban",
        year: 2009
    },
    <IAuto>{
        id: 12,
        make: "Chevrolet",
        model: "Leaf",
        year: 2016
    },
    <IAuto>{
        id: 13,
        make: "Dodge",
        model: "Charger",
        year: 2018
    },
    <IAuto>{
        id: 14,
        make: "Dodge",
        model: "Caravan",
        year: 1998
    },
    <IAuto>{
        id: 15,
        make: "Dodge",
        model: "Caravan",
        year: 2018
    },
    <IAuto>{
        id: 16,
        make: "Dodge",
        model: "Charger",
        year: 1987
    }
];

export function getAll(): IAuto[] {
    return autos;
}

export function getById(id: number): IAuto {
    let record = autos.filter((item): boolean => {
        return item.id == id;
    })[0];

    return record;
}

export function addAuto(auto: IAuto): IAuto {
    auto.id = autos.length + 1;
    autos.push(auto);

    return auto;
}

export function updateAuto(id: number, auto: IAuto): boolean {
    let record = getById(id);

    if (record) {
        // what makes this different than get /:id
        record.make = auto.make;
        record.model = auto.model;
        record.year = auto.year;

        return true;
    }

    return false;
}

export function deleteAuto(id: number): boolean {
    let record = getById(id);

    if (record) {
        // what makes this different than get /:id
        autos.splice(autos.indexOf(record), 1);

        return true;
    }

    return false;
}