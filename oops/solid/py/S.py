"""
Single Responsibility Principle
"""

# following class violates the Single Responsibility Principle


class Student:

    def createStudentAccount():
        pass

    def calculateStudentGrade():
        pass

    def generateStudentData():
        pass


# correct way


class StudentAccount:

    def createStudentAccount():
        pass


class StudentGrade:

    def calculateStudentGrade():
        pass


class StudentData:

    def generateStudentData():
        pass
