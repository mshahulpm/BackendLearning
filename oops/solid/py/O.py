from abc import ABC, abstractmethod

# Open-Close Principle

# following code violate this principle


class Triangle:

    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height


class Rectangle:

    def __init__(self, width: float, height: float):
        self.height = height
        self.width = width


# some util function to calculate area
def calc_area(shape):
    if isinstance(shape, Triangle):
        return shape.base * shape.height * 0.5
    if isinstance(shape, Rectangle):
        return shape.height * shape.width
    # need to modify if new class get introduced
    return


# --------------------------------- Correct way --------------------------------


class Shape(ABC):

    @abstractmethod
    def calcArea(self):
        pass


class Triangle2(Shape):

    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height

    def calcArea(self):
        return self.height * self.base * 0.5


class Rectangle2(Shape):

    def __init__(self, width: float, height: float):
        self.height = height
        self.width = width

    def calcArea(self):
        return self.height * self.width


def calc_area2(shap: Shape):
    return shap.calcArea()
