class Dog:
    species = "Canine"  # Class attribute

    def __init__(self, name: str, age: int):
        self.name = name  # Instance attribute
        self.age = age  # Instance attribute

dog = Dog("Buddy", 9)