abstract class Animal {
    abstract makeSound(): void;  // Only definition, no implementation

    move(): void {
        console.log("Moving...");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Bark!");
    }
}

const d = new Dog();
d.makeSound();  // ✅ Output: Bark!
d.move();       // ✅ Output: Moving...

// another example -  for some wired reason, I have to create a blueprint for a controller
// and I want to make sure that every controller has a developer name and created date
// and also a log method
abstract class ControllerBluePrint {
    abstract developerName: string;
    abstract createdDate: Date;

    log(): void {
        console.log("Log...");
    }
}


class ChatController extends ControllerBluePrint {
    developerName = "John Doe";
    createdDate = new Date();

    log(): void {
        console.log("Logging from ChatController...");
    }

}