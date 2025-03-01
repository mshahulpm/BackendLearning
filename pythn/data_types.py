"""
Numeric       : int, float, complex
Sequence Type : string, list, tuple
Mapping Type  : dict
Boolean       : bool
Set Type      : set, frozenset
Binary Type   : bytes,bytearray,memoryview
"""

# ------------- Numeric ------------
# int
a = 5
print(type(a))

# float
b = 2.5
print(type(b))

# complex
c = 2 + 3j
print(type(c))

c2 = 3 + 5j
print(c + c2)

# ----------- Sequence Type ------------

# string
s = "Welcome to Hello world"
print(s)

print(type(s))

# access string with indexes
print(s[1])
print(s[2])
print(s[8])


# list
a = []  # an empty list
a = [1, 2, 3, 5]  # list with values
print(a)

a = ["Geeks", "For", "Geeks"]
print("Accessing element from the list")
print(a[0])
print(a[2])

print("Accessing element using negative indexing")
print(a[-1])
print(a[-3])

# Tuple
# initiate empty tuple
tup1 = ()

tup2 = ("Geeks", "For")
print("\nTuple with the use of String: ", tup2)

tup1 = tuple([1, 2, 3, 4, 5])

# access tuple items
print(tup1[0])
print(tup1[-1])
print(tup1[-3])

# tup1[2] = 444 # will throw error
# ----------- Boolean ------------

print(type(True))
print(type(False))
# print(type(true)) # will throw error

# ----------- Set -------------

s = set()
s.add("shahul")
print(s)

# initializing empty set
s1 = set()

s1 = set("GeeksForGeeks")
print("Set with the use of String: ", s1)

s2 = set(["Geeks", "For", "Geeks"])
print("Set with the use of List: ", s2)

set1 = set(["Geeks", "For", "Geeks"])
print(set1)

# loop through set
for i in set1:
    print(i, end=" ")

# check if item exist in set
print("\n--------------")
print("Geeks" in set1)

# --------- dictionary ----------
d = {1: "some value", "name": "one", 3: "three"}

# Accessing an element using key
print(d["name"])
print(d[1])
print(d[3])

# Accessing a element using get
print("--------------")
print(d.get(1))
print(d.get("name"))
print(d.get(3))

# Accessing like javascript object
print("_______________")
# print(d.name) # will throw error
