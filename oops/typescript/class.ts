class A1 {
    constructor(name: string) {
        console.log(`Hi ${name}`);
    }
}

class B1 extends A1 {

}

// let b = new B1(); // Error: Expected 1 arguments, but got 0.
let b = new B1('John'); // Hi John