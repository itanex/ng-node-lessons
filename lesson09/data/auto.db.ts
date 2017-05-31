
// Repository/DB
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

export function getAll(): any[] {
    return autos;
}

export function getById(id: number): any {
    let record = autos.filter((item): boolean => {
        return item.id == id;
    })[0];

    return record;
}

export function addAuto(auto: any): any {
    auto.id = autos.length + 1;
    autos.push(auto);

    return auto;
}

export function updateAuto(id: number, auto: any): boolean {
    let record = getById(id);

    if(record) {
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

    if(record) {
        // what makes this different than get /:id
        autos.splice(autos.indexOf(record), 1);

        return true;
    }
    
    return false;
}