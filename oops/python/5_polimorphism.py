"""
Polymorphism is the ability to define a generic interface that can be used to refer to different objects.

There are 2 types of polymorphism 
1. Dynamic polymorphism
2. Static polymorphism

Dynamic polymorphism is achieved by method overriding. It is the ability to define a method in the child class with the same name as defined in their parent class.

Static polymorphism is achieved by method overloading. It is the ability to define multiple methods with the same name but with a different number of parameters or types of parameters.
"""

# Example 1: Polymorphism
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement this abstract method")

class Dog(Animal):
    def speak(self):
        return self.name+' says Woof!'

class Cat(Animal):
    def speak(self):
        return self.name+' says Meow!'

fido = Dog('Fido')
isis = Cat('Isis')

print(fido.speak())  # Fido says Woof!
print(isis.speak())  # Isis says Me

# Example 2: Polymorphism
class Animal:
    def __init__(self, name, color):
        self.name = name
        self.color = color

class Dog(Animal):
    def __init__(self, name, color, breed):
        super().__init__(name, color)
        self.breed = breed

    def display(self):
        return f"{self.name} is a {self.color} {self.breed}"
    
class Cat(Animal):
    def __init__(self, name, color, breed):
        super().__init__(name, color)
        self.breed = breed

    def display(self):
        return f"{self.name} is a {self.color} {self.breed}"
