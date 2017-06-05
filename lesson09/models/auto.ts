export interface IAuto  {
    id: number;
    make: string;
    model: string;
    year: number;
}

export class Auto implements IAuto {
    public id: number;
    public make: string;
    public model: string;
    public year: number;
}

export let AutoValidationSchema: ExpressValidator.ValidationSchema = {
        'id': {
            optional: true,
            isInt: {
                errorMessage: '`id` is not a number'
            }
        },
        'make': {
            notEmpty: {
                errorMessage: '`make` cannot be empty'
            }
        },
        'model': {
            notEmpty: {
                errorMessage: '`make` cannot be empty'
            }
        },
        'year': {
            isInt: {
                errorMessage: '`year` is not a number'
            }
        },
    };