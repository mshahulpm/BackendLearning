class First:
    
    # def __init__(self):
    #     print("First constructor")
    
    def showFirst(self):
        print("First show")

class Second:
    
    # def __init__(self):
    #     print("Second constructor")

    def showSecond(self):
        print("Second show")

class Third(First,Second):

    def showThird(self):
        print("Third show")

# t = Third()
# t.showFirst()
# t.showSecond()
# t.showThird()

# First 2 class with same method name
class First1:
    
    def show(self):
        print("First1 show")

class Second1:
    
    def show(self):
        print("Second1 show")
    
class Third1(Second1,First1):
    
    def display(self):
        print("Third1 show")

t1 = Third1()
t1.show() # First1 show
t1.display() # Third1 show
print(Third1.mro()) # [<class '__main__.Third1'>, <class '__main__.Second1'>, <class '__main__.First1'>, <class 'object'>]