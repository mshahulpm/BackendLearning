
class Human {

    constructor(
        protected name: string,
        protected age: number
    ) { }

    getName() {
        return this.name;
    }

}

class SuperHuman extends Human {

    constructor(
        name: string,
        age: number,
        protected superPower: string
    ) {
        super(name, age);
    }

    getSuperPower() {
        return this.superPower;
    }

}

class SuperHero extends SuperHuman {

    constructor(
        name: string,
        age: number,
        superPower: string,
        protected heroName: string
    ) {
        super(name, age, superPower);
    }

    getHeroName() {
        return this.heroName;
    }

}

const man = new Human('Clerk', 30);
const superHuman = new SuperHuman('Superman', 30, 'Flying');
const superHero = new SuperHero('clerk', 30, 'Flying', 'Superman');

