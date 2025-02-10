"""
Inheritance is a way to form new classes using classes that have already been defined. 
The newly formed classes are called derived classes, the classes that we derive from are called base classes. Important benefits of inheritance are code reuse and reduction of complexity of a program. 
The derived classes (descendants) override or extend the functionality of base classes (ancestors).
"""

# Example 1: Inheritance
class Human:
    def __init__(self, name: str, age: int):
        self._name = name
        self._age = age

    def get_name(self) -> str:
        return self._name


class SuperHuman(Human):
    def __init__(self, name: str, age: int, super_power: str):
        super().__init__(name, age)
        self._super_power = super_power

    def get_super_power(self) -> str:
        return self._super_power


class SuperHero(SuperHuman):
    def __init__(self, name: str, age: int, super_power: str, hero_name: str):
        super().__init__(name, age, super_power)
        self._hero_name = hero_name

    def get_hero_name(self) -> str:
        return self._hero_name


man = Human('Clerk', 30)
super_human = SuperHuman('Superman', 30, 'Flying')
super_hero = SuperHero('Clerk', 30, 'Flying', 'Superman')

super_hero._hero_name