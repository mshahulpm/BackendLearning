# one line anonymous function

x = lambda x: x + 5  # not recommended
y = lambda x, y: x + y

print(x(2))
print(y(1, 2))


# actual way to use
l = [1, 2, 3, 4, 5, 67, 8, 9, 0, 4, 3, 2, 4]
mp = map(lambda i: i + 2, l)
print(list(mp))

some = filter(lambda i: i % 2 == 0, l)
print(list(some))


def filter_even(i):
    return i % 2 == 0


print(list(filter(filter_even, l)))
