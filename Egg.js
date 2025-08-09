class Egg {
    constructor(age) {
        this.age = age || 0;
        this.isFertilized = false;
        this.canBeEaten = 'P'; // Pending, Yes, No
    }

    addOneAge() {
        this.age += 1;
    }

    determineFertilizeStatus() {
        this.isFertilized = Math.random() < 0.8;
    }

    setCanBeEatenStatus() {
        this.canBeEaten = this.isFertilized ? 'N' : 'Y'
    }

    canBeHatched() {
        return this.age >= 21;
    }

    ageOneDay() {
        this.addOneAge();
        // Determine Fertilization Status at fourth day
        if (this.age == 4) {
            this.determineFertilizeStatus();
            // Set canBeEaten based on fertilized status
            this.setCanBeEatenStatus();
        }

        return {
            isFertilized: this.isFertilized,
            canBeEaten: this.canBeEaten,
        }
    }
}

module.exports = Egg;