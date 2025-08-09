const ChickenCoopSimulator = require('./ChickenCoopSimulator.js')



const iterations = 35
const simulationDays = 365

console.log(`
Running Simulation for ${iterations} iterations at 
${simulationDays} simulation days.
    `)
let totaEarliestDaySum = 0;
let totalLatestDaySum = 0;
for (let i = 0; i < iterations; i++) {
    const simulator = new ChickenCoopSimulator();
    const results = simulator.run(simulationDays);
    const earliestDay = results.earliestDayToEatChickenAndEggEveryday;
    totaEarliestDaySum += earliestDay
    const latestDay = results.latestDayToNotHaveChickenAndEggEveryday;
    totalLatestDaySum += latestDay;
}

console.log("Earliest average number of days to eat chicken and eggs everyday: ", Math.floor(totaEarliestDaySum / iterations))
console.log("Latest average number of days to not have chicken and eggs everyday: ", Math.floor(totalLatestDaySum / iterations))



