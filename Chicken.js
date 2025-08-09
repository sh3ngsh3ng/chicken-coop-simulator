class Chicken {
    constructor(age, gender) {
        this.age = age || 1;
        this.gender = gender || (Math.random() < 0.5 ? 'F' : 'M');
    }

    addOneAge() {
        this.age += 1;
    }

    canBeEaten() {
        if (this.gender == 'F' && this.age > 730) {
            return true;
        }

        if (this.gender == 'M' && this.age > 42) {
            return true;
        }
        return false;
    }

    laidEgg() {
        // Lay eggs if female and 120 days old at 80% chance
        return this.gender == 'F' && this.age >= 120 ? Math.random() < 0.8 : false;
    }


    ageOneDay() {
        this.addOneAge();
        return {
            hasLaidEgg: this.laidEgg(),
            canBeEaten: this.canBeEaten()
        }
    }
}



module.exports = Chicken;