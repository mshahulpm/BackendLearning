from abc import ABC, abstractmethod

"""
Abstraction is a way to hide the implementation details and show only the functionality to the user.
- Abstraction is used to hide the complexity of the system and showing only the necessary details to the user.
- Abstraction is used to hide the implementation details and show only the functionality to the user.

"""


class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass

class Dog(Animal):
    def make_sound(self):
        return "Bark"

class Cat(Animal):
    def make_sound(self):
        return "Meow"

# Usage
dog = Dog()
cat = Cat()
print(dog.make_sound())  # Output: Bark
print(cat.make_sound())  # Output: Meow


# ------------ Geek for Geeks ------------

from abc import ABC, abstractmethod

class Dog(ABC):  # Abstract Class
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def sound(self):  # Abstract Method
        pass

    def display_name(self):  # Concrete Method
        print(f"Dog's Name: {self.name}")

class Labrador(Dog):  # Partial Abstraction
    def sound(self):
        print("Labrador Woof!")

class Beagle(Dog):  # Partial Abstraction
    def sound(self):
        print("Beagle Bark!")

# Example Usage
dogs = [Labrador("Buddy"), Beagle("Charlie")]
for dog in dogs:
    dog.display_name()  # Calls concrete method
    dog.sound()  # Calls implemented abstract method
