# Chicken Coop Simulator
This simulator is coded to find out how many chickens I need to be able to have a Chicken + Eggs to eat everyday. Is it useful? Nope. Is it fun? Yes.

## Result
- Roughly 300 days if you start off with one hen and one chicken

### Optimization
- Not much though is given for design
- Compute size is exponential as well

### Chicken Statistics
- Eggs:
    - 21 days for eggs to hatch
    - 50% each gender
- Chickens:
    - 6 - 12 weeks before ready to eat (average 10 weeks)
    - 6 - 8 years life span (average 7 years)
    - Hens lay eggs at 16 and 24 weeks
    - Egg production good for about 2-3 years old
    - 4 - 6 months old good for eating
    - A good ratio of hens to roosters is 10 to 1
    - Older chickens are less tasty
    - Egg production slows after 2-3 years
    - Roosters only productive 4 months onwards


### Assumptions
- Assume that the raio of R:H (1:10) will give 80% of fertilized eggs
- Assume a hen has a 80% chance of laying egg everyday within the first two years of its life
- Assume able to check if eggs are fertilized at 4 days old

## Mechanics
### Eggs
- Gender:
    - There is a 50/50% chance of male/female
- Fertilization:
    - Fertilization status can be checked at 4 days old
- Edible:
    - Eggs are not edible if they are fertilized
    - All edible eggs are eaten each day
### Chickens
- Laying Eggs
    - Hens starts laying eggs when 4 months old
    - Hens have a 80% chance of laying eggs everyday
- Edible Chickens
    - Chickens gets added to the edibleChicken queue when:
        - Hens: They are Hens and > 2 years old
        - Roosters: Ratio of Rooster:Hen is more than 1:10 (kill the older roosters first) and > 42 days
            - Oldest roosters are eaten first
    - All edible chickens are eaten each day