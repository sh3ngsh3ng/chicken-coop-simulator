const Chicken = require("./Chicken");
const Egg = require("./Egg");

class ChickenCoopSimulator {
    constructor() {
        // Flag
        this.hasProductiveRooster = false;

        // Chickens
        this.hens = [new Chicken(120, 'F')];
        this.roosters = [new Chicken(120, 'M')]; // queue
        this.edibleChickens = []; // queue up the chicken for eating


        // Eggs
        this.pendingEggs = [];
        this.fertilizedEggs = [];
        this.edibleEggs = [];


        // Stats
        this.earliestDayToEatChickenAndEggEveryday = 9999;
        this.latestDayToNotHaveChickenAndEggEveryday = 0;
    }

    checkForProductiveRooster() {
        const productiveRooster = this.roosters.find(rooster => rooster.age > 120)
        if (productiveRooster) {
            this.hasProductiveRooster = true;
        } else {
            this.hasProductiveRooster = false;
        }
    }

    canCullExtraRoosters() {
        const productiveHens = this.hens.filter(hen => hen.age > 120).length
        const requiredProductiveRoosters = Math.max(Math.floor(productiveHens / 10), 1);
        const currentProductiveRooster = this.roosters.filter(rooster => rooster.age > 120).length;
        // console.log(requiredProductiveRoosters, currentProductiveRooster)
        if (currentProductiveRooster > requiredProductiveRoosters) {
            return {
                canCull: true,
                numToCull: currentProductiveRooster - requiredProductiveRoosters
            };
        }
        return {
            canCull: false
        };
    }

    run(noOfDays) {
        for (let i = 0; i < noOfDays; i++) {
            this.checkForProductiveRooster();

            // Age the edible chickens
            this.edibleChickens.forEach(chicken => {
                chicken.ageOneDay();
            })

            // Age the hens
            // - Check for new eggs
            // - Check for chickens that can be eaten
            for (let i = this.hens.length - 1; i >= 0; i--) {
                const hen = this.hens[i];
                const { hasLaidEgg, canBeEaten } = hen.ageOneDay();

                // Check for Egg
                if (hasLaidEgg) {
                    // Hens lay possible fertilized eggs
                    if (this.hasProductiveRooster) {
                        this.pendingEggs.push(new Egg());
                    } else {
                        // If no productive rooster, straight add as edible egg
                        this.edibleEggs.push(new Egg());
                    }
                }

                if (canBeEaten) {
                    this.edibleChickens.push(hen);
                    this.hens.splice(i, 1)
                }
            }

            // Age the roosters
            // - Check whether Rooster is edible (> 1/10 ratio, > 42 days)
            for (let i = this.roosters.length - 1; i >= 0; i--) {
                const rooster = this.roosters[i];
                rooster.ageOneDay();
            }

            // Cull rooster
            const { canCull, numToCull } = this.canCullExtraRoosters();
            if (canCull) {
                Array.from({ length: numToCull }, () => {
                    const roosterToCull = this.roosters.shift();
                    this.edibleChickens.push(roosterToCull);
                })
            }

            // Age the fertilized eggs
            // - Check if eggs hatched to chickens
            for (let i = this.fertilizedEggs.length - 1; i >= 0; i--) {
                const egg = this.fertilizedEggs[i];
                egg.ageOneDay();
                const canBeHatched = egg.canBeHatched();
                if (canBeHatched) {
                    const newChicken = new Chicken();
                    if (newChicken.gender == 'F') {
                        this.hens.push(newChicken);
                    } else if (newChicken.gender == 'M') {
                        this.roosters.push(newChicken);
                    }
                    this.fertilizedEggs.splice(i, 1);
                }
            }


            // Age the pending eggs
            // - Check if eggs are fertilized -> fetilizedEggs
            // - Check if eggs can be eaten -> edibleEggs
            for (let i = this.pendingEggs.length - 1; i >= 0; i--) {
                const egg = this.pendingEggs[i];
                const { isFertilized, canBeEaten } = egg.ageOneDay();

                // If is fertilized, move to fertilized list
                if (isFertilized) {
                    this.fertilizedEggs.push(egg);
                    this.pendingEggs.splice(i, 1);
                }

                // If can be eaten, move to eaten list
                if (canBeEaten == 'Y') {
                    this.edibleEggs.push(egg);
                    this.pendingEggs.splice(i, 1);
                }


                // Eat
            }


            // const condition = true;
            // const condition = this.edibleChickens.length == 0 || this.edibleEggs.length == 0;
            const condition = this.edibleChickens.length > 0 && this.edibleEggs.length > 0;
            // const condition = this.edibleChickens.filter(chicken => chicken.gender == 'F').length > 0
            // Get number of eggs to eat per day, number of chickens to eat per day
            if (condition) {
                // console.log(`===== DAY ${i + 1} =====`)
                this.earliestDayToEatChickenAndEggEveryday = Math.min(this.earliestDayToEatChickenAndEggEveryday, i + 1)
                // console.log("Hens: ", this.hens.length);
                // console.log("Roosters: ", this.roosters.length);
                // console.log("Productive Hens: ", this.hens.filter(hen => hen.age > 120).length)
                // console.log("Productive Roosters: ", this.roosters.filter(rooster => rooster.age > 120).length)
                // console.log("Number of Edible Hens: ", this.edibleChickens.filter(chicken => chicken.gender === 'F').length);
                // console.log("Number of Edible Rooster: ", this.edibleChickens.filter(chicken => chicken.gender === 'M').length);
                // console.log("P Eggs: ", this.pendingEggs.length);
                // console.log("F Eggs: ", this.fertilizedEggs.length);
                // console.log("E Eggs: ", this.edibleEggs.length);
                // console.log("Edible Eggs for the Day: ", this.edibleEggs.length);
                // console.log("Edible Chickens for the Day: ", this.edibleChickens.length);
                // console.log(this)
            }

            if (!condition) {
                // console.log("You do not have chicken + eggs at day: " + (i + 1));
                this.latestDayToNotHaveChickenAndEggEveryday = Math.max(this.latestDayToNotHaveChickenAndEggEveryday, i + 1);
            }


            this.edibleChickens = [];
            this.edibleEggs = [];
        }




        return this


    }
}
module.exports = ChickenCoopSimulator