class Base:

    number: int

    def __init__(self):
        print("Base constructor called")
        self.number = 10

    def display(self):
        print("Base display number:", self.number)


class SubWithoutConstructor(Base):

    def show(self):
        print("SubWithConstructor show number:", self.number)


"""
Base constructor called
SubWithConstructor show number: 10
Base display number: 10
"""
swtc = SubWithoutConstructor()
swtc.show()
swtc.display()

# ------- class with constructor ------------
"""
if we not called super().__init__() in SubWithConstructor then it will give error 
because SubClass is overriding the constructor of BaseClass and not calling the constructor of BaseClass
"""


class SubWithConstructor(Base):

    def __init__(self):
        print("SubWithConstructor constructor called")

    def show(self):
        print("SubWithConstructor show number:", self.number)


swc = SubWithConstructor()
# following line will give error because we have not called super().__init__() in SubWithConstructor
# swc.show()
# following line will give error because we have not called super().__init__() in SubWithConstructor
# swc.display()


# ------- class with constructor correct way ------------
class SubWithConstructorCorrect(Base):

    def __init__(self):
        print("SubWithConstructorCorrect constructor called")
        super().__init__()

    def show(self):
        print("SubWithConstructorCorrect show number:", self.number)


print("-----------------")
swcc = SubWithConstructorCorrect()
swcc.show()
swcc.display()


def hello():
    pass


class Base1:
    def display(self):
        print("base1")


class Base2:
    def display(self):
        print("base2")


class Sub(Base1, Base2):
    def some_thing(self):
        print("some")


sub = Sub()

print(sub.display())
print(Sub.__mro__)
