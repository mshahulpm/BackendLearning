x = "shahul"  # global


def func(name):
    # x = name  # local will not modify the global x

    # this will change the global x
    global x
    x = name


print(x)
func("new name")
print(x)
