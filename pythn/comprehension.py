x = [x for x in range(5)]

print(x)

print([x * 2 for x in range(5)])

print([0 for x in range(5)])

print([[0 for x in range(5)] for x in range(5)])  # 5X5 matrix

print([i for i in range(100) if i % 5 == 0])  # multiples of 5
