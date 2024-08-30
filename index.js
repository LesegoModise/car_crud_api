import express from 'express';
import cors from 'cors';
import { numberOfCarsPerModel } from './carsPerModel.js';

const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

let cars = [
    {
        color: "white",
        make: "Volkswagen",
        model: "Polo",
        reg_number: "CL 61045"
    }, {
        color: "red",
        make: "Toyota",
        model: "Tazz",
        reg_number: "CY 16875"
    }, {
        color: "orange",
        make: "Nissan",
        model: "Juke",
        reg_number: "CK 32655"
    }, {
        color: "orange",
        make: "Ford",
        model: "EcoSport",
        reg_number: "CL 11318"
    }, {
        color: "white",
        make: "Nissan",
        model: "Micra",
        reg_number: "CJ 16103"
    }, {
        color: "orange",
        make: "Nissan",
        model: "Juke",
        reg_number: "CL 42789"
    }, {
        color: "blue",
        make: "Volkswagen",
        model: "Jetta",
        reg_number: "CA 46977"
    }, {
        color: "white",
        make: "Volkswagen",
        model: "Polo",
        reg_number: "CY 25661"
    }, {
        color: "white",
        make: "Nissan",
        model: "Micra",
        reg_number: "CY 35475"
    }, {
        color: "white",
        make: "Toyota",
        model: "Corolla",
        reg_number: "CY 54886"
    }, {
        color: "white",
        make: "Toyota",
        model: "Hilux",
        reg_number: "CJ 16455"
    }, {
        color: "orange",
        make: "Toyota",
        model: "Corolla",
        reg_number: "CK 57166"
    }, {
        color: "orange",
        make: "Ford",
        model: "Fiesta",
        reg_number: "CL 77790"
    }, {
        color: "blue",
        make: "Nissan",
        model: "Juke",
        reg_number: "CY 98904"
    }, {
        color: "white",
        make: "Ford",
        model: "Ranger",
        reg_number: "CF 75599"
    }, {
        color: "red",
        make: "Toyota",
        model: "Corolla",
        reg_number: "CA 5510"
    }, {
        color: "blue",
        make: "Ford",
        model: "Focus",
        reg_number: "CF 75586"
    }, {
        color: "orange",
        make: "Toyota",
        model: "Tazz",
        reg_number: "CA 46137"
    }, {
        color: "orange",
        make: "Ford",
        model: "Ranger",
        reg_number: "CK 22692"
    }, {
        color: "red",
        make: "Toyota",
        model: "Corolla",
        reg_number: "CF 33543"
    }, {
        color: "red",
        make: "Volkswagen",
        model: "Touran",
        reg_number: "CA 94890"
    }, {
        color: "orange",
        make: "Toyota",
        model: "Tazz",
        reg_number: "CY 82252"
    }, {
        color: "blue",
        make: "Toyota",
        model: "Yaris",
        reg_number: "CL 9538"
    }, {
        color: "white",
        make: "Nissan",
        model: "Juke",
        reg_number: "CF 62002"
    }, {
        color: "orange",
        make: "Ford",
        model: "Fiesta",
        reg_number: "CJ 67577"
    }, {
        color: "blue",
        make: "Ford",
        model: "Ranger",
        reg_number: "CA 77852"
    }, {
        color: "orange",
        make: "Toyota",
        model: "Hilux",
        reg_number: "CY 52435"
    }, {
        color: "blue",
        make: "Toyota",
        model: "Corolla",
        reg_number: "CL 76173"
    }, {
        color: "red",
        make: "Toyota",
        model: "Tazz",
        reg_number: "CL 38315"
    }, {
        color: "orange",
        make: "Toyota",
        model: "Corolla",
        reg_number: "CK 41166"
    }];

app.get('/api/carsPerModel', function (httpRequest, httpResponse) {
    const { color, model, town } = httpRequest.query;
    let filteredCars = cars;
    
    if (color) filteredCars = filteredCars.filter(car => car.color === color);
    if (model) filteredCars = filteredCars.filter(car => car.model === model);
    if (town) filteredCars = filteredCars.filter(car => car.town === town);

    httpResponse.json({
        cars: filteredCars
    });
});

app.post('/api/cars', function (httpRequest, httpResponse) {
    const newCar = httpRequest.body;
    cars.push(newCar);
    httpResponse.json({
        message: "New car added successfully!",
    });
});

app.put('/api/cars/:reg_number', function (httpRequest, httpResponse) {
    const reg_number = httpRequest.params;
    const updatedCar = httpRequest.body;

    let car = cars.find(car => car.reg_number === reg_number);
    if (car) {
        car.color = updatedCar.color || car.color;
        car.make = updatedCar.make || car.make;
        car.model = updatedCar.model || car.model;
        httpResponse.json({
            message: "Car updated successfully!",
        });
    } else {
        httpResponse.status(404).json({
            message: "Car not found!"
        });
    }
});

app.delete('/api/cars/:reg_number', function (httpRequest, httpResponse) {
    const {reg_number} = httpRequest.params;
    const initialLength = cars.length;
    cars = cars.filter(car => car.reg_number !== reg_number);

    if (cars.length < initialLength) {
        httpResponse.json({
            message: "Car removed successfully!",
        });
    } else {
        httpResponse.status(404).json({
            message: "Car not found!"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App live http://localhost:${PORT}`);
}) 