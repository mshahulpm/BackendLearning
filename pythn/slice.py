x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
y = ["hei", "hello", "goodbye", "cya", "sure"]


start = 0
stop = 5
step = 2
sliced = x[start:stop:step]

print(sliced)
print(x[1:4])
print(x[2::2])
print(x[:4:3])
print(x[4:2:-1])  # from 4 to 2 in reverse order
print(x[::-1])  # reverse the array
