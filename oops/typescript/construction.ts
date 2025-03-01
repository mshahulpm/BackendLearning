class A {
    constructor() {
        console.log('A constructor');
    }
    display() {
        console.log('A display');
    }
}

class B extends A {
    constructor() {
        console.log('B constructor');
        super();
    }
    display() {
        console.log('B display');
        super.display();
    }
}

class C extends B {
    constructor() {
        console.log('C constructor');
        super();
    }
    display() {
        console.log('C display');
        super.display();
    }
}

let c = new C();
c.display();