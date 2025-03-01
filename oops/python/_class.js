class Sample {
    name = 'John';
    constructor() {
        // this.name = name
        console.log('Sample constructor');
    }
    getName() {
        console.log(this.name);
    }
}

class Example extends Sample {
    constructor(name) {
        super(name);
        console.log('Example constructor');
    }
}

// const example = new Example('John'); 


class Test {
    constructor() {
        console.log('Test constructor');
    }
}

class Test2 extends Test {
    constructor() {
        super();
        console.log('Test2 constructor');
    }
}

// const test2 = new Test2();

class NoConstructor {

    sayHi() {
        console.log('Hi');
    }
}

class NoConstructor2 extends NoConstructor {
    constructor() {
        super();
        this.sayHi();
        console.log('NoConstructor2 constructor');
    }
}

// const noConstructor2 = new NoConstructor2();

class Employee {
    year = 2021;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        console.log(this.name);
    }
    addAge() {
        this.age++;
    }
    display() {
        console.log(this.name, this.age, this.year);
    }
}

let emp = new Employee('John', 30);
let emp2 = new Employee('Doe', 40);
emp.display();
emp2.display();
Employee.prototype.year = 2022;
emp.addAge();
emp2.addAge();
emp.display();
emp2.display();