/*
 Inheritance is a mechanism in which one class acquires the properties and behavior of another class.
 5 types of inheritance in TypeScript:
    1. Single Inheritance
    2. Multilevel Inheritance
    3. Hierarchical Inheritance
    4. Interface-based inheritance
    5. Prototype-based inheritance (javascript style)
*/

// Single Inheritance
class Parent {
    display(): void {
        console.log("Parent class method");
    }
}
class Child extends Parent {
    show(): void {
        console.log("Child class method");
    }
}

let obj = new Child();
obj.display();

// Multilevel Inheritance
class GrandParent {
    greetGrandParent(): void {
        console.log("Greet from GrandParent");
    }
}
class Parent1 extends GrandParent {
    greetParent(): void {
        console.log("Greet from Parent");
    }
}
class Child1 extends Parent1 {
    greetChild(): void {
        console.log("Greet from Child");
    }
}

let obj1 = new Child1();
obj1.greetGrandParent();
obj1.greetParent();
obj1.greetChild();

// Hierarchical Inheritance
class Parent2 {
    greetParent(): void {
        console.log("Greet from Parent");
    }
}
class Child2 extends Parent2 {
    greetChild(): void {
        console.log("Greet from Child 1");
    }
}
class Child3 extends Parent2 {
    greetChild(): void {
        console.log("Greet from Child 2");
    }
}

let obj2 = new Child2();
let obj3 = new Child3();

obj2.greetParent();
obj3.greetParent();

// Interface-based inheritance
interface IParent {
    name: string;
    greetParent(): void;
}

class Child4 implements IParent {
    name: string = "Child";
    greetParent(): void {
        console.log("Greet from Child");
    }
}


// 5 Prototype-based inheritance (javascript style)

const _parent = {

    greetParent: function () {
        console.log("Greet from Parent");
    }
}

const _child = Object.create(_parent);
_child.greetParent();

