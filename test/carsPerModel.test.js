import assert from "assert";
import { numberOfCarsPerModel } from "../carsPerModel.js";

describe('The number of cars per model function', function () {


    it('Should return the correct car details for an orange Hilux in Bellville', function() {
        assert.deepEqual(numberOfCarsPerModel('orange','Hilux','Bellville'),[{"color":"orange","make":"Toyota","model":"Hilux","reg_number":"CY 52435"}])
    });

    it('should return an empty array when there are no red Fiestas in Cape Town', function () {
        assert.deepEqual(numberOfCarsPerModel('red','Fiesta','Cape Town'),'There are no cars from, Cape Town that fit that description.');   
    });

});

