for i in range(10):
    print(i)

print("----------------")
# start stop step
for i in range(10, 20, 2):
    print(i)

print("----------------")

for i in range(-10, 0, 1):
    print(i)

# loop in a list
for i in [1, 2, 3, 4, 6, 6, 7]:
    print(i)

x = [1, 2, 3, 5, 67, 7]

for i, element in enumerate(x):
    print(i, element)

# while loop
i = 0
while i < 10:
    print(i)
    i += 1
