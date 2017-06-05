import * as mongoose from 'mongoose';

export interface IAuto extends mongoose.Document {
    make: string;
    modelOfCar: string;
    year: number;
}

let autoSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    modelOfCar: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

export let AutoValidationSchema: ExpressValidator.ValidationSchema = {
    'make': {
        notEmpty: {
            errorMessage: '`make` cannot be empty'
        }
    },
    'modelOfCar': {
        notEmpty: {
            errorMessage: '`make` cannot be empty'
        }
    },
    'year': {
        isInt: {
            errorMessage: '`year` is not a number'
        }
    }
};

export let Auto = mongoose.model<IAuto>('Auto', autoSchema, 'autos');
