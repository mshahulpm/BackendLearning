"""
Exercise 1: Create a class Greeter with a method greet(name) that prints a greeting for the provided name.
"""

class Greeter:
    def greet(self,name:str):
       return "Hey "+name


g =  Greeter()
print(g.greet("shahul"))

"""
Exercise 2: Develop a class Calculator with methods to add and subtract two numbers.
"""

class Calculator:
    def add(self,n1:int,n2:int):
        return n1+n2
    def sub(self,n1:int,n2:int):
        return n1-n2
    
c = Calculator()
print(c.add(10,1))
print(c.sub(11,1))

"""
Exercise 3: Build a class Employee with multiple constructors that can initialize an employee object in different ways.
"""

class Employee:
    def __init__(self,name:str,id=None,department=None):
        self.name = name 
        self.id = id 
        self.department = department
    def display_details(self):
        print(f"Name: {self.name}")
        if self.id:
            print(f"ID: {self.id}")
        if self.department:
            print(f"Department: {self.department}")

em1= Employee("jon")
em1.display_details()
em2=Employee("Doe",123)
em2.display_details()
em3= Employee("Jain",344,"Sales")
em3.display_details()        

"""
Exercise 4: Design a class SeriesCalculator that calculates the sum of an arithmetic series.
"""

class SeriesCalculator:
    def calculate_sum(self, n, a=1, d=2):
        # Sum of the first n terms of an arithmetic series
        return n * (2 * a + (n - 1) * d) // 2

# Test the calculator
sc = SeriesCalculator()
print("Sum of series:", sc.calculate_sum(5))

"""
Exercise 5: Create a class MaxFinder that identifies the largest number in a list.
"""

class MaxFinder:
    def max(self,nums):
       return max(nums)

mf = MaxFinder() 
print("Max Number", mf.max([1,2,3,4,5]))

"""
Exercise 6: Design a Rectangle class with default attributes for length and width set to 1. Include methods to set these attributes and calculate the area.
"""

class Rectangle:
    def __init__(self,l=1,w=1):
        self.length=l
        self.width = w
    def updateSide(self,l:float=None,w:float=None):
        if l:
            self.length = l 
        if w:
            self.width = w 
    def calcArea(self):
        return self.length*self.width

rec = Rectangle()
rec.updateSide(2,5)
print(rec.calcArea())

"""
Exercise 7: Person Class with __str__ Method: Create a Person class with first and last name attributes and override the __str__ method to return the full name.
"""
class Person:
    def __init__(self,fName,lName):
        self.fName = fName
        self.lName = lName
    def __str__(self):
        return f"{self.fName} {self.lName}"
        
p = Person("mhd","shahul") 
print(p.__str__())

"""
Exercise 8: Student Grade Calculator: Implement a Student class with attributes for name and a list of marks. Include a method to calculate the average and determine the grade.
"""
class Student:
    def __init__(self,name,marks):
        self.name = name
        self.marks = marks
    def calcAvg(self):
        return sum(self.marks)/len(self.marks)
    def calcGrade(self):
        avg = self.calcAvg() 
        if avg >=90:
            return 'A'
        elif avg >= 80:
            return 'B'
        elif avg >= 70:
            return 'C'
        else:
            return 'D'

"""
Exercise 10: Last Digit in Words: Write a class with a method that takes an integer and prints the last digit of that number in words.
"""
class LastDigits:
    def lastDigit(self,dig:int):
        digits = {1:"one",2:"two",3:"three",4:"four"}
        return digits[dig%10]

lg = LastDigits()
print(lg.lastDigit(123))