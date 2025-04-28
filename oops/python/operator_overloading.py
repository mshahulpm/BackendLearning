class Sample:
    def set_name(self, name):
        self.name = name

    def __add__(self, other):
        return self.name + " " + other.name


first_name = Sample()
second_name = Sample()

first_name.set_name("John")
second_name.set_name("Doe")

full_name = first_name + second_name
print(full_name)
