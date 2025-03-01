def func():
    print("Run")

    def inner_func():
        print("inner function")

    inner_func()


def some(x, y):
    print("returning a tuple")
    return x * y, x / y


r1, r2 = some(10, 5)
print(r1, r2)
