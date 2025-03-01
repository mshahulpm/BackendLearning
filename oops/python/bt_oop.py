import random

class BaseClass:
    
    number:int = 10
  
    def __init__(self):
        print("BaseClass constructor called")
        self.number = random.randint(1, 100)

    def display(self):
        print("BaseClass display()")

class SubClass(BaseClass):

    def __init__(self):
        print("SubClass constructor called")
        # super().__init__()

    def show(self):
        print("SubClass show()")

# x = BaseClass()
# x.display()


y = SubClass()
print(y.number)
# y.display()
# y.show()