// functional way

let salary = 10000;
let bonus = 5000;

function getSalary() {
    return salary + bonus;
}

console.log(getSalary()); // 15000

// Object Oriented way

class Employee {
    salary: number;
    bonus: number;

    constructor(salary: number, bonus: number) {
        this.salary = salary;
        this.bonus = bonus;
    }

    getSalary() {
        return this.salary + this.bonus;
    }

}

let emp = new Employee(10000, 5000);
console.log(emp.getSalary()); // 15000

emp.salary = 20000;
console.log(emp.getSalary()); // 25000


class Employee2 {

    private country = 'India';

    constructor(
        protected salary: number,
        protected bonus: number,
        private state = 'Kerala',
        private _district = 'Kozhikode'
    ) { }

    get district() {
        return this._district;
    }

    getCountry() {
        return this.country;
    }

    getState() {
        return this.state;
    }

    getSalary() {
        return this.salary + this.bonus;
    }
}

const emp2 = new Employee2(10000, 5000);

// emp2.salary = 20000; // error

console.log(emp2.district); // Employee2 { salary: 10000, bonus: 5000 }