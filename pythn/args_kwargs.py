x = [2, 3, 4, 56, 7, 7]
print(x)
print(*x)

# example of unpacking


def func(x, y):
    print("Unpacked", x, y)


pairs = [(1, 2), (3, 4)]

for pair in pairs:
    func(*pair)

# for dictionaries it is 2 *
print("------------------")
y = {"y": 5, "x": 7}

func(**y)


def func2(*args, **kwargs):
    print(args, kwargs)
    print("unpacked ", *args)
    # print("unpacked ", **kwargs)  # this will throw error


func2(1, 2, 3, 4, 5, 6, one="hey", two=2)
