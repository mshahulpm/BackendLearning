"""
Encapsulation: bundling the data (properties) and the functions (methods) that operate on the data into a single unit (class) and restricting the access to some of the object's components.

- Encapsulation is used to hide the data with methods that operate on the data within a class.
- Encapsulation is basically hiding data within the class, preventing anything outside the class from directly interacting with it.
- It's generally best to not allow external
classes to directly edit an object's attributes
- This is very important when working on large
and complex programs
- Each piece should not have access to or rely on
the inner workings of other sections of code
"""

# the functional way of writing some data and functions that operate on the data

salary = 1000
bonus = 200

def calculate_total_salary():
    return salary + bonus

print(calculate_total_salary())  # 2200

salary = 2000

print(calculate_total_salary())  # 2200

# the object-oriented way of writing the same code

class Salary:
    def __init__(self, salary, bonus):
        self.salary = salary
        self.bonus = bonus

    def calculate_total_salary(self):
        return self.salary + self.bonus

s = Salary(1000, 200)
print(s.calculate_total_salary())  # 1200

s.salary = 2000
print(s.calculate_total_salary())  # 2200


# ------------------------- Geek for Geeks ---------------------

class Dog:
    def __init__(self, name, breed, age):
        self.name = name  # Public attribute
        self._breed = breed  # Protected attribute
        self.__age = age  # Private attribute

    # Public method
    def get_info(self):
        return f"Name: {self.name}, Breed: {self._breed}, Age: {self.__age}"

    # Getter and Setter for private attribute
    def get_age(self):
        return self.__age

    def set_age(self, age):
        if age > 0:
            self.__age = age
        else:
            print("Invalid age!")

# Example Usage
dog = Dog("Buddy", "Labrador", 3)

# Accessing public member
print(dog.name)  # Accessible

# Accessing protected member
print(dog._breed)  # Accessible but discouraged outside the class

# Accessing private member using getter
print(dog.get_age())

# Modifying private member using setter
dog.set_age(5)
print(dog.get_info())
