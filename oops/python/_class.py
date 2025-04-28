class PythonClass:
    year = 1991  # class variable

    # constructor
    def __init__(self, name):
        self.name = name
        self.version = 3.7

    # instance method
    def about(self):
        return f"{self.name} {self.version}"

    # class method
    @classmethod
    def get_year(cls):
        return cls.year

    # static method
    @staticmethod
    def get_version():
        return 3.7
