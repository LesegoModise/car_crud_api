document.addEventListener('alpine:init', () => {
    Alpine.data('carAPI', () => ({
        cars: [],
        color: '',
        model: '',
        town: '',
        message: '',
        newCar: { color:'', make:'', model:'', reg_number: ''},
        updateCar: { color:'', make:'', model:''},
        updateCarReg: '',
        deleteCarReg: '',
        showCarsList: false,

        init() {
            this.fetchCars();
        },

        async fetchCars() {
            try {
                const response = await axios.get(`/api/carsPerModel`, {
                    params: {
                        color: this.color,
                        model: this.model,
                        town: this.town
                    }
                });
                this.cars = response.data.cars;
                this.message = `Found ${this.cars.length} car(s) matching the criteria.`;
            } catch (error) {
                console.error(error);
                this.message = 'Error fetching car.';
            }
        },

        uniqueModels() {
            const models = [...new Set(this.cars.map(car => car.model))];
            return models.map(model => ({ model }));
        },

        async createCar() {
            try {
                const response = await axios.post(`/api/cars`, this.newCar);
                this.message = response.data.message;
                this.fetchCars();
            } catch (error) {
                console.error(error);
                this.message = 'Error adding car.';
            }
        },

        async updateCarData() {
            try {
                const response = await axios.put(`/api/cars/${this.updateCarReg}`, this.updateCar);
                this.message = response.data.message;
                this.fetchCars();
            } catch (error) {
                console.error(error);
                this.message = 'Error updating car.';
            }
        },

        async deleteCarData() {
            try {
                const response = await axios.delete(`/api/cars/${this.deleteCarReg}`);
                this.message = response.data.message;
                this.fetchCars();
            } catch (error) {
                console.error(error);
                this.message = 'Error deleting car.';
                
            }
        },

        resetCarsList () {
            this.cars = [];
            this.message = '';
        },

        resetCarsSearch() {
            this.color = '';
            this.model = '';
            this.town = '';
            this.cars = '';
            this.message = '';
        },

        resetNewCar() {
            this.newCar = { color: '', make: '', model: '', reg_number: ''};
            this.message = '';
        },

        resetUpdateCar() {
            this.updateCarReg = '';
            this.updateCar = { color: '', make: '', model: ''};
            this.message = '';
        },

        resetDeleteCar() {
            this.deleteCarReg = '';
            this.message = '';
        }
    })); 
});