/*
3. Liskov Substitution Principle (LSP):
Definition: Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

Explanation: Subclasses should adhere to the behavior expected by the superclass. If a subclass violates this, it can lead to unexpected behavior.
*/

class Bird {

    isBird() {
        return true
    }

    fly() {
        return "bird can fly"
    }

}

class Duck extends Bird {

    constructor(readonly name: string) {
        super()
    }

    swim() {
        return "this duck can swim"
    }
}

function checkBird(bird: Bird) {
    return bird.isBird()
}

const d = new Duck("Donald")
const bird = new Bird()

checkBird(bird)
checkBird(d)